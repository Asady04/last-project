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
        <a href="{{$item->slug}}">{{$item->nama}}</a>
        @if (auth()->user()->level==3)
        <a href="/deleteMapel/{{ $item->id }}"><button class="btn btn-danger">Delete</button></a>
        @else
        <div></div>
        @endif
        
    </div>
    @endforeach
    @if (auth()->user()->level==3)
    <div>
        <a href="mapel/addMapel">tambah mapel</a>
    </div>
    @else
    <div></div>
    @endif
    <div>{{ Auth::user()->name }}</div>
    @if (auth()->user()->level==1)
        Murid
    @elseif (auth()->user()->level==2)
        Guru 
    @else 
        Admin   
    @endif
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="{{ route('logout') }}"
           onclick="event.preventDefault();
                         document.getElementById('logout-form').submit();">
            {{ __('Logout') }}
        </a>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
            @csrf
        </form>
    </div>
</body>
</html>