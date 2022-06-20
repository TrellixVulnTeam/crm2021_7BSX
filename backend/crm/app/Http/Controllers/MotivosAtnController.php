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
                       'tipo_persona' => $request['tipo_persona'],
                       'orden_trabajo' => $request['orden_trabajo'],
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
                            'tipo_persona' => $request['tipo_persona'],
                            'orden_trabajo' => $request['orden_trabajo'],
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


    public function getSistemaMotivoAtn(Request $request){

        
        $motivos = json_encode(DB::connection('comanda')->table('CRM_motivo_atenciones')->where('id',$request["id"])->get());

        $arrayJson = [];
        foreach (json_decode($motivos, true) as $value){
            $arrayJson = $value;
        }

        return $arrayJson;

    }


    public function getClausulaAclaratoria(Request $request){

        
        $clausula = json_encode(
            DB::connection('comanda')->select("SELECT top 1 gc.id, parrafo as parrafo, cma.nombre as titulo from GC_clausulas gc 
            inner join  CRM_motivo_atenciones cma ON cma.id = gc.id_tipo_solicitud 
            where gc.id_tipo_solicitud = ".$request["id"]." and gc.tipo = 'Aclaratoria' and gc.estado = 1
            order by 1 asc"));

        $arrayJson = [];
        foreach (json_decode($clausula, true) as $value){
            $arrayJson = $value;
        }

        return $arrayJson;

    }
    
}

?>