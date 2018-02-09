<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    protected $_token;

    public function __construct()
    {
        $this->_token = '1ct6GOClI33q1ldnm3ARfiBNCEcW9VGpIHHlF8fsKyTpXDIESk6fN4Hh51zEBZfNYhvpFFJsQ6WfixCJpkFeLStDxHGJMlDPlKjmy';
    }

    public function checkAuth()
    {
        if (request()->get('token') == $this->_token)
            return response([], 200);

        return response([], 403);
    }

    public function login()
    {
        sleep(1);
        $this->validate(request(), [
            'email' => 'required|email|max:255',
            'password' => 'required|max:100'
        ]);

        return response([
            'token' => $this->_token
        ]);
    }
}
