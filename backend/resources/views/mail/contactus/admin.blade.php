@extends('layouts.email')
@section('content')
    <table width="100%" class="content">
        <tbody>
            <tr>
                <td class="content-td">
                    <p>Dear Admin</p>
                    <p>You have received a new contact from {{ $user->firstname }} {{ $user->lastname }} .</p>
                    <p>
                        <b>Phone</b> : {{ $user->phone }}
                    </p>
                    <p>
                        <b>Email</b> : {{ $user->email }}
                    </p>
                    <p>
                        <b>Message</b> : {{ $user->message }}
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
@endsection
