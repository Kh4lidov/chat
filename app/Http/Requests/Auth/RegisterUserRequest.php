<?php

namespace App\Http\Requests\Auth;

use App\Models\RegistrationToken;
use App\Models\User;
use App\Services\Captcha\Contracts\CaptchaServiceInterface;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rules;

class RegisterUserRequest extends FormRequest
{
    public function __construct(protected CaptchaServiceInterface $captchaService)
    {
        parent::__construct();
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'registration_key' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $token = RegistrationToken::whereRaw('BINARY token = ?', [$value])->first();

                    if (!$token) {
                        return $fail('Выбранный регистрационный ключ недействителен.');
                    }

                    if ($token->registrations >= $token->usage_limit) {
                        return $fail('Лимит активаций по данному ключу исчерпан.');
                    }

                    return true;
                },
            ],
        ];

        if (App::isProduction()) {
            $rules['token'] = ['required', 'string'];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'token.required' => 'Вы должны подтвердить, что вы - не робот!'
        ];
    }

    public function withValidator($validator): void
    {
        if (App::isProduction()) {
            $validator->after(function ($validator) {
                $this->validateWithCaptcha($validator);
            });
        }
    }

    protected function validateWithCaptcha($validator): void
    {
        $token = $this->input('token');
        $ip = $this->header('CF-Connecting-IP');

//        $response = $this->captchaService->validate([
//            'response' => $token,
//            'remoteip' => $ip
//        ]);

        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => config('services.cloudflare_turnstile.secret'),
            'response' => $token,
            'remoteip' => $ip
        ]);

        dd($response->json());

        if (!$response->successful()) {
            $validator->errors()->add('token', 'Что-то пошло не так, попробуйте снова.');
        }
    }
}
