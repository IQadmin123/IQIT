<?php

namespace App\Http\Controllers\Api\v1\Career;

use App\Http\Controllers\Controller;
use App\Http\Requests\Career\CareerUpdateRequest;
use App\Models\Job;
use IqInfinite\Career\Actions\CareerUpdateAction;

class CareerUpdateController extends Controller
{
    /**
     * Adding Career
     *
     * @param  CareerUpdateRequest  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke($job_id, CareerUpdateRequest $request)
    {
        $job = Job::where('id', $job_id)
            ->first();
        if (!$job) {
            return response()->json(
                [
                    'data' => $job,
                    'meta' => [
                        'status' => 400,
                        'message' => 'Job not found'
                    ],
                ],
            );
        }
        $job = (new CareerUpdateAction(
            $request,
            $job
        ))
            ->execute();

        return response()->json(
            [
                'data' => $job,
                'meta' => [
                    'status' => 200,
                    'message' => 'Job details updated successfully'
                ],
            ],
        );
    }
}
