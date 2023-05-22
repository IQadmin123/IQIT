<?php

namespace IqInfinite\Portfolio\Actions;

use App\Contracts\ActionInterface;
use App\Http\Requests\Portfolio\PortfolioUpdateRequest;
use App\Models\Portfolio;
use Illuminate\Support\Facades\Storage;

class PortfolioUpdateAction implements ActionInterface
{
    /**
     * @param  PortfolioUpdateRequest  $request
     * @param Portfolio $portfolio
     */
    public function __construct(
        private PortfolioUpdateRequest $request,
        private Portfolio $portfolio
    ) {
        $this->request = $request;
        $this->portfolio = $portfolio;
    }

    /**
     * @return Portfolio
     */
    public function execute(): Portfolio
    {

        /*
        |--------------------------------------------------------------------------
        | Add Portfolio data into database
        |--------------------------------------------------------------------------
        */
        $this->portfolio->project_name = $this->request->project_name;
        $this->portfolio->category_type = $this->request->category_type;
        $this->portfolio->description = $this->request->description;

        /*
        |--------------------------------------------------------------------------
        | Upload image to local
        |--------------------------------------------------------------------------
        */

        if ($this->request->has('image')) {
            $value = $this->request->image;
            $images = $this->portfolio->image ? json_decode($this->portfolio->image, true) : [];
            foreach ($value as $k => $file) {
                if (file_exists($file)) {
                    $images[$k] ? Storage::disk('public')->delete($images[$k]) : '';
                    $filePath =  uniqid() . '.' . $file->getClientOriginalExtension();
                    Storage::disk('public')->put($filePath, file_get_contents($file));
                    $images[$k] = $filePath;
                }
            }
            $value = json_encode($images);
            $this->portfolio->image = $value;
        }
        $this->portfolio->save();

        /*
         |--------------------------------------------------------------------------
         | Response
         |--------------------------------------------------------------------------
         */

        return $this->portfolio;
    }
}
