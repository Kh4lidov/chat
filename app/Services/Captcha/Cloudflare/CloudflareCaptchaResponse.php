<?php

namespace App\Services\Captcha\Cloudflare;

use App\Services\Captcha\AbstractCaptchaResponse;

class CloudflareCaptchaResponse extends AbstractCaptchaResponse
{
    public function successful(): bool
    {
        return $this->json()['success'];
    }
}
