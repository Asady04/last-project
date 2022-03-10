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

Route::middleware(['auth:sanctum'])->group(function(){
    Route::middleware(['role:admin'])->group(function(){
        
    });
});
// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/admindattebayobikinregisterpokoknya', [AuthController::class, 'registerAdmin']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/changePassword',[AuthController::class, 'editPassword']);
Route::post('/deleteUser/{id}',[AuthController::class, 'deleteUser']);

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
Route::get('/materi/{idKursus}/{idBab}',[MateriController::class, 'showMateri']);
Route::post('/updateMateri', [MateriController::class, 'updateMateri']);
Route::post('/saveMateri', [MateriController::class, 'saveMateri']);
Route::get('/deleteMateri/{id}',[MateriController::class, 'deleteMateri']);

// Jawaban
Route::get('/jawaban/{idKursus}/{idBab}/{idMateri}',[JawabanController::class, 'showJawaban']);
Route::get('/jawaban//{idMateri}/{email}',[JawabanController::class, 'khususJawaban']);
Route::post('/updateJawaban', [JawabanController::class, 'updateJawaban']);
Route::post('/saveJawaban', [JawabanController::class, 'saveJawaban']);
Route::get('/deleteJawaban/{id}',[JawabanController::class, 'deleteJawaban']);