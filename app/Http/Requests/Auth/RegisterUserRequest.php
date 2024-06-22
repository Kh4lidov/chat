<?php

namespace App\Http\Requests\Auth;

use App\Models\RegistrationToken;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
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
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'registration_key' => ['required', 'string', 'exists:registration_tokens,token']
        ];
    }

    public function messages()
    {
        return [
            'registration_key.exists' => 'Выбранный регистрационный ключ недействителен.'
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator){
            $this->ensureRegistrationTokenIsValid($validator);
        });

    }

    protected function ensureRegistrationTokenIsValid($validator): void
    {
        $token = RegistrationToken::where('token', $this->get('registration_key'))->first();

        if ($token && $token->registrations >= $token->usage_limit) {
            $validator->errors()->add('registration_key', 'Лимит активаций по данному ключу исчерпан.');
        }
    }
}
