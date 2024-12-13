<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkoutPartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        for ($i = 1; $i <= 300; $i++) {
            \App\Models\WorkoutPart::create([
                'workout_id' => rand(1, 48),
                'exercise_id' => rand(1, 16),
                'sets' => rand(3, 5),
                'reps' => rand(6, 12),
                'rest' => $faker->randomElement([30, 60, 90, 120]),
            ]);
        }
    }
}
