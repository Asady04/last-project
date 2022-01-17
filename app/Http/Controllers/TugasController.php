<?php

namespace App\Http\Controllers;

use App\Models\Tugas;
use App\Models\Bab;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TugasController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function showTugas($mapel,$slug)
    {
        $data2 = Tugas::where('mapel_slug',$mapel)->where('bab_slug',$slug)->get();
        $slugs = $slug;
        $mapel = $mapel;
        return view('tugas',compact('data2','slugs','mapel'));
    }
    public function addTugas($mapel,$slug)
    {
        $data = $slug;
        $mapel = $mapel;
        $secure = Bab::where('slug',$slug)->firstOrfail();
        return view('tugas.addTugas',compact('data','mapel'));
    }
    public function saveTugas(Request $request)
    {
        $data = new Tugas;
        $data->nama = $request->nama_tugas;
        $data->isi = $request->isi;
        $data->slug = Str::slug($request->nama_tugas);
        $data->bab_slug = $request->bab_slug;
        $data->nilai = $request->nilai;
        $data->mapel_slug = $request->mapel;
        $data->save();
        return redirect('tugas/'.$data->mapel_slug.'/'.$data->bab_slug);
    }
    public function deleteTugas($id)
    {
        $data = Tugas::where('id',$id)->firstOrfail();
        $data->delete();
        return redirect('tugas/'.$data->mapel_slug.'/'.$data->bab_slug);
    }
    public function editTugas($mapel,$bab,$slug)
    {
        $data = Tugas::where('mapel_slug',$mapel)->where('bab_slug',$bab)->where('slug',$slug)->firstOrfail();
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
        $data->save();
        return redirect('tugas/'.$data->mapel_slug.'/'.$data->bab_slug);
    }
}
