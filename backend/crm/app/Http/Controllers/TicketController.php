<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;
use Mail;

class TicketController extends Controller
{

    public function getAllTickets(Request $request){

        $user = $request["alias"];
        $id = $request["id"];

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
        where t.categoria_id = 8 and (t.us_solicitante = ".$id ."
        or t.us_asignado= ".$id .")
        order by t.id desc
                ");

        return response()->json($tickets);

    }

    public function guardarTicket(Request $request){

        $fechaRes = $request["fecha_resolucion"];


        if($fechaRes == '1900-01-01 00:00:00.000'){
            $fechaResConFormato = null;
        }
        
        else if(is_null($fechaRes)){
            $fechaResConFormato = null;
        }else{
            $fechaResSinFormato = date_create_from_format('Y-m-d',$fechaRes);

            $fechaResConFormato = date_format($fechaResSinFormato,'Ymd');
        } 


        $id_usuario = DB::connection('comanda')->table("users")
        ->select("users.id")->where('users.alias',$request['asignado_tck'])->first();

        $insertar =  DB::connection('comanda')->table('tickets')
        ->insertGetId([
          'titulo' => $request['titulo_tck'],
          'descripcion' => $request['descripcion_tck'],
          'us_asignado' => $id_usuario->id,
          'us_solicitante' =>$request['usuario_crm'],
          'fechasolaprox' => $fechaResConFormato.' '.$request['hora_resolucion'],
          'fechasolicitud' => date('Ymd H:i'),
          'creador_ticket' => $request['usuario_crm'],
          'categoria_id' => 8,
          'estado_id' => 2,
          'evento_id' => $request["id_evento"],
        ]);



        $fechaAproxSinFormato = date_create_from_format('Y-m-d',$fechaRes);

        $fechaAproxConFormato = date_format($fechaAproxSinFormato,'Ymd');
        /*$ultimoticket = DB::connection('comanda')->select("select top 1 id, convert(varchar(10),t.fechasolaprox, 103) as fechasolaproxD from tickets t order by 1 desc")
        ->first();*/

        $ultimoticket = DB::connection('comanda')->table('tickets')->select('tickets.id')->orderBy('tickets.id','desc')->first();


        $correo_asignado = DB::connection('comanda')->table("tickets")
        ->join('users','users.id','=','tickets.us_asignado')
        ->select("users.correo")->orderBy('tickets.id','desc')->first();


        $nombre_soli = DB::connection('comanda')->table("tickets")
        ->join('users','users.id','=','tickets.us_solicitante')
        ->select("users.nombre")->orderBy('tickets.id','desc')->first();

        $apellido_soli = DB::connection('comanda')->table("tickets")
        ->join('users','users.id','=','tickets.us_solicitante')
        ->select("users.apellido")->orderBy('tickets.id','desc')->first();


        $nombre_asig = DB::connection('comanda')->table("tickets")
        ->join('users','users.id','=','tickets.us_asignado')
        ->select("users.nombre")->orderBy('tickets.id','desc')->first();

        $apellido_asig = DB::connection('comanda')->table("tickets")
        ->join('users','users.id','=','tickets.us_asignado')
        ->select("users.apellido")->orderBy('tickets.id','desc')->first();


        $user_soli = $nombre_soli->nombre.' '.$apellido_soli->apellido;
        $user_asig = $nombre_asig->nombre.' '.$apellido_asig->apellido;
        $correo_asig = $correo_asignado->correo;



        //detalle de evento
        $id_evento = DB::connection('comanda')->table("tickets")
        ->join('CRM_eventos','CRM_eventos.id','=','tickets.evento_id')
        ->select("CRM_eventos.id")->orderBy('tickets.id','desc')->first();

        $titulo_evento = DB::connection('comanda')->table("tickets")
        ->join('CRM_eventos','CRM_eventos.id','=','tickets.evento_id')
        ->select("CRM_eventos.eventoTitulo")->orderBy('tickets.id','desc')->first();


        //detalle atencion
        $id_atencion = DB::connection('comanda')->table("tickets")
        ->join('CRM_eventos','CRM_eventos.id','=','tickets.evento_id')
        ->join('CRM_atenciones','CRM_atenciones.id','=','CRM_eventos.atencion_id')
        ->select("CRM_atenciones.id")->orderBy('tickets.id','desc')->first();


        $titulo_atencion = DB::connection('comanda')->table("tickets")
        ->join('CRM_eventos','CRM_eventos.id','=','tickets.evento_id')
        ->join('CRM_atenciones','CRM_atenciones.id','=','CRM_eventos.atencion_id')
        ->select("CRM_atenciones.titulo_atn")->orderBy('tickets.id','desc')->first();

        Session::put('id',$insertar);
        Session::put('titulo',$request['titulo_tck']);
        Session::put('descripcion',$request['descripcion_tck']);
        Session::put('fechaSolucionaprox',$fechaAproxConFormato);
        Session::put('fechaSolicitud',date('Ymd H:i'));
        Session::put('solicitante',$user_soli);
        Session::put('asignado',$user_asig);
        Session::put('correo',$correo_asig);
        Session::put('id_evento',$id_evento->id);
        Session::put('titulo_evento',$titulo_evento->eventoTitulo);
        Session::put('id_atencion',$id_atencion->id);
        Session::put('titulo_atencion',$titulo_atencion->titulo_atn);

        $usuarioprincipal = DB::connection('comanda')->select("SELECT * from users where id=".$id_usuario->id."");
        $usuariosolicitante = DB::connection('comanda')->select("SELECT * from users where id=".$request['usuario_crm']."");
       

        Mail::send('Correos.nuevoticket', ['usuarioprincipal' => $usuarioprincipal,'usuariosolicitante'=>$usuariosolicitante], 
        function ($m) use ($usuarioprincipal,$usuariosolicitante) {

            $m->from('comanda@edesal.com', Session::get('solicitante'));

            $m->to(Session::get('correo'), '')->subject('Nuevo ticket - '.Session::get('titulo'));
        });

       
        return response()->json($correo_asig);
    }


    public function getDetalleTicket(Request $request){


        $id = $request["id"];

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
        u.nombre +' '+ u.apellido as apellidoasignado,
        us.nombre as nombresoli, us.apellido as apellidosoli from tickets t
        inner join estados e on e.id = t.estado_id
        inner join users u on u.id = t.us_asignado
        inner join users us on us.id = t.us_solicitante 
        where t.id = ".$id ."
                ");

        return response()->json($tickets);

    }



    public function getTicketsAsociados(Request $request){
        $id = $request["id"];

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
        u.nombre +' '+ u.apellido as apellidoasignado,
        us.nombre +' '+ us.apellido as apellidosoli from tickets t
        inner join estados e on e.id = t.estado_id
        inner join users u on u.id = t.us_asignado
        inner join users us on us.id = t.us_solicitante 
        where t.evento_id = ".$id."
                ");

        return response()->json($tickets);
    }


    public function getConteoTickets(Request $request){
        $user = $request["id"];

        try{
            $ticket = json_encode(DB::connection('comanda')->select("select(
                (select count(id) as conteo from tickets
                where estado_id < 8
                and categoria_id = 8 
                and us_solicitante = ".$user." )
                +
                (select count(id) as conteo from tickets
                where estado_id < 8
                and categoria_id = 8 
                and (us_asignado = ".$user.")
                 ) )
                as conteo
            "));

            $arrayJson = [];
            foreach (json_decode($ticket, true) as $value){
                $arrayJson = $value;
            }
    
            return $arrayJson;

        }catch(\Exception $e)
        {
            return response()->json($e->getMessage());
        }
    }



}


?>