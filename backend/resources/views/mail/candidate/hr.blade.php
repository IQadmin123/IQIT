@extends('layouts.email')

@section('content')
    <table width="100%" class="content">
        <tbody>
            <tr>
                <td class="content-td">
                    <p>Dear Sir/Ma'am</p>
                    <p> I am applying for the position of {{ $candidate->job->role }} at IQIT SERVICES PRIVATE LIMITED.</p>
                    <p>
                        As requested in the job description,
                        please find my resume attached alongside a cover letter.
                        In my cover letter, I explain why I am applying for the position,
                        my previous experience and salary expectations.
                    </p>
                    <p>
                        If you have any questions,
                        you can email {{ $candidate->email }} or call {{ $candidate->phone }} me.
                    </p>
                    <p>Kindest regards,</p>
                    <p>{{ $candidate->fullname }}</p>
                </td>
            </tr>
        </tbody>
    </table>
@endsection
