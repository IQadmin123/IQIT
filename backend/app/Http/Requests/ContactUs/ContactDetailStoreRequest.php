<?php

namespace App\Http\Requests\ContactUs;

use App\Enums\ContactUsStatus;
use App\Http\Requests\ApiFormRequest;

class ContactDetailStoreRequest extends ApiFormRequest
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
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'message' => 'required|string',
            'status' => 'nullable|string|in:' . implode(',', ContactUsStatus::toValues())
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
            'firstname.required' => 'First name is required',
            'lastname.required' => 'Last name is required',
            'email.required' => 'Email is required',
            'email.required' => 'Invalid email format',
            'phone.required' => 'Phone is required',
            'message.required' => 'Message is required',
            'status.in' => 'Invalid contactus message type'
        ];
    }
}
