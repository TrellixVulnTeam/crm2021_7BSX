<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'validarCredenciales',
        'getRoles',
        'getAllClientesEdesal',
        'getclientesbyname',
        'listarContactosByCliente',
        'listarSuministrosByCliente',
        'getMotivosAtenciones',
        'getTiposAtenciones',
        'mover_archivo',
        'eliminar_archivo',
        'getProspectosStakeholders',
        'getContactosPotenciales',
        'getClientesCompartidos',
        'guardarAtencion',
        'guardarArchivosAtn',
        'listarContactosByCliente_potenciales',
        'getUsuariosByCliente',
        'getUsuariosDisponibles',
        'guardarUsuario',
        'eliminarUsuario'
    ];
}
