<?php

use Illuminate\Support\Facades\Route;
$url = "App\http\Controllers";

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();
Route::get('/logout',"App\Http\Controllers\KelasController@logout");

Route::get('/',$url. "\KelasController@userProgress");
// Route::get('/',$url. "\MapelController@showMapel");


// Mapel
Route::get('murid/{kelas}',$url. "\MapelController@showMapel");

// Bab
Route::get('bab/{kelas}/{mapel}',$url. "\BabController@showBab");

// Tugas
Route::get('tugas/{kelas}/{mapel}/{bab}',$url. "\TugasController@showTugas");

Route::group(['middleware' => ['ceklevel:3']],function(){
    // Admin
Route::get('/admin', "App\Http\Controllers\KelasController@showAdmin");
Route::get('/admin/{kelas}', "App\Http\Controllers\KelasController@adminMapel");

    // Mapel
Route::get('/addMapel/{kelas}', "App\Http\Controllers\MapelController@addMapel");
Route::get('/editMapel/{kelas}/{mapel}', "App\Http\Controllers\MapelController@editMapel");
Route::post('/updateMapel/{kelas}/{mapel}', "App\Http\Controllers\MapelController@updateMapel");
Route::post('/saveMapel', "App\Http\Controllers\MapelController@saveMapel");
Route::get('/deleteMapel/{id}',"App\Http\Controllers\MapelController@deleteMapel");

Route::get('/register',"App\Http\Controllers\Auth\RegisterController@showRegistrationForm");
Route::post('/register/user',"App\Http\Controllers\Auth\RegisterController@register");

});

Route::group(['middleware' => ['ceklevel:2,3']],function(){

    // Bab
Route::get('/addBab/{kelas}/{mapel}', "App\Http\Controllers\BabController@addBab");
Route::post('/saveBab/{kelas}/{mapel}', "App\Http\Controllers\BabController@saveBab");
Route::get('/deleteBab/{id}',"App\Http\Controllers\BabController@deleteBab");
Route::get('/editBab/{kelas}/{mapel}/{bab}',"App\Http\Controllers\BabController@editBab");
Route::post('/updateBab/{kelas}/{mapel}/{bab}',"App\Http\Controllers\BabController@updateBab");

    // Tugas
Route::get('/addTugas/{kelas}/{mapel}/{bab}',"App\Http\Controllers\TugasController@addTugas");
Route::post('/saveTugas/{kelas}/{mapel}/{bab}', "App\Http\Controllers\TugasController@saveTugas");
Route::get('/deleteTugas/{id}',"App\Http\Controllers\TugasController@deleteTugas");
Route::get('/editTugas/{kelas}/{mapel}/{bab}/{slug}',"App\Http\Controllers\TugasController@editTugas");
Route::post('/updateTugas/{kelas}/{mapel}/{bab}/{slug}',"App\Http\Controllers\TugasController@updateTugas");

    // Guru
Route::get('/guru/{guru}',"App\Http\Controllers\KelasController@showKelas");
Route::get('/guru/{guru}/{kelas}',"App\Http\Controllers\KelasController@showMapel");
});