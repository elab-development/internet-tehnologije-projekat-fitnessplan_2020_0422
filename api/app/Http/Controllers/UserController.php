<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends ResponseController
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed.', $validator->errors(), 400);
        }

        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)) {
            return $this->errorResponse('Wrong email or password.', [], 401);
        }

        $user = auth()->user();

        $token = $user->createToken('authToken')->plainTextToken;

        return $this->successResponse([
            'token' => $token,
            'user' => new UserResource($user)
        ], 'User logged in successfully.');

    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->successResponse([], 'User logged out successfully.');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'name' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->errorResponse('Validation failed.', $validator->errors(), 400);
        }

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'name' => $request->name,
            'role' => User::USER
        ]);

        return $this->successResponse(new UserResource($user), 'User registered successfully.', 201);
    }
}
