<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ExerciseController extends ResponseController
{
    public function index(Request $request)
    {
        $exercises = Exercise::all();
        return $this->successResponse(ExerciseResource::collection($exercises), 'Exercises retrieved successfully.');
    }

    public function show(Request $request, $id)
    {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return $this->errorResponse('Exercise not found.', [], 404);
        }

        return $this->successResponse(new ExerciseResource($exercise), 'Exercise retrieved successfully.');
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'description' => 'required|string',
            ]
        );
        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors());
        }

        $exercise = Exercise::create($request->all());

        return $this->successResponse(new ExerciseResource($exercise), 'Exercise created successfully.', 201);
    }

    public function groupedData(Request $request)
    {
        $data = DB::table('exercises')
            ->select( 'name', DB::raw('count(*) as total'))
            ->join('workout_parts', 'exercises.id', '=', 'workout_parts.exercise_id')
            ->groupBy('name')
            ->get();

        return $this->successResponse($data, 'Exercises grouped by name retrieved successfully.');
    }
}
