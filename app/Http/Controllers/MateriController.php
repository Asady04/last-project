<?php

namespace App\Http\Controllers;

use App\Models\Materi;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class MateriController extends Controller
{
    public function showMateri($idKursus,$idBab)
    {
        $data = Materi::where('idKursus',$id)->where('idBab',$idBab)->get();
        
        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ]);
    }

    public function saveMateri(Request $request)
    {
        $data = new Materi;

            $data->judul = $request->judul;
            $data->idKursus = $request->idKursus;
            $data->idBab = $request->idBab;
            $data->judul = $request->judul;
            $data->tipe = $request->tipe;
            $data->isi = $request->isi;
            $data->save();

            return response()->json([
                'status' => 'berhasil',
                'data' => $data,
            ],200);
    }

    public function updateMateri(Request $request)
    {
        $data = Materi::where('id',$request->id)->first();
        
            $data->judul = $request->judul;
            $data->idKursus = $request->idKursus;
            $data->idBab = $request->idBab;
            $data->judul = $request->judul;
            $data->tipe = $request->tipe;
            $data->isi = $request->isi;
            $data->save();

            return response()->json([
                'status' => 'berhasil',
                'data' => $data,
            ],200);
    }

    public function deleteMateri($id)
    {
        $data = Materi::where('id',$id)->first();
        DB::table('jawaban')->where('idKursus',$data->idKursus)->where('idBab',$data->idBab)->where('idMateri',$id)->delete();
        $data->delete();

        return response()->json([
            'status' => 'berhasil',
        ],200);
    }
}
