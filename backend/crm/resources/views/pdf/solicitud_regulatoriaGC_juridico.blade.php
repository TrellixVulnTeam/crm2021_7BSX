<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title></title>
    <style>

        body{
            margin-bottom: 0;
            margin-top: 0;
        }



        table.minimalistBlack {
            border: 1px solid #000000;
            width: 100%;
            text-align: left;
            border-collapse: collapse;
        }
        table.minimalistBlack td, table.minimalistBlack th {
            border: 1px solid #000000;
            padding: 5px 4px;
        }
        table.minimalistBlack tbody td {
            font-size: 10px;
        }
        table.minimalistBlack thead {
            background: #CFCFCF;
            background: -moz-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            background: -webkit-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            background: linear-gradient(to bottom, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            border-bottom: 1px solid #000000;
        }
        table.minimalistBlack thead th {
            font-size: 12px;
            font-weight: bold;
            color: #000000;
            text-align: left;
        }
        .total{
            background: #CFCFCF;
            background: -moz-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            background: -webkit-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            background: linear-gradient(to bottom, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            border-bottom: 1px solid #000000;
        }
        table.minimalistBlack tfoot {
            font-size: 12px;
            font-weight: bold;
            color: #000000;
            border-top: 1px solid #000000;
        }
        table.minimalistBlack tfoot td {
            font-size: 12px;
        }
        #container div {  }

        #div3 { width:200px; float:right }
        #div1, #div2,#div4 { width:500px;  }
    </style>
</head>
<body>

<div style=" font-family: Tahoma, Helvetica, Arial">
    <div>
        <img style="" src="C:\xampp\htdocs\crm\backend\crm\public\img\edesal1.png" alt="">
        <!--<img style="" src="C:\xampp\htdocs\crm_backend\public\img\edesal1.png" alt="">-->
    </div>

    <div style="margin-top: 14px; ">
        <b style="margin-left: 170px;font-size: 15px;">EMPRESA DISTRIBUIDORA ELECTRICA SALVADOREÑA</b>
    </div>

    <div style="margin-top: 5px; ">
        <b style="margin-left: 220px;font-size: 14px;">FORMATO DE SOLICITUD REGULATORIA</b>
    </div>

    <br>
    <div style="font-size: 12px; text-align:right;">
        <b>Fecha: </b> San Salvador, {{date('d')}} de <?php
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
    </div>

    <div style="margin-top: 25px;font-size: 12px; ">
      <p>  Señores </p>
      <p> Empresa Distribuidora Eléctrica Salvadoreña, S.A. De C.V.</p>
      <p> Presente</p>
    </div>

    <div style="margin-left: 420px;font-size: 12px;  ">
       <p><b>N° de Gestión Atención: </b>{{$id_atencion}}</p> 
       <p><b>N° de Gestión Macrotarea  : </b>{{$id_evento}}</p> 
    </div>

    @foreach ($datos as $dc)
        <div style="margin-top: 15px;font-size: 12px;">
            <p>Yo: <b>{{$dc->cliente}}</b> con DUI: <b>{{$dc->dui}}</b> y NIT: <b>{{$dc->nit}}</b>; actual usuario de EDESAL con Suministro NIS:
                <b>{{$dc->nis}}</b>  ubicado en la dirección: <b>{{$dc->direccion}}</b>.</p>
        </div>

        <div style="margin-top: 10px;font-size: 12px;">
            <p>N° de Medidor: <b>{{$dc->num_medidor}}</b>.</p>
        </div>
    @endforeach

    @foreach ($tipo_soli as $t)
    <div style="margin-top: 15px;font-size: 12px;">
        <p>Tipo de solicitud: <b>{{$t->tipo_soli}}</b>.</p>
    </div>
    @endforeach

    

    @foreach($clausulas as $c)
        @if($c->tipo == 'Aclaratoria')
        <div style="margin-top: 10px;font-size: 12px;">
            <p>{{$c->parrafo}}</p>
        </div>
        @endif

        @if($c->tipo == 'Fija')
        <div style="margin-top: 10px;font-size: 12px;">
            <p>{{$c->parrafo}}</p>
        </div>
        @endif
    @endforeach


    <div style="margin-top: 25px;font-size: 12px; ">
        <p>  Del mismo modo exonero a EDESAL de toda responsabilidad no contenida en la normativa anterior. </p>
        <p> Esperando de su pronta respuesta quedo de ustedes muy agradecido </p>
        <p> Atentamente</p>
    </div>


    @foreach ($datos as $dc)
        <div style="margin-top: 110px;font-size: 12px;">
            ________________________________
            <p><b>{{$dc->cliente}}</b></p>
            <p>DUI: <b>{{$dc->dui}}.</b></p>
        </div>
    @endforeach


</div>


</body>
</html>