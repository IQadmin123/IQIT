<?php

namespace App\Http\Controllers\Api\v1\Candidate\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CandidateCollectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'fullname' => $this->fullname,
            'job_position' => $this->job->role,
            'email' => $this->email,
            'phone' => $this->phone,
            'file_url' => Storage::disk('public')->url($this->file_url),
            'status' => $this->status,
            'created_at' => $this->created,
            'updated_at' => $this->updated
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function with($request)
    {
        return [
            'meta' => [
                'status' => 200,
            ],
        ];
    }
}
