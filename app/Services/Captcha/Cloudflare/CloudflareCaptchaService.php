<?php

namespace App\Services\Captcha\Cloudflare;

use App\Services\Captcha\Contracts\CaptchaResponseInterface;
use App\Services\Captcha\Contracts\CaptchaServiceInterface;
use Illuminate\Support\Facades\Http;

class CloudflareCaptchaService implements CaptchaServiceInterface
{
    public function __construct(protected string $secretKey)
    {}

    public function validate(array $data): CaptchaResponseInterface
    {
        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $this->secretKey,
            'response' => $data['response'],
            'remoteip' => $data['remoteip']
        ]);

        return new CloudflareCaptchaResponse($response);
    }

}
