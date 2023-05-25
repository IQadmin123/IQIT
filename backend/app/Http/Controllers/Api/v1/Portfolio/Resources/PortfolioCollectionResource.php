<?php

namespace App\Http\Controllers\Api\v1\Portfolio\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PortfolioCollectionResource extends JsonResource
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
            'project_name' => $this->project_name,
            'category_type' => $this->category_type,
            'image' => array_map(fn ($row) => Storage::disk('public')->url($row), json_decode($this->image, true)),
            'description' => $this->description,
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
