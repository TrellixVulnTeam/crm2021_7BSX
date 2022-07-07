<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    
</head>

<style>
    .left{
        width: 150px !important;
         margin-bottom: 20px !important;
         
    }


    .right{
        text-align: left !important;
        width: 350px !important;
        margin-bottom: 20px !important;
    }


    .left1{
        width: 120px !important;
         margin-bottom: 20px !important;
    }

    .right1{
        text-align: left !important;
        margin-bottom: 20px !important;
    }
</style>

<body>

<div style=" font-family: Tahoma, Helvetica, Arial">
    <div>
        <img style="" src="C:\xampp\htdocs\crm_backend\public\img\edesal1.png" alt="">
    </div>

    <div style="margin-top: 14px; ">
        <b style="margin-left: 170px;font-size: 15px;">EMPRESA DISTRIBUIDORA ELECTRICA SALVADOREÑA</b>
    </div>

    <div style="margin-top: 5px; ">
        <b style="margin-left: 220px;font-size: 14px;">COMPROBANTE DE RECEPCION DE TRAMITE</b>
    </div>
    @foreach ($datos as $d)
    <br><br><br>
    <table style="width: 100% !important;font-size: 12px;">
            <tr>
                <td class="left"><b>Nombre de Cliente:</b> </td>
                <td class="right">{{$d->nombre_cliente}} </td>
                <td class="left1"><b>N° de Atención:</b></td>
                <td class="right1">{{$id_atencion}}</td>
            </tr>


            <tr>
                <td class="left"><b>Dirección del suministro:</b> </td>
                <td class="right">{{$d->direccion}} </td>
                <td class="left1"><b>N° de macrotarea: </b></td>
                <td class="right1">{{$id_evento}}</td>
            </tr>


            <tr>
                <td class="left"><b>NIS:</b> </td>
                <td class="right">{{$nis}} </td>
                <td class="left1"><b>Fecha de recepción: </b></td>
                <td class="right1">{{date("d/m/Y", strtotime($fecha))}}</td>
            </tr>


            <tr>
                <td class="left"><b>Teléfono:</b> </td>
                <td class="right">{{$d->telefono}} </td>
                <td class="left1"><b>Tipo de servicio: </b></td>
                <td class="right1">{{$d->tipo_servicio}}</td>
            </tr>


            <tr>
                <td class="left"><b>N° de Medidor:</b> </td>
                <td class="right">{{$d->num_medidor}} </td>
                <td class="left1"><b>Densidad: </b></td>
                <td class="right1">{{$d->densidad}}</td>
            </tr>


            <tr>
                <td class="left"><b>Título de atención: </b></td>
                <td class="right">{{$d->titulo_atn}}</td>
            </tr>
  
    </table>

    <p align="justify" style="font-size: 12px;">
        Estimado Señor (a):
        <br><br>
        Por este medio hacemos de su conocimiento que hemos recibido solicitud de: <b>{{$d->nombre_cliente}}</b>, quien siendo usuario de EDESAL
        identificado con el número de suministro: <b>{{$nis}}</b> ha solicitado a esta EDESAL la gestión: <b>{{$d->titulo_atn}}</b>
         en fecha <b>{{date("d/m/Y", strtotime($fecha))}}</b>, siendo su tramite registrado bajo la orden de servicio número: <b>{{$d->numero_orden}}</b>

        <br><br>

        Ante su requerimiento se le notifica que se procedera de acuerdo a lo estipulado en terminos y condiciones del pliego tarifario vigente.<br>
        Su solicitud será finiquitada en un lapso máximo de tres dias hábiles.


        <br><br>
        Atentamente<br><br>
        <b>Nombre ejecutivo Atte al Cliente :</b> {{$user}}<br><br><br>

        <b>Fecha y hora Impresión:</b> San Salvador, {{date('d')}} de <?php
        if(date('m') == '01'){echo "Enero";}
        if(date('m') == '02'){echo "Febrero";}
        if(date('m') == '03'){echo "Marzo";}
        if(date('m') == '04'){echo "Abril";}
        if(date('m') == '05'){echo "Mayo";}
        if(date('m') == '06'){echo "Junio";}
        if(date('m') == '07'){echo "Julio";}
        if(date('m') == '08'){echo "Agosto";}
        if(date('m') == '09'){echo "Septiembre";}
        if(date('m') == '10'){echo "Octubre";}
        if(date('m') == '11'){echo "Noviembre";}
        if(date('m') == '12'){echo "Diciembre";}
    ?>
    de {{date('Y')}}

        <br><br><br><br><br><br><br><br>


        Para mayor consulta sobre su tramite puede contactarnos al Chat Center EDESAL 7465-4070


    </p>
    @endforeach

   


</div>


</body>
</html>