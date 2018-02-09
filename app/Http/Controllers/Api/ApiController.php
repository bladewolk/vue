<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiController extends Controller
{
    public function index()
    {
        return [1, 2, 3];
    }

    public function store()
    {
        $this->validate(request(), [
            'username' => 'required|min:3|max:255',
            'password' => 'required'
        ]);

        return [1, 2, 3];
    }
}
