<?php

use App\Http\Controllers\BottleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/bottles', [BottleController::class, 'store']);
Route::put('/bottles/{id}', [BottleController::class, 'update']);
Route::delete('/bottles/{id}', [BottleController::class, 'destroy']);
Route::get('/bottles', [BottleController::class, 'index']);
Route::get('/bottles/{id}', [BottleController::class, 'show']);
Route::get('/ingredients', [BottleController::class, 'getAllIngredients']);
