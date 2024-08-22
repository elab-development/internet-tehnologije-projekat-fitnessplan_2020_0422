<?php

namespace App\Http\Controllers;

use App\Http\Resources\WorkoutPartResource;
use App\Models\WorkoutPart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class WorkoutPartsController extends ResponseController
{
    public function index(Request $request)
    {
        $workoutParts = WorkoutPart::all();
        return $this->successResponse(WorkoutPartResource::collection($workoutParts), 'Workout parts retrieved successfully.');
    }

    public function show(Request $request, $id)
    {
        $workoutPart = WorkoutPart::find($id);

        if (!$workoutPart) {
            return $this->errorResponse('Workout part not found.', [], 404);
        }

        return $this->successResponse(new WorkoutPartResource($workoutPart), 'Workout part retrieved successfully.');
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'workout_id' => 'required|integer',
                'exercise_id' => 'required|integer',
                'sets' => 'required|integer',
                'reps' => 'required|integer',
                'rest' => 'required|integer',
                'info' => 'string',
            ]
        );
        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors());
        }

        $workoutPart = WorkoutPart::create($request->all());

        return $this->successResponse(new WorkoutPartResource($workoutPart), 'Workout part created successfully.', 201);
    }

    public function destroy(Request $request, $id)
    {
        $workoutPart = WorkoutPart::find($id);

        if (!$workoutPart) {
            return $this->errorResponse('Workout part not found.', [], 404);
        }

        $workoutPart->delete();

        return $this->successResponse([], 'Workout part deleted successfully.');
    }

    public function paginateParts(Request $request)
    {
        $perPage = $request->get('per_page', 30);

        $parts = DB::table('workout_parts')
            ->select('workout_parts.id', 'workout_parts.sets', 'workout_parts.reps', 'workout_parts.rest', 'workout_parts.info', 'exercises.name as exercise_name', 'workouts.name as workout_name')
            ->join('exercises', 'workout_parts.exercise_id', '=', 'exercises.id')
            ->join('workouts', 'workout_parts.workout_id', '=', 'workouts.id')
            ->orderBy('workout_parts.id', 'asc')
            ->paginate($perPage);

        return $this->successResponse($parts, 'Workout parts retrieved successfully.');
    }

    public function findByWorkout($workoutId)
    {
        $workoutParts = WorkoutPart::where('workout_id', $workoutId)->get();

        return $this->successResponse(WorkoutPartResource::collection($workoutParts), 'Workout parts retrieved successfully.');
    }
}
