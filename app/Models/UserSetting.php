<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    protected $fillable = [
        'hour_rate',
        'exchange_rate'
    ];

    protected $guarded = [
        'user_id'
    ];
}
