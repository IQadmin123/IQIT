<?php

namespace IqInfinite\ContactUs\Actions;

use App\Contracts\ActionInterface;
use App\Http\Requests\ContactUs\ContactUsUpdateRequest;
use App\Models\ContactUs;

class ContactUsUpdateAction implements ActionInterface
{
    /**
     * @param  ContactUsUpdateRequest  $request
     * @param  ContactUs $contactUs
     */
    public function __construct(
        private ContactUsUpdateRequest $request,
        private ContactUs $contactUs
    ) {
    }

    /**
     * @return ContactUs
     */
    public function execute(): ContactUs
    {
        /*
        |--------------------------------------------------------------------------
        | Add candidate data into database
        |--------------------------------------------------------------------------
        */
        $this->contactUs->status = $this->request->status;
        $this->contactUs->save();

        /*
         |--------------------------------------------------------------------------
         | Response
         |--------------------------------------------------------------------------
         */

        return $this->contactUs;
    }
}
