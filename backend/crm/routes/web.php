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
