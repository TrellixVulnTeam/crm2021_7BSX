<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class SuministrosController extends Controller
{
    public function getAllSuministros(){

        $suministros = DB::connection('facturacion')->select("
        select fs.*, convert(varchar(10),fs.fecha_alta, 103) as fecha_altaD, fc.NOMBRES as nombrecliente,
        fc.APELLIDOS as apellidocliente,fc.NOMBRES +' '+ fc.APELLIDOS as cliente from FE_SUMINISTROS fs 
        inner join FE_CLIENTE fc on fc.CODIGO_CLIENTE = fs.CODIGO_CLIENTE 
        where fs.usuario_unicom in('eescobar','rchevez', 'oquan')
       ");


         return response()->json($suministros);
    }

    public function getAtencionesBySuministro(Request $request)
    {
        //conexion con calidad
        $suministros = DB::connection('calidad')->select("
        select fcr.*,fctr.descripcion_tipo_rreclamo  as tiporeclamo, fcmr.descripcion_mreclamo  as motivoreclamo,
        convert(varchar(10),fcr.fecha , 103) as fecha_reclamoD, convert(varchar(10),fcr.fecha_cierre , 103) as fecha_cierreD from fe_calidad_reclamos fcr 
        inner join fe_calidad_tipo_rreclamo fctr on fctr.codigo_tipo_rreclamo = fcr.codigo_tipo_rreclamo
        inner join fe_calidad_motivo_reclamo fcmr on fcmr.codigo_mreclamo = fcr.codigo_mreclamo
        where fcr.num_suministro = ".$request["num_suministro"]."
       ");


         return response()->json($suministros);
    }

}


?>