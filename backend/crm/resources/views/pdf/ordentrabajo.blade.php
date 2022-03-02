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
        <img style="" src="C:\xampp\htdocs\crm_backend\public\img\edesal1.png" alt="">
    </div>

    <div style="margin-top: 14px; ">
        <b style="margin-left: 170px;font-size: 14px;">EMPRESA DISTRIBUIDORA ELECTRICA SALVADOREÑA</b>
    </div>

    <div style="margin-top: 5px; ">
        <b style="margin-left: 250px;font-size: 16px;">ORDEN DE TRABAJO TECNICA</b>
    </div>


    <div style="position: relative; bottom: 20px;  ">



        <div style="position: relative; margin:0; margin-left: 510px">
            <table class="minimalistBlack" style="width: 10px;" >

                <tbody>
                <tr >
                    <td  style="width: 75px"><b style="font-size: 9px; ">Impresión</b></td>
                    <td  style="width: 120px"><b style="font-size: 10px; font-weight: bold ">{{date('d/m/Y H:i')}}</b></td>
                </tr>
                <tr>
                    <td  style="width: 75px"><b style="font-size: 9px; ">Orden N°</b></td>
                    <td  style="width: 120px"><b style="font-size: 10px; font-weight: bold ">{{$orden->id}}</b></td>
                </tr>


                </tbody>
            </table>
        </div>
    </div>


    <div style="margin-top: 10px;width: 700px">
        <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; border: none">
            <thead>
            <tr>
                <th colspan="2">Detalles de solicitud</th>
            </tr>
            </thead>
            <tbody style="border:none">
            <tr style="border:none">
                <td style="border:none">Trabajo solicitado:</td>
                <td style="border:none">{{$orden->solicitud}}</td>
            </tr>
            <tr style="border:none">
                <td style="border:none">Cliente:</td>
                <td style="border:none">{{$orden->cliente}}</td>
            </tr>
            <tr style="border:none">
                <td style="border:none">Fecha de resolución: (Compromiso con el cliente)</td>
                <td style="border:none"><?php $fecha = date_create($orden->fecha_resolucion); echo date_format($fecha,'d/m/Y')?></td>
            </tr>
            <tr style="border:none">
                <td style="border:none">Fecha de solicitud: (Area EDESAL solicitante)</td>
                <td style="border:none"><?php $fecha = date_create($orden->fecha_solicitud); echo date_format($fecha,'d/m/Y')?></td>
            </tr>
            <tr style="border:none">
                <td style="border:none">Dirección:</td>
                <td style="border:none">{{$orden->direccion}}</td>
            </tr>
            <tr style="border:none">
                <td style="border:none">Gerencia que solicita:</td>
                <td style="border:none">{{$orden->gerencia_solicita}}</td>
            </tr>

            <tr style="border:none">
                <td style="border:none">Presupuesto:</td>
                <td style="border:none">
                <?php
                    if($orden->presupuesto == null){
                        echo "N/D";
                    }
                    else{
                ?>
                $ {{$orden->presupuesto}}
                <?php
                
                    }
                ?>
                </td>
            </tr>

            <tr style="border:none">
                <td style="border:none">Ingresos Mensuales:</td>

                <td style="border:none">
                <?php
                    if($orden->ingr_mensuales == null){
                        echo "N/D";
                    }
                    else{
                ?>
                $ {{$orden->ingr_mensuales}}
                <?php
                
                    }
                ?>
                </td>
            </tr>

            <tr style="border:none">
                <td style="border:none">Ingresos anuales:</td>
                <td style="border:none">
                <?php
                    if($orden->ingr_anuales == null){
                        echo "N/D";
                    }
                    else{
                ?>
                $ {{$orden->ingr_anuales}}
                <?php
                
                    }
                ?>
                </td>
            </tr>
            <tr style="border:none">
                <td style="border:none">Años estimados:</td>

                <td style="border:none">
                <?php
                    if($orden->anios_est == null){
                        echo "N/D";
                    }
                    else{
                ?>
                 {{$orden->anios_est}}
                <?php
                
                    }
                ?>
                </td>
            </tr>
            </tbody>
        </table>
    </div>


    <div style=" margin-top:15px; width: 700px">
        <table  class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; ">
            <thead>
            <tr>
                <th colspan="2">Observaciones del solicitante</th>
            </tr>
            </thead>
            <tbody style="border: none;"  >
            <tr style="border: none;">
                <td colspan="2" style="border: none" >
                    {{$orden->observaciones}}
                </td>
            </tr>


            </tbody>
        </table>
    </div>

    <div style=" margin-top:15px; width: 700px">
        <table  class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; ">
            <thead>
            <tr>
                <th colspan="2">Observaciones del area de Grandes Clientes</th>
            </tr>
            </thead>
            <tbody style="border: none;"  >
            <tr style="border: none;">
                <td colspan="2" style="border: none" >
                    {{$orden->comentarioaprob_ventas}}
                </td>
            </tr>


            </tbody>
        </table>
    </div>

    <div style=" margin-top:15px; width: 700px">
        <table  class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; ">
            <thead>
            <tr>
                <th colspan="2">Observaciones de Gerencia</th>
            </tr>
            </thead>
            <tbody style="border: none;"  >
            <tr style="border: none;">
                <td colspan="2" style="border: none" >
                    {{$orden->comentarioaprob_admin}}
                </td>
            </tr>


            </tbody>
        </table>
    </div>


    <div style="position: relative; margin-top:30px;  width: 700px">
        <table class="minimalistBlack" style="border: none">
            <thead>
            <tr>
                <th colspan="3">Usuarios involucrados en el proceso</th>
            </tr>
            </thead>
            <tbody style="border:none">
            <tr>
                <td  style="width: 75px; border:none"><b style="font-size: 10px; "><br><br>Solicitante:</b></td>
                <td  style="width: 120px; border:none"><b style="font-size: 10px; font-weight: 400 "><br><br>{{$orden->solicitantenombre}} {{$orden->solicitanteapellido}}</b></td>
                <td  style="width: 120px; border:none"><b style="font-size: 10px; font-weight: 400 "><br><br><b>Fechas de aprobación</b></b></td>
            </tr>
            <tr>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td style="border:none"></td>
            </tr>
            <tr>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td style="border:none"></td>
            </tr>
            <tr style="">
                <td  style="width: 75px; border:none"><b style="font-size: 10px; ">Autorizado desde CRM por:</b></td>
                <td  style="width: 120px; border:none"><b style="font-size: 10px; font-weight: 400 ">
                    {{$orden->nom_tec}} {{$orden->ape_tec}}<br>
                        <b>(Gerencia técnica)</b>
                </b></td>
               
                <td style="border:none"><?php
                 $fecha1 = date_create($orden->fechaAuto1); echo date_format($fecha1,'d/m/Y')
                ?></td>
            </tr>
            <tr>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td style="border:none"></td>
            </tr>
            <tr>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td style="border:none"></td>
            </tr>
            <tr>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td style="border:none"></td>
            </tr>
            <tr style="">
                <td  style="width: 75px; border:none"></td>
                <td  style="width: 120px; border:none"><b style="font-size: 10px; font-weight: 400 ">
                    {{$orden->nom_comer}} {{$orden->ape_comer}}<br>
                        <b>(Aprobación secundaria)</b>
                 </b></td>
                 
                <td style="border:none">
                <?php
                 $fecha2 = date_create($orden->fechaAuto2); echo date_format($fecha2,'d/m/Y')
                ?>
                </td>
            </tr>
            </tbody>
        </table>
    </div>




</body>
</html>