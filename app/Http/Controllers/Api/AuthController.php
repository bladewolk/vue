<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    protected $_token;

    public function __construct()
    {
        $this->_token = '1ct6GOClI33q1ldnm3ARfiBNCEcW9VGpIHHlF8fsKyTpXDIESk6fN4Hh51zEBZfNYhvpFFJsQ6WfixCJpkFeLStDxHGJMlDPlKjmy';
    }

    public function login()
    {
        sleep(1);
        $this->validate(request(), [
            'email' => 'required|email|max:255',
            'password' => 'required|max:100'
        ]);

        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response([], 401);
        }

        return response([
            'token' => $token
        ]);
    }

    public function register()
    {
        $this->validate(request(), [
            'email' => 'required|unique:users',
            'password' => 'required|min:3'
        ]);

        $creadentials = [
            'name' => str_random(20),
            'email' => request()->get('email'),
            'password' => bcrypt(request()->get('password'))
        ];

        $user = User::create($creadentials);

        return response([
            'token' => JWTAuth::fromUser($user)
        ]);
    }
}
