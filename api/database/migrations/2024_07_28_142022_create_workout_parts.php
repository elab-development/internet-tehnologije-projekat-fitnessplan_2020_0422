<?php

use App\Models\Exercise;
use App\Models\WorkoutPart;
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
        Schema::create(WorkoutPart::TABLE, function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('workout_id');
            $table->unsignedBigInteger('exercise_id');
            $table->unsignedInteger('sets');
            $table->unsignedInteger('reps');
            $table->unsignedInteger('rest');
            $table->text('info')->nullable();

            $table->foreign('workout_id')
                ->references('id')
                ->on('workouts')
                ->onDelete('cascade');

            $table->foreign('exercise_id')
                ->references('id')
                ->on(Exercise::TABLE)
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(WorkoutPart::TABLE);
    }
};
