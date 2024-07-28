<?php

use App\Models\Workout;
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
        Schema::create(Workout::TABLE, function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('workout_date');
            $table->unsignedBigInteger('intensity_id');
            $table->text('description')->nullable();
            $table->foreign('intensity_id')
                ->references('id')
                ->on('intensities')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(Workout::TABLE);
    }
};
