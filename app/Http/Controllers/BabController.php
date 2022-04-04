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
        $data = Bab::where('kursus_id',$idKursus)->get();

        foreach ($data as $item){
            $res[] = [
                'bab' => $item,
                'materi' => $item->materi,
            ];           
        }
        return response()->json([
            'status' => 'berhasil',
            'data' =>$res
        ]);
    }

    public function saveBab(Request $request)
    {
        $data = new Bab;
        $file_name = $request->gambar->getClientOriginalName();

            $data->judul = $request->judul;
            $data->kursus_id = $request->idKursus;
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
            $data->kursus_id = $request->idKursus;
            $data->save();

            return response()->json([
                'status' => 'berhasil',
                'data' => $data,
            ],200);
    }

    public function deleteBab($id)
    {
        $data = Bab::where('id',$id)->first();
        DB::table('materi')->where('kursus_id',$data->idKursus)->where('bab_id',$id)->delete();
        DB::table('jawaban')->where('kursus_id',$data->idKursus)->where('bab_id',$id)->delete();
        $data->delete();

        return response()->json([
            'status' => 'berhasil',
        ],200);
    }
}
