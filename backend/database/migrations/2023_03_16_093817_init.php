<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('username');
            $table->string('password');
            $table->string('email')->unique();
            $table->tinyInteger('email_verified_at')->default(0);
            $table->integer('role');
            $table->string('phone');
            $table->string('remember_token', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('team', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('designation');
            $table->string('phone')->nullable();
            $table->string('image');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('portfolio', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->string('project_name');
            $table->tinyInteger('category_type');
            $table->string('image');
            $table->longText('description');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('jobs', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->tinyInteger('job_category_type');
            $table->string('role');
            $table->string('location');
            $table->longText('description');
            $table->longText('responsibility');
            $table->longText('requirement');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('applicant_details', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->unsignedBigInteger('job_id');
            $table->string('fullname');
            $table->string('email');
            $table->text('file_url');
            $table->string('phone');
            $table->enum('status', [
                'new',
                'telephonic',
                'hr_round',
                'technical_round',
                'final_round',
                'accepted',
                'rejected'
            ])->default('new');
            $table->timestamps();
            $table->softDeletes();
            $table
                ->foreign('job_id')
                ->references('id')
                ->on('jobs');
        });

        Schema::create('contact_us', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email');
            $table->string('phone');
            $table->text('message');
            $table->enum('status', ['read', 'unread'])->default('unread');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::dropIfExists('users');
        Schema::dropIfExists('team');
        Schema::dropIfExists('portfolio');
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('applicant_details');
        Schema::dropIfExists('contact_us');
    }
};
