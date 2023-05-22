<?php

use Illuminate\Support\Facades\Route;

/*
 |--------------------------------------------------------------------------
 | User
 |--------------------------------------------------------------------------
 */

Route::post('/login', [
    'uses' => Api\v1\UserLoginController::class,
]);
Route::post('/logout', [
    'uses' => Api\v1\UserLogoutController::class,
]);
Route::group(['middleware' => ['auth:api']], function () {

    /*
    |--------------------------------------------------------------------------
    | Team
    |--------------------------------------------------------------------------
    */
    Route::post('/create/team', [
        'uses' => Api\v1\Team\TeamCreateController::class,
    ]);

    Route::get('/get/team/{team}', [
        'uses' => Api\v1\Team\TeamViewController::class,
    ]);

    Route::post('/edit/team/{team}', [
        'uses' => Api\v1\Team\TeamUpdateController::class,
    ]);

    Route::post('/delete/team/{team}', [
        'uses' => Api\v1\Team\TeamDeleteController::class,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Portfolio
    |--------------------------------------------------------------------------
    */
    Route::post('/create/portfolio', [
        'uses' => Api\v1\Portfolio\PortfolioCreateController::class,
    ]);

    Route::post('/edit/portfolio/{portfolio}', [
        'uses' => Api\v1\Portfolio\PortfolioUpdateController::class,
    ]);

    Route::post('/delete/portfolio/{portfolio}', [
        'uses' => Api\v1\Portfolio\PortfolioDeleteController::class,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Career
    |--------------------------------------------------------------------------
    */
    Route::post('/create/career', [
        'uses' => Api\v1\Career\CareerCreateController::class,
    ]);



    Route::post('/edit/career/{career}', [
        'uses' => Api\v1\Career\CareerUpdateController::class,
    ]);

    Route::post('/delete/career/{career}', [
        'uses' => Api\v1\Career\CareerDeleteController::class,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Applicant data
    |--------------------------------------------------------------------------
    */
    Route::post('/add/candidate/{job_id}', [
        'uses' => Api\v1\Candidate\CandidateCreateController::class,
    ]);

    Route::get('/view/candidates', [
        'uses' => Api\v1\Candidate\CandidateViewController::class,
    ]);

    Route::get('/get/candidate/{applicant_id}', [
        'uses' => Api\v1\Candidate\CandidateViewController::class,
    ]);

    Route::post('/update/candidate/status/{applicant_id}', [
        'uses' => Api\v1\Candidate\CandidateUpdateController::class,
    ]);

    /*
    |--------------------------------------------------------------------------
    | ContactUs
    |--------------------------------------------------------------------------
    */

    Route::get('/view/contact_details', [
        'uses' => Api\v1\ContactUs\ContactUsViewController::class,
    ]);

    Route::get('/get/contact_details/{contact_id}', [
        'uses' => Api\v1\ContactUs\ContactUsViewController::class,
    ]);

    Route::post('/update/contact_detail/status/{contact_id}', [
        'uses' => Api\v1\ContactUs\ContactUsUpdateController::class,
    ]);
});

Route::get('/view/team', [
    'uses' => Api\v1\Team\TeamViewController::class,
]);

Route::get('/view/portfolio', [
    'uses' => Api\v1\Portfolio\PortfolioViewController::class,
]);

Route::get('/view/career', [
    'uses' => Api\v1\Career\CareerViewController::class,
]);

Route::get('/get/career/{career}', [
    'uses' => Api\v1\Career\CareerViewController::class,
]);

Route::get('/get/portfolio/{portfolio}', [
    'uses' => Api\v1\Portfolio\PortfolioViewController::class,
]);

Route::post('/add/contact_details', [
    'uses' => Api\v1\ContactUs\ContactUsCreateController::class,
]);

Route::get('/portfolio/iamge/soratble/{portfolio}', [
    'uses' => Api\v1\Portfolio\PortfolioImageSoratbleController::class,
]);
