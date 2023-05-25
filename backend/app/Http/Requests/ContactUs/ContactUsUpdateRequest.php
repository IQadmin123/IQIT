<?php

namespace App\Http\Requests\ContactUs;

use App\Enums\CandidateStatus;
use App\Enums\ContactUsStatus;
use App\Http\Requests\ApiFormRequest;

class ContactUsUpdateRequest extends ApiFormRequest
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
            'status'=>'required|in:'.implode(',', ContactUsStatus::toValues())
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
            'staus.required'=>'ContactUs status required',
            'status.in'=>'Invalid contactus status type'
        ];
    }
}
