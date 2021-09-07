<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class ClientesController extends Controller
{

    public function getAllClientesEdesal(){
        $clientes = DB::connection('facturacion')->table('FE_CLIENTE as c')
        ->leftjoin('FE_SUMINISTROS as fs','c.CODIGO_CLIENTE','=','fs.CODIGO_CLIENTE')
        ->select(
            'c.CODIGO_CLIENTE as codigo',
            'c.NOMBRES as nombrecliente',
            'c.APELLIDOS as apellidocliente',
            'c.TELEFONO_UNO as telefono',
            'c.direccion',
            'c.DUI as dui',
            'c.NIT as nit',
            'fs.usuario_unicom as usuario'
        )->where('fs.usuario_unicom','rchevez')->distinct()->get();


        return response()->json($clientes);
    }
}


?>