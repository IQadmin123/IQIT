<?php

namespace App\Http\Controllers\Api\v1\Team;

use App\Http\Controllers\Api\v1\Team\Resources\TeamCollection;
use App\Http\Controllers\Controller;
use App\Http\Requests\Team\TeamShowRequest;
use App\Models\Team;

class TeamViewController extends Controller
{
    /**
     * View all team data
     *
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(TeamShowRequest $request, $team_id = null)
    {
        $q = (isset($request->validated()['q'])) ? $request->validated()['q'] : '';
        if ($team_id != null) {
            $response = Team::where('id', $team_id)->get();
        } else {
            $response = Team::when(!empty($q), function ($query) use ($q) {
                    $query->where('firstname', 'like', '%' . $q . '%');
                    $query->orWhere('lastname', 'like', '%' . $q . '%');
                    $query->orWhere('email', 'like', '%' . $q . '%');
                    $query->orWhere('designation', 'like', '%' . $q . '%');
                })
                ->orderBy('created_at', 'desc')->paginate(10);
        }
        return new TeamCollection($response);
    }
}
