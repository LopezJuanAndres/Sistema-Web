<?php
session_start();
 include "conexion.php";
 class Clase{
    public function Insertar( $Fecha,$Descripcion,$IdMateria){
      //  $IdProfesor=$_SESSION['IdProfesor'];
           $sql="INSERT INTO `clases` (Fecha,Descripcion,IdMateria)
                  VALUES (:miFe,:miDes,:miIdm)";
           $conexion=new Conexion();
           $stmt=$conexion->prepare($sql);
           $stmt->bindValue(":miFe",$Fecha,PDO::PARAM_STR);
           $stmt->bindValue(":miDes",$Descripcion,PDO::PARAM_STR);
           $stmt->bindValue(":miIdm",$IdMateria,PDO::PARAM_INT);
               if ( $stmt->execute()){
                $id = $conexion->lastInsertId();
                return $id;} 
                 else { 
                  return "Error: se ha generado un error al Insertar la informacion";
               }
            }
            public function InsertarAsistencia($IdAlumno,$IdClase){
                //  $IdProfesor=$_SESSION['IdProfesor'];
                     $sql="INSERT INTO `asistencia` (IdAlumno,IdClase)
                            VALUES (:miIda,:miIdc)";
                     $conexion=new Conexion();
                     $stmt=$conexion->prepare($sql);                     
                     $stmt->bindValue(":miIda",$IdAlumno,PDO::PARAM_INT);
                     $stmt->bindValue(":miIdc",$IdClase,PDO::PARAM_INT);
                         if ( $stmt->execute()){
                                return "OK";} 
                           else { 
                            return "Error: se ha generado un error al Insertar la informacion";
                         }
                      }


             public function Clasespormaterias($IdMateria){
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT count(*) FROM `clases` WHERE IdMateria=:miIdm ");
                $stmt->bindValue(":miIdm",$IdMateria,PDO::PARAM_INT);
                $stmt->execute();
                 return $stmt->fetch(PDO::FETCH_NUM);
            }
            public function AlumnosporClases($IdAlumno){
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT count(*) FROM `asistencia` WHERE IdAlumno=:miIda ");
                $stmt->bindValue(":miIda",$IdAlumno,PDO::PARAM_INT);
                $stmt->execute();
                 return $stmt->fetch(PDO::FETCH_NUM);
            }
            public function porcentaje($IdAlumno,$IdMateria){
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT count(*) FROM `asistencia` WHERE IdAlumno=:miIda ");
                $stmt->bindValue(":miIda",$IdAlumno,PDO::PARAM_INT);
                $stmt->execute();
                $stmt2=$conexion->prepare("SELECT count(*) FROM `clases` WHERE IdMateria=:miIdm ");
                $stmt2->bindValue(":miIdm",$IdMateria,PDO::PARAM_INT);
                $stmt2->execute();
                $total= ($stmt/ $stmt2)*100;
                return  $total->fetch(PDO::FETCH_NUM);

            }
            public function BuscarTema($Tema){
                $IdProfesor=$_SESSION['IdProfesor'];
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT * FROM `clases`  INNER JOIN  materias ON (materias.IdProfesor=:miIdp AND clases.Descripcion=:miDes)
                                            GROUP BY materias.IdMateria");
                $stmt->bindValue(":miIdp",$IdProfesor,PDO::PARAM_INT);
                $stmt->bindValue(":miDes",$Tema,PDO::PARAM_STR);
                $stmt->execute();
                 return $stmt->fetchAll(PDO::FETCH_OBJ);
            }

            public function ContarAlumnosPorClase($IdClase){
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT count(*) FROM `asistencia` WHERE IdClase=:miIdc ");
                $stmt->bindValue(":miIdc",$IdClase,PDO::PARAM_INT);
                $stmt->execute();
                 return $stmt->fetch(PDO::FETCH_NUM);
            }

            public function clasesdelaMateria($IdMateria){
                $conexion=new Conexion();
                $stmt=$conexion->prepare( "SELECT * FROM `clases` WHERE IdMateria=:miId");
                $stmt->bindValue(":miId",$IdMateria,PDO::PARAM_INT);
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_OBJ);                 
            }

            public function Mostrartodaslasclasesdelprofesor(){
                $IdProfesor=$_SESSION['IdProfesor'];
                $conexion=new Conexion();
                $stmt=$conexion->prepare("SELECT * FROM `clases`  INNER JOIN  materias ON (clases.IdMateria=materias.IdMateria AND materias.IdProfesor=:miId) ");
                $stmt->bindValue(":miId",$IdProfesor,PDO::PARAM_STR);
                $stmt->execute();
                 return $stmt->fetchAll(PDO::FETCH_OBJ);
            }




          /* 
             SELECT count(autor) FROM libros WHERE autor="Cervantes"
               


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

            
           */
            }
?>
