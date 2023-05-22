<?php

namespace App\Mail\ContactUs;

use App\Models\ContactUs;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserNotification extends Mailable
{
    use Queueable;
    use SerializesModels;


    /**
     * Create a new message instance.
     *
     * @param public ContactUs $user
     * @param public User $admin
     * @return void
     */
    public function __construct(
        public ContactUs $user,
        public User $admin
    ) {
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.contactus.user')
            ->subject("Thanks for contacting,".$this->user->firstname ." ".$this->user->lastname."  - Any feeback ?");
    }
}