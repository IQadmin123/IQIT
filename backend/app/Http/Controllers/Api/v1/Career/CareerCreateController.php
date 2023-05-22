<?php

namespace App\Http\Controllers\Api\v1\Career;

use App\Http\Controllers\Controller;
use App\Http\Requests\Career\CareerStoreRequest;
use IqInfinite\Career\Actions\CareerCreateAction;

class CareerCreateController extends Controller
{
    /**
     * Adding job
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(CareerStoreRequest $request)
    {
        $team = (new CareerCreateAction($request))
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
