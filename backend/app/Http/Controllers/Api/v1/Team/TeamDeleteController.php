<?php

namespace App\Http\Controllers\Api\v1\Team;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Support\Facades\Storage;

class TeamDeleteController extends Controller
{
    /**
     * delete data
     *
     * @return \Illuminate\Http\Response
     */
    final public function __invoke($team_id)
    {
        $team = Team::where('id', $team_id);
        if (!$team->first()) {
            return response()->json(
                [
                    'meta' => [
                        'status' => 400,
                        'message' => 'Team member not found'
                    ],
                ],
            );
        }
        if (Storage::disk('public')
            ->exists($team->first()->image)
        ) {
            Storage::disk('public')
                ->delete($team->first()->image);
        }
        $team->delete();

        return response()->json(
            [
                'meta' => [
                    'status' => 200,
                    'message' => 'Team member deleted successfully'
                ],
            ],
        );
    }
}
