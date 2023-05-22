<?php

namespace App\Http\Controllers\Api\v1\Career\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CareerCollectionResource extends JsonResource
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
            'job_category_type' => $this->job_category_type,
            'role' => $this->role,
            'location' => $this->location,
            'description' => $this->description,
            'responsibility' => $this->responsibility,
            'requirement' => $this->requirement,
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
