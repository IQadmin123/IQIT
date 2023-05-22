<?php

namespace App\Models;

use App\Enums\PortfolioCategoryType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Portfolio extends Model
{
    use Notifiable;

    /*
     |--------------------------------------------------------------------------
     | Database \ Table
     |--------------------------------------------------------------------------
     */

    protected $table = 'portfolio';

    public $timestamps = true;

    /*
     |--------------------------------------------------------------------------
     | Attributes \ Mass Assignable
     |--------------------------------------------------------------------------
     */

    protected $fillable = [
        'project_name',
        'image',
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

    /*
     |--------------------------------------------------------------------------
     | Attributes \ Casting
     |--------------------------------------------------------------------------
     */

    protected $casts = [
        'category_type' => PortfolioCategoryType::class,
    ];

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
