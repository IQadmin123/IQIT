<?php

namespace App\Http\Controllers\Api\v1\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\CandidateUpdateRequest;
use App\Models\ApplicantDetail;
use IqInfinite\Candidate\Actions\CandidateUpdateAction;

class CandidateUpdateController extends Controller
{
    /**
     * Update status of candidate
     *
     * @param  CandidateUpdateRequest  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke($applicantId, CandidateUpdateRequest $request)
    {
        $applicant = ApplicantDetail::where('id', $applicantId)->first();
        if (!$applicant) {
            return response()->json(
                [
                    'meta' => [
                        'status' => 400,
                        'message' => 'Team member not found'
                    ],
                ],
            );
        }
        $applicant = (new CandidateUpdateAction($request, $applicant))
            ->execute();

        return response()->json(
            [
                'data' => $applicant,
                'meta' => [
                    'status' => 200,
                    'message' => 'Team data updated successfully'
                ],
            ],
        );
    }
}
