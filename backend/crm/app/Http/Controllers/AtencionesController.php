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


       public function mover_archivo(Request $request){
        $file = $request->file('file');
        $nombreoriginal = strtolower($file->getClientOriginalName());
        $file->move('files/',date('Ymd').' '.(string)$nombreoriginal);

        $final_name = date('Ymd').' '.(string)$nombreoriginal;
    
        return response()->json($final_name);
        }

        public function eliminar_archivo(Request $request){
            $file = $request["file"];

            unlink(public_path('files/'.date('Ymd').' '.$file));
        }
    

}



?>