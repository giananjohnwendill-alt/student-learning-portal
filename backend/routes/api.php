
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\ChatbotController;
use App\Http\Controllers\Api\AuthController;

Route::apiResource('courses', CourseController::class);

Route::post('/chatbot', [ChatbotController::class, 'chat']);

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
