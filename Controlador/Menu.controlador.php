<?php

include "../Modelo/login.modelo.php";
if ($_POST){
    $Login=new Login();
    switch($_POST["accion"]){
        case "CONSULTARID":
           echo json_encode($Login->retornarDatosUsuario());
        break;
        case "CERRARSESION":
            echo json_encode($Login->CerrarSesion());
         break;
    }
}










?>