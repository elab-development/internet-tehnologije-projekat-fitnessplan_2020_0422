<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IntensitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $intensities = [
            'low',
            'medium',
            'high',
            'very high',
            'extreme',
            'Goku'
        ];

        foreach ($intensities as $intensity) {
            \App\Models\Intensity::create([
                'level' => $intensity
            ]);
        }
    }
}
