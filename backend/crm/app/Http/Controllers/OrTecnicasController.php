<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class OrTecnicasController extends Controller
{

    public function getAllOrdenes(){
        
        $ordenes = DB::connection('comanda')->select("
        SELECT  cot2.*,u.apellido as apellidosolicitante,u.nombre as nombresolicitante,
        convert(varchar(10),cot2.fecha_solicitud, 103) as fecha_creacionD from CRM_ordenes_trabajo cot2 
        inner join users u on u.id = cot2.solicitante 
        order by cot2.id desc
        ");

    return response()->json($ordenes);
    }


    public function guardarTicketOrder(Request $request){

        $fechaRes = $request["fecha_resolucion_orden"];


        if($fechaRes == '1900-01-01 00:00:00.000'){
            $fechaResConFormato = null;
        }
        
        else if(is_null($fechaRes)){
            $fechaResConFormato = null;
        }else{
            $fechaResSinFormato = date_create_from_format('Y-m-d',$fechaRes);

            $fechaResConFormato = date_format($fechaResSinFormato,'Ymd');
        } 


        $insertar =  DB::connection('comanda')->table('CRM_ordenes_trabajo')
        ->insertGetId([
          'solicitud' => $request['trabajo_solicitado'],
          'fecha_solicitud' => date('Ymd H:i'),
          'fecha_resolucion' => $fechaResConFormato.' '.$request['hora_resolucion_orden'],
          'direccion' =>$request['direccion_orden'],
          'zona_agencia' => $request['unidad_solicita'],
          'gerencia_solicita' => $request['gerencia_solicita'],
          'contratista' => $request['adjud_contratista'],
          'persona_contacto' => $request['contacto_orden'],
          'telefono_contacto' => $request['tel_contacto_orden'],
          'observaciones' => $request['observaciones_or'],
          'solicitante' => $request['usuario_crm'],
          'asignado' => $request["asignado_tck"],
          'evento' => $request["id_evento"],
          'ticket_id' => $request["id"],
        ]);

        return response()->json($insertar);

    }
    
}

?>