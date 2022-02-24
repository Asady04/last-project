<?php

namespace App\Http\Controllers;

use App\Models\Jawaban;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class JawabanController extends Controller
{
    public function showJawaban($idKursus,$idBab,$idMateri)
    {
        $data = Jawaban::where('idKursus',$id)->where('idBab',$idBab)->where('idMateri',$idMateri)->get();
        
        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ]);
    }

    public function saveJawaban(Request $request)
    {
        $data = new Jawaban;

            $data->judul = $request->judul;
            $data->idKursus = $request->idKursus;
            $data->idBab = $request->idBab;
            $data->idMateri = $request->idMateri;
            $data->komen = $request->komen;
            $data->nilai = $request->nilai;
            $data->gambar = $request->gambar;
            $data->namauser = $request->namauser;
            $data->save();

            return response()->json([
                'status' => 'berhasil',
                'data' => $data,
            ],200);
    }

    public function updateJawaban(Request $request)
    {
        $data = Jawaban::where('id',$request->id)->first();
        
            $data->judul = $request->judul;
            $data->idKursus = $request->idKursus;
            $data->idBab = $request->idBab;
            $data->idMateri = $request->idMateri;
            $data->komen = $request->komen;
            $data->nilai = $request->nilai;
            $data->gambar = $request->gambar;
            $data->namauser = $request->namauser;
            $data->save();

            return response()->json([
                'status' => 'berhasil',
                'data' => $data,
            ],200);
    }

    public function deleteJawaban($id)
    {
        $data = Jawaban::where('id',$id)->first();
    
        $data->delete();

        return response()->json([
            'status' => 'berhasil',
        ],200);
    }
}
