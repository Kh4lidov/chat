<?php

namespace App\Services\Captcha\Contracts;

interface CaptchaServiceInterface
{
    public function validate(array $data): CaptchaResponseInterface;
}
