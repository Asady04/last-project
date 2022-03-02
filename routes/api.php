<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    BabController,
    AuthController,
    MateriController,
    KursusController,
    JawabanController,
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Register
Route::post('/register', [AuthController::class, 'register']);
Route::post('/admindattebayobikinregisterpokoknya', [AuthController::class, 'registerAdmin']);

// Login
Route::post('/login',[AuthController::class, 'login']);

// Kursus
Route::get('/kursus',[KursusController::class, 'showKursus']);
Route::post('/updateKursus', [KursusController::class, 'updateKursus']);
Route::post('/saveKursus', [KursusController::class, 'saveKursus']);
Route::get('/deleteKursus/{id}',[KursusController::class, 'deleteKursus']);

// Bab
Route::get('/bab/{idKursus}',[BabController::class, 'showBab']);
Route::post('/updateBab', [BabController::class, 'updateBab']);
Route::post('/saveBab', [BabController::class, 'saveBab']);
Route::get('/deleteBab/{id}',[BabController::class, 'deleteBab']);

// Materi
Route::get('/Materi/{idKursus}/{idBab}',[MateriController::class, 'showMateri']);
Route::post('/updateMateri', [MateriController::class, 'updateMateri']);
Route::post('/saveMateri', [MateriController::class, 'saveMateri']);
Route::get('/deleteMateri/{id}',[MateriController::class, 'deleteMateri']);

// Jawaban
Route::get('/Jawaban/{idKursus}/{idBab}/{idMateri}',[JawabanController::class, 'showJawaban']);
Route::post('/updateJawaban', [JawabanController::class, 'updateJawaban']);
Route::post('/saveJawaban', [JawabanController::class, 'saveJawaban']);
Route::get('/deleteJawaban/{id}',[JawabanController::class, 'deleteJawaban']);