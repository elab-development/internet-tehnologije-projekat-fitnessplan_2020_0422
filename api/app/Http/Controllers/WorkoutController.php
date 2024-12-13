<?php

namespace App\Http\Controllers;

use App\Http\Resources\WorkoutResource;
use App\Models\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkoutController extends ResponseController
{
    public function index()
    {
        $workouts = Workout::all();
        return $this->successResponse(WorkoutResource::collection($workouts), 'Workouts retrieved successfully');
    }

    public function show($id)
    {
        $workout = Workout::find($id);

        if (!$workout) {
            return $this->errorResponse('Workout not found', [], 404);
        }

        return $this->successResponse(new WorkoutResource($workout), 'Workout retrieved successfully');
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'workout_date' => 'required',
                'intensity_id' => 'required|integer',
            ]
        );

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors());
        }

        $workout = Workout::create($request->all());

        return $this->successResponse(new WorkoutResource($workout), 'Workout created successfully', 201);
    }

    public function destroy(Request $request, $id)
    {
        $workout = Workout::find($id);

        if (!$workout) {
            return $this->errorResponse('Workout not found', [], 404);
        }

        $workout->delete();

        return $this->successResponse([], 'Workout deleted successfully');
    }

    public function findByIntensity(Request $request, $intensityId)
    {
        $workouts = Workout::where('intensity_id', $intensityId)->orderBy('workout_date', 'desc')->get();

        return $this->successResponse(WorkoutResource::collection($workouts), 'Workouts retrieved successfully');
    }

    public function getTemperature(Request $request)
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=44.8125&lon=20.4612&appid=6c7c340fbae803841b1402988af53dc8');

        $data = json_decode($response->getBody()->getContents());

        return $this->successResponse($data, 'Temperature retrieved successfully');
    }
}
