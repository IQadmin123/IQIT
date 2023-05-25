<?php

namespace App\Http\Controllers\Api\v1\Career;

use App\Http\Controllers\Controller;
use App\Models\Job;

class CareerDeleteController extends Controller
{
    /**
     * delete job data
     *
     * @return \Illuminate\Http\Response
     */
    final public function __invoke($job_id)
    {
        $job = Job::where('id', $job_id);
        if (!$job->first()) {
            return response()->json(
                [
                    'meta' => [
                        'status' => 400,
                        'message' => 'Job not found'
                    ],
                ],
            );
        }

        $job->delete();

        return response()->json(
            [
                'meta' => [
                    'status' => 200,
                    'message' => 'Job deleted successfully'
                ],
            ],
        );
    }
}
