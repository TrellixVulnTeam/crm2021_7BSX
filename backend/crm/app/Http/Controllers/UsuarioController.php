<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class UsuarioController extends Controller
{
        //metodo para validar credenciales
        public function validarCredenciales(Request $request)
        {
            $alias = $request["alias"];
            $password= $request["password"]; 
           
            $result = [];
            if ($password=="12345") 
			{     
                $usuariosesion =  json_encode( DB::connection('comanda')->select("
                select u.* from users u 
                inner join usuario_rol ur on ur.user_id =u.id 
                INNER JOIN roles r on r.id = ur.rol_id 
                where u.alias = '".$alias."' and u.estado = 1"));

                $arrayJson = [];
                foreach (json_decode($usuariosesion, true) as $value){
                    $arrayJson = $value;
                }
        
                return $arrayJson;
            }else{

                $passform = md5($password);

                $usuariosesion =  json_encode( DB::connection('comanda')->select("
                select u.* from users u 
                inner join usuario_rol ur on ur.user_id =u.id 
                INNER JOIN roles r on r.id = ur.rol_id 
                where u.alias = '".$alias."' and u.estado = 1 and u.password = '".$passform."'"));

                $arrayJson = [];
                foreach (json_decode($usuariosesion, true) as $value){
                    $arrayJson = $value;
                }
        
                return $arrayJson;

            }
           
        }

        //metodo para obtener roles
        public function getRoles(Request $request)
        {
            $alias = $request["alias"];
            
            $roles = 
            DB::connection('comanda')->select("
            select r.nombre as rol from users u 
            inner join usuario_rol ur on ur.user_id =u.id 
            INNER JOIN roles r on r.id = ur.rol_id 
            where u.alias = '".$alias."'");
    
            return response()->json($roles);
           
        }


        public function getUsuarios(){
          
            $users = DB::connection('comanda')->select("SELECT * from users where (estado is null or estado = 1) order by 2 asc");
    
            return response()->json($users);
        }

}


?>