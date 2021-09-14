<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class AtencionesController extends Controller
{
       //obtener todos los tipos de atenciones
       public function getTiposAtenciones()
       {
           //conexion con COMANDA
           $atenciones  = DB::connection('comanda')->table('CRM_tipo_atenciones')->orderBy('nombre','ASC')->get();
   
           return response()->json($atenciones);
       }
   
   
       //obtener todos los motivos de atenciones
       public function getMotivosAtenciones()
       {
           //conexion con COMANDA
           $motivos = DB::connection('comanda')->table('CRM_motivo_atenciones')
           ->where('sistema','CRM')->orderBy('nombre','ASC')->get();
   
           return response()->json($motivos);
       }

}



?>