<?php

namespace IqInfinite\Portfolio\Actions;

use App\Contracts\ActionInterface;
use App\Http\Requests\Portfolio\PortfolioStoreRequest;
use App\Models\Portfolio;
use Illuminate\Support\Facades\Storage;

class PortfolioCreateAction implements ActionInterface
{
    /**
     * @param  PortfolioStoreRequest  $request
     */
    public function __construct(
        private PortfolioStoreRequest $request,
    ) {
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

        $portfolio = new Portfolio();
        $portfolio->project_name = $this->request->project_name;
        $portfolio->category_type = $this->request->category_type;
        $portfolio->description = $this->request->description;
        /*
        |--------------------------------------------------------------------------
        | Upload image to local
        |--------------------------------------------------------------------------
        */

        if ($this->request->has('image')) {
            $imageName = [];
            $value = $this->request->image ?  $this->request->image : [];
            foreach ($this->request->image as $k => $file) {
                $filePath =  uniqid() . '.' . $this->request->image[$k]->getClientOriginalExtension();
                Storage::disk('public')->put($filePath, file_get_contents($this->request->image[$k]));
                $imageName[] = $filePath;
            }
            $value = json_encode($imageName);
            $portfolio->image = $value;
        }
        $portfolio->save();

        /*
         |--------------------------------------------------------------------------
         | Response
         |--------------------------------------------------------------------------
         */

        return $portfolio;
    }
}
