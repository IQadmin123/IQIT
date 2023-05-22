<?php

namespace IqInfinite\Candidate\Actions;

use App\Contracts\ActionInterface;
use App\Http\Requests\Candidate\CandidateUpdateRequest;
use App\Models\ApplicantDetail;

class CandidateUpdateAction implements ActionInterface
{
    /**
     * @param  CandidateUpdateRequest  $request
     * @param  ApplicantDetail $applicant
     */
    public function __construct(
        private CandidateUpdateRequest $request,
        private ApplicantDetail $applicant
    ) {
    }

    /**
     * @return ApplicantDetail
     */
    public function execute(): ApplicantDetail
    {
        /*
        |--------------------------------------------------------------------------
        | Add candidate data into database
        |--------------------------------------------------------------------------
        */
        $this->applicant->status = $this->request->status;
        $this->applicant->save();

        /*
         |--------------------------------------------------------------------------
         | Response
         |--------------------------------------------------------------------------
         */

        return $this->applicant;
    }
}
