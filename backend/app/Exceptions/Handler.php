<?php

namespace App\Exceptions;

use Bugsnag\BugsnagLaravel\Facades\Bugsnag;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        BusinessLogicException::class,
        NoSubscriptionMatchException::class,
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Throwable $exception)
    {
        if ($request->is('api/*')) {
            return $this->renderJson($request, $exception);
        }

        return parent::render($request, $exception);
    }

    /**
     * Render an exception into an JSON HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response
     */
    public function renderJson($request, Throwable $exception)
    {
        dd($exception);
        switch ($exception) {
            case $exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException:
                return response()->json([
                    'meta' => [
                        'status' => 404,
                        'error' => 'Resource not found',
                        'message' => 'Requested resource does not exist.',
                    ],
                ], 404);
                break;

            case $exception instanceof \Illuminate\Auth\AuthenticationException:
                return response()->json([
                    'meta' => [
                        'status' => 401,
                        'error' => 'Unauthenticated',
                        'message' => 'Invalid authentication credentials.',
                    ],
                ], 401);
                break;

            case $exception instanceof \Illuminate\Validation\ValidationException:
                return response()->json([
                    'meta' => [
                        'status' => 400,
                        'error' => 'Bad request',
                        'message' => 'Invalid request message.',
                    ],
                ], 401);
                break;

            default:
                return response()->json([
                    'meta' => [
                        'status' => 500,
                        'error' => 'An error has occured',
                        'message' => 'An error has occurred. Please try again later.',
                    ],
                ], 500);
                break;
        }
    }
}
