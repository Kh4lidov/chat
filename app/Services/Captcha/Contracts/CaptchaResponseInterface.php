<?php

namespace App\Services\Captcha\Contracts;

interface CaptchaResponseInterface
{
    public function successful(): bool;

    public function json(): array;
}
