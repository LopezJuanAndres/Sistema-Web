<?php
session_start();
 include "conexion.php";
 class Materia{

            public function ConsultarTodo(){
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT * FROM `materias`");
                $stmt->execute();
                 return $stmt->fetchAll(PDO::FETCH_OBJ);
            }
         
            
                public function nombreProfesor($IdProfesor){
                    $conexion=new Conexion();
                    $stmt=$conexion->prepare( "SELECT * FROM `login` WHERE ID=:miId");
                    $stmt->bindValue(":miId",$IdProfesor,PDO::PARAM_INT);
                    $stmt->execute();
                    return $stmt->fetch(PDO::FETCH_OBJ);                 
                }


            public function MateriaProfesor(){
                $IdProfesor=$_SESSION['IdProfesor'];
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT * FROM `materias` WHERE IdProfesor=:miId");
                $stmt->bindValue(":miId",$IdProfesor,PDO::PARAM_INT);
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_OBJ);
            }
            public function ConsultarPorId($IdMateria){
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT Asignatura,Division FROM `materias` WHERE IdMateria=:miId");
                $stmt->bindValue(":miId",$IdMateria,PDO::PARAM_INT);
                $stmt->execute();
                return $stmt->fetch(PDO::FETCH_OBJ);
            }
                            
          
     
       public function Insertar($Asignatura,$Curso){
        $IdProfesor=$_SESSION['IdProfesor'];
           $sql="INSERT INTO `materias` (Asignatura,Division,IdProfesor)
                  VALUES (:miMat,:miCur,:miPro)";
           $conexion=new Conexion();
           $stmt=$conexion->prepare($sql);
           $stmt->bindValue(":miMat",$Asignatura,PDO::PARAM_STR);
           $stmt->bindValue(":miCur",$Curso,PDO::PARAM_STR);
           $stmt->bindValue(":miPro",$IdProfesor,PDO::PARAM_INT);
               if ( $stmt->execute()){
                 return "OK" ;} 
                 else { 
                  return "Error: se ha generado un error al Insertar la informacion";
               }
       }
       public function Modificar($Asignatura,$Curso,$IdMateria){
        $IdProfesor=$_SESSION['IdProfesor'];
        $sql="UPDATE `materias` SET Asignatura=:miMat,Division=:miCur,IdProfesor=:miPro WHERE IdMateria=:miId";
        $conexion=new Conexion();
        $stmt=$conexion->prepare( $sql);
        $stmt->bindValue(":miMat",$Asignatura,PDO::PARAM_STR);
           $stmt->bindValue(":miCur",$Curso,PDO::PARAM_STR);
           $stmt->bindValue(":miPro",$IdProfesor,PDO::PARAM_INT);
           $stmt->bindValue(":miId",$IdMateria,PDO::PARAM_INT);
        if ($stmt->execute()){
            return "OK";
            } else {
                return "Error: se ha generado un error al Modificar la informacion";
            } }
        
                public function Eliminar($IdMateria){
                    $sql= "DELETE FROM `materias` WHERE IdMateria=:miId";
                    $conexion=new Conexion();
                    $stmt=$conexion->prepare($sql);                   
                    $stmt->bindValue(":miId",$IdMateria,PDO::PARAM_INT);
                    if($stmt->execute()){
                        return "OK";
                    } else {
                            return "Error: se ha generado un error al Eliminar la informacion";
                        }
        
                }  
            }

            /*
            public function ConsultarPorNombreApellidoDNI($BUSCAR){
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT * FROM `alumnos` WHERE (Nombre=:miId OR Apellido=:miId OR Documento=:miId) ");
                $stmt->bindValue(":miId",$BUSCAR,PDO::PARAM_STR);
                $stmt->execute();
                 return $stmt->fetchAll(PDO::FETCH_OBJ);
            }*/
?>
