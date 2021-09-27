<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class TicketController extends Controller
{

    public function getAllTickets(Request $request){

        $user = $request["alias"];
        $id = $request["id"];

        $tickets = DB::connection('comanda')->select("
        select t.*,e.nombre as estado,
        convert(varchar(10),t.fechasolicitud, 103) as fecha_creacionD,
        (select a.id from crm_atenciones a 
        inner join crm_eventos ev on ev.atencion_id = a.id
        inner join tickets tc on tc.evento_id = ev.id
        where tc.id = t.id) as idAte,
        u.nombre as nombreasignado, u.apellido as apellidoasignado,
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

        $insertar =  DB::connection('comanda')->table('tickets')
        ->insertGetId([
          'titulo' => $request['titulo_tck'],
          'descripcion' => $request['descripcion_tck'],
          'us_asignado' => $request['asignado_tck'],
          'us_solicitante' =>$request['usuario_crm'],
          'fechasolaprox' => $fechaResConFormato.' '.$request['hora_resolucion'],
          'fechasolicitud' => date('Ymd H:i'),
          'creador_ticket' => $request['usuario_crm'],
          'categoria_id' => 8,
          'estado_id' => 2,
          'evento_id' => $request["id_evento"],
        ]);

        return response()->json($insertar);
    }




}


?>