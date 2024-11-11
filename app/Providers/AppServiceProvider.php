<?php

namespace App\Providers;

use App\Services\Captcha\Cloudflare\CloudflareCaptchaService;
use App\Services\Captcha\Contracts\CaptchaServiceInterface;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if (App::isProduction()) {
            $this->app['request']->server->set('HTTPS', true);
        }

        $this->app->bind(CaptchaServiceInterface::class, function () {
            return new CloudflareCaptchaService(config('services.cloudflare_turnstile.secret'));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (App::isProduction()) {
            URL::forceScheme('https');
        }

        Event::listen('response.sent', function (SymfonyResponse $response) {
            // Удалить заголовок x-robots-tag
            $response->headers->remove('x-robots-tag');
        });
    }
}
