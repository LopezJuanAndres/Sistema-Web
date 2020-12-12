<?php
include "../Modelo/alumno.modelo.php";
 if ($_POST){
     $alumno=new Alumno();
     switch($_POST["accion"]){
         case "CONSULTAR":
            echo json_encode($alumno->ConsultarTodo());
         break;
         case "CONSULTARMat":
            echo json_encode($alumno->ConsultaxMat());
         break;
         case "CONSULTAR_ID":
            $IdAlumno=$_POST['IdAlumno'];
            echo json_encode($alumno->ConsultarPorId($IdAlumno));
         break;
         case "BUSCAR":
            $BUSCAR=$_POST['BUSCAR'];
            echo json_encode($alumno->ConsultarPorNombreApellidoDNI($BUSCAR));
         break;
         case "CONSULTAR_IDMat":
            $IdMateria=$_POST['IdMateria'];
            echo json_encode($alumno->ConsultarMateria($IdMateria));
         break;
         case "ELIMINAR":
            $IdAlumno=$_POST['IdAlumno'];
            $respuesta=$alumno->Eliminar($IdAlumno);
            echo json_encode($respuesta);
         break;
         case "INSERTAR":         
            $Nombre=$_POST['Nombre'];
            $Apellido=$_POST['Apellido'];
            $Documento=$_POST['Documento'];
            $Telefono=$_POST['Telefono'];
            $Dirreccion=$_POST['Dirreccion'];
            $Correo=$_POST['Correo'];
            $respuesta=$alumno->Insertar($Nombre,$Apellido,$Documento,$Telefono,$Dirreccion,$Correo);
            echo json_encode($respuesta);
         break;
         case "MODIFICAR":
            $IdAlumno=$_POST['IdAlumno'];
            $Nombre=$_POST['Nombre'];
            $Apellido=$_POST['Apellido'];
            $Documento=$_POST['Documento'];
            $Telefono=$_POST['Telefono'];
            $Dirreccion=$_POST['Dirreccion'];
            $Correo=$_POST['Correo'];
            $respuesta= $alumno->Modificar($IdAlumno,$Nombre,$Apellido,$Documento,$Telefono,$Dirreccion,$Correo);
            echo json_encode($respuesta);
         break;
     }
 }
?>