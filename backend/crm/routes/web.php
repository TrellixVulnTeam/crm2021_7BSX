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


//rutas para atenciones
Route::get('getMotivosAtenciones', 'AtencionesController@getMotivosAtenciones');
Route::get('getTiposAtenciones', 'AtencionesController@getTiposAtenciones');
Route::post('mover_archivo', 'AtencionesController@mover_archivo');
Route::post('eliminar_archivo', 'AtencionesController@eliminar_archivo');
Route::post('guardarAtencion', 'AtencionesController@guardarAtencion');
Route::post('guardarArchivosAtn', 'AtencionesController@guardarArchivosAtn');
