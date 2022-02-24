<?php

namespace App\Http\Controllers;

use App\Models\Bab;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class BabController extends Controller
{
    public function showBab($idKursus)
    {
        $data = Bab::where('idKursus',$idKursus)->get();
        
        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ]);
    }

    public function saveBab(Request $request)
    {
        $data = new Bab;
        $file_name = $request->gambar->getClientOriginalName();

            $data->judul = $request->judul;
            $data->idKursus = $request->idKursus;
            $data->save();

            return response()->json([
                'status' => 'berhasil',
                'data' => $data,
            ],200);
    }

    public function updateBab(Request $request)
    {
        $data = Bab::where('id',$request->id)->first();
        
            $data->judul = $request->judul;
            $data->idKursus = $request->idKursus;
            $data->save();

            return response()->json([
                'status' => 'berhasil',
                'data' => $data,
            ],200);
    }

    public function deleteBab($id)
    {
        $data = Bab::where('id',$id)->first();
        DB::table('materi')->where('idKursus',$data->idKursus)->where('idBab',$id)->delete();
        DB::table('jawaban')->where('idKursus',$data->idKursus)->where('idBab',$id)->delete();
        $data->delete();

        return response()->json([
            'status' => 'berhasil',
        ],200);
    }
}
