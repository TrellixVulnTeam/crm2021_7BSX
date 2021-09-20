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

            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

            $final_name = date('Ymd').' '.(string)$nombreoriginal.''.substr($extension,0,-3);
        
            return response()->json($final_name);
        }

        public function eliminar_archivo(Request $request){
            $file = $request["file"];

            unlink(public_path('files/'.date('Ymd').' '.$file));
        }


        public function guardarAtencion(Request $request){

            $insertar =  DB::connection('comanda')->table('CRM_atenciones')
                         ->insertGetId([
                           'num_suministro' => $request['suministro'],
                           'cliente' => $request['cliente'],
                           'contacto' => $request['contacto'],
                           'telefono' => $request['telefono'],
                           'id_tipo_atencion' => $request['tipo_atencion'],
                           'id_motivo_atencion' => $request['motivo_atencion'],
                           'titulo_atn' => $request['titulo_atn'],
                           'descripcion' => $request['descripcion_atencion'],
                           'fecha_creacion' => date('Ymd H:i'),
                           'correo' => $request["email"],
                           'fax' => $request["fax"],
                           'whatsapp' => $request["whatsapp"],
                           'sistema' => "CRM",
                           'usuario_creacion' => $request["usuario_crm"],
                           'atencion_cerrada' => "N",
                         ]);
           
            

            return response()->json($insertar);
        }


        public function guardarArchivosAtn(Request $request){

            $json = json_encode($request->all());

            $arch = json_decode($json );
          

            foreach($arch as $arc){
                $insertar =  DB::connection('comanda')->table('CRM_adjuntos')
                ->insert([
                  'atencion_id' => $arc->atencion_id,
                  'fecha_creacion' => date('Ymd H:i'),
                  'usuario_id' => $arc->usuario_id,
                  'adjunto' =>  date('Ymd').' '.strtolower(substr($arc->file,12)),
                  'descripcion' => $arc->descripcion,
                  'tipoarchivo' => 30,
                ]);
            }

            return response()->json($insertar);
           

        }
    

}



?>