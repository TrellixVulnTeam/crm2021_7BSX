<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class EventosController extends Controller
{

    public function getAllEventos(Request $request){

        $user = $request["alias"];
        $id = $request["id"];

         //conexion con COMANDA
         $eventos = DB::connection('comanda')->select("
         select e.*, estado.nombre as estado,e.eventoTitulo as evTitulo,
         convert(varchar(10),e.fecha_creacion, 103) as fecha_creacionD,
         (select count(id) from tickets where evento_id = e.id
         and estado_id != 9) as conteoTickets,
         (select nombre+' '+apellido from comanda_db.dbo.users where id = e.usuario_crm )
          as usuario_creacion from crm_eventos e
         inner join crm_estados_eventos as estado on estado.id = e.estado
         inner join comanda_db.dbo.users u on u.id = e.usuario_crm
         where e.usuario_crm = ".$id."
         union
         SELECT e.*,ee.nombre as estado,e.eventoTitulo as evTitulo,
         convert(varchar(10),e.fecha_creacion, 103) as fecha_creacionD,
         (select count(id) from tickets where evento_id = e.id and estado_id != 9)  as conteoTickets,
           (select nombre+' '+apellido from comanda_db.dbo.users where id = e.usuario_crm ) as usuario_creacion from 
           comanda_db.dbo.crm_eventos e
           inner join comanda_db.dbo.crm_clientes c on c.empresa = e.cliente
           inner join comanda_db.dbo.users u on u.id = c.usuario_crm
           inner join comanda_db.dbo.CRM_estados_eventos as ee on ee.id = e.estado
           where u.alias = '".$user."' and e.usuario_crm != 
           (select id from comanda_db.dbo.users where estado = 1 and alias = '".$user."')
          
         union 
         SELECT e.*,ee.nombre as estado,e.eventoTitulo as evTitulo,
         convert(varchar(10),e.fecha_creacion, 103) as fecha_creacionD,
         (select count(id) from tickets where evento_id = e.id) as conteoTickets,
         (select nombre+' '+apellido from comanda_db.dbo.users where id = e.usuario_crm ) as usuario_creacion from 
         comanda_db.dbo.crm_eventos e
         inner join comanda_db.dbo.crm_clientes c on c.empresa = e.cliente
         inner join crm_cliente_usuario ccu on ccu.cliente = c.id
         inner join comanda_db.dbo.users u on u.id = c.usuario_crm
         inner join comanda_db.dbo.CRM_estados_eventos as ee on ee.id = e.estado
         WHERE ccu.usuario =".$id."    
         order by e.id desc
             ");
 
 
         return response()->json($eventos);

    }


}


?>