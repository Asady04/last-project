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
    <img src="{{asset('storage/tugas/'.$item->gambar)}}" width=10%>
    @endforeach
</body>
</html>