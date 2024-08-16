<?php

namespace App\Services\Captcha;

use App\Services\Captcha\Contracts\CaptchaResponseInterface;
use Illuminate\Http\Client\Response;

abstract class AbstractCaptchaResponse implements CaptchaResponseInterface
{
    public function __construct(protected Response $response)
    {}

    public function json(): array
    {
        return $this->response->json();
    }

    abstract public function successful(): bool;
}
