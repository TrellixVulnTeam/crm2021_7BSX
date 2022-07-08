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
         inner join comanda_db.dbo.CRM_atenciones ca on ca.id = e.atencion_id 
         inner join comanda_db.dbo.CRM_motivo_atenciones cma on cma.id = ca.id_motivo_atencion 
         where e.usuario_crm = ".$id." and cma.sistema = 'CRM'
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
           inner join comanda_db.dbo.CRM_atenciones ca on ca.id = e.atencion_id 
           inner join comanda_db.dbo.CRM_motivo_atenciones cma on cma.id = ca.id_motivo_atencion 
           where u.alias = '".$user."' and cma.sistema = 'CRM' and e.usuario_crm != 
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
         inner join comanda_db.dbo.CRM_atenciones ca on ca.id = e.atencion_id 
         inner join comanda_db.dbo.CRM_motivo_atenciones cma on cma.id = ca.id_motivo_atencion 
         WHERE ccu.usuario =".$id."  and cma.sistema = 'CRM'
         order by e.id desc
             ");
 
 
         return response()->json($eventos);

    }


    public function getAllEventosGC(Request $request){

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
          as usuario_creacion,
         (select fcto.descripcion_tipo_ordentrabajo  from EDESAL_CALIDAD.dbo.fe_calidad_tipo_ordentrabajo fcto where fcto.codigo_tipo_ordentrabajo = cma.orden_trabajo  ) 
         as descripcion_orden
          from crm_eventos e
         inner join crm_estados_eventos as estado on estado.id = e.estado
         inner join comanda_db.dbo.users u on u.id = e.usuario_crm
         inner join comanda_db.dbo.CRM_atenciones ca on ca.id = e.atencion_id 
         inner join comanda_db.dbo.CRM_motivo_atenciones cma on cma.id = ca.id_motivo_atencion 
         where cma.sistema = 'GEST. COMERCIAL'
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



    public function guardarEventoByAtencion(Request $request){

        $atencion_id = $request["atencion_id"];


        $titulo_atn = DB::connection('comanda')->table('CRM_atenciones')->select('CRM_atenciones.titulo_atn')->where('CRM_atenciones.id',$atencion_id)->first();
        $descripcion_atn = DB::connection('comanda')->table('CRM_atenciones')->select('CRM_atenciones.descripcion')->where('CRM_atenciones.id',$atencion_id)->first();
        $usuario_atn =  DB::connection('comanda')->table("CRM_atenciones")
        ->join('users','users.alias','=','CRM_atenciones.usuario_creacion')
        ->select("users.id")->where('CRM_atenciones.id',$atencion_id)->first();
        $cliente_atn = DB::connection('comanda')->table('CRM_atenciones')->select('CRM_atenciones.cliente')->where('CRM_atenciones.id',$atencion_id)->first();
        $nis_atn = DB::connection('comanda')->table('CRM_atenciones')->select('CRM_atenciones.num_suministro')->where('CRM_atenciones.id',$atencion_id)->first();


        $insertar =  DB::connection('comanda')->table('CRM_eventos')
                         ->insertGetId([
                           'num_suministro' => $nis_atn->num_suministro,
                           'cliente' => $cliente_atn->cliente,
                           'usuario_crm' => $usuario_atn->id,
                           'descripcion' => $descripcion_atn->descripcion,
                           'fecha_creacion' => date('Ymd H:i'),
                           'estado' => 1,
                           'atencion_id' =>     $atencion_id,
                           'eventoTitulo' => $titulo_atn->titulo_atn,
                         ]);

        return response()->json($atencion_id);
    }


    public function guardarEventoGC(Request $request){

        $atencion_id = $request["atencion_id"];
        $codigo_sucursal = $request["codigo_sucursal"];

        $titulo_atn = DB::connection('comanda')->table('CRM_atenciones')->select('CRM_atenciones.titulo_atn')->where('CRM_atenciones.id',$atencion_id)->first();
        $descripcion_atn = DB::connection('comanda')->table('CRM_atenciones')->select('CRM_atenciones.descripcion')->where('CRM_atenciones.id',$atencion_id)->first();
        $usuario_atn =  DB::connection('comanda')->table("CRM_atenciones")
        ->join('users','users.alias','=','CRM_atenciones.usuario_creacion')
        ->select("users.id")->where('CRM_atenciones.id',$atencion_id)->first();
        $cliente_atn = DB::connection('comanda')->table('CRM_atenciones')->select('CRM_atenciones.cliente')->where('CRM_atenciones.id',$atencion_id)->first();
        $nis_atn = DB::connection('comanda')->table('CRM_atenciones')->select('CRM_atenciones.num_suministro')->where('CRM_atenciones.id',$atencion_id)->first();


        $insertar =  DB::connection('comanda')->table('CRM_eventos')
                         ->insertGetId([
                           'num_suministro' => $nis_atn->num_suministro,
                           'cliente' => $cliente_atn->cliente,
                           'usuario_crm' => $usuario_atn->id,
                           'descripcion' => $descripcion_atn->descripcion,
                           'fecha_creacion' => date('Ymd H:i'),
                           'fecha_compromiso' => date('Ymd H:i'),
                           'estado' => 3,
                           'atencion_id' =>     $atencion_id,
                           'eventoTitulo' => $titulo_atn->titulo_atn,
                           'ap_nombre' => $request["ap_nombre"],
                           'ap_profesion' => $request["ap_profesion"],
                           'ap_dui' => $request["ap_dui"],
                           'ap_nit' => $request["ap_nit"],
                           'ap_domicilio' => $request["ap_domicilio"],
                           'ap_actua' => $request["ap_actua"],
                           'ap_departamento' => $request["ap_departamento"],
                         ]);

        return response()->json($atencion_id);
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


    public function getEventosAsociados(Request $request){

        
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
         where e.atencion_id = ".$id."
       
        ");
 

        return response()->json($eventos);
 

    }
    

    public function getAdjuntosEventos(Request $request){
        $id = $request["evento_id"];

        //conexion con COMANDA
        $adjuntos = DB::connection('comanda')->select("
        select * from CRM_adjuntos where evento_id = ".$id."
      
       ");


       return response()->json($adjuntos);
    }


    public function getConteoEvento(Request $request){
        $user = $request["alias"];
        $id = $request["id"];
        try{
            $evento = json_encode(DB::connection('comanda')->select("select(
                (select count(id) as conteo from crm_eventos
                where estado in (1,3)
                and usuario_crm = ".$id." )
                +
                (select count(ev.id) as conteo from crm_eventos ev
                inner join crm_clientes cl on cl.empresa = ev.cliente
                inner join crm_cliente_usuario cu on cu.cliente = cl.id
                    where ev.estado in (1,3)
                    and cu.usuario =  ".$id."
                    and ev.usuario_crm !=".$id." )
                    +
            
                (SELECT count (e.id) from comanda_db.dbo.crm_eventos e
                inner join comanda_db.dbo.crm_clientes c on c.empresa = e.cliente
                inner join comanda_db.dbo.users u on u.id = c.usuario_crm
                inner join comanda_db.dbo.CRM_estados_eventos as ee on ee.id = e.estado
                where u.alias = '".$user."' and e.usuario_crm != 
                (select id from comanda_db.dbo.users where estado = 1 and alias = '".$user."')
                 and e.estado in (1,3) )
                ) as conteo
            "));

            $arrayJson = [];
            foreach (json_decode($evento, true) as $value){
                $arrayJson = $value;
            }
    
            return $arrayJson;

        }catch(\Exception $e)
        {
            return response()->json($e->getMessage());
        }
    }


    public function getUsuariosEventos(){
        $getDatos =  DB::connection('comanda')->select("
            select u.alias as usuario, (select count(ce2.id) from CRM_eventos ce2  where ce2.usuario_crm = ce.usuario_crm and ce2.usuario_crm is not null) as eventos
            from CRM_eventos ce
            inner join users u on u.id = ce.usuario_crm 
            where ce.usuario_crm is not null and ce.usuario_crm  != ''
            GROUP by u.alias, ce.usuario_crm order by 2 desc
        ");

        return response()->json($getDatos);
    }


    public function getTicketsPendientes(Request $request){
        $id = $request["id"];

        //conexion con COMANDA
        $tickets = DB::connection('comanda')->select("
        select t.*,e.nombre as estado,
        convert(varchar(10),t.fechasolicitud, 103) as fecha_creacionD,
        convert(varchar(10),t.fechasolaprox, 103) as fechasolaproxD,
        substring(convert(varchar,t.fechasolaprox, 114),1,5) as horaAproxD,
        (select ev.id from  crm_eventos ev 
        inner join tickets tc on tc.evento_id = ev.id
        where tc.id = t.id) as evento_id,
        (select a.id from crm_atenciones a 
        inner join crm_eventos ev on ev.atencion_id = a.id
        inner join tickets tc on tc.evento_id = ev.id
        where tc.id = t.id) as atencion_id,
        u.nombre as nombreasignado, u.apellido as apellidoasignado,
        u.nombre +' '+ u.apellido as asignado,
        us.nombre +' '+ us.apellido as solicitante,
        us.nombre as nombresoli, us.apellido as apellidosoli from tickets t
        inner join estados e on e.id = t.estado_id
        inner join users u on u.id = t.us_asignado
        inner join users us on us.id = t.us_solicitante 
        where t.estado_id not in (8,9,10,12) and t.evento_id = ".$id."
        order by t.id desc
       ");


       return response()->json($tickets);
    }


    public function guardarResolucion(Request $request){

        $editar =  DB::connection('comanda')->table('CRM_eventos')
                    ->where('id', $request['evt_id'])
                         ->update([
                            'resolucion' => $request['resolucion_evt'],
                            'estado' => 2
                            ]);

        return response()->json($editar);
    }




    
    public function guardarResolucion_gc(Request $request){

        $fechaResSinFormato = date_create_from_format('Y-m-d',$request['fecha_cierre']);

        $fechaResConFormato = date_format($fechaResSinFormato,'Ymd');

      

        $editar =  DB::connection('comanda')->table('CRM_eventos')
                    ->where('id', $request['evento_id'])
                         ->update([
                            'resolucion' => "El cliente firmó el archivo",
                            'fecha_resolucion' => $fechaResConFormato,
                            ]);
        
        $insertar =  DB::connection('comanda')->table('CRM_adjuntos')
        ->insert([
          'atencion_id' => $request['atencion_id'],
          'evento_id' => $request['evento_id'],
          'fecha_creacion' => $fechaResConFormato,
          'usuario_id' => $request['user_id_save'],
          'adjunto' =>  date('Ymd').' '.strtolower(substr($request['file'],12)),
          'descripcion' => "Carta firmada por cliente para gestiones comerciales",
          'tipoarchivo' => 30,
        ]);


        $getOrden = DB::connection('comanda')->table("CRM_motivo_atenciones")
        ->join('CRM_atenciones', 'CRM_atenciones.id_motivo_atencion','=','CRM_motivo_atenciones.id')
        ->select("CRM_motivo_atenciones.orden_trabajo as orden")->where('CRM_atenciones.id', $request['atencion_id'])->first();


        $orden = $getOrden->orden;
        $codigo_sucursal = $request["user_sucursal"];
        $user = $request["user_alias"];
        $nis = $request["num_suministro"];
        $id_evento = $request["evento_id"];
        $id_atencion = $request["atencion_id"];


        //$execProcedure =  DB::connection('calidad')->statement("EXEC [dbo].[sp_create_calidad_order_crm] 
        //'".$orden."','".$user."',".$nis.", '".$codigo_sucursal."', ".$id_evento.", ".$id_atencion." ");






        return response()->json($insertar);
    }

}


?>