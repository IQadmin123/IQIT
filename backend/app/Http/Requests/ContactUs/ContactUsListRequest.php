<?php

namespace App\Http\Requests\ContactUs;

use App\Enums\ContactUsStatus;
use App\Http\Requests\ApiFormRequest;

class ContactUsListRequest extends ApiFormRequest
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
            'q' => 'nullable|string|max:100',
            'status' => 'nullable|string|in:' . implode(',', ContactUsStatus::toValues()),
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
            'q.max' => __('Maximum 100 characters are accepted for search.'),
            'status.in' => 'Invalid contactus status type'
        ];
    }
}
