<?php

namespace App\Http\Controllers\Api\v1\Team;

use App\Http\Controllers\Controller;
use App\Http\Requests\Team\TeamStoreRequest;
use IqInfinite\Team\Actions\TeamCreateAction;

class TeamCreateController extends Controller
{
    /**
     * Adding Team
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(TeamStoreRequest $request)
    {
        $team = (new TeamCreateAction($request))
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
