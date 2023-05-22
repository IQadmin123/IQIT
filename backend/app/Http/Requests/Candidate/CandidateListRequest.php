<?php

namespace App\Http\Requests\Candidate;

use App\Enums\CandidateStatus;
use Illuminate\Foundation\Http\FormRequest;

class CandidateListRequest extends FormRequest
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
            'job' => 'nullable|string',
            'status' => 'nullable|string|in:' . implode(',', CandidateStatus::toValues()),
            'q' => 'nullable|string|max:100',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'q.max' => __('Maximum 100 characters are accepted for search.'),
            'status.in'=>'Invalid candidate status type'
        ];
    }
}
