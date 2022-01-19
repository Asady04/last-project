<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div class="card card-primary">
        <div class="card-header">
          <h3 class="card-title">Quick Example</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form role="form" action="/updateBab/{{$data->kelas_slug}}/{{$data->mapel_slug}}/{{$data->slug}}" method="POST">
            @csrf
            <input type="hidden" name="id" value="{{ $data->id }}">
          <div class="card-body">
            <div class="form-group">
              <label for="nama_bab">Nama Bab</label>
              <input type="text" value="{{$data->nama}}" class="form-control" id="nama_bab" placeholder="Enter name" name="nama_bab">
            </div>
            <div class="form-group">
                <label for="topik">Topik</label>
                <input type="text" value="{{$data->topik}}" class="form-control" id="topik" placeholder="Enter name" name="topik">
              </div>
            <input type="hidden" value="{{$data->mapel_slug}}" name="mapel_slug" id="mapel_slug">
            <input type="hidden" value="{{$data->kelas_slug}}" name="kelas_slug" id="kelas_slug">
          </div>
          <!-- /.card-body -->
    
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    
</body>
</html>