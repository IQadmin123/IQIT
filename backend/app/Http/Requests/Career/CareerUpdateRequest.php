<?php

namespace App\Http\Requests\Career;

use App\Enums\JobCategoryType;
use App\Http\Requests\ApiFormRequest;

class CareerUpdateRequest extends ApiFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'job_category_type' => 'required|in:' . implode(',', JobCategoryType::toValues()),
            'role' => 'required|string',
            'location' => 'required|string',
            'description' => 'required|string',
            'responsibility' => 'required|string',
            'requirement' => 'required|string',
        ];
    }

    /**
     * Get the messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'job_category_type.required' => 'Job Category type is required',
            'job_category_type.in' => 'Invalid job category type',
            'role.required' => 'Job role is required',
            'location.required' => 'Job location is required',
            'description.required' => 'Job description is required',
            'responsibility.required' => 'Job responsibility is required',
            'requirement.required' => 'Job requirement is required',
        ];
    }
}
