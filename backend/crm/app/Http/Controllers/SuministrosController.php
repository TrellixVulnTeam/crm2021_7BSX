<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class SuministrosController extends Controller
{
    public function getAllSuministrosCorporativa(){

        $suministros = DB::connection('facturacion')->select("
        select fs.*, convert(varchar(10),fs.fecha_alta, 103) as fecha_altaD, fc.NOMBRES as nombrecliente,
        fc.APELLIDOS as apellidocliente,fc.NOMBRES +' '+ fc.APELLIDOS as cliente from FE_SUMINISTROS fs 
        inner join FE_CLIENTE fc on fc.CODIGO_CLIENTE = fs.CODIGO_CLIENTE 
        where fs.usuario_unicom in('eescobar','rchevez', 'oquan')
       ");


         return response()->json($suministros);
    }


    public function getAllSuministrosComercial(){

      $suministros = DB::connection('facturacion')->select("SELECT fs.*, convert(varchar(10),fs.fecha_alta, 103) as fecha_altaD, fc.NOMBRES as nombrecliente,
      fc.APELLIDOS as apellidocliente,fc.NOMBRES +' '+ fc.APELLIDOS as cliente from FE_SUMINISTROS fs 
      inner join FE_CLIENTE fc on fc.CODIGO_CLIENTE = fs.CODIGO_CLIENTE 
      where fs.usuario_unicom in('ACOMERCIAL') and fs.CODIGO_COLONIA  not in ('02','03','000')
      and fs.estado = 'A'");


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


    public function getInfoNisComerciales(Request $request){

      $suministros = DB::connection('facturacion')->select("SELECT fs.*, convert(varchar(10),fs.fecha_alta, 103) as fecha_altaD, fc.NOMBRES as nombrecliente,
      fc.APELLIDOS as apellidocliente,fc.NOMBRES +' '+ fc.APELLIDOS as cliente from FE_SUMINISTROS fs 
      inner join FE_CLIENTE fc on fc.CODIGO_CLIENTE = fs.CODIGO_CLIENTE 
      where fs.usuario_unicom in('ACOMERCIAL') and fs.CODIGO_COLONIA  not in ('02','03','000')
      and fs.estado = 'A' and fs.num_suministro = ".$request["suministro"]." ");


       return response()->json($suministros);
  }


  public function getContactosCliente(Request $request){

    $suministros = json_encode(DB::connection('facturacion')->select("SELECT fc.NOMBRES as nombre,
          case when fc.TELEFONO_UNO is null
            then fc.TELEFONO_DOS 
            else fc.TELEFONO_UNO 
            end as contacto
          from FE_CLIENTE fc 
          inner join FE_SUMINISTROS fs on fs.CODIGO_CLIENTE = fc.CODIGO_CLIENTE 
          where fs.num_suministro = ".$request["num_suministro"]." "));

        $arrayJson = [];
        foreach (json_decode($suministros, true) as $value){
            $arrayJson = $value;
        }

        return $arrayJson;
        }

}


?>