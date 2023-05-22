<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'id' => 1,
            'firstname' => 'Sagar',
            'lastname' => 'Jagodara',
            'username'=>'admin',
            'password' => '$2y$10$R9b.zpVTHp3E/xeNq2zpV.eAMWuW7RTR7N9/QMDdjRNa8MzwG8kqG',
            'email' => 'admin@iqinfinite.com',
            'email_verified_at' => 1,
            'role' => 1,
            'phone'=>8460230445,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('users')->insert([
            'id' => 2,
            'firstname' => 'Jalpa',
            'lastname' => 'Madhvani',
            'username'=>'hr',
            'password' => '$2y$10$R9b.zpVTHp3E/xeNq2zpV.eAMWuW7RTR7N9/QMDdjRNa8MzwG8kqG',
            'email' => 'jalpa.madhvani@iqinfinite.com',
            'email_verified_at' => 1,
            'role' => 2,
            'phone'=>9870022375,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
