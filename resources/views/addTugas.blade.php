@extends('template.index')

@section('title')
    Add | Bimbelz
@endsection

@section('content')
    <div class="container">
        <div class="card border border-2 border-info p-3 mt-3 shadow shadow-md">
            <form class="d-flex flex-column" action="">
                <label for="nama" class="font-poppins">Judul Tugas</label>
                <input type="text" name="nama" class="form-control border border-info mb-3 mt-1" placeholder="Misal: Tugas 1">
                <label for="isi" class="font-poppins">Perintah</label>
                <textarea name="isi" id="" cols="30" rows="10" class="border border-info mt-1" placeholder="Tuliskan perintah tugas ini"></textarea>
                <button class="btn btn-info mt-3 ms-auto text-white font-poppins">submit</button>
            </form>
        </div>
    </div>
@endsection
