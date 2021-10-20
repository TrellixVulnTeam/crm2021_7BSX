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
        'eliminarUsuario',
        'guardarContacto',
        'eliminarcontacto',
        'editarContacto',
        'guardarContacto_prospectos',
        'eliminarcontacto_prospectos',
        'guardarInformacion_Clientes',
        'getAllUsuariosDisponibles',
        'guardarCliente_prospectos',
        'guardar_usuarios_cliente',
        'guardar_contactos_cliente',
        'getAllAtenciones',
        'getAllEventos',
        'getAllTickets',
        'getAllOrdenes',
        'getAllSuministros',
        'guardarEvento',
        'guardarArchivosEvt',
        'getUsuarios',
        'guardarTicket',
        'guardarTicketOrder',
        'getDetalleAtencion',
        'getDetalleEvento',
        'getDetalleTicket',
        'getEventosAsociados',
        'getTicketsAsociados',
        'getAdjuntosAtencion',
        'getAdjuntosEventos',
        'getConteoAtencion',
        'getConteoEvento',
        'getConteoTickets',
        'getUsuariosAtenciones',
        'getUsuariosEventos',
        'getClientesAtenciones',
        'getAtencionesBySuministro',
        'getHistorialCliente'
    ];
}
