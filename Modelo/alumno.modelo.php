<?php
session_start();
 include "conexion.php";
 class Alumno{

                public function ConsultaxMat(){
                    $IdProfesor=$_SESSION['IdProfesor'];
                    $conexion=new Conexion();
                $stmt=$conexion->prepare( "SELECT * FROM `alumnos`
                        INNER JOIN materiasalumnos ON (materiasalumnos.IdAlumno=alumnos.IdAlumno)
                        INNER JOIN materias ON (materias.IdProfesor=:miProf AND materiasalumnos.IdMateria=materias.Idmateria)");
                  $stmt->bindValue(":miProf",$IdProfesor,PDO::PARAM_INT);
                $stmt->execute();
                 return $stmt->fetchAll(PDO::FETCH_OBJ);
                   
                }

            public function ConsultarTodo(){
                $conexion=new Conexion();
                $stmt=$conexion->prepare( "SELECT * FROM `alumnos`");
                $stmt->execute();
                 return $stmt->fetchAll(PDO::FETCH_OBJ);
            }
            public function ConsultarPorId($IdAlumno){
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT * FROM `alumnos` WHERE IdAlumno=:miId");
                $stmt->bindValue(":miId",$IdAlumno,PDO::PARAM_INT);
                $stmt->execute();
                 return $stmt->fetch(PDO::FETCH_OBJ);
            }
            public function ConsultarPorNombreApellidoDNI($BUSCAR){
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT * FROM `alumnos` WHERE (Nombre=:miId OR Apellido=:miId OR Documento=:miId) ");
                $stmt->bindValue(":miId",$BUSCAR,PDO::PARAM_STR);
                $stmt->execute();
                 return $stmt->fetchAll(PDO::FETCH_OBJ);
            }
            public function ConsultarMateria($IdMateria){
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT * FROM `alumnos`INNER JOIN `materiasalumnos` ON (materiasalumnos.IdMateria =:miId AND materiasalumnos.IdAlumno=alumnos.IdAlumno)");
                $stmt->bindValue(":miId",$IdMateria,PDO::PARAM_INT);
                $stmt->execute();
                 return $stmt->fetchAll(PDO::FETCH_OBJ);
            }
           
            public function InsertarAlMa($IdAlumno,$IdMateria){
                $sql="INSERT INTO `materiasalumnos` (IdAlumno,IdMateria)
                    VALUES (:mialu,:mimat)";
                $conexion=new Conexion();
                $stmt=$conexion->prepare($sql);
                $stmt->bindValue(":mialu",$IdAlumno,PDO::PARAM_INT);
                $stmt->bindValue(":mimat",$IdMateria,PDO::PARAM_INT);
                if ( $stmt->execute()){
                     return "OK";} 
                    else { 
                    return "Error: se ha generado un error al Insertar la informacion";
                    }
            }
      
            public function Insertar($Nombre,$Apellido,$Documento,$Telefono,$Dirreccion,$Correo){
                $sql="INSERT INTO `alumnos` (Nombre,Apellido,Documento,Telefono,Dirreccion,Correo)
                    VALUES (:miNom,:miApe,:miDoc,:miTel,:miDir,:miCo)";
                $conexion=new Conexion();
                $stmt=$conexion->prepare($sql);
                $stmt->bindValue(":miNom",$Nombre,PDO::PARAM_STR);
                $stmt->bindValue(":miApe",$Apellido,PDO::PARAM_STR);
                $stmt->bindValue(":miDoc",$Documento,PDO::PARAM_STR);
                $stmt->bindValue(":miTel",$Telefono,PDO::PARAM_STR);
                $stmt->bindValue(":miDir",$Dirreccion,PDO::PARAM_STR);
                $stmt->bindValue(":miCo",$Correo,PDO::PARAM_STR);
                if ( $stmt->execute()){
                    $id = $conexion->lastInsertId();
                 return $id;} 
                    else { 
                    return "Error: se ha generado un error al Insertar la informacion";
                    }
            }
            
         public function Modificar($IdAlumno,$Nombre,$Apellido,$Documento,$Telefono,$Dirreccion,$Correo){
            $sql="UPDATE `alumnos` SET Nombre=:miNom,Apellido=:miApe,Documento=:miDoc, 
             Telefono =:miTel,Dirreccion=:miDir,Correo =:miCo WHERE IdAlumno=:miId";
            $conexion=new Conexion();
            $stmt=$conexion->prepare( $sql);
            $stmt->bindValue(":miNom",$Nombre,PDO::PARAM_STR);
            $stmt->bindValue(":miApe",$Apellido,PDO::PARAM_STR);
            $stmt->bindValue(":miDoc",$Documento,PDO::PARAM_STR);
            $stmt->bindValue(":miTel",$Telefono,PDO::PARAM_STR);
            $stmt->bindValue(":miDir",$Dirreccion,PDO::PARAM_STR);
            $stmt->bindValue(":miCo",$Correo,PDO::PARAM_STR);
            $stmt->bindValue(":miId",$IdAlumno,PDO::PARAM_INT);
            if ($stmt->execute()){
                return "OK";
                } else {
                    return "Error: se ha generado un error al Modificar la informacion";
         } }


                public function Eliminar($IdAlumno){
                    $sql= "DELETE FROM `alumnos` WHERE IdAlumno=:miId";
                    $conexion=new Conexion();
                    $stmt=$conexion->prepare($sql);                   
                    $stmt->bindValue(":miId",$IdAlumno,PDO::PARAM_INT);
                    if($stmt->execute()){
                        return "OK";
                    } else {
                            return "Error: se ha generado un error al Eliminar la informacion";
                        }
        
                } }
?>