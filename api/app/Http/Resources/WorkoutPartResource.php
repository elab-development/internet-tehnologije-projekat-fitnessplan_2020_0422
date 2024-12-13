<?php

namespace App\Http\Resources;

use App\Models\Exercise;
use App\Models\Workout;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutPartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'workout' => new WorkoutResource(Workout::find($this->workout_id)),
            'exercise' => new ExerciseResource(Exercise::find($this->exercise_id)),
            'sets' => $this->sets,
            'reps' => $this->reps,
            'rest' => $this->rest,
            'info' => $this->info,
        ];
    }
}
