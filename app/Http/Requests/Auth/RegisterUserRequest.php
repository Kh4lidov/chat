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
                },
            ],
        ];
    }
}
