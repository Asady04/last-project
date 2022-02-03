<?php

namespace App\Http\Controllers;

use App\Models\{Kelas,Mapel,Bab,Tugas,Kumpul};
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class MapelController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function showMapel($kelas)
    {
        $cek = Kelas::where('slug',$kelas)->firstOrfail();
        $data = Mapel::where('kelas_slug',$kelas)->get();
        $kelas = $kelas;
        if(auth()->user()->nomor==$cek->id){
        return view('mapel',compact('data','kelas'));
        }
        return view('errors.404');
        
        // return view('logout');
    }
    public function addMapel($kelas)
    {
        $kelas = $kelas;
        return view('mapel.addMapel',compact('kelas'));
    }
    public function saveMapel(Request $request)
    {
        $data = new Mapel;
        
        $data->nama = $request->nama_mapel;
        $data->slug = Str::slug($request->nama_mapel);
        $data->guru = $request->nama_guru;
        $data->kelas_slug = $request->kelas_slug;
        $data->save();
        return redirect('/admin'.'/'.$data->kelas_slug);
    }

    public function editMapel($kelas,$mapel)
    {
        $data = Mapel::where('kelas_slug',$kelas)->where('slug',$mapel)->firstOrfail();
        
          return view('mapel.editMapel',compact('data'));
    }

    public function updateMapel(Request $request)
    {
        $data = Mapel::where('id',$request->id)->firstOrfail();
        $bab = Bab::where('kelas_slug',$data->kelas_slug)->where('mapel_slug',$data->slug)->get();
        $tugas = Tugas::where('kelas_slug',$data->kelas_slug)->where('mapel_slug',$data->slug)->get();
        foreach ($bab as $item){
            $item->mapel_slug = Str::slug($request->nama_mapel);
            $item->save();
          }
        foreach ($tugas as $item){
            $item->mapel_slug = Str::slug($request->nama_mapel);
            $item->save();
          }
          $data->nama = $request->nama_mapel;
          $data->kelas_slug = $data->kelas_slug;
          $data->slug = Str::slug($request->nama_mapel);
          $data->guru = $request->guru;
          $data->save();
          return redirect('/admin'.'/'.$data->kelas_slug);
    }

    public function deleteMapel($id)
    {
        $data = Mapel::where('id',$id)->first();
        DB::table('bab')->where('kelas_slug',$data->kelas_slug)->where('mapel_slug',$data->slug)->delete();
        DB::table('tugas')->where('kelas_slug',$data->kelas_slug)->where('mapel_slug',$data->slug)->delete();
        DB::table('kumpul')->where('kelas_slug',$data->kelas_slug)->where('mapel_slug',$data->slug)->delete();
        $data->delete();
        return redirect('/admin'.'/'.$data->kelas_slug);
    }
}
