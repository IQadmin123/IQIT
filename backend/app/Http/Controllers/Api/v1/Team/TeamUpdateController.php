<?php

namespace App\Http\Controllers\Api\v1\Team;

use App\Http\Controllers\Controller;
use App\Http\Requests\Team\TeamUpdateRequest;
use App\Models\Team;
use IqInfinite\Team\Actions\TeamUpdateAction;

class TeamUpdateController extends Controller
{
    /**
     * Updating Team
     *
     * @param  TeamUpdateRequest  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke($team_id, TeamUpdateRequest $request)
    {
        $team = Team::where('id', $team_id)->first();
        if (!$team) {
            return response()->json(
                [
                    'meta' => [
                        'status' => 400,
                        'message' => 'Team member not found'
                    ],
                ],
            );
        }
        $team = (new TeamUpdateAction($request, $team))
            ->execute();

        return response()->json(
            [
                'data' => $team,
                'meta' => [
                    'status' => 200,
                    'message' => 'Team data updated successfully'
                ],
            ],
        );
    }
}
