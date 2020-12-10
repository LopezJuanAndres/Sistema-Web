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
         case "MODIFICAR":         
            $Usuario=$_POST['Usuario'];
            $Contraseña=$_POST['Contraseña'];
            $Nombre=$_POST['Nombre'];
            $Apellido=$_POST['Apellido'];
            $Correo=$_POST['Correo'];         
            $respuesta=$Login->Modificar($Usuario,$Contraseña,$Nombre,$Apellido,$Correo);
            echo json_encode($respuesta);
         break;
    }
}










?>