<?php

namespace App\Http\Requests\Candidate;

use App\Enums\CandidateStatus;
use App\Http\Requests\ApiFormRequest;

class CandidateStoreRequest extends ApiFormRequest
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
            'fullname' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'file_url' => 'required|mimes:png,jpg,jpeg,pdf,docx,doc',
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
            'fullname.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.required' => 'Invalid email format',
            'phone.required' => 'Phone is required',
            'file.required' => 'Resume is required',
            'file.mimes'=>'Invalid resume type',
            'staus.required'=>'Candidate status required',
            'status.in'=>'Invalid candidate status type'
        ];
    }
}
