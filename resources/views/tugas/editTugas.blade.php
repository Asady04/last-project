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
        <form role="form" action="/updateTugas" method="POST">
            @csrf
            <input type="hidden" name="id" value="{{ $data->id }}">
          <div class="card-body">
            <div class="form-group">
              <label for="nama_tugas">Nama Tugas</label>
              <input type="text" value="{{$data->nama}}" class="form-control" id="nama_tugas" placeholder="Enter name" name="nama_tugas">
            </div>
            <div class="form-group">
                <label for="isi">Isi</label>
                <input type="text" value="{{$data->isi}}" class="form-control" id="isi" placeholder="Enter name" name="isi">
              </div>
            <input type="hidden" value="{{$data->bab_slug}}" name="bab_slug" id="bab_slug">
            <input type="hidden" value="{{$data->mapel_slug}}" name="mapel_slug" id="mapel_slug">
          </div>
          <!-- /.card-body -->
    
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    
</body>
</html>