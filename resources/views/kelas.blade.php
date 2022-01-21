
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body> 
    @foreach ($kelas as $item)

        @if (auth()->user()->level==3)
            <div>
            <a href="/admin/{{$item->slug}}">{{$item->nama_kelas}}</a>
            </div>
        @else
            <div>
            <a href="/guru/{{$guru}}/{{$item->slug}}">{{$item->nama_kelas}}</a>
            </div>
        @endif
        
    @endforeach
</body>
</html>