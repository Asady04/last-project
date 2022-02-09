<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    UserController,
    BabController,
    KelasController,
    MapelController,
    TugasController,
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

Route::post('/login',  [UserController::class, 'login'])->name('login');
Route::post('/register/user',[UserController::class, 'register']);

Route::get('murid/{kelas}',[MapelController::class, 'showMapel']);
Route::get('bab/{kelas}/{mapel}',[BabController::class, 'showBab']);
Route::get('tugas/{kelas}/{mapel}/{bab}',[TugasController::class, 'showTugas']);
Route::get('/kelas',[KelasController::class, 'showKelas']);
Route::get('/userProgress',[KelasController::class, 'userProgress']);

Route::get('/admin', "App\Http\Controllers\KelasController@showAdmin");
Route::get('/admin/{kelas}', "App\Http\Controllers\KelasController@adminMapel");

    // Mapel
// Route::get('/addMapel/{kelas}', "App\Http\Controllers\MapelController@addMapel");
// Route::get('/editMapel/{kelas}/{mapel}', "App\Http\Controllers\MapelController@editMapel");
Route::post('/updateMapel/{kelas}/{mapel}', [MapelController::class, 'updateMapel']);
Route::post('/saveMapel', [MapelController::class, 'saveMapel']);
Route::get('/deleteMapel/{id}',[MapelController::class, 'deleteMapel']);

    // Bab
Route::post('/saveBab/{kelas}/{mapel}', [BabController::class, 'saveBab']);
Route::get('/deleteBab/{id}',[BabController::class, 'deleteBab']);
// Route::get('/editBab/{kelas}/{mapel}/{bab}',"App\Http\Controllers\BabController@editBab");
Route::post('/updateBab/{kelas}/{mapel}/{bab}',[BabController::class, 'updateBab']);

    // Tugas
Route::post('/saveTugas/{kelas}/{mapel}/{bab}', [TugasController::class, 'saveTugas']);
Route::get('/deleteTugas/{id}',[TugasController::class, 'deleteTugas']);
// Route::get('/editTugas/{kelas}/{mapel}/{bab}/{slug}',"App\Http\Controllers\TugasController@editTugas");
Route::post('/updateTugas/{kelas}/{mapel}/{bab}/{slug}',[TugasController::class, 'updateTugas']);
// Route::get('/showTugas/{kelas}/{mapel}/{bab}/{slug}',"App\Http\Controllers\TugasController@showKumpul");

    // Guru
Route::get('/guru/{guru}',[KelasController::class, 'showKelas']);
Route::get('/guru/{guru}/{kelas}',[MapelController::class, 'showMapel']);
