<?php

namespace App\Http\Controllers;

use App\Models\Bab;
use App\Models\Mapel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BabController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function showBab($mapel)
    {
        $data = Bab::where('mapel_slug',$mapel)->get();
        $secure = Mapel::where('slug',$mapel)->firstOrfail();
        $mapel = $mapel;
        return view('bab',compact('data','mapel'));
    }
    public function addBab($mapel)
    {
        $data = $mapel;
        $secure = Mapel::where('slug',$mapel)->firstOrfail();
        return view('bab.addBab',compact('data'));
    }
    public function saveBab(Request $request)
    {
        $data = new Bab;
        $data->nama = $request->nama_bab;
        $data->topik = $request->topik;
        $data->slug = Str::slug($request->nama_bab);
        $data->mapel_slug = $request->mapel_slug;
        $data->save();
        return redirect($data->mapel_slug);
    }
    public function editBab($mapel,$slug)
    {
        $data = Bab::where('mapel_slug',$mapel)->where('slug',$slug)->firstOrfail();
        $mapel = $mapel;
        return view('bab.editBab',compact('mapel','data'));
    }
    public function updateBab(Request $request)
    {
        $data = Bab::where('id',$request->id)->first();
        $data->nama = $request->nama_bab;
        $data->mapel_slug = $request->mapel_slug;
        $data->slug = Str::slug($request->nama_bab);;
        $data->topik = $request->topik;
        $data->save();
        return redirect($data->mapel_slug);
    }
    public function deleteBab($id)
    {
        $data = Bab::where('id',$id)->first();
        $data->delete();
        return redirect($data->mapel_slug);
    }
}
