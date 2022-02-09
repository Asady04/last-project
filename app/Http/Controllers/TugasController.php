<?php

namespace App\Http\Controllers;

use App\Models\{Kelas,Mapel,Bab,Tugas,Kumpul};
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TugasController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }
    public function showTugas($kelas,$mapel,$bab)
    {
        $data = Tugas::where('kelas_slug',$kelas)->where('mapel_slug',$mapel)->where('bab_slug',$bab)->get();
        // $kumpul = Kumpul::where('kelas_slug',$kelas)->where('mapel_slug',$mapel)->where('bab_slug',$bab)->get();
        $kelas = $kelas;
        $mapel = $mapel;
        $bab = $bab;

        // keamanan
        // $slugFail = Bab::where('slug',$bab)->firstOrfail();
        // $secure = Mapel::where('slug',$mapel)->firstOrfail();

        // if(auth()->user()->level == 2 && auth()->user()->name == $secure->guru){
        //     return view('tugas',compact('data','kelas','mapel','bab','kumpul'));
        // }elseif(auth()->user()->level != 2){
        //     return view('tugas',compact('data','kelas','mapel','bab','kumpul'));
        // }else{
        //     return view('errors.404');
        // }
        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ]);
    }
    // public function addTugas($kelas,$mapel,$bab)
    // {
    //     $bab = $bab;
    //     $mapel = $mapel;
    //     $kelas = $kelas;

    //     // keamanan
    //     $slugFail = Bab::where('slug',$bab)->firstOrfail();
    //     $secure = Mapel::where('slug',$mapel)->firstOrfail();

    //     if(auth()->user()->level == 2 && auth()->user()->name == $secure->guru){
    //         return view('tugas.addTugas',compact('bab','mapel','kelas'));
    //     }elseif(auth()->user()->level == 3){
    //         return view('tugas.addTugas',compact('bab','mapel','kelas'));
    //     }else{
    //         return view('errors.404');
    //     }
    // }
    public function saveTugas(Request $request)
    {
        $data = new Tugas;
        $data->nama = $request->nama;
        $data->isi = $request->isi;
        $data->slug = Str::slug($request->nama);
        $data->bab_slug = $request->bab_slug;
        $data->mapel_slug = $request->mapel_slug;
        $data->kelas_slug = $request->kelas_slug;
        $data->save();
        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ],200);
    }
    public function deleteTugas($id)
    {
        $data = Tugas::where('id',$id)->firstOrfail();
        $data->delete();
        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ],200);
    }
    public function editTugas($kelas,$mapel,$bab,$slug)
    {
        $data = Tugas::where('kelas_slug',$kelas)->where('mapel_slug',$mapel)->where('bab_slug',$bab)->where('slug',$slug)->firstOrfail();

        // keamanan
        $secure = Mapel::where('slug',$mapel)->firstOrfail();

        if(auth()->user()->level == 2 && auth()->user()->name == $secure->guru){
            return view('tugas.editTugas',compact('data'));
        }elseif(auth()->user()->level == 3){
            return view('tugas.editTugas',compact('data'));
        }else{
            return view('errors.404');
        }
    }
    public function updateTugas(Request $request)
    {
        $data = Tugas::where('id',$request->id)->firstOrfail();
        $data->nama = $request->nama;
        $data->bab_slug = $request->bab_slug;
        $data->slug = Str::slug($request->nama);;
        $data->isi = $request->isi;
        $data->mapel_slug = $request->mapel_slug;
        $data->kelas_slug = $request->kelas_slug;
        $data->save();
        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ],200);
    }

    public function uploadTugas(Request $request,$kelas,$mapel,$bab,$tugas)
    {
        $file_name = $request->image->getClientOriginalName();
        $request->image->storeAs('tugas',$file_name);
        $data = new Kumpul;
        $data->nama = auth()->user()->name;
        $data->nilai = 0;
        $data->kelas_slug = $kelas;
        $data->mapel_slug = $mapel;
        $data->bab_slug = $bab;
        $data->tugas_slug = $tugas;
        $data->gambar = $file_name;
        $data->save();

        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ],200);;
    }

    public function showKumpul($kelas,$mapel,$bab,$tugas)
    {
        $data = Kumpul::where('kelas_slug',$kelas)->where('mapel_slug',$mapel)->where('bab_slug',$bab)->where('tugas_slug',$tugas)->get();

        $secure = Mapel::where('slug',$mapel)->where('kelas_slug',$kelas)->firstOrfail();

        if(auth()->user()->level == 2 && auth()->user()->name == $secure->guru){
            return view('tugas.kumpul',compact('data'));
        }elseif(auth()->user()->level == 3){
            return view('tugas.kumpul',compact('data'));
        }else{
            return view('errors.404');
        }
    }
}
