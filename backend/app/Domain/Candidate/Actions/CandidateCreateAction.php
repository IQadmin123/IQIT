<?php

namespace IqInfinite\Candidate\Actions;

use App\Contracts\ActionInterface;
use App\Http\Requests\Candidate\CandidateStoreRequest;
use App\Models\ApplicantDetail;
use App\Models\User;
use App\Notifications\Candidate\CandidateApplicationNotification;
use App\Notifications\Candidate\CandidateApplicationToHrNotification;
use Illuminate\Support\Facades\Storage;

class CandidateCreateAction implements ActionInterface
{
    /**
     * @param  CandidateStoreRequest  $request
     * @param $jobId
     */
    public function __construct(
        private CandidateStoreRequest $request,
        private $jobId
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
        $applicant = new ApplicantDetail();
        $applicant->job_id = $this->jobId;
        $applicant->fullname = $this->request->fullname;
        $applicant->email = $this->request->email;
        $applicant->phone = $this->request->phone;

        /*
        |--------------------------------------------------------------------------
        | Upload resume to local
        |--------------------------------------------------------------------------
        */

        if ($this->request->has('file_url')) {
            $filePath =  time() . '.' . $this->request->file('file_url')->getClientOriginalExtension();
            Storage::disk('public')->put($filePath, file_get_contents($this->request->file('file_url')));
            $applicant->file_url = $filePath;
        }
        $applicant->save();

        /*
        |--------------------------------------------------------------------------
        | Sending notification to HR and Candidate
        |--------------------------------------------------------------------------
        */
        $user = User::where('role', 2)->first();

        $user->notify(
            new CandidateApplicationToHrNotification($applicant, $user)
        );


        $applicant->notify(
            new CandidateApplicationNotification($applicant, $user)
        );

        /*
         |--------------------------------------------------------------------------
         | Response
         |--------------------------------------------------------------------------
         */

        return $applicant;
    }
}
