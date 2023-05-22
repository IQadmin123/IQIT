<?php

namespace App\Http\Controllers\Api\v1\ContactUs;

use App\Http\Controllers\Api\v1\ContactUs\Resources\ContactUsCollection;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContactUs\ContactUsListRequest;
use App\Models\ContactUs;

class ContactUsViewController extends Controller
{
    /**
     * View all contact data
     *
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(ContactUsListRequest $request, $contactId = null)
    {
        $q = (isset($request->validated()['q'])) ? $request->validated()['q'] : '';
        $status = (isset($request->validated()['status'])) ? $request->validated()['status'] : '';
        if ($contactId != null) {
            $response = ContactUs::where('id', $contactId)->get();
        } else {
            $response = ContactUs::when(!empty($q), function ($query) use ($status) {
                $query->where('status', '=', $status);
            })
                ->when(!empty($q), function ($query) use ($q) {
                    $query->where('firstname', 'like', '%' . $q . '%');
                    $query->orWhere('lastname', 'like', '%' . $q . '%');
                    $query->orWhere('email', 'like', '%' . $q . '%');
                })
                ->orderBy('created_at', 'desc')
                ->paginate(10);
        }
        return new ContactUsCollection($response);
    }
}
