<?php

namespace App\Http\Controllers;

use App\Models\Kursus;
use App\Http\Controllers\CloudinaryStorage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class KursusController extends Controller
{
    public function showKursus()
    {
        $data = Kursus::get();
        
        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ]);
    }

    public function saveKursus(Request $request)
    {
        $data = new Kursus;
        
            $image  = $request->file('gambar');
            $result = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName());

            $data->judul = $request->judul;
            $data->deskripsi = $request->deskripsi;
            $data->gambar = $result;
            $data->save();
            return response()->json([
                'status' => 'berhasil',
                'data' => $data,
            ],200);
    }

    public function updateKursus(Request $request)
    {
        $data = Kursus::where('id',$request->id)->first();
        // $file_name = $request->gambar->getClientOriginalName();
            $file  = $request->file('gambar');
            $image = $data->gambar;
            $result = CloudinaryStorage::replace($image, $file->getRealPath(), $file->getClientOriginalName());

            $data->judul = $request->judul;
            $data->gambar = $result;
            $data->deskripsi = $request->deskripsi;
            $data->save();
            return response()->json([
                'status' => 'berhasil',
                'data' => $data,
            ],200);
    }

    public function deleteKursus($id)
    {
        $data = Kursus::where('id',$id)->first();
        DB::table('bab')->where('idKursus',$data->id)->delete();
        DB::table('materi')->where('idKursus',$data->id)->delete();
        DB::table('jawaban')->where('idKursus',$data->id)->delete();
        $data->delete();
        return response()->json([
            'status' => 'berhasil',
        ],200);
    }
}