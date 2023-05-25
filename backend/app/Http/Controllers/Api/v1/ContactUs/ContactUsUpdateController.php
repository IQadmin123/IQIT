<?php

namespace App\Http\Controllers\Api\v1\ContactUs;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactUs\ContactUsUpdateRequest;
use App\Models\ContactUs;
use IqInfinite\ContactUs\Actions\ContactUsUpdateAction;

class ContactUsUpdateController extends Controller
{
    /**
     * Update status of contactus
     *
     * @param  ContactUsUpdateRequest  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke($contactId, ContactUsUpdateRequest $request)
    {
        $contactUs = ContactUs::where('id', $contactId)->first();
        if (!$contactUs) {
            return response()->json(
                [
                    'meta' => [
                        'status' => 400,
                        'message' => 'Team member not found'
                    ],
                ],
            );
        }
        $contactUs = (new ContactUsUpdateAction($request, $contactUs))
            ->execute();

        return response()->json(
            [
                'data' => $contactUs,
                'meta' => [
                    'status' => 200,
                    'message' => 'Team data updated successfully'
                ],
            ],
        );
    }
}
