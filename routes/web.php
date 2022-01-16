<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('index');
});
Route::get('/signin', function () {
    return view('signin');
});
Route::get('/bab', function () {
    return view('bab');
});
Route::get('/tugas', function () {
    return view('tugas');
});
Route::get('/bab/add', function () {
    return view('addBab');
});
Route::get('/tugas/add', function () {
    return view('addTugas');
});

