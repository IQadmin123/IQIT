<?php

namespace App\Http\Controllers\Api\v1\Candidate;

use App\Enums\CandidateStatus;
use App\Http\Controllers\Api\v1\Candidate\Resources\CandidateCollection;
use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\CandidateListRequest;
use App\Models\ApplicantDetail;

class CandidateViewController extends Controller
{
    /**
     * View all candidate data
     *
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(CandidateListRequest $request, $applicantId = null)
    {
        if ($applicantId != null) {
            $response = ApplicantDetail::where('id', $applicantId)->get();
        } else {
            $status = isset($request->validated()['status']) ? $request->validated()['status'] : '';
            $job = isset($request->validated()['job']) ? $request->validated()['job'] : null;
            $q = (isset($request->validated()['q'])) ? $request->validated()['q'] : '';
            $response = ApplicantDetail::with(['job'])
                ->when(!empty($status), function ($query) use ($status) {
                    $query->where('status', '=', $status);
                })
                ->when(!empty($job), function ($query) use ($job) {
                    $query->whereHas('job', function ($query) use ($job) {
                        $query->where('role', 'like', '%' . $job . '%');
                    });
                })
                ->when(!empty($q), function ($query) use ($q) {
                    $query->where('fullname', 'like', '%' . $q . '%');
                    $query->orWhere('email', 'like', '%' . $q . '%');
                })
                ->orderBy('created_at', 'desc')
                ->paginate(10);
        }
        return new CandidateCollection($response);
    }
}
