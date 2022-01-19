<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\User;
use App\Models\Mapel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class KelasController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function userProgress()
    {
        $nomor = auth()->user()->nomor;
        $nama = auth()->user()->name;
        if(auth()->user()->level==1){
            $kelas = Kelas::where('id',$nomor)->firstOrfail();
            $slugs = $kelas->slug;
            $user = 'murid';
        }
        if(auth()->user()->level==2){
            $mapel = Mapel::where('guru',$nama)->firstOrfail();
            $slugs = $mapel->guru;
            $user = 'guru';
        }
        if(auth()->user()->level==3){
            $slugs = 'x-tkj';
        }
        // return view('bab',compact('slugs'));
        return redirect($user.'/'.$slugs);
    }

    // guru->kelas
    public function showKelas($guru)
    {
        $secure = Mapel::where('guru',$guru)->firstOrfail();
        $kelas = Kelas::get(); 
        $guru = $guru;
        if(auth()->user()->name == $secure->guru){
            return view('kelas',compact('kelas','guru'));
        }else{
            return view('errors.404');
        }
        
    }


    // kelas->mapel
    public function showMapel($guru,$kelas)
    {
        $data = Mapel::where('guru',$guru)->where('kelas_slug',$kelas)->get();
        $secure = Mapel::where('guru',$guru)->firstOrfail();

        if(auth()->user()->name == $secure->guru){
            return view ('mapel',compact('data'));
        }else{
            return view('errors.404');
        }
    }

    public function logout()
    {
        return view ('logout');
    }
}
