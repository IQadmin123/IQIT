<?php

namespace App\Http\Controllers\Api\v1\Portfolio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Portfolio\PortfolioStoreRequest;
use IqInfinite\Portfolio\Actions\PortfolioCreateAction;

class PortfolioCreateController extends Controller
{
    /**
     * Adding portfolio
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(PortfolioStoreRequest $request)
    {
        $team = (new PortfolioCreateAction($request))
            ->execute();

        return response()->json(
            [
                'data' => $team,
                'meta' => [
                    'status' => 200,
                ],
            ],
        );
    }
}
