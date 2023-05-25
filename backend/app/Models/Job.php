<?php

namespace App\Models;

use App\Enums\JobCategoryType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Job extends Model
{
    use Notifiable;

    /*
     |--------------------------------------------------------------------------
     | Database \ Table
     |--------------------------------------------------------------------------
     */

    protected $table = 'jobs';

    public $timestamps = true;

    /*
     |--------------------------------------------------------------------------
     | Attributes \ Mass Assignable
     |--------------------------------------------------------------------------
     */

    protected $fillable = [
        'role',
        'location',
        'description',
        'responsibility',
        'requirement',
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

    protected $casts = [
        'job_category_type' => JobCategoryType::class,
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

    public function applicant_detail()
    {
        return $this->hasMany('App\Models\ApplicantDetail', 'job_id');
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
