@extends('layouts.email')

@section('content')
    <div class="iq-watermark">
    </div>
    <table width="100%" class="content">
        <tbody>
            <tr>
                <td class="content-td">
                    <p>Hello {{ $candidate->fullname }}</p>
                    <p>
                        Thank you for applying to the {{ $candidate->job->role }} position at
                        <b>
                            IQIT SERVICES PRIVATE LIMITED
                        </b>
                        .
                    </p>
                    <p>
                        I would like to inform you that we received your resume.
                        Our hiring team is currently reviewing all applications and we are planning to schedule
                        interviews
                        as soon as possible.
                        If you are among qualified candidates, you will receive call or email from our one of our
                        recruiters
                        to schedule a telephonic interview.
                        In any case, we will keep you posted on the status of your application.
                    </p>
                    <p>
                        Thank you, again, for taking the time to apply to this role at
                        <b>
                            IQIT SERVICES PRIVATE LIMITED
                        </b>
                    </p>
                    <p>Best regards,</p>
                    <p>
                        {{ $user->firstname }}
                    </p>
                    <p><a href="https://www.iqinfinite.in/">IQ Infinite Technologies</a></p>
                </td>
            </tr>
        </tbody>
    </table>
@endsection
