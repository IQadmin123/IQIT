<?php

namespace App\Http\Controllers\Api\v1\Portfolio;

use App\Http\Controllers\Api\v1\Portfolio\Resources\PortfolioCollection;
use App\Http\Controllers\Controller;
use App\Http\Requests\Portfolio\PortfolioShowRequest;
use App\Models\Portfolio;

class PortfolioViewController extends Controller
{
    /**
     * View all portfolio data
     *
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(PortfolioShowRequest $request, $portfolio_id = null)
    {
        $q = (isset($request->validated()['q'])) ? $request->validated()['q'] : '';
        $category = (isset($request->validated()['category_type'])) ? $request->validated()['category_type'] : '';

        if ($portfolio_id != null) {
            $response = Portfolio::where('id', $portfolio_id)->get();
        } else {
            $response = Portfolio::when(!empty($q), function ($query) use ($q) {
                $query->where('project_name', 'like', '%' . $q . '%');
            })
                ->when(!empty($category), function ($query) use ($category) {
                    $query->where('category_type', '=', $category);
                })
                ->orderBy('created_at', 'desc')
                ->paginate(10);
        }
        return new PortfolioCollection($response);
    }
}
