<?php

namespace App\Http\Requests\Candidate;

use App\Enums\CandidateStatus;
use App\Http\Requests\ApiFormRequest;

class CandidateUpdateRequest extends ApiFormRequest
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
            'status'=>'required|in:'.implode(',', CandidateStatus::toValues())
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
            'staus.required'=>'Candidate status required',
            'status.in'=>'Invalid candidate status type'
        ];
    }
}
