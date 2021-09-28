<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class AtencionesController extends Controller
{
       //obtener todos los tipos de atenciones
       public function getTiposAtenciones()
       {
           //conexion con COMANDA
           $atenciones  = DB::connection('comanda')->table('CRM_tipo_atenciones')->orderBy('nombre','ASC')->get();
   
           return response()->json($atenciones);
       }
   
   
       //obtener todos los motivos de atenciones
       public function getMotivosAtenciones()
       {
           //conexion con COMANDA
           $motivos = DB::connection('comanda')->table('CRM_motivo_atenciones')
           ->where('sistema','CRM')->orderBy('nombre','ASC')->get();
   
           return response()->json($motivos);
       }


       public function mover_archivo(Request $request){
            $file = $request->file('file');
            $nombreoriginal = strtolower($file->getClientOriginalName());
            $file->move('files/',date('Ymd').' '.(string)$nombreoriginal);

            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

            $final_name = date('Ymd').' '.(string)$nombreoriginal.''.substr($extension,0,-3);
        
            return response()->json($final_name);
        }


        public function eliminar_archivo(Request $request){
            $file = $request["file"];

            unlink(public_path('files/'.date('Ymd').' '.$file));
        }


        public function guardarAtencion(Request $request){

            $insertar =  DB::connection('comanda')->table('CRM_atenciones')
                         ->insertGetId([
                           'num_suministro' => $request['suministro'],
                           'cliente' => $request['cliente'],
                           'contacto' => $request['contacto'],
                           'telefono' => $request['telefono'],
                           'id_tipo_atencion' => $request['tipo_atencion'],
                           'id_motivo_atencion' => $request['motivo_atencion'],
                           'titulo_atn' => $request['titulo_atn'],
                           'descripcion' => $request['descripcion_atencion'],
                           'fecha_creacion' => date('Ymd H:i'),
                           'correo' => $request["email"],
                           'fax' => $request["fax"],
                           'whatsapp' => $request["whatsapp"],
                           'sistema' => "CRM",
                           'usuario_creacion' => $request["usuario_crm"],
                           'atencion_cerrada' => "N",
                         ]);
           
            

            return response()->json($insertar);
        }


        public function guardarArchivosAtn(Request $request){

            $json = json_encode($request->all());

            $arch = json_decode($json );
          

            foreach($arch as $arc){
                $insertar =  DB::connection('comanda')->table('CRM_adjuntos')
                ->insert([
                  'atencion_id' => $arc->atencion_id,
                  'fecha_creacion' => date('Ymd H:i'),
                  'usuario_id' => $arc->usuario_id,
                  'adjunto' =>  date('Ymd').' '.strtolower(substr($arc->file,12)),
                  'descripcion' => $arc->descripcion,
                  'tipoarchivo' => 30,
                ]);
            }

            return response()->json($insertar);
           

        }



        //Obtener las atenciones (RECLAMOS) del sistema de calidad y CRM
    
        public function getAllAtenciones(Request $request)
        {

            $user = $request["alias"];
            $id = $request["id"];
            try{
                $atenciones = DB::connection('calidad')->select("SELECT case when A.reclamo_cerrado = 'S'
                                                                then 'Cerrada'
                                                                else
                                                                'Abierta'
                                                                end as estado, A.correlativo as id,A.comentario as titulo_atn,
                                                                A.telefono, A.num_suministro,A.nombres_reporta+' '+A.apellidos_reporta as contacto,
                                                                A.fecha as fecha_creacion,A.comentario as descripcion,
                                                                t.descripcion_tipo_rreclamo as tipoatencion,
                                                                m.descripcion_mreclamo as motivoatencion,CAST(A.sistema AS NVARCHAR(10)) as sistema,
                                                                FC.NOMBRES+''+FC.APELLIDOS as cliente,
                                                                B.usuario_unicom as usuarioCreacion,
                                                                A.correlativo as atencion_id,
                                                                convert(varchar(10),A.fecha,103) as fechaC
                                                                FROM EDESAL_CALIDAD.dbo.fe_calidad_reclamos A
                                                                INNER JOIN fe_calidad_tipo_rreclamo t ON A.codigo_tipo_rreclamo = t.codigo_tipo_rreclamo
                                                                INNER JOIN fe_calidad_motivo_reclamo m ON A.codigo_mreclamo = m.codigo_mreclamo
                                                                INNER JOIN FACTURACION.dbo.FE_SUMINISTROS B ON A.num_suministro = B.num_suministro
                                                                INNER JOIN FACTURACION.dbo.FE_CLIENTE FC ON FC.CODIGO_CLIENTE = B.CODIGO_CLIENTE
                                                                WHERE B.usuario_unicom ='".$user."'

                                                                UNION

                                                                SELECT case when c.atencion_cerrada = 'S'
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
                                                                WHERE c.usuario_creacion ='".$user."'
                                                                UNION

                                                                SELECT case when c.atencion_cerrada = 'S'
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
                                                                LEFT JOIN comanda_db.dbo.crm_clientes cl on cl.empresa = c.cliente
                                                                LEFT JOIN comanda_db.dbo.users u on u.id = cl.usuario_crm
                                                                LEFT JOIN comanda_db.dbo.CRM_motivo_atenciones m ON m.id = c.id_motivo_atencion
                                                                LEFT JOIN comanda_db.dbo.CRM_tipo_atenciones t ON t.id = c.id_tipo_atencion
                                                                where u.alias ='".$user."' and c.usuario_creacion != '".$user."'

                                                                UNION

                                                                SELECT  case when c.atencion_cerrada = 'S'
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
                                                                inner join comanda_db.dbo.crm_clientes cl on cl.empresa = c.cliente
                                                                inner join comanda_db.dbo.crm_cliente_usuario ccu on ccu.cliente = cl.id
                                                                WHERE ccu.usuario = ".$id."
                                                                order by 2 desc
                                                                ");

                return response()->json($atenciones);

            }catch(\Exception $e)
            {
                return response()->json($e->getMessage());
            }



        }
    




        public function getDetalleAtencion(Request $request){

            $id = $request["atencion_id"];

            $atenciones  = DB::connection('comanda')->select("
            SELECT c.*,case when c.atencion_cerrada = 'S'
            then 'Cerrada'
            else
            'Abierta'
            end as estado,
            convert(varchar(10),c.fecha_creacion,103) as fechaC,
            u.nombre+' '+u.apellido as nomUsuario
            FROM comanda_db.dbo.CRM_atenciones c
            LEFT JOIN comanda_db.dbo.CRM_motivo_atenciones m ON m.id = c.id_motivo_atencion
            LEFT JOIN comanda_db.dbo.CRM_tipo_atenciones t ON t.id = c.id_tipo_atencion
            LEFT JOIN comanda_db.dbo.users u on u.alias = c.usuario_creacion 
                WHERE c.id ='".$id."'
            ");
   
           return response()->json($atenciones);

        }
}



?>