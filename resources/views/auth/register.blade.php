<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ __('Register') }}</div>
    
                    <div class="card-body">
                        <form method="POST" id="register" action="/register/user">
                            @csrf
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>
    
                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
    
                                    @error('name')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
    
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>
    
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">
    
                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
                            <select onchange="populate()" id="level"name="level" autocomplete="level" form="register">
                                <option value="">pilih level</option>
                                <option value="1">murid</option>
                                <option value="2">guru</option>
                            </select>
                            {{-- <input type="hidden" value="0" name="nomor" id="nomor" required autocomplete="nomor"> --}}
                           
                            <div id="kosong"></div>
                            
                            
                            {{-- <select id="nomor" name="nomor" autocomplete="nomor" form="register">
                                <option value="">Pilih Kelas</option>
                                @foreach ($kelas as $item)
                                    <option  value="{{$item->id}}">{{$item->nama_kelas}}</option>
                                @endforeach
                            </select> --}}
                            
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>
    
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
    
                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>
    
                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                                </div>
                            </div>
    
                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        {{ __('Register') }}
                                    </button>
                                </div>
                            </div>
                        </form>
                       <script type="text/javascript">
                       function populate(){
                        var level = document.getElementById('level') 
                        if(level.value == "1"){
                            document.getElementById('kosong').innerHTML = `<select id="nomor" name="nomor" autocomplete="nomor" form="register">
                                <option value="">Pilih Kelas</option>
                                @foreach ($kelas as $item)
                                    <option  value="{{$item->id}}">{{$item->nama_kelas}}</option>
                                @endforeach
                            </select>`
                        }else{
                            document.getElementById('kosong').innerHTML = '<input type="hidden" value="0" id="nomor"name="nomor" autocomplete="nomor">'
                        }
                       }
                       
                         
                       </script>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

