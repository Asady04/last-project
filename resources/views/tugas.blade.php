{{-- @extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    {{ __('You are logged in!') }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body> 
    
    @foreach ($data as $item)
    
    <div>{{$item->nama}}</div>
    <div>{{$item->isi}}</div>
    <form action="/upload/{{$item->kelas_slug}}/{{ $item->mapel_slug }}/{{ $item->bab_slug }}/{{ $item->slug }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div><input type="file" id="image" name="image"></div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    
    @if (auth()->user()->level>1)
    <div>
        <a href="/showTugas/{{$item->kelas_slug}}/{{ $item->mapel_slug }}/{{ $item->bab_slug }}/{{ $item->slug }}">Lihat Tugas</a>
        <a href="/deleteTugas/{{ $item->id }}"><button class="btn">Delete</button></a>
        <a href="/editTugas/{{$item->kelas_slug}}/{{ $item->mapel_slug }}/{{ $item->bab_slug }}/{{ $item->slug }}"><button class="btn">Edit</button></a>
    </div>
    @else
    <div>
        <div></div>
    </div>
        
    </div>
    @endif
    @endforeach

    
    @if (auth()->user()->level>1)
    <div>
        <a href="/addTugas/{{$kelas}}/{{ $mapel }}/{{$bab}}">tambah tugas</a>
    </div>
    @else
    <div></div>
    @endif
</body>
</html>