<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserLoginController extends Controller
{
    /**
     * Login user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(UserLoginRequest $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Authenticate request
        |--------------------------------------------------------------------------
        */
        $user = [
            'email' => $request->email,
            'password' => $request->password,
            'email_verified_at' => 1,

        ];
        $user_pre = [
            'email' => $request->email,
            'password' => $request->password,
            'email_verified_at' => 0,
        ];
        $remember_me = false;
        if ($request->remember_me == 1) {
            $remember_me = true;
        }
        if (Auth::attempt($user_pre, $remember_me)) {
            Auth::logout();
            return response()->json(
                [
                    'data' => $user_pre,
                    'meta' => [
                        'status' => 200,
                        'message' => 'Please verify your email',
                    ],
                ],
            );
        } else {
            if (Auth::attempt($user, $remember_me)) {
                $data = User::where('email', $user['email'])->first();
                $token = explode('|', $data->createToken('Mobile app', ['client:access'])->plainTextToken)[1];
                $user['token'] = $token;
                return response()->json(
                    [
                        'data' => $user,
                        'meta' => [
                            'status' => 200,
                        ],
                    ],
                );
            } else {
                return response()->json(
                    [
                        'data' => $user,
                        'meta' => [
                            'status' => 400,
                            'message' => "Email or Password didn't match"
                        ],
                    ],
                );
            }
        }
    }
}
