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
        <form role="form" action="/mapel/saveMapel" method="POST">
            @csrf
          <div class="card-body">
            <div class="form-group">
              <label for="nama_mapel">Nama Mapel</label>
              <input type="text" class="form-control" id="nama_mapel" placeholder="Enter name" name="nama_mapel">
            </div>
            <div class="form-group">
                <label for="nama_mapel">Nama Guru</label>
                <input type="text" class="form-control" id="nama_guru" placeholder="Enter name" name="nama_guru">
              </div>
          </div>
          <!-- /.card-body -->
    
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    
</body>
</html>