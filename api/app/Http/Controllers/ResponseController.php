<?php

namespace App\Http\Controllers;

class ResponseController extends Controller
{
    public function successResponse($data, string $message = ''): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], 200);
    }

    public function errorResponse(string $message = '',$errors = []): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ]);
    }
}
