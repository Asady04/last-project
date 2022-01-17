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
    <div>
        <a href="tugas/{{ $item->mapel_slug }}/{{$item->slug}}">{{$item->nama}}</a>
        <div>{{$item->topik}}</div>
        @if (auth()->user()->level>1)
        <div>
            <a href="/deleteBab/{{ $item->id }}"><button class="btn">Delete</button></a>
            <a href="/editBab/{{ $item->mapel_slug }}/{{ $item->slug }}"><button class="btn">Edit</button></a>
        </div>
        @else
        <div></div>
        @endif
    </div>
    @endforeach

    @if (auth()->user()->level>1)
    <div>
        <a href="/addBab/{{$mapel}}">tambah bab</a>
    </div>
    @else
    <div></div>
    @endif
    
</body>
</html>