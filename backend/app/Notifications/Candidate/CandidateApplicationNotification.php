<?php

namespace App\Notifications\Candidate;

use App\Mail\Candidate\CandidateApplicantion;
use App\Models\ApplicantDetail;
use App\Models\User;
use App\Traits\NotificationTrait;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class CandidateApplicationNotification extends Notification implements ShouldQueue
{
    use NotificationTrait;
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @param  private ApplicantDetail  $candidate
     * @param private User $user
     * @return void
     */
    public function __construct(
        private ApplicantDetail $candidate,
        private User $user
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
        return (new CandidateApplicantion($this->candidate, $this->user))
            ->to($notifiable->email);
    }
}
