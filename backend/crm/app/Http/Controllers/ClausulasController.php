<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class ClausulasController extends Controller
{


    public function getDatosbyCarta(Request $request)
    {
        $id = $request["carta"];

        $data = DB::connection('comanda')->select("select gc.*, cma.tipo_persona as tipo_persona  from GC_clausulas gc 
        inner join CRM_motivo_atenciones cma on cma.id = gc.id_tipo_solicitud 
        where gc.estado = 1 and gc.id_tipo_solicitud = ".$id ."");

        return response()->json($data);
    }


    public function save_parrafo(Request $request)
    {
        $insertar =  DB::connection('comanda')->table('GC_clausulas')
        ->insertGetId([
          'id_tipo_solicitud' => $request['id_tipo_solicitud'],
          'parrafo' => $request['parrafo'],
          'tipo' => $request['tipo'],
          'estado' => 1
        ]);
        return response()->json($insertar);

    }

    public function edit_parrafo(Request $request)
    {

        $editar =  DB::connection('comanda')->table('GC_clausulas')
        ->where('id', $request['id'])
             ->update([
                'parrafo' => $request['parrafo'],
                'tipo' => $request['tipo'],
                ]);

        return response()->json($editar);

    }


    public function delete_parrafo(Request $request)
    {

        $editar =  DB::connection('comanda')->table('GC_clausulas')
        ->where('id', $request['id'])
             ->update([
                'estado' => 2,
                ]);

        return response()->json($editar);

    }


    public function imprimir_carta(Request $request)
    {
        $id_evento = $request['id_evento'];
        $id_atencion = $request['id_atencion'];


        $datos =  DB::connection('comanda')->select("SELECT fs.num_suministro as nis, CONCAT(fc.NOMBRES,' ', fc.APELLIDOS) as cliente, fc.direccion, fc.DUI as dui,
        case when
            fc.nit_dui is null
            then 
            fc.NIT 
            else
            fc.nit_dui 
        end as nit, fa.numero_medidor as num_medidor from FACTURACION.dbo.fe_cliente fc
        inner join FACTURACION.dbo.FE_SUMINISTROS fs on fs.CODIGO_CLIENTE = fc.CODIGO_CLIENTE 
        inner join FACTURACION.dbo.FE_APARATOS fa on fa.num_suministro = fs.num_suministro 
        where fs.num_suministro  = '".$request['nis']."' and fa.bandera_activo = 1");
            
        
        $tipo_soli =  DB::connection('comanda')->select("
        select cma.nombre as tipo_soli  from CRM_atenciones ca 
        inner join CRM_motivo_atenciones cma on cma.id = ca.id_motivo_atencion 
        where ca.id = ".$id_atencion."
        ");

        $clausulas =  DB::connection('comanda')->select("SELECT gc.id, gc.parrafo , gc.tipo  from CRM_atenciones ca 
        inner join GC_clausulas gc on gc.id_tipo_solicitud = ca.id_motivo_atencion 
        where ca.id = ".$id_atencion." and gc.estado = 1");


        $cliente = DB::connection('facturacion')->table("FE_SUMINISTROS")
        ->join('FE_CLIENTE', 'FE_CLIENTE.CODIGO_CLIENTE','=','FE_SUMINISTROS.CODIGO_CLIENTE')
        ->select("FE_SUMINISTROS.CODIGO_CLIENTE","FE_CLIENTE.tipo_persona")->where('FE_SUMINISTROS.num_suministro', $request['nis'])->first();


        $cod_cliente = $cliente->CODIGO_CLIENTE;

        $t_persona = $cliente->tipo_persona;

        $view ='';
        if($t_persona == 'N'){
            $view =  \View::make('pdf.solicitud_regulatoriaGC_persona', compact('id_evento', 'id_atencion', 'datos', 'clausulas', 'tipo_soli'))->render();
        }else{
            $datos_repre = DB::connection('facturacion')->select("
            select CONCAT(fc.NOMBRES,' ', fc.apellidos)  as cliente, fc.tipo_persona,
            fs.num_suministro as nis, CONCAT(fc.NOMBRES,' ', fc.APELLIDOS) as cliente, fc.direccion, fc.DUI as dui,
            case when
            fc.nit_dui is null
            then fc.NIT 
            else fc.nit_dui 
            end as nit, fa.numero_medidor as num_medidor,
            case when fc.repre_legal_1 is null
            then  fc.repre_legal_2 
            else fc.repre_legal_1 
            end as representante,

            case when fc.domicilio_1 is null 
            then
            fc.domicilio_2 
            else 
            fc.domicilio_1 
            end as domicilio,

            case when fc.departamento_1 is null
            then
            (select fd.NOMBRE_DEPARTAMENTO from FE_DEPARTAMENTOS fd where fd.CODIGO_DEPARTAMENTO = fc.departamento_2)
            else
            (select fd.NOMBRE_DEPARTAMENTO from FE_DEPARTAMENTOS fd where fd.CODIGO_DEPARTAMENTO = fc.departamento_1)
            END AS departamento,

            case when fc.dui_1 is null 
            then fc.dui_2
            ELSE  fc.dui_1 end as dui,

            case when fc.nit_1 is null 
            THEN fc.nit_2
            else fc.nit_1 end as nit,

            case when fc.cargo_1 is NULL 
            then fc.cargo_2
            else fc.cargo_1 end as cargo

            from FE_CLIENTE fc 
            inner join FACTURACION.dbo.FE_SUMINISTROS fs on fs.CODIGO_CLIENTE = fc.CODIGO_CLIENTE 
            inner join FACTURACION.dbo.FE_APARATOS fa on fa.num_suministro = fs.num_suministro 
            where fc.CODIGO_CLIENTE = ".$cod_cliente." and fa.bandera_activo = 1 and fs.num_suministro = ".$request['nis']."
            ");   
            $view =  \View::make('pdf.solicitud_regulatoriaGC_juridico', compact('id_evento', 'id_atencion', 'datos', 'clausulas', 'tipo_soli','datos_repre'))->render();
        }


        $pdf = \App::make('dompdf.wrapper');

        $pdf->loadHTML($view);

        //return response()->json($iva);

        return $pdf->stream('carta_GC.pdf');
    }




}

?>