<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'Api\AuthController@login');
Route::post('register', 'Api\AuthController@register');

Route::middleware('auth:api')->namespace('Api')->group(function () {
    Route::resource('todo', 'TodoController');

    Route::get('settings', 'SettingsController@index');
    Route::post('settings', 'SettingsController@update');
});

