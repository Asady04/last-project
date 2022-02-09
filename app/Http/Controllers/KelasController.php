<?php

namespace App\Http\Controllers;

use App\Models\{Kelas,User,Mapel,Bab,Tugas};
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class KelasController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function showKelas($guru)
    {
        $secure = Mapel::where('guru',$guru)->firstOrfail();
        $data = Kelas::all();

        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ]);
    }
    
    public function saveKelas(Request $request)
    {
        $data = new Kelas;
        
        $data->nama_kelas = $request->nama;
        $data->slug = Str::slug($request->nama);
        $data->save();
        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ],200);
    }

    public function updateMapel(Request $request)
    {
        $data = Kelas::where('id',$request->id)->firstOrfail();
        $mapel = Mapel::where('kelas_slug',$data->slug)->get();
        $bab = Bab::where('kelas_slug',$data->slug)->get();
        $tugas = Tugas::where('kelas_slug',$data->slug)->get();
        foreach ($mapel as $item){
            $item->kelas_slug = Str::slug($request->nama);
            $item->save();
          }
        foreach ($bab as $item){
            $item->kelas_slug = Str::slug($request->nama);
            $item->save();
          }
        foreach ($tugas as $item){
            $item->kelas_slug = Str::slug($request->nama);
            $item->save();
          }
          $data->nama_kelas = $request->nama;
          $data->slug = Str::slug($request->nama);
          $data->save();
          return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ],200);
    }

    public function deleteMapel($id)
    {
        $data = Kelas::where('id',$id)->first();
        DB::table('mapel')->where('kelas_slug',$data->slug)->delete();
        DB::table('bab')->where('kelas_slug',$data->slug)->delete();
        DB::table('tugas')->where('kelas_slug',$data->slug)->delete();
        DB::table('kumpul')->where('kelas_slug',$data->slug)->delete();
        $data->delete();
        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ],200);
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
            $user = 'admin';
            $slugs = '';
        }
        // return view('bab',compact('slugs'));
        return redirect('/'.$user.'/'.$slugs);
    }

    // guru->kelas
    // public function showKelas($guru)
    // {
    //     $secure = Mapel::where('guru',$guru)->firstOrfail();
    //     $kelas = Kelas::get(); 
    //     $guru = $guru;
    //     if(auth()->user()->name == $secure->guru){
    //         return view('kelas',compact('kelas','guru'));
    //     }else{
    //         return view('errors.404');
    //     }
        
    // }


    // kelas->mapel
    // public function showMapel($guru,$kelas)
    // {
    //     $data = Mapel::where('guru',$guru)->where('kelas_slug',$kelas)->get();
    //     $secure = Mapel::where('guru',$guru)->firstOrfail();

    //     if(auth()->user()->name == $secure->guru){
    //         return view ('mapel',compact('data'));
    //     }else{
    //         return view('errors.404');
    //     }
    // }
    
    // Admin
    // public function showAdmin()
    // {
    //     $kelas = Kelas::get();
    //     return view('kelas',compact('kelas'));  
    // }

    // public function adminMapel($kelas)
    // {
    //     $kelas = $kelas;
    //     $data = Mapel::where('kelas_slug',$kelas)->get();
    //     return view('mapel',compact('kelas','data'));
// }

    public function logout()
    {
        return view ('logout');
    }
}
