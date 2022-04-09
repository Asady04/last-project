<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Kursus;
use App\Models\KursusAcc;
use App\Models\Bab;
use Illuminate\Support\Facades\DB;
use Validator;
use Hash;

class AuthController extends Controller
{
    public function showUser()
    {
        $data = User::get();

        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ]);
        
    }

    public function userAccess(Request $request)
    {
        $user = User::where('email',$request->email)->first();

        if(count($user->kursusAcc)===0){
            return response()->json([
               'data' => [],
            ]);
        }else{
            foreach ($user->kursusAcc as $item){
                $res[] = [
                    'kursus' => $data = Kursus::where('id',$item->kursus_id)->get(),    
                ];
                
            }
            return response()->json([
                'status' => 'berhasil',
                'data' => $res,
            ]);
        }
    }

    public function createAccess(Request $request)
    {
        $data = new KursusAcc;

        $data->user_id = $request->user_id;
        $data->kursus_id = $request->kursus_id;
        $data->save();

        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ],200);
    }

    public function deleteAccess($idUser, $idKursus)
    {
        $data = KursusAcc::where('user_id',$idUser)->where('kursus_id', $idKursus)->first();

        $data->delete();

        return response()->json([
            'status' => 'berhasil',
            'data' => $data,
        ],200);
    }

    public function register(Request $request)
    {
        $rules = array(
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'gambar' => 'required|string',
            // 'role' => 'required|max:1',
        );

        $cek = Validator::make($request->all(),$rules);

        if($cek->fails()){
            $errorString = implode(",",$cek->messages()->all());
            return response()->json([
                'message' => $errorString,
            ],401);
        }else{
            $user = User::create([
                'name' => $request->name,
                'password' => bcrypt($request->password),
                'email' => $request->email,
                'gambar' => $request->gambar, 
            ]);

        if ($user) {
            $user->assignRole('user');
            $role = "user";
        }else {
            return response()->json([
                'status' => 'Failed',
                'message' => 'Gagal',
            ],422);
        }

        $token = $user->createToken('token-name')->plainTextToken;

        return response()->json([
            'status' => 'Success',
            'message' => 'Berhasil membuat akun',
            'role' => $role,
            'user' => $user,
            'token' => $token,
        ],200);
        }

        
    }

    public function registerAdmin(Request $request)
    {
        $rules = array(
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'gambar' => 'required|string',
            // 'role' => 'required|max:1',
        );

        $cek = Validator::make($request->all(),$rules);

        if($cek->fails()){
            $errorString = implode(",",$cek->messages()->all());
            return response()->json([
                'message' => $errorString,
            ],401);
        }else{
            $user = User::create([
                'name' => $request->name,
                'password' => bcrypt($request->password),
                'email' => $request->email, 
                'gambar' => $request->gambar, 
            ]);

        if ($user) {
            $user->assignRole('admin');
            $role = "admin";
        }else {
            return response()->json([
                'status' => 'Failed',
                'message' => 'Gagal',
            ],422);
        }

        $token = $user->createToken('token-name')->plainTextToken;

        return response()->json([
            'status' => 'Success',
            'message' => 'Berhasil membuat akun',
            'role' => $role,
            'user' => $user,
            'token' => $token,
        ],200);
        }

        
    }

    
    public function login(Request $request)
    {
        $rules = array(
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        );

        $cek = Validator::make($request->all(),$rules);

        if($cek->fails()){
            $errorString = implode(",",$cek->messages()->all());
            return response()->json([
                'message' => $errorString,
            ],401);
        }else{
            $user = User::where('email',$request->email)->first();

            if(!$user || !Hash::check($request->password, $user->password)){
                return response()->json([
                    'message' => 'Unauthorized',
                ],401);
            }

            $token = $user->createToken('token-name')->plainTextToken;
            $roles = $user->getRoleNames();

            return response()->json([
                'status' => 'Success',
                'message' => 'Berhasil login',
                'user' => $user,
                'role' => $roles,
                'token' => $token,
            ],200);
        }
    }

    public function editPassword(Request $request)
    {
        $rules = array(
            'old_password' => 'required|string|min:6',
            'new_password' => 'required|string|min:6|confirmed'
        );

        $cek = Validator::make($request->all(),$rules);

        if($cek->fails()){
            $errorString = implode(",",$cek->messages()->all());
            return response()->json([
                'message' => $errorString,
            ],401);
        }else{
            $user = User::where('email',$request->email)->first();

            if(!$user || !Hash::check($request->old_password, $user->password)){
                return response()->json([
                    'message' => 'Password salah',
                ],401);
            }else{
                $user->password = $request->new_password;
                $user->save();

                return response()->json([
                    'status' => 'Success',
                    'message' => 'Berhasil ganti password',
                ],200);
            }
        }
    }

    public function deleteUser($id)
    {
        $data = User::where('id',$id)->first();
        DB::table('jawaban')->where('email',$data->email)->delete();
        
            $data->delete();

            return response()->json([
                'status' => 'berhasil',
            ],200);
    }
}
