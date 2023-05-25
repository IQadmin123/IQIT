<?php

namespace IqInfinite\ContactUs\Actions;

use App\Contracts\ActionInterface;
use App\Enums\ContactUsStatus;
use App\Http\Requests\ContactUs\ContactDetailStoreRequest;
use App\Models\ContactUs;
use App\Models\User;
use App\Notifications\ContactUs\ContactDetailsToAdminNotification;
use App\Notifications\ContactUs\ContactDetailsToUserNotification;

class ContactUsCreateAction implements ActionInterface
{
    /**
     * @param  ContactDetailStoreRequest  $request
     */
    public function __construct(
        private ContactDetailStoreRequest $request,
    ) {
    }

    /**
     * @return ContactUs
     */
    public function execute(): ContactUs
    {
        /*
        |--------------------------------------------------------------------------
        | Add contact details into database
        |--------------------------------------------------------------------------
        */

        $user = new ContactUs();
        $user->firstname = $this->request->firstname;
        $user->lastname = $this->request->lastname;
        $user->email = $this->request->email;
        $user->phone = $this->request->phone;
        $user->message = $this->request->message;
        $user->status = $this->request->status ?? ContactUsStatus::UNREAD();
        $user->save();

        /*
         |--------------------------------------------------------------------------
         | Send Notification to user and admin
         |--------------------------------------------------------------------------
         */
        $admin = User::where('role', 1)->first();
        $admin->notify(
            new ContactDetailsToAdminNotification($user, $admin)
        );
        $user->notify(
            new ContactDetailsToUserNotification($user, $admin)
        );


        /*
         |--------------------------------------------------------------------------
         | Response
         |--------------------------------------------------------------------------
         */

        return $user;
    }
}
