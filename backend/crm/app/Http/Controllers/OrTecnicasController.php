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
        SELECT  cot2.*,u.apellido as apellidosolicitante,u.nombre as nombresolicitante, u.nombre + ' '+u.apellido as solicitante,
        convert(varchar(10),cot2.fecha_solicitud, 103) as fecha_creacionD ,
        convert(varchar(10),cot2.fecha_resolucion, 103) as fecha_resolucionD,

        case when cot2.autorizado_1 is null
            then
            'Pendiente'
            when cot2.autorizado_1 = 1
            then
            'Aprobada'
            else
            'Denegada'

            end as aprobTecnica,


			case when cot2.autorizado_2 is null
            then
            'Pendiente'
            when cot2.autorizado_2 = 1
            then
            'Aprobada'
            else
            'Denegada'

            end as aprobVentas,
			CONCAT(convert(varchar, fechaAuto1, 103), ' ', substring(convert(varchar,fechaAuto1, 114),1,5)) as fecha_tecnica_aprob,
			CONCAT(convert(varchar, fechaAuto2, 103), ' ', substring(convert(varchar,fechaAuto2, 114),1,5)) as fecha_comercial_aprob,
            CONCAT(utec.nombre, ' ', utec.apellido) as usuario_tec, CONCAT(ucom.nombre, ' ', ucom.apellido) as usuario_comer
			

        from CRM_ordenes_trabajo cot2 
        inner join users u on u.id = cot2.solicitante 
        left join users utec on utec.id = cot2.usuario_tec 
        left join users ucom on ucom.id = cot2.usuario_comer 
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
          'gerencia_solicita' => $request['gerencia_solicita'],
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


    public function aprobarOrdenTecnica(Request $request){

        $editar =  DB::connection('comanda')->table('CRM_ordenes_trabajo')
                    ->where('id', $request['id'])
                         ->update([
                            'autorizado_1' => 1,
                            'comentarioaprob_admin' => $request['comentario'],
                            'fechaAuto1' => date('Ymd H:i'),
                            'usuario_tec' => $request['user'],
                            ]);

        return response()->json($editar);
    }


    public function aprobarOrdenVentas(Request $request){

        $editar =  DB::connection('comanda')->table('CRM_ordenes_trabajo')
                    ->where('id', $request['id'])
                    ->update([
                        'autorizado_2' => 1,
                        'comentarioaprob_ventas' => $request['comentario'],
                        'fechaAuto2' => date('Ymd H:i'),
                        'usuario_comer' => $request['user'],
                        ]);

        return response()->json($editar);
    }


    public function denegarOrdenTecnica(Request $request){

        $editar =  DB::connection('comanda')->table('CRM_ordenes_trabajo')
        ->where('id', $request['id'])
        ->update([
            'autorizado_1' => 0,
            'comentariodenegacion' => $request['comentario'],
            'fechaAuto1' => date('Ymd H:i'),
            'usuario_tec' => $request['user'],
            ]);

        return response()->json($editar);
    }

    public function denegarOrdenVentas(Request $request){

        $editar =  DB::connection('comanda')->table('CRM_ordenes_trabajo')
        ->where('id', $request['id'])
        ->update([
            'autorizado_2' => 0,
            'comentariodenegacion_ventas' => $request['comentario'],
            'fechaAuto2' => date('Ymd H:i'),
            'usuario_comer' => $request['user'],
            ]);

        return response()->json($editar);
    }


    public function imprimirOrden(Request $request)
    {
        $orden = DB::connection('comanda')
            ->table('CRM_ordenes_trabajo as orden')
            ->leftjoin('users as u','u.id','=','orden.solicitante')
            ->leftjoin('users as utec','utec.id','=','orden.usuario_tec')
            ->leftjoin('users as ucom','ucom.id','=','orden.usuario_comer')
            ->leftjoin('CRM_eventos as e','e.id','=','orden.evento')
            ->select('u.nombre as solicitantenombre','u.apellido as solicitanteapellido','orden.*','e.cliente as cliente',
             'utec.nombre as nom_tec', 'utec.apellido as ape_tec', 'ucom.nombre as nom_comer', 'ucom.apellido as ape_comer', )
            ->where('orden.id',$request['id'])
            ->first();

        $view =  \View::make('pdf.ordentrabajo', compact('orden'))->render();

        $pdf = \App::make('dompdf.wrapper');

        $pdf->loadHTML($view);

        //return response()->json($iva);

        return $pdf->stream('hojacontrol.pdf');
    }

    
}


?>