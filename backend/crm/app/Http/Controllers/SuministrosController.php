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

        $suministros = DB::connection('facturacion')
        ->table('FE_SUMINISTROS as fs')
        ->leftjoin('FE_CLIENTE as fc','fc.CODIGO_CLIENTE','=','fs.CODIGO_CLIENTE')
        ->select('fs.*','fc.NOMBRES as nombrecliente','fc.APELLIDOS as apellidocliente')
        ->where('usuario_unicom','eescobar')
        ->orWhere('usuario_unicom','rchevez')
        ->orWhere('usuario_unicom','oquan')->get();

         return response()->json($suministros);
    }

}


?>