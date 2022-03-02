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

            case when cot2.autorizado_3 is null
            then
            'Pendiente'
            when cot2.autorizado_3 = 1
            then
            'Aprobada'
            else
            'Denegada'

            end as aprobGg,
            case when cot2.presupuesto is null
            then
            '$ 0.00'
            else

            '$ ' + LTRIM(str(cot2.presupuesto,12,2))
            end as presupuesto,

			case when cot2.ingr_mensuales is null
            then
            '$ 0.00'
            else

            '$ ' + LTRIM(str(cot2.ingr_mensuales,12,2))
            end as ingr_mensuales,

			case when cot2.ingr_anuales is null
            then
            '$ 0.00'
            else

            '$ ' + LTRIM(str(cot2.ingr_anuales,12,2))
            end as ingr_anuales,

			case when cot2.anios_est is null
            then
            '0'
            else
                LTRIM(cot2.anios_est)
            end as anios_est,
			convert(varchar, fechaAuto1, 103) as fecha_tecnica_aprob,
			convert(varchar, fechaAuto2, 103) as fecha_comercial_aprob,
            convert(varchar, fechaAuto3, 103) as fecha_gg_aprob,
            CONCAT(utec.nombre, ' ', utec.apellido) as usuario_tec, CONCAT(ucom.nombre, ' ', ucom.apellido) as usuario_comer,
			CONCAT(ugg.nombre, ' ', ugg.apellido) as usuario_gg,
            (select titulo from tickets where id = cot2.ticket_id ) as ticket,
            (select eventoTitulo from CRM_eventos where id = cot2.evento ) as evento_tt,
            (
            select at.id from CRM_eventos ev 
            inner join CRM_atenciones at on at.id = ev.atencion_id
            where ev.id = cot2.evento
            ) as id_atencion,
            (
            select at.descripcion from CRM_eventos ev 
            inner join CRM_atenciones at on at.id = ev.atencion_id
            where ev.id = cot2.evento
            ) as atencion,
            (
            select at.cliente from CRM_eventos ev 
            inner join CRM_atenciones at on at.id = ev.atencion_id
            where ev.id = cot2.evento
            ) as cliente

        from CRM_ordenes_trabajo cot2 
        inner join users u on u.id = cot2.solicitante 
        left join users utec on utec.id = cot2.usuario_tec 
        left join users ucom on ucom.id = cot2.usuario_comer 
        left join users ugg on ugg.id = cot2.usuario_gg
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

        $id_usuario = DB::connection('comanda')->table("users")
        ->select("users.id")->where('users.alias',$request['asignado_tck'])->first();




        $insertar =  DB::connection('comanda')->table('CRM_ordenes_trabajo')
        ->insertGetId([
          'solicitud' => $request['trabajo_solicitado'],
          'fecha_solicitud' => date('Ymd H:i'),
          'fecha_resolucion' => $fechaResConFormato,
          'direccion' =>$request['direccion_orden'],
          'gerencia_solicita' => $request['gerencia_solicita'],
          'persona_contacto' => $request['contacto_orden'],
          'telefono_contacto' => $request['tel_contacto_orden'],
          'observaciones' => $request['observaciones_or'],
          'solicitante' => $request['usuario_crm'],
          'asignado' => $id_usuario->id,
          'evento' => $request["id_evento"],
          'ticket_id' => $request["id"],
          'presupuesto' => $request["presupuesto"],
          'ingr_mensuales' => $request["ingr_mensuales"],
          'ingr_anuales' => $request["ingr_anuales"],
          'anios_est' => $request["anios_est"],
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


    public function aprobarOrdenGG(Request $request){

        $editar =  DB::connection('comanda')->table('CRM_ordenes_trabajo')
                    ->where('id', $request['id'])
                    ->update([
                        'autorizado_3' => 1,
                        'comentarioaprob_gg' => $request['comentario1gg'],
                        'fechaAuto3' => date('Ymd H:i'),
                        'usuario_gg' => $request['user'],
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


    public function denegarOrdenGG(Request $request){

        $editar =  DB::connection('comanda')->table('CRM_ordenes_trabajo')
        ->where('id', $request['id'])
        ->update([
            'autorizado_3' => 0,
            'comentariodenegacion_gg' => $request['comentario1gg'],
            'fechaAuto3' => date('Ymd H:i'),
            'usuario_gg' => $request['user'],
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