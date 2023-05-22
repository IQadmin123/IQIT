<?php

namespace App\Http\Requests\Portfolio;

use App\Enums\PortfolioCategoryType;
use App\Http\Requests\ApiFormRequest;

class PortfolioShowRequest extends ApiFormRequest
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
            'category_type' => 'nullable|string|in:' . implode(',', PortfolioCategoryType::toValues()),
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
            'category_type.in' => 'Invalid category type'
        ];
    }
}
