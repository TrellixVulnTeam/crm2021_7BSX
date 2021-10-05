<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//rutas para usuarios
Route::post('validarCredenciales', 'UsuarioController@validarCredenciales');
Route::post('getRoles', 'UsuarioController@getRoles');
Route::get('getUsuarios', 'UsuarioController@getUsuarios');

//rutas para clientes
Route::get('getAllClientesEdesal', 'ClientesController@getAllClientesEdesal');
Route::post('getclientesbyname', 'ClientesController@getclientesbyname');
Route::post('listarContactosByCliente', 'ClientesController@listarContactosByCliente');
Route::post('listarSuministrosByCliente', 'ClientesController@listarSuministrosByCliente');
Route::post('getProspectosStakeholders', 'ClientesController@getProspectosStakeholders');
Route::post('getContactosPotenciales', 'ClientesController@getContactosPotenciales');
Route::post('getClientesCompartidos', 'ClientesController@getClientesCompartidos');
Route::post('listarContactosByCliente_potenciales', 'ClientesController@listarContactosByCliente_potenciales');
Route::post('getUsuariosByCliente', 'ClientesController@getUsuariosByCliente');
Route::post('getUsuariosDisponibles', 'ClientesController@getUsuariosDisponibles');
Route::post('guardarUsuario', 'ClientesController@guardarUsuario');
Route::post('eliminarUsuario', 'ClientesController@eliminarUsuario');
Route::post('guardarContacto', 'ClientesController@guardarContacto');
Route::post('eliminarcontacto', 'ClientesController@eliminarcontacto');
Route::post('editarContacto', 'ClientesController@editarContacto');
Route::post('guardarContacto_prospectos', 'ClientesController@guardarContacto_prospectos');
Route::post('eliminarcontacto_prospectos', 'ClientesController@eliminarcontacto_prospectos');
Route::post('guardarInformacion_Clientes', 'ClientesController@guardarInformacion_Clientes');
Route::get('getAllUsuariosDisponibles', 'ClientesController@getAllUsuariosDisponibles');
Route::post('guardarCliente_prospectos', 'ClientesController@guardarCliente_prospectos');
Route::post('guardar_contactos_cliente', 'ClientesController@guardar_contactos_cliente');
Route::post('guardar_usuarios_cliente', 'ClientesController@guardar_usuarios_cliente');



//rutas para atenciones
Route::get('getMotivosAtenciones', 'AtencionesController@getMotivosAtenciones');
Route::get('getTiposAtenciones', 'AtencionesController@getTiposAtenciones');
Route::post('mover_archivo', 'AtencionesController@mover_archivo');
Route::post('eliminar_archivo', 'AtencionesController@eliminar_archivo');
Route::post('guardarAtencion', 'AtencionesController@guardarAtencion');
Route::post('guardarArchivosAtn', 'AtencionesController@guardarArchivosAtn');
Route::post('getAllAtenciones', 'AtencionesController@getAllAtenciones');
Route::post('getDetalleAtencion', 'AtencionesController@getDetalleAtencion');


//rutas para eventos
Route::post('getAllEventos', 'EventosController@getAllEventos');
Route::post('guardarEvento', 'EventosController@guardarEvento');
Route::post('guardarArchivosEvt', 'EventosController@guardarArchivosEvt');
Route::post('getDetalleEvento', 'EventosController@getDetalleEvento');


//rutas para tickets
Route::post('getAllTickets', 'TicketController@getAllTickets');
Route::post('guardarTicket', 'TicketController@guardarTicket');
Route::post('guardarTicketOrder', 'TicketController@guardarTicketOrder');
Route::post('getDetalleTicket', 'TicketController@getDetalleTicket');

//rutas para ordenes técnicas
Route::get('getAllOrdenes', 'OrTecnicasController@getAllOrdenes');
Route::post('guardarTicketOrder', 'OrTecnicasController@guardarTicketOrder');
//rutas para suministros
Route::get('getAllSuministros', 'SuministrosController@getAllSuministros');
