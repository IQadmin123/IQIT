<?php

namespace IqInfinite\Career\Actions;

use App\Contracts\ActionInterface;
use App\Http\Requests\Career\CareerStoreRequest;
use App\Models\Job;

class CareerCreateAction implements ActionInterface
{
    /**
     * @param  CareerStoreRequest  $request
     */
    public function __construct(
        private CareerStoreRequest $request,
    ) {
    }

    /**
     * @return Job
     */
    public function execute(): Job
    {
        /*
        |--------------------------------------------------------------------------
        | Add job data into database
        |--------------------------------------------------------------------------
        */

        $job = new Job();
        $job->job_category_type = $this->request->job_category_type;
        $job->role = $this->request->role;
        $job->location = $this->request->location;
        $job->description = $this->request->description;
        $job->responsibility = $this->request->responsibility;
        $job->requirement = $this->request->requirement;
        $job->save();

        /*
         |--------------------------------------------------------------------------
         | Response
         |--------------------------------------------------------------------------
         */

        return $job;
    }
}
