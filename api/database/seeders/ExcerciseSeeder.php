<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExcerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exercises = [
            [
                'name' => 'Squats',
                'description' => 'Stand with your feet shoulder-width apart. Start the movement by bending your knees and sitting back with your hips. Go down as far as you can and quickly reverse the motion back to the starting position. Keep your head up and back straight throughout the move.'
            ],
            [
                'name' => 'Lunges',
                'description' => 'Stand with your feet together and your hands on your hips. Take a large step forward with your right leg. Lower your body until your right thigh is parallel to the ground and your left knee is bent 90 degrees. Push yourself back to the starting position.'
            ],
            [
                'name' => 'Deadlifts',
                'description' => 'Stand with your feet hip-width apart. Hold a barbell in front of your thighs. Push your hips back and bend your knees. Lower the bar until it reaches your mid-shins. Push your hips forward to return to the starting position.'
            ],
            [
                'name' => 'Pull-ups',
                'description' => 'Hang from a pull-up bar with your hands shoulder-width apart. Pull your chest up to the bar. Lower yourself back to the starting position.'
            ],
            [
                'name' => 'Push-ups',
                'description' => 'Get down on all fours and place your hands on the floor so that they’re slightly wider than and in line with your shoulders. Lower your body until your chest nearly touches the floor. Pause at the bottom, and then push yourself back to the starting position.'
            ],
            [
                'name' => 'Planks',
                'description' => 'Get into pushup position on the floor. Bend your elbows 90 degrees and rest your weight on your forearms. Your elbows should be directly beneath your shoulders, and your body should form a straight line from head to feet. Hold the position for as long as you can.'
            ],
            [
                'name' => 'Russian twists',
                'description' => 'Sit on the floor with your knees bent and your heels about a foot from your butt. Lean slightly back without rounding your spine at all. It is really important, and your abs do this. Hold your hands out in front of you with your hands clasped. Twist to the right, and then to the left, and repeat.'
            ],
            [
                'name' => 'Leg raises',
                'description' => 'Lie on your back with your legs straight and together. Keeping your legs straight, lift them all the way up to the ceiling until your butt comes off the floor. Slowly lower your legs back down till they’re just above the floor. Hold for a moment. Raise your legs back up. Repeat.'
            ],
            [
                'name' => 'Bicycle crunches',
                'description' => 'Lie flat on the floor with your lower back pressed to the ground. Put your hands beside your head. Bring your knees up to about a 45-degree angle and slowly go through a bicycle pedal motion. Touch your left elbow to your right knee, then your right elbow to your left knee. Keep even, relaxed breathing throughout.'
            ],
            [
                'name' => 'Mountain climbers',
                'description' => 'Start in a traditional plank — shoulders over hands and weight on just your toes. With your core engaged, bring your right knee forward under your chest, with the toes just off the ground. Return to your basic plank. Switch legs, bringing the left knee forward.'
            ],
            [
                'name' => 'Burpees',
                'description' => 'Stand with your feet shoulder-width apart and your arms at your sides. Push your hips back, bend your knees, and lower your body into a squat. Place your hands on the floor in front of you. Kick your legs backward to a pushup position. Immediately reverse the move and quickly stand up from the squat. Jump up as high as you can.'
            ],
            [
                'name' => 'Jumping jacks',
                'description' => 'Stand with your feet together and your hands at your sides. Simultaneously raise your arms above your head and jump up just enough to spread your feet out wide. Without pausing, quickly reverse the movement and repeat.'
            ],
            [
                'name' => 'High knees',
                'description' => 'Run in place, bringing your knees up toward your chest as high as possible. Swing your arms to assist.'
            ],
            [
                'name' => 'Butt kicks',
                'description' => 'Run in place, kicking your butt with each leg as you bring your heel up towards your glutes. Swing your arms to assist.'
            ],
            [
                'name' => 'Jump squats',
                'description' => 'Stand with your feet shoulder-width apart. Start by doing a regular squat, then engage your core and jump up explosively. When you land, lower your body back into the squat position to complete one rep. Land as quietly as possible, which requires control.'
            ],
            [
                'name' => 'Side planks',
                'description' => 'Lie on your right side with your legs straight. Prop yourself up with your right forearm so your body forms a diagonal line. Rest your left hand on your hip. Brace your core and hold for 30 seconds. If you can’t hold that long, stay up as long as you can and then repeat until you’ve held for 30 seconds total. Switch sides.'
            ],
        ];

        foreach ($exercises as $exercise) {
            \App\Models\Exercise::create($exercise);
        }
    }
}
