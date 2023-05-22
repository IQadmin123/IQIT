<?php

namespace App\Http\Controllers\Api\v1\Portfolio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Portfolio\PortfolioUpdateRequest;
use App\Models\Portfolio;
use IqInfinite\Portfolio\Actions\PortfolioUpdateAction;

class PortfolioUpdateController extends Controller
{
    /**
     * Adding portfolio
     *
     * @param  PortfolioUpdateRequest  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke($portfolio_id, PortfolioUpdateRequest $request)
    {
        $portfolio = Portfolio::where('id', $portfolio_id)
            ->first();
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
        $portfolio = (new PortfolioUpdateAction(
            $request,
            $portfolio
        ))
            ->execute();

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
