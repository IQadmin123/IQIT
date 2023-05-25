<?php

namespace App\Models;

use App\Enums\Roles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /*
     |--------------------------------------------------------------------------
     | Database \ Table
     |--------------------------------------------------------------------------
     */

    protected $table = 'users';

    public $timestamps = true;

    /*
     |--------------------------------------------------------------------------
     | Attributes \ Mass Assignable
     |--------------------------------------------------------------------------
     */

    protected $fillable = [
        'firstname',
        'lastname',
        'username',
        'password',
        'email',
        'email_verified_at',
        'role',
        'phone'
    ];

    /*
     |--------------------------------------------------------------------------
     | Attributes \ Default
     |--------------------------------------------------------------------------
     */

    protected $attributes = [
        //
    ];

    /*
     |--------------------------------------------------------------------------
     | Attributes \ Hidden
     |--------------------------------------------------------------------------
     */

    protected $hidden = [
        'password',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /*
     |--------------------------------------------------------------------------
     | Attributes \ Casting
     |--------------------------------------------------------------------------
     */

    protected $casts = [
        'role' => Roles::class,
    ];

    /*
     |--------------------------------------------------------------------------
     | Route \ Key
     |--------------------------------------------------------------------------
     */

    public function getRouteKeyName()
    {
        return 'id';
    }

    /*
     |--------------------------------------------------------------------------
     | Eloquent
     |--------------------------------------------------------------------------
     */

    protected static function boot()
    {
        parent::boot();
    }

    /*
     |--------------------------------------------------------------------------
     | Eloquent \ Accessors
     |--------------------------------------------------------------------------
     */

    // public function getCreatedAtAttribute()
    // {
    //     return $this->created_at->format('d-m-Y');
    // }

    // public function getUpdatedAtAttribute()
    // {
    //     return $this->updated_at->format('d-m-Y');
    // }
}
