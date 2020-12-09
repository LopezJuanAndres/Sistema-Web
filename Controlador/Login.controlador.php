<?php

include "../Modelo/login.modelo.php";
 if ($_POST){
     $Login=new Login();
     switch($_POST["accion"]){
         case "CONSULTAR":
            echo json_encode($Login->ConsultarTodo());
         break;
         case "INSERTAR":         
            $Usuario=$_POST['Usuario'];
            $Contraseña=$_POST['Contraseña'];
            $Nombre=$_POST['Nombre'];
            $Apellido=$_POST['Apellido'];
            $Correo=$_POST['Correo'];
            $respuesta=$Login->Insertar($Usuario,$Contraseña,$Nombre,$Apellido,$Correo);
            echo json_encode($respuesta);
         break;
         case "MODIFICAR":         
            $Usuario=$_POST['Usuario'];
            $Contraseña=$_POST['Contraseña'];
            $Nombre=$_POST['Nombre'];
            $Apellido=$_POST['Apellido'];
            $Correo=$_POST['Correo'];
            $IdUsuario=$_POST['IdUsuario'];
            $respuesta=$Login->Modificar($IdUsuario,$Usuario,$Contraseña,$Nombre,$Apellido,$Correo);
            echo json_encode($respuesta);
         break;
         case "ESTADO":         
             echo json_encode($Login->controlSesion());
         break;
         case "IniciarSesion":         
            $IdUsuario=$_POST['IdUsuario'];
            $respuesta=$Login->Sesion($IdUsuario);
            echo json_encode($respuesta);
         break;  /* */
     }
 }
?>