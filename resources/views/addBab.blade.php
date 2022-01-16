@extends('template.index')

@section('title')
    Add | Bimbelz
@endsection

@section('content')
    <div class="container">
        <div class="card border border-2 border-info p-3 mt-3 shadow shadow-md">
            <form class="d-flex flex-column" action="">
                <label for="nama" class="font-poppins">Nama Bab</label>
                <input type="text" name="nama" class="form-control border-info border font-noto mb-3" placeholder="Misal: Bab 1">
                <label for="topik" class="font-poppins">Topik</label>
                <input type="text" name="topik" class="form-control border-info border font-noto" placeholder="Misal: Trigonometri">
                <button class="btn btn-info mt-3 ms-auto text-white font-poppins">submit</button>
            </form>
        </div>
    </div>
@endsection
