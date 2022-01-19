<?php

namespace App\Http\Controllers;

use App\Models\Tugas;
use App\Models\Bab;
use App\Models\Mapel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TugasController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function showTugas($kelas,$mapel,$bab)
    {
        $data = Tugas::where('kelas_slug',$kelas)->where('mapel_slug',$mapel)->where('bab_slug',$bab)->get();
        $kelas = $kelas;
        $mapel = $mapel;
        $bab = $bab;

        // keamanan
        $slugFail = Bab::where('slug',$bab)->firstOrfail();
        $secure = Mapel::where('slug',$mapel)->firstOrfail();

        if(auth()->user()->level == 2 && auth()->user()->name == $secure->guru){
            return view('tugas',compact('data','kelas','mapel','bab'));
        }elseif(auth()->user()->level == 1){
            return view('tugas',compact('data','kelas','mapel','bab'));
        }else{
            return view('errors.404');
        }
        
    }
    public function addTugas($kelas,$mapel,$bab)
    {
        $bab = $bab;
        $mapel = $mapel;
        $kelas = $kelas;

        // keamanan
        $slugFail = Bab::where('slug',$bab)->firstOrfail();
        $secure = Mapel::where('slug',$mapel)->firstOrfail();

        if(auth()->user()->level == 2 && auth()->user()->name == $secure->guru){
            return view('tugas.addTugas',compact('bab','mapel','kelas'));
        }else{
            return view('errors.404');
        }
    
        return view('tugas.addTugas',compact('bab','mapel','kelas'));
    }
    public function saveTugas(Request $request)
    {
        $data = new Tugas;
        $data->nama = $request->nama_tugas;
        $data->isi = $request->isi;
        $data->slug = Str::slug($request->nama_tugas);
        $data->bab_slug = $request->bab_slug;
        $data->nilai = $request->nilai;
        $data->mapel_slug = $request->mapel_slug;
        $data->kelas_slug = $request->kelas_slug;
        $data->save();
        return redirect('tugas/'.$data->kelas_slug.'/'.$data->mapel_slug.'/'.$data->bab_slug);
    }
    public function deleteTugas($id)
    {
        $data = Tugas::where('id',$id)->firstOrfail();
        $data->delete();
        return redirect('tugas/'.$data->kelas_slug.'/'.$data->mapel_slug.'/'.$data->bab_slug);
    }
    public function editTugas($kelas,$mapel,$bab,$slug)
    {
        $data = Tugas::where('kelas_slug',$kelas)->where('mapel_slug',$mapel)->where('bab_slug',$bab)->where('slug',$slug)->firstOrfail();

        // keamanan
        $slugFail = Bab::where('slug',$bab)->firstOrfail();
        $secure = Mapel::where('slug',$mapel)->firstOrfail();

        if(auth()->user()->level == 2 && auth()->user()->name == $secure->guru){
            return view('tugas.editTugas',compact('data'));
        }else{
            return view('errors.404');
        }
        return view('tugas.editTugas',compact('data'));
    }
    public function updateTugas(Request $request)
    {
        $data = Tugas::where('id',$request->id)->firstOrfail();
        $data->nama = $request->nama_tugas;
        $data->bab_slug = $request->bab_slug;
        $data->slug = Str::slug($request->nama_tugas);;
        $data->isi = $request->isi;
        $data->mapel_slug = $request->mapel_slug;
        $data->kelas_slug = $request->kelas_slug;
        $data->save();
        return redirect('tugas/'.$data->kelas_slug.'/'.$data->mapel_slug.'/'.$data->bab_slug);
    }
}
