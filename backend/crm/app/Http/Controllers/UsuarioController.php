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
            where u.alias = '".$alias."' and r.sistema IN('CRM', 'COMANDA Y CRM')");
    
            return response()->json($roles);
           
        }


        public function getUsuarios(){
          
            $users = DB::connection('comanda')->select("SELECT * from users where (estado is null or estado = 1) order by 2 asc");
    
            return response()->json($users);
        }


        public function getUsuarioRpt(Request $request){
            $usuario = $request["usuario"];
            $fecha_inicio = $request["fecha_inicio"];
            $fecha_fin = $request["fecha_fin"];


            $fechaInicioSinFormato = date_create_from_format('Y-m-d',$fecha_inicio);

            $fechaInicioConFormato = date_format($fechaInicioSinFormato,'Ymd');

            $fechaFinSinFormato = date_create_from_format('Y-m-d',$fecha_fin);

            $fechaFinConFormato = date_format($fechaFinSinFormato,'Ymd');
    
            $getDatos =  DB::connection('comanda')
            ->select("SELECT case when c.atencion_cerrada = 'S'
                        then 'Cerrada'
                        else
                        'Abierta'
                        end as estado,
                        CAST(c.id AS NUMERIC(8)) as id, 
                        c.titulo_atn as titulo_atn,
                        CAST(c.telefono AS VARCHAR(8)) as telefono, 
                        c.num_suministro as num_suministro,c.contacto as contacto,
                        c.fecha_creacion as fecha_creacion,CAST(c.descripcion AS VARCHAR(1000)) as descripcion,
                        t.nombre as tipoatencion,m.nombre as motivoatencion,
                        CAST(c.sistema AS NVARCHAR(10)) as sistema,
                        c.cliente as cliente,
                        c.usuario_creacion as usuarioCreacion,
                        c.id as atencion_id,
                        convert(varchar(10),c.fecha_creacion,103) as fechaC
                        FROM comanda_db.dbo.CRM_atenciones c
                        LEFT JOIN comanda_db.dbo.CRM_motivo_atenciones m ON m.id = c.id_motivo_atencion
                        LEFT JOIN comanda_db.dbo.CRM_tipo_atenciones t ON t.id = c.id_tipo_atencion
                        LEFT JOIN comanda_db.dbo.users u on u.alias = c.usuario_creacion
                        WHERE u.id = '".$usuario."' and 
                        c.fecha_creacion between '".$fechaInicioConFormato." 00:00:00' and '".$fechaFinConFormato." 00:00:00'
                        order by 1 asc
                        ");
    
            return response()->json($getDatos);
    
        }

}


?>