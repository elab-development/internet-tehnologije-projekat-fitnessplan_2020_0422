<?php

namespace App\Http\Controllers;

use App\Http\Resources\IntensityResource;
use App\Models\Intensity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IntensityController extends ResponseController
{
    public function index(Request $request)
    {
        $intensities = Intensity::all();
        return $this->successResponse(
            IntensityResource::collection($intensities),
            'Intensities retrieved successfully.'
        );
    }

    public function show(Request $request, $id)
    {
        $intensity = Intensity::find($id);

        if (!$intensity) {
            return $this->errorResponse('Intensity not found.', [], 404);
        }

        return $this->successResponse(
            new IntensityResource($intensity),
            'Intensity retrieved successfully.'
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'level' => 'required|string',
            ]
        );
        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors());
        }

        $intensity = Intensity::create($request->all());
        return $this->successResponse(
            new IntensityResource($intensity),
            'Intensity created successfully.',
            201
        );
    }

    public function update(Request $request, $id)
    {
        $intensity = Intensity::find($id);

        if (!$intensity) {
            return $this->errorResponse('Intensity not found.', [], 404);
        }

        $validator = Validator::make(
            $request->all(),
            [
                'level' => 'required|string',
            ]
        );
        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors());
        }

        $intensity->update($request->all());
        return $this->successResponse(
            new IntensityResource($intensity),
            'Intensity updated successfully.'
        );
    }

    public function destroy(Request $request, $id)
    {
        $intensity = Intensity::find($id);

        if (!$intensity) {
            return $this->errorResponse('Intensity not found.', [], 404);
        }

        $intensity->delete();
        return $this->successResponse([], 'Intensity deleted successfully.');
    }
}
