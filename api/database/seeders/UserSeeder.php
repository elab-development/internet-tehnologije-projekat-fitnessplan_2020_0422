<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            'role' => User::ADMIN
        ]);

        User::create([
            'name' => 'Trener',
            'email' => 'trener@gmail.com',
            'password' => bcrypt('trener123'),
            'role' => User::TRAINER
        ]);

        User::factory(10)->create();
    }
}
