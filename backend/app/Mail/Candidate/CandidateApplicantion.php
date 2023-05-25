<?php

namespace App\Mail\Candidate;

use App\Models\ApplicantDetail;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CandidateApplicantion extends Mailable
{
    use Queueable;
    use SerializesModels;

    /**
     * Create a new message instance.
     *
     * @param public ApplicationDetail $candidate
     * @param public User $user
     * @return void
     */
    public function __construct(
        public ApplicantDetail $candidate,
        public User $user
    ) {
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.candidate.candidate')
            ->subject(__('Thank you for your application')
        );
    }
}
