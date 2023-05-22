<?php

namespace App\Http\Controllers\Api\v1\Portfolio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Portfolio\PortfolioUpdateRequest;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use IqInfinite\Portfolio\Actions\PortfolioUpdateAction;

class PortfolioImageSoratbleController extends Controller
{
    /**
     * Adding portfolio
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke($portfolio_id, Request $request)
    {
        $portfolio = Portfolio::where('id', $portfolio_id)->first();
        if (!$portfolio) {
            return response()->json(
                [
                    'meta' => [
                        'status' => 400,
                        'message' => 'Portfolio not found'
                    ],
                ],
            );
        }
        $value = json_encode($request->images);
        $portfolio->image = $value;
        $portfolio->save();

        return response()->json(
            [
                'data' => $portfolio,
                'meta' => [
                    'status' => 200,
                    'message' => 'Portfolio updated successfully'
                ],
            ],
        );
    }
}
