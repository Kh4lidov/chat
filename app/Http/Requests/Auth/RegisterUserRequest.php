<?php

namespace App\Http\Requests\Auth;

use App\Models\RegistrationToken;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rules;

class RegisterUserRequest extends FormRequest
{
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
                $this->validateWithCloudflare($validator);
            });
        }
    }

    protected function validateWithCloudflare($validator): void
    {
        $token = $this->input('token');
        $ip = $this->header('CF-Connecting-IP');

        $formData = [
            'secret' => env('TURNSTILE_SECRET_KEY'),
            'response' => $token,
            'remoteip' => $ip
        ];

        $response = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', $formData);
        $result = $response->json();

        if (!isset($result['success']) || !$result['success']) {
            $validator->errors()->add('token', 'Что-то пошло не так, попробуйте снова.');
        }
    }
}
