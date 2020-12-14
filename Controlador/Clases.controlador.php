<?php
include "../Modelo/Clases.modelo.php";
 if ($_POST){    
     $clase=new Clase();
     switch($_POST["accion"]){
         case "INSERTAR":         
            $Fecha=$_POST['Fecha'];
            $Descripcion=$_POST['Descripcion'];
            $IdMateria=$_POST['IdMateria'];
            $respuesta=$clase->Insertar( $Fecha,$Descripcion,$IdMateria);
            echo json_encode($respuesta);
         break;
         case " INSERTARasis":         
            $IdAlumno=$_POST['IdAlumno'];
            $IdClase=$_POST['IdClase'];
            $respuesta=$clase->InsertarAsistencia($IdAlumno,$IdClase);
            echo json_encode($respuesta);
         break;
         case "CONSULTARCLASES":
           $IdMateria=$_POST['IdMateria'];
            echo json_encode($clase->Clasespormaterias($IdMateria));
         break;
         case "ContarAlumnos":
            $IdAlumno=$_POST['IdAlumno'];
             echo json_encode($clase->AlumnosporClases($IdAlumno));
          break;
        /*   case "Materias":
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
         
         case "MODIFICAR":
            $Asignatura=$_POST['Asignatura'];
            $Curso=$_POST['Curso'];
            $IdMateria=$_POST['IdMateria'];
            $respuesta= $Materia->Modificar($Asignatura,$Curso,$IdMateria);
            echo json_encode($respuesta);
         break; */       
       }
 }
?>