<?php

namespace App\Http\Controllers\Api\v1\Career;

use App\Http\Controllers\Api\v1\Career\Resources\CareerCollection;
use App\Http\Controllers\Controller;
use App\Http\Requests\Career\CareerShowRequest;
use App\Models\Job;

class CareerViewController extends Controller
{
    /**
     * View all Career data
     *
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(CareerShowRequest $request, $job_id = null)
    {
        $q = (isset($request->validated()['q'])) ? $request->validated()['q'] : '';
        $categoryType = (isset($request->validated()['category_type'])) ? $request->validated()['category_type'] : '';
        if ($job_id != null) {
            $response = Job::where('id', $job_id)->get();
        } else {
            $response = Job::when(!empty($q), function ($query) use ($q) {
                $query->where('role', 'like', '%' . $q . '%');
                $query->orWhere('location', 'like', '%' . $q . '%');
            })
                ->when(!empty($categoryType), function ($query) use ($categoryType) {
                    $query->where('job_category_type', '=', $categoryType);
                })
                ->orderBy('created_at', 'desc')->paginate(10);
        }
        return new CareerCollection($response);
    }
}
