<?php

namespace App\Http\Requests\Portfolio;

use App\Enums\PortfolioCategoryType;
use App\Http\Requests\ApiFormRequest;

class PortfolioUpdateRequest extends ApiFormRequest
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
            'project_name' => 'required|string',
            'category_type' => 'required|in:' . implode(',', PortfolioCategoryType::toValues()),
            'image.*' => 'required',
            'description' => 'required'
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
            'project_name.required' => 'Project name is required',
            'category_type.required' => 'Category type is required',
            'category_type.in' => 'Invalid category type',
            'description.required' => 'Description is required'
        ];
    }
}
