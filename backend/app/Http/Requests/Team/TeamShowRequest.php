<?php

namespace App\Http\Requests\Team;

use App\Http\Requests\ApiFormRequest;

class TeamShowRequest extends ApiFormRequest
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
        ];
    }
}
