<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLogoutRequest;
use App\Models\UserDeviceToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserLogoutController extends Controller
{
    /**
     * Logout User
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    final public function __invoke(Request $request)
    {
        Auth::logout();

        // $request->session()->invalidate();
        //         $user = Auth::user()->token();
        // $user->revoke();


        // $request->session()->regenerateToken();

        /*
         |--------------------------------------------------------------------------
         | Respond with JSON
         |--------------------------------------------------------------------------
         */

        return response()->json([
            'meta' => [
                'status' => 200,
                'message' => 'Logout successfully'
            ],
        ]);
    }
}
