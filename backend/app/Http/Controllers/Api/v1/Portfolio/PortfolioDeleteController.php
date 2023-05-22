<?php

namespace App\Http\Controllers\Api\v1\Portfolio;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Support\Facades\Storage;

class PortfolioDeleteController extends Controller
{
    /**
     * delete data
     *
     * @return \Illuminate\Http\Response
     */
    final public function __invoke($portfolio_id)
    {
        $portfolio = Portfolio::where('id', $portfolio_id);
        if (!$portfolio->first()) {
            return response()->json(
                [
                    'data' => $portfolio,
                    'meta' => [
                        'status' => 400,
                        'message' => 'Portfolio not found'
                    ],
                ],
            );
        }
        $images = json_decode($portfolio->first()->image, true);
        foreach ($images as $image) {
            if (Storage::disk('public')
                ->exists($image)
            ) {
                Storage::disk('public')
                    ->delete($image);
            }
        }
        $portfolio->delete();

        return response()->json(
            [
                'data' => $portfolio,
                'meta' => [
                    'status' => 200,
                    'message' => 'Portfolio deleted successfully'
                ],
            ],
        );
    }
}
