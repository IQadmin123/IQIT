<?php

namespace App\Http\Requests\Team;

use App\Http\Requests\ApiFormRequest;

class TeamStoreRequest extends ApiFormRequest
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
            'designation' => 'required',
            'phone' => 'nullable',
            'image' => 'required|mimes:png,jpg,jpeg',
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
            'email.email' => 'Invalid Email',
            'designation.required' => 'Designation is required',
            'image.mimes' => 'Invalid image mimes type',
        ];
    }
}
