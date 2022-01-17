<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class KelasController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function showKelas()
    {
        $nomor = auth()->user()->nomor;
        if(auth()->user()->level==1){
            $kelas = Kelas::where('id',$nomor)->first();
            $slugs = $kelas->slug;
        }
        // return view('bab',compact('slugs'));
        return redirect($slugs);
    }
}
