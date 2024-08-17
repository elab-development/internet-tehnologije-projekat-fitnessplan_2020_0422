<?php

use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\IntensityController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);

Route::post('logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::get('intensities', [IntensityController::class, 'index']);
Route::get('intensities/{id}', [IntensityController::class, 'show']);

Route::post('intensities', [IntensityController::class, 'store'])->middleware('auth:sanctum');
Route::delete('intensities/{id}', [IntensityController::class, 'destroy'])->middleware('auth:sanctum');
Route::put('intensities/{id}', [IntensityController::class, 'update'])->middleware('auth:sanctum');

Route::apiResource('exercises', ExerciseController::class)->only('index', 'show');
Route::post('exercises', [ExerciseController::class, 'store'])->middleware('auth:sanctum');

Route::get('workouts', [\App\Http\Controllers\WorkoutController::class, 'index']);
Route::get('workouts/{id}', [\App\Http\Controllers\WorkoutController::class, 'show']);
Route::get('workouts-by-intensity/{intensityId}', [\App\Http\Controllers\WorkoutController::class, 'findByIntensity']);

Route::post('workouts', [\App\Http\Controllers\WorkoutController::class, 'store'])->middleware('auth:sanctum');
Route::delete('workouts/{id}', [\App\Http\Controllers\WorkoutController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('workout-parts', [\App\Http\Controllers\WorkoutPartsController::class, 'index']);
Route::get('workout-parts/{id}', [\App\Http\Controllers\WorkoutPartsController::class, 'show']);
Route::post('workout-parts', [\App\Http\Controllers\WorkoutPartsController::class, 'store'])->middleware('auth:sanctum');
Route::delete('workout-parts/{id}', [\App\Http\Controllers\WorkoutPartsController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('parts-paginate', [\App\Http\Controllers\WorkoutPartsController::class, 'paginateParts']);
Route::get('random', [\App\Http\Controllers\UserController::class, 'randomUserFromAPI']);
Route::get('graph', [ExerciseController::class, 'groupedData']);
