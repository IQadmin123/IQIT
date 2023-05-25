<?php

namespace App\Http\Controllers\Api\v1\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\CandidateStoreRequest;
use IqInfinite\Candidate\Actions\CandidateCreateAction;

class CandidateCreateController extends Controller
{
    /**
     * Adding Candidate
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(CandidateStoreRequest $request,$jobId)
    {
        $team = (new CandidateCreateAction($request,$jobId))
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
