@extends('template.index')

@section('title')
    Home | Bimbelz
@endsection

@section('content')
    <div class="container">
        <div class="mt-3">
            <a href="" class="btn btn-primary font-poppins shadow">tambah <i class="bi bi-plus-circle-fill"></i></a>
        </div>
        <div class="row mt-3">
            <div class="col-lg-4 col-md-6 col-sm-12 p-3">
                <div class="card shadow">
                    <div class="card-body justify-content-between">
                        <h2 class="card-title font-poppins">B.Indo</h2>
                        <p class="card-subtitle font-raleway">ust.kentung</p>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-outline-success"><i class="bi bi-pencil-fill"></i></button>
                        <button class="btn btn-outline-danger"><i class="bi bi-trash-fill"></i></button>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 p-3">
              <div class="card shadow">
                  <div class="card-body justify-content-between">
                      <h2 class="card-title font-poppins">MTK</h2>
                      <p class="card-subtitle font-raleway">ust.tomut</p>
                  </div>
                  <div class="card-footer text-end">
                      <button class="btn btn-outline-success"><i class="bi bi-pencil-fill"></i></button>
                      <button class="btn btn-outline-danger"><i class="bi bi-trash-fill"></i></button>
                  </div>
              </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 p-3">
            <div class="card shadow">
                <div class="card-body justify-content-between">
                    <h2 class="card-title font-poppins">B.Ing</h2>
                    <p class="card-subtitle font-raleway">ust.keti</p>
                </div>
                <div class="card-footer text-end">
                    <button class="btn btn-outline-success"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-outline-danger"><i class="bi bi-trash-fill"></i></button>
                </div>
            </div>
        </div>
        </div>
    </div>
@endsection
