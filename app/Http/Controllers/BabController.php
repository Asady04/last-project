<?php

namespace App\Http\Controllers;

use App\Models\Bab;
use App\Models\Mapel;
use App\Models\Tugas;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class BabController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function showBab($kelas,$mapel)
    {
        $data = Bab::where('kelas_slug',$kelas)->where('mapel_slug',$mapel)->get();
        $kelas = $kelas;
        $mapel = $mapel;

        // keamanan
        $secure = Mapel::where('slug',$mapel)->firstOrfail();
        if(auth()->user()->level == 2 && auth()->user()->name == $secure->guru){
            return view('bab',compact('data','mapel','kelas'));
        }elseif(auth()->user()->level != 2){
            return view('bab',compact('data','mapel','kelas'));
        }else{
            return view ('errors.404');
        }
    }
    public function addBab($kelas,$mapel)
    {
        $mapel = $mapel;
        $kelas = $kelas;

        // keamanan
        $secure = Mapel::where('slug',$mapel)->firstOrfail();

        if(auth()->user()->level == 2 && auth()->user()->name == $secure->guru){
            return view('bab.addBab',compact('kelas','mapel'));
        }elseif(auth()->user()->level == 3){
            return view('bab.addBab',compact('kelas','mapel'));
        }else{
            return view ('errors.404');
        }
        
    }
    public function saveBab(Request $request)
    {
        $data = new Bab;
        $data->nama = $request->nama_bab;
        $data->topik = $request->topik;
        $data->slug = Str::slug($request->nama_bab);
        $data->mapel_slug = $request->mapel_slug;
        $data->kelas_slug = $request->kelas_slug;
        $data->save();
        return redirect('/bab'.'/'.$data->kelas_slug.'/'.$data->mapel_slug);
    }
    public function editBab($kelas,$mapel,$bab)
    {
        $data = Bab::where('kelas_slug',$kelas)->where('mapel_slug',$mapel)->where('slug',$bab)->firstOrfail();

        // keamanan
        $secure = Mapel::where('slug',$mapel)->firstOrfail();

        if(auth()->user()->level == 2 && auth()->user()->name == $secure->guru){
            return view('bab.editBab',compact('data'));
        }elseif(auth()->user()->level == 3){
            return view('bab.editBab',compact('data'));
        }else{
            return view ('errors.404');
        }
    }
    public function updateBab(Request $request)
    {
        $data = Bab::where('id',$request->id)->first();
        $tugas = Tugas::where('kelas_slug',$data->kelas_slug)->where('mapel_slug',$data->mapel_slug)->where('bab_slug',$data->slug)->get();
        foreach ($tugas as $item){
            $item->bab_slug = Str::slug($request->nama_bab);
            $item->save();
          }
        $data->nama = $request->nama_bab;
        $data->mapel_slug = $request->mapel_slug;
        $data->kelas_slug = $request->kelas_slug;
        $data->slug = Str::slug($request->nama_bab);
        $data->topik = $request->topik;
        $data->save();
        return redirect('/bab'.'/'.$data->kelas_slug.'/'.$data->mapel_slug);
    }
    public function deleteBab($id)
    {
        $data = Bab::where('id',$id)->first();
        DB::table('tugas')->where('kelas_slug',$data->kelas_slug)->where('mapel_slug',$data->mapel_slug)->where('bab_slug',$data->slug)->delete();
        $data->delete();
        return redirect('/bab'.'/'.$data->kelas_slug.'/'.$data->mapel_slug);
    }
}
