<?php
include "../Modelo/materias.modelo.php";
 if ($_POST){    
     $Materia=new Materia();
     switch($_POST["accion"]){
         case "CONSULTAR":
            echo json_encode($Materia->ConsultarTodo());
         break;
         case "Materias":
            echo json_encode($Materia->MateriaProfesor());
         break;
         case "Profesor":
            $IdProfesor=$_POST['IdProfesor'];
            echo json_encode($Materia->nombreProfesor($IdProfesor));
         break;
         case "CONSULTAR_ID":
            $IdMateria=$_POST['IdMateria'];
            $resultado=$Materia->ConsultarPorId($IdMateria);
             echo json_encode($resultado);
         break;
         case "ELIMINAR":
            $IdMateria=$_POST['IdMateria'];
            $respuesta=$Materia->Eliminar($IdMateria);
            echo json_encode($respuesta);
         break;
         case "INSERTAR":         
            $Asignatura=$_POST['Asignatura'];
            $Curso=$_POST['Curso'];
            $respuesta=$Materia->Insertar($Asignatura,$Curso);
            echo json_encode($respuesta);
         break;
         case "MODIFICAR":
            $Asignatura=$_POST['Asignatura'];
            $Curso=$_POST['Curso'];
            $IdMateria=$_POST['IdMateria'];
            $respuesta= $Materia->Modificar($Asignatura,$Curso,$IdMateria);
            echo json_encode($respuesta);
         break;        
       }
 }
?>