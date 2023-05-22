<?php

namespace App\Notifications\ContactUs;

use App\Mail\ContactUs\UserNotification;
use App\Models\ContactUs;
use App\Models\User;
use App\Traits\NotificationTrait;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class ContactDetailsToUserNotification extends Notification implements ShouldQueue
{
    use NotificationTrait;
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @param  private ContactUs $user
     * @param private User $admin
     * @return void
     */
    public function __construct(
        private ContactUs $user,
        private User $admin
    ) {
    }

    /**
     * Send notification by email.
     *
     * @param  mixed  $notifiable
     * @return mixed
     */
    public function toMail($notifiable)
    {
        return (new UserNotification($this->user, $this->admin))
            ->to($notifiable->email);
    }
}
