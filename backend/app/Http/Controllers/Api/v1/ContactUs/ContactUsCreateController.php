<?php

namespace App\Http\Controllers\Api\v1\ContactUs;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactUs\ContactDetailStoreRequest;
use IqInfinite\ContactUs\Actions\ContactUsCreateAction;

class ContactUsCreateController extends Controller
{
    /**
     * Adding Team
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(ContactDetailStoreRequest $request)
    {
        $team = (new ContactUsCreateAction($request))
            ->execute();

        return response()->json(
            [
                'data' => $team,
                'meta' => [
                    'status' => 200,
                ],
            ],
        );
    }
}
