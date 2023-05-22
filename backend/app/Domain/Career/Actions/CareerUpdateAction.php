<?php

namespace IqInfinite\Career\Actions;

use App\Contracts\ActionInterface;
use App\Http\Requests\Career\CareerUpdateRequest;
use App\Models\Job;

class CareerUpdateAction implements ActionInterface
{
    /**
     * @param  CareerUpdateRequest  $request
     * @param Job $job
     */
    public function __construct(
        private CareerUpdateRequest $request,
        private Job $job
    ) {
        $this->request = $request;
        $this->job = $job;
    }

    /**
     * @return Job
     */
    public function execute(): Job
    {
        /*
        |--------------------------------------------------------------------------
        | update job data into database
        |--------------------------------------------------------------------------
        */

        $this->job->job_category_type = $this->request->job_category_type;
        $this->job->role = $this->request->role;
        $this->job->location = $this->request->location;
        $this->job->description = $this->request->description;
        $this->job->responsibility = $this->request->responsibility;
        $this->job->requirement = $this->request->requirement;
        $this->job->save();

        /*
         |--------------------------------------------------------------------------
         | Response
         |--------------------------------------------------------------------------
         */

        return $this->job;
    }
}
