<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class MotivosAtnController extends Controller
{

    public function getMotivosAtenciones()
       {
           //conexion con COMANDA
           $motivos = DB::connection('comanda')->table('CRM_motivo_atenciones')->where('estado','1')
           ->whereIn('sistema',['CRM', 'GEST. COMERCIAL'])->orderBy('nombre','ASC')->get();
   
           return response()->json($motivos);
       }


    public function save(Request $request){

        $insertar =  DB::connection('comanda')->table('CRM_motivo_atenciones')
                     ->insert([
                       'nombre' => $request['descripcion'],
                       'sistema' => $request['sistema'],
                       'estado' => 1,
                     ]);
       
        

        return response()->json($insertar);
    }


    public function delete(Request $request){

        
        $editar =  DB::connection('comanda')->table('CRM_motivo_atenciones')
                    ->where('id', $request['id'])
                         ->update([
                            'estado' => 2
                            ]);

        return response()->json($editar);
    }


    public function edit(Request $request){

        
        $editar =  DB::connection('comanda')->table('CRM_motivo_atenciones')
                    ->where('id', $request['id'])
                         ->update([
                            'nombre' => $request['descripcion'],
                            'sistema' => $request['sistema'],
                            ]);

        return response()->json($editar);
    }

    public function getMotivosAtenciones_GC()
    {
        //conexion con COMANDA
        $motivos = DB::connection('comanda')->table('CRM_motivo_atenciones')->where('estado','1')
        ->where('sistema','GEST. COMERCIAL')->get();

        return response()->json($motivos);
    }
}

?>