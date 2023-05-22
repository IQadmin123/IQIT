<?php

namespace App\Http\Controllers\Api\v1\Portfolio\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PortfolioCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => PortfolioCollectionResource::collection($this->collection),
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
