<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class EventosController extends Controller
{

    public function getAllEventos(Request $request){

        $user = $request["alias"];
        $id = $request["id"];

         //conexion con COMANDA
         $eventos = DB::connection('comanda')->select("
         select e.*, estado.nombre as estado,e.eventoTitulo as evTitulo,
         e.id as evento_id,
         convert(varchar(10),e.fecha_creacion, 103) as fecha_creacionD,
         (select count(id) from tickets where evento_id = e.id
         and estado_id != 9) as conteoTickets,
         convert(varchar(10),e.fecha_compromiso,103) as fecha_compromisoF,
         convert(varchar(10),e.fecha_resolucion,103) as fecha_resolucionF,
         (select alias from comanda_db.dbo.users where id = e.usuario_crm )
          as usuario_creacion from crm_eventos e
         inner join crm_estados_eventos as estado on estado.id = e.estado
         inner join comanda_db.dbo.users u on u.id = e.usuario_crm
         where e.usuario_crm = ".$id."
         union
         SELECT e.*,ee.nombre as estado,e.eventoTitulo as evTitulo,
         e.id as evento_id,
         convert(varchar(10),e.fecha_creacion, 103) as fecha_creacionD,
         (select count(id) from tickets where evento_id = e.id and estado_id != 9)  as conteoTickets,
         convert(varchar(10),e.fecha_compromiso,103) as fecha_compromisoF,
         convert(varchar(10),e.fecha_resolucion,103) as fecha_resolucionF,
           (select alias from comanda_db.dbo.users where id = e.usuario_crm ) as usuario_creacion from 
           comanda_db.dbo.crm_eventos e
           inner join comanda_db.dbo.crm_clientes c on c.empresa = e.cliente
           inner join comanda_db.dbo.users u on u.id = c.usuario_crm
           inner join comanda_db.dbo.CRM_estados_eventos as ee on ee.id = e.estado
           where u.alias = '".$user."' and e.usuario_crm != 
           (select id from comanda_db.dbo.users where estado = 1 and alias = '".$user."')
          
         union 
         SELECT e.*,ee.nombre as estado,e.eventoTitulo as evTitulo,
         e.id as evento_id,
         convert(varchar(10),e.fecha_creacion, 103) as fecha_creacionD,
         (select count(id) from tickets where evento_id = e.id) as conteoTickets,
         convert(varchar(10),e.fecha_compromiso,103) as fecha_compromisoF,
         convert(varchar(10),e.fecha_resolucion,103) as fecha_resolucionF,
         (select alias from comanda_db.dbo.users where id = e.usuario_crm ) as usuario_creacion from 
         comanda_db.dbo.crm_eventos e
         inner join comanda_db.dbo.crm_clientes c on c.empresa = e.cliente
         inner join crm_cliente_usuario ccu on ccu.cliente = c.id
         inner join comanda_db.dbo.users u on u.id = c.usuario_crm
         inner join comanda_db.dbo.CRM_estados_eventos as ee on ee.id = e.estado
         WHERE ccu.usuario =".$id."    
         order by e.id desc
             ");
 
 
         return response()->json($eventos);

    }

    public function guardarEvento(Request $request){

        $fechaRes = $request["fecha_resolucion"];
        $fechaCom = $request["fecha_compromiso"];


        if($fechaRes == '1900-01-01 00:00:00.000' || $fechaCom == '1900-01-01 00:00:00.000'){
            $fechaResConFormato = null;
            $fechaComConFormato = null;
        }
        
        else if(is_null($fechaRes) || is_null($fechaCom)){
            $fechaResConFormato = null;
            $fechaComConFormato = null;
        }else{
            $fechaResSinFormato = date_create_from_format('Y-m-d',$fechaRes);

            $fechaResConFormato = date_format($fechaResSinFormato,'Ymd');

            $fechaComSinFormato = date_create_from_format('Y-m-d',$fechaCom);

            $fechaComConFormato = date_format($fechaComSinFormato,'Ymd');
        } 

        $insertar =  DB::connection('comanda')->table('CRM_eventos')
                         ->insertGetId([
                           'num_suministro' => $request['suministro'],
                           'cliente' => $request['cliente'],
                           'fecha_compromiso' => $fechaComConFormato.' '.$request['hora_compromiso'],
                           'fecha_resolucion' => $fechaResConFormato.' '.$request['hora_resolucion'],
                           'usuario_crm' => $request['usuario_crm'],
                           'descripcion' => $request['descripcion_evt'],
                           'fecha_creacion' => date('Ymd H:i'),
                           'estado' => 1,
                           'atencion_id' => $request['atencion_id'],
                           'eventoTitulo' => $request["titulo_evt"],
                         ]);

        return response()->json($insertar);
    }


    public function guardarArchivosEvt(Request $request){

        $json = json_encode($request->all());

        $arch = json_decode($json );
      

        foreach($arch as $arc){
            $insertar =  DB::connection('comanda')->table('CRM_adjuntos')
            ->insert([
              'evento_id' => $arc->evento_id,
              'fecha_creacion' => date('Ymd H:i'),
              'usuario_id' => $arc->usuario_id,
              'adjunto' =>  date('Ymd').' '.strtolower(substr($arc->file,12)),
              'descripcion' => $arc->descripcion,
              'tipoarchivo' => 30,
            ]);
        }

        return response()->json($insertar);
       

    }



    public function getDetalleEvento(Request $request){

        
        $id = $request["evento_id"];

         //conexion con COMANDA
         $eventos = json_encode(DB::connection('comanda')->select("
         select e.*, estado.nombre as estado,e.eventoTitulo as evTitulo,
         convert(varchar(10),e.fecha_creacion, 103) as fecha_creacionD,
         (select count(id) from tickets where evento_id = e.id
         and estado_id != 9) as conteoTickets,
         convert(varchar(10),e.fecha_compromiso,103) as fecha_compromisoF,
         convert(varchar(10),e.fecha_resolucion,103) as fecha_resolucionF,
         (select alias from comanda_db.dbo.users where id = e.usuario_crm )
          as usuario_creacion from crm_eventos e
         inner join crm_estados_eventos as estado on estado.id = e.estado
         inner join comanda_db.dbo.users u on u.id = e.usuario_crm
         where e.id = ".$id."
       
        "));
 

        $arrayJson = [];
        foreach (json_decode($eventos, true) as $value){
            $arrayJson = $value;
        }

        return $arrayJson;
 

    }



}


?>