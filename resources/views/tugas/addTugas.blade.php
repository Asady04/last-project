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
        <form role="form" action="/saveTugas/{{$kelas}}/{{$mapel}}/{{$bab}}" method="POST">
            @csrf
          <div class="card-body">
            <div class="form-group">
              <label for="nama_tugas">Nama Tugas</label>
              <input type="text" class="form-control" id="nama_tugas" placeholder="Enter name" name="nama_tugas">
            </div>
            <div class="form-group">
              <label for="nama_tugas">Isi</label>
              <textarea type="text" class="form-control" id="isi" placeholder="Enter name" name="isi"></textarea>
            </div>
            <input type="hidden" value="0" name="nilai" id="nilai">
            <input type="hidden" value="{{$bab}}" name="bab_slug" id="bab_slug">
            <input type="hidden" value="{{$mapel}}" name="mapel_slug" id="mapel_slug">
            <input type="hidden" value="{{$kelas}}" name="kelas_slug" id="kelas_slug">
          </div>
          <!-- /.card-body -->
    
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    
</body>
</html>