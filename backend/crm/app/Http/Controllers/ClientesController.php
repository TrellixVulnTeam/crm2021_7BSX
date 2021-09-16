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
        )->where('fs.usuario_unicom','!=','')->distinct()->get();


        return response()->json($clientes);
    }


    
    public function getclientesbyname(Request $request)
    {   
        $cliente = $request["cliente"];
        //conexion con factelec para listar los clientes
        
            $clientes = json_encode(DB::connection('facturacion')->select("
            select distinct c.CODIGO_CLIENTE as codigo,c.NOMBRES as nombrecliente,
            c.APELLIDOS as apellidocliente,
            c.TELEFONO_UNO as telefono,c.direccion,
            c.DUI as dui,c.NIT as nit,fs.usuario_unicom as usuario
            from FE_CLIENTE c
            inner join fe_suministros fs on fs.CODIGO_CLIENTE = c.CODIGO_CLIENTE
            where (fs.usuario_unicom in ('rchevez','eescobar','oquan')) and 
            (c.NOMBRES+' '+c.APELLIDOS like '%".$cliente."%') "));


            $arrayJson = [];
            foreach (json_decode($clientes, true) as $value){
                $arrayJson = $value;
            }
    
            return $arrayJson;
        
        
    }


     //listar contactos
     public function listarContactosByCliente(Request $request)
     {
         //conexion con facturacion
         $contactos  = DB::connection('facturacion')->select("SELECT *,
         convert(varchar, fecha_nacimiento, 23) as fechaNac
          from fe_cliente_contacto con
         where codigo_cliente= ".$request['codigo']);
 
         return response()->json($contactos);
     }
 
 
     //listar los suministros por cliente
     public function listarSuministrosByCliente(Request $request)
     {
         //conexion con facturacion
         $suministros = DB::connection('facturacion')->table('FE_SUMINISTROS')->where('CODIGO_CLIENTE',$request['codigo'])->get();
 
         return response()->json($suministros);
     }

     //get prospectos y stakeholders
     public function getProspectosStakeholders(Request $request)
     {
         $user = $request["id"];

             $clientes = DB::connection('comanda')->select("
             select c.*, cc.nombre as nomCategoria,
             c.id as codigo, c.empresa as nombrecliente from CRM_clientes as c
             inner join CRM_categoria_cliente as cc on cc.id = c.categoria
             where c.usuario_crm = ".$user."
             order by c.empresa asc
             ");
 
         return response()->json($clientes);
     }
   

      //obtener los contactos para un cliente seleccionado
    public function getContactosPotenciales(Request $request)
    {


        $contactos = DB::connection('comanda')->select("
        select c.*, c.nombre as nombre_contacto from CRM_contactos_clientes as c
        where c.cli_potencial = ".$request['id']."
        order by c.nombre asc
        ");

        return response()->json($contactos);
    }


     //funcion para obtener los clientes compartidos
     public function getClientesCompartidos(Request $request)
     {
        $user = $request["id"];

 
        $clientes = DB::connection('comanda')->select("
        select c.*, ccc.nombre as nomCategoria,
        c.id as codigo, c.empresa as nombrecliente from CRM_clientes as c
        inner join CRM_cliente_usuario as ccu on ccu.cliente = c.id
        inner join CRM_categoria_cliente as ccc on ccc.id = c.categoria
        inner join users u on u.id = c.usuario_crm
        where ccu.usuario = ".$user."
        order by c.empresa asc
        ");
 
         return response()->json($clientes);
     }



}


?>