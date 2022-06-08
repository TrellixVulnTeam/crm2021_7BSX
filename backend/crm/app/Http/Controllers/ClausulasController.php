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

        $data = DB::connection('comanda')->select("select * from GC_clausulas where estado = 1 and id_tipo_solicitud = ".$id ."");

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



}

?>