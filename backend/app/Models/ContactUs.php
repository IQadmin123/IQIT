<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ContactUs extends Model
{
    use Notifiable;

    /*
     |--------------------------------------------------------------------------
     | Database \ Table
     |--------------------------------------------------------------------------
     */

    protected $table = 'contact_us';

    public $timestamps = true;

    /*
     |--------------------------------------------------------------------------
     | Attributes \ Mass Assignable
     |--------------------------------------------------------------------------
     */

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'message'
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
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /*
     |--------------------------------------------------------------------------
     | Attributes \ Casting
     |--------------------------------------------------------------------------
     */

    protected $casts = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
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

    public function getCreatedAttribute()
    {
        return $this->created_at->format('d-m-Y');
    }

    public function getUpdatedAttribute()
    {
        return $this->updated_at->format('d-m-Y');
    }
}
