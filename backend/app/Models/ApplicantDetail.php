<?php

namespace App\Models;

use App\Enums\CandidateStatus;
use App\Foundation\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ApplicantDetail extends Model
{
    use Notifiable;

    /*
     |--------------------------------------------------------------------------
     | Database \ Table
     |--------------------------------------------------------------------------
     */

    protected $table = 'applicant_details';

    public $timestamps = true;

    /*
     |--------------------------------------------------------------------------
     | Attributes \ Mass Assignable
     |--------------------------------------------------------------------------
     */

    protected $fillable = [
        'fullname',
        'email',
        'file_url',
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
        'status' => CandidateStatus::class,
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
     | Relationships
     |--------------------------------------------------------------------------
     */

    public function job()
    {
        return $this->belongsTo('App\Models\Job');
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
