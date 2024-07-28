<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $workoutsNames = [
            'Booty from hell',
            'Abs of steel',
            'Biceps like Arnold',
            'Legs like a horse',
            'Chest like a bull',
            'Back like a gorilla',
            'Shoulders like a mountain',
            'Full body workout'
        ];

        $faker = \Faker\Factory::create();

        for ($i = 1; $i <= 6; $i++) {
            foreach ($workoutsNames as $workoutName) {
                \App\Models\Workout::create([
                    'name' => $workoutName,
                    'workout_date' => $faker->dateTimeBetween('-1 month', '+1 month'),
                    'intensity_id' => $i,
                ]);
            }
        }




    }
}
