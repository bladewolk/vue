<?php

namespace App\Http\Controllers\Api;

use App\Models\UserSetting;
use Couchbase\UserSettings;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SettingsController extends Controller
{
    private $user;

    public function __construct()
    {
        $this->user = auth('api')->user();
    }

    public function index()
    {
        if (!$settings = $this->user->settings()->first())
            $settings = new UserSetting([
                'hour_rate' => '',
                'exchange_rate' => ''
            ]);

        return $settings;
    }

    public function update()
    {
        $this->validate(request(), [
            'hour_rate' => '',
            'exchange_rate' => '',
        ]);

        if ($settings = $this->user->settings()->first())
            $settings->update(request()->all());
        else
            $this->user->settings()->create(request()->all());

        return response([], 200);
    }
}
