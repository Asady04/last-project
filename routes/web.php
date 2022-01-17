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

// Route::get('/',$url. "\KelasController@showKelas");
Route::get('/',$url. "\MapelController@showMapel");


// Bab
Route::get('/{slug}',$url. "\BabController@showBab");

// Tugas
Route::get('tugas/{mapel}/{slug}',$url. "\TugasController@showTugas");

Route::group(['middleware' => ['admin']],function(){
    // Mapel
Route::get('mapel/addMapel', "App\Http\Controllers\MapelController@addMapel");
Route::post('mapel/saveMapel', "App\Http\Controllers\MapelController@saveMapel");
Route::get('deleteMapel/{id}',"App\Http\Controllers\MapelController@deleteMapel");
});

Route::group(['middleware' => ['guru']],function(){
    
Route::get('/addBab/{mapel}', "App\Http\Controllers\BabController@addBab");
Route::post('/saveBab/{mapel}', "App\Http\Controllers\BabController@saveBab");
Route::get('deleteBab/{id}',"App\Http\Controllers\BabController@deleteBab");
Route::get('editBab/{mapel}/{slug}',"App\Http\Controllers\BabController@editBab");
Route::post('updateBab/{mapel}',"App\Http\Controllers\BabController@updateBab");

Route::get('/addTugas/{mapel}/{slug}',"App\Http\Controllers\TugasController@addTugas");
Route::post('/saveTugas', "App\Http\Controllers\TugasController@saveTugas");
Route::get('/deleteTugas/{id}',"App\Http\Controllers\TugasController@deleteTugas");
Route::get('/editTugas/{mapel}/{bab}/{slug}',"App\Http\Controllers\TugasController@editTugas");
Route::post('/updateTugas',"App\Http\Controllers\TugasController@updateTugas");
});