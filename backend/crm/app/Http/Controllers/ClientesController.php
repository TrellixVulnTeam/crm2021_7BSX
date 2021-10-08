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
            c.DUI as dui,c.NIT as nit,fs.usuario_unicom as usuario,(SELECT max(correla_contacto)  
            from fe_cliente_contacto where codigo_cliente = c.CODIGO_CLIENTE) as correla 
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
 
     //listar contactos
     public function listarContactosByCliente_potenciales(Request $request)
     {
         //conexion con comanda
         $contactos  = DB::connection('comanda')->select("SELECT cc.nombre as nombre_contacto, cc.cargo as cargo_contacto,
          cc.correo as correo_contacto, cc.celular  as celular1 , cc.id as codigo
         from CRM_contactos_clientes cc where cc.cli_potencial  = ".$request['codigo']);
 
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
             order by c.id desc
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

     //obtener usuarios a los que se les ha  compartido un cliente
     public function getUsuariosByCliente(Request $request)
     {
         $usuarios = Db::connection('comanda')->table('CRM_cliente_usuario as cliente')
                                  ->leftjoin('users as usuario','usuario.id','=','cliente.usuario')
                                  ->select('usuario.nombre as nombre','usuario.apellido as apellido','usuario.id','cliente.id as linea')
                                  ->where('cliente.cliente',$request['id'])
                                  ->orderBy('cliente.id','desc')
                                  ->get();
 
         return response()->json($usuarios);
     }

     public function getUsuariosDisponibles(Request $request){

        $usuarios = Db::connection('comanda')->select("SELECT u.id, u.nombre, u.apellido from users u 
            inner join usuario_rol ur on ur.user_id = u.id 
            inner join roles r on r.id = ur.rol_id 
            where u.id not in (select usuario from CRM_cliente_usuario ccu where usuario= u.id and cliente = ".$request['id'].")
            GROUP by u.id, u.nombre, u.apellido
            order by 2 asc"
        );

        return response()->json($usuarios);
     }


     public function guardarUsuario(Request $request){

        $insertar =  DB::connection('comanda')->table('CRM_cliente_usuario')
                     ->insert([
                       'cliente' => $request['cliente'],
                       'usuario' => $request['usuario'],
                       'fecha_creacion' => date('Ymd H:i'),
                       
                     ]);
       
        

        return response()->json($insertar);
    }


    public function eliminarUsuario(Request $request){

        $eliminar = DB::connection('comanda')->table('CRM_cliente_usuario')
        ->where('cliente', $request['id'])->where('usuario', $request['idUsuario'])->delete();
       
        

        return response()->json($eliminar);
    }


    public function guardarContacto(Request $request){

        $fecha1r = $request["fecha_nacimiento"];

        $fecha1 = date_create_from_format('Y-m-d',$fecha1r);

        $fechaIn = date_format($fecha1,'Ymd');


        $correla = DB::connection('facturacion')->table('fe_cliente_contacto')->where('codigo_cliente',$request['codigo'])->max('correla_contacto') ;

        $insertar =  DB::connection('facturacion')->table('fe_cliente_contacto')
        ->insert([
          'codigo_cliente' => $request['codigo'],
          'correla_contacto' =>  $correla +1,
          'nombre_contacto' => $request['nombre'],
          'cargo_contacto' => $request['cargo'],
          'correo_contacto' => $request['correo'],
          'celular_1' => $request['celular1'],
          'celular_2' => $request['celular2'],
          'telefono_1' => $request['telefono1'],
          'telefono_2' => $request['telefono2'],
          'comentarios' => $request['comentarios'],
          'fecha_nacimiento' => $fechaIn,
          'contacto_Tecnico' => $request["tecnico"],
        ]);



            return response()->json($insertar);
    }

    public function eliminarcontacto(Request $request){

        $eliminar = DB::connection('facturacion')->table('fe_cliente_contacto')
        ->where('codigo_cliente', $request['codigo'])->where('correla_contacto', $request['correla_contacto'])->delete();
       
        

        return response()->json($eliminar);
    }


    public function editarContacto(Request $request){

 
        $fechaRegistro = $request["fecha_nacimiento"];
        if($fechaRegistro == '1900-01-01 00:00:00.000'){
            $fechaRegistroConFormato = null;
        }
        
        else if(is_null($fechaRegistro)){
            $fechaRegistroConFormato = null;
        }else{
            $fechaRegistroSinFormato = date_create_from_format('Y-m-d',$fechaRegistro);

            $fechaRegistroConFormato = date_format($fechaRegistroSinFormato,'Ymd');
        }

        $editar =  DB::connection('facturacion')->table('fe_cliente_contacto')
                    ->where('codigo_cliente', $request['codigo'])
                    ->where('correla_contacto', $request['correla'])
                         ->update([
                            'nombre_contacto' => $request['nombre'],
                            'cargo_contacto' => $request['cargo'],
                            'correo_contacto' => $request['correo'],
                            'celular_1' => $request['celular1'],
                            'celular_2' => $request['celular2'],
                            'telefono_1' => $request['telefono1'],
                            'telefono_2' => $request['telefono2'],
                            'comentarios' => $request['comentarios'],
                            'fecha_nacimiento' => $fechaRegistro,
                            'contacto_Tecnico' => $request["tecnico"],
                            ]);

        return response()->json($editar);
    }

    public function guardarContacto_prospectos(Request $request){
        $insertar =  DB::connection('comanda')->table('CRM_contactos_clientes')
        ->insert([
         
          'nombre' => $request['nombre'],
          'cargo' => $request['cargo'],
          'correo' => $request['correo'],
          'celular' => $request['celular1'],
          'teldirecto' => $request['telefono1'],
          'usuario_crm' => $request['usuario'],
          'fecha_creacion' => date('Ymd H:i'),
          'cli_potencial' => $request["codigo"],
        ]);
            return response()->json($insertar);
    }
    

    public function eliminarcontacto_prospectos(Request $request){

        $eliminar = DB::connection('comanda')->table('CRM_contactos_clientes')
        ->where('id', $request['codigo'])->delete();
       
        

        return response()->json($eliminar);
    }


    public function guardarInformacion_Clientes(Request $request){

        $fechaRegistro = $request["fecha_visita"];



        if($fechaRegistro == '1900-01-01 00:00:00.000'){
            $fechaRegistroConFormato = null;
        }
        
        else if(is_null($fechaRegistro)){
            $fechaRegistroConFormato = null;
        }else{
            $fechaRegistroSinFormato = date_create_from_format('Y-m-d',$fechaRegistro);

            $fechaRegistroConFormato = date_format($fechaRegistroSinFormato,'Ymd');
        }

        

        $editar =  DB::connection('comanda')->table('CRM_clientes')
                    ->where('id', $request['codigo'])
                         ->update([
                            'porcentaje_costo_energia' => $request['porcentaje_costo_energia'],
                            'facturacion_mensual' => $request['facturacion_mensual'],
                            'margen_rentabilidad' => $request['margen_rentabilidad'],
                            'horas_produccion' => $request['horas_produccion'],
                            'empresa' => $request['empresa'],
                            'rubro' => $request['rubro'],
                            'direccion' => $request['direccion'],
                            'pbx' => $request['pbx'],
                            'tension_servicio' => $request['tension_servicio'],
                            'fases' => $request['fases'],
                            'hilos' => $request['hilos'],
                            'uso_servicio' => $request['uso_servicio'],
                            'potencia' => $request['potencia'],
                            'sub_propiedad' => $request['sub_propiedad'],
                            'sub_ubicacion' => $request['sub_ubicacion'],
                            'sub_transformadores_req' => $request['sub_transformadores_req'],
                            'sub_conexion' => $request['sub_conexion'],
                            'sub_montaje' => $request['sub_montaje'],
                            'turnos_produccion' => $request['turnos_produccion'],
                            'conexion_num_cortes' => $request['conexion_num_cortes'],
                            'fecha_visita' => $fechaRegistroConFormato,
                            'compromisos' => $request['compromisos'],
                            'categoria' => $request['categoria'],
                            ]);

        return response()->json($editar);
    }

    public function getAllUsuariosDisponibles(){

        $usuarios = Db::connection('comanda')->select("SELECT u.id, u.nombre, u.apellido from users u 
            inner join usuario_rol ur on ur.user_id = u.id 
            inner join roles r on r.id = ur.rol_id 
            where u.estado = 1
            GROUP by u.id, u.nombre, u.apellido
            order by 2 asc"
        );

        return response()->json($usuarios);
     }


     public function guardarCliente_prospectos(Request $request){

        $fechaRegistro = $request["fecha_visita"];



        if($fechaRegistro == '1900-01-01 00:00:00.000'){
            $fechaRegistroConFormato = null;
        }
        
        else if(is_null($fechaRegistro)){
            $fechaRegistroConFormato = null;
        }else{
            $fechaRegistroSinFormato = date_create_from_format('Y-m-d',$fechaRegistro);

            $fechaRegistroConFormato = date_format($fechaRegistroSinFormato,'Ymd');
        }

        
        $insertar =  DB::connection('comanda')->table('CRM_clientes')
        ->insertGetId([
            'porcentaje_costo_energia' => $request['porcentaje_costo_energia'],
            'facturacion_mensual' => $request['facturacion_mensual'],
            'margen_rentabilidad' => $request['margen_rentabilidad'],
            'horas_produccion' => $request['horas_produccion'],
            'empresa' => $request['empresa'],
            'rubro' => $request['rubro'],
            'direccion' => $request['direccion'],
            'pbx' => $request['pbx'],
            'tension_servicio' => $request['tension_servicio'],
            'fases' => $request['fases'],
            'hilos' => $request['hilos'],
            'uso_servicio' => $request['uso_servicio'],
            'potencia' => $request['potencia'],
            'sub_propiedad' => $request['sub_propiedad'],
            'sub_ubicacion' => $request['sub_ubicacion'],
            'sub_transformadores_req' => $request['sub_transformadores_req'],
            'sub_conexion' => $request['sub_conexion'],
            'sub_montaje' => $request['sub_montaje'],
            'turnos_produccion' => $request['turnos_produccion'],
            'conexion_num_cortes' => $request['conexion_num_cortes'],
            'fecha_visita' => $fechaRegistroConFormato,
            'compromisos' => $request['compromisos'],
            'categoria' => $request['categoria'],
            'usuario_crm' => $request['usuario'],
        ]);



        return response()->json($insertar);
     }



     public function guardar_contactos_cliente(Request $request){

        $json = json_encode($request->all());

        $data = json_decode($json );
      

        foreach($data as $d){
            $insertar =  DB::connection('comanda')->table('CRM_contactos_clientes')
            ->insert([
                'nombre' => $d->nombre,
                'cargo' => $d->cargo,
                'correo' => $d->correo,
                'celular' => $d->celular1,
                'teldirecto' => $d->telefono1,
                'usuario_crm' => $d->usuario,
                'fecha_creacion' => date('Ymd H:i'),
                'cli_potencial' => $d->codigo,
            ]);
        }

        return response()->json($insertar);
       

    }


    public function guardar_usuarios_cliente(Request $request){

        $json = json_encode($request->all());

        $data = json_decode($json );
      

        foreach($data as $d){
            $insertar =  DB::connection('comanda')->table('CRM_cliente_usuario')
            ->insert([
              'usuario' => $d->id,
              'cliente' => $d->codigo,
              'fecha_creacion' => date('Ymd H:i'),
            ]);
        }

        return response()->json($insertar);
       

    }


    public function getClientesAtenciones(){
        $getDatos =  DB::connection('comanda')->select("
            select top 10 ca.cliente, (select count(id) from CRM_atenciones ca2 where ca2.cliente = ca.cliente) as atenciones from CRM_atenciones ca 
            inner join CRM_clientes cc on cc.empresa = ca.cliente 
            GROUP by ca.cliente order by 2 desc
        ");

        return response()->json($getDatos);
    }

    
    
     


}


?>