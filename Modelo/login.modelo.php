<?php
session_start();
 include "conexion.php";
 class Login{

                public function controlSesion(){
                    if(!empty($_SESSION['IdProfesor']))
                        {
                       return"SesionAbierta";
                        }
                }
            public function ConsultarTodo(){
                $conexion=new Conexion();
                $stmt=$conexion->prepare( "SELECT * FROM `login`");
                $stmt->execute();
                 return $stmt->fetchAll(PDO::FETCH_OBJ);
            }
            public function CerrarSesion(){         
                    unset($_SESSION['IdProfesor']);
                    session_destroy();
                    return "sesionCerrada";
            }
               public function Sesion($IdUsuario){
                 $_SESSION['IdProfesor']=$IdUsuario;
                return  $_SESSION['IdProfesor'];
               }    
               public function retornarDatosUsuario(){
                $IdProfesor=$_SESSION['IdProfesor'];
                $conexion=new Conexion();
                $stmt=$conexion->prepare( "SELECT * FROM `login` WHERE ID=:miId");
                $stmt->bindValue(":miId",$IdProfesor,PDO::PARAM_INT);
                $stmt->execute();
                return $stmt->fetch(PDO::FETCH_OBJ);
               }
                
            public function Insertar($Usuario,$Contraseña,$Nombre,$Apellido,$Correo){
                $sql="INSERT INTO `login` (Usuario,Contraseña,Nombre,Apellido,Correo)
                    VALUES (:miUsu,:miCon,:miNom,:miApe,:miCor)";
                $conexion=new Conexion();
                $stmt=$conexion->prepare($sql);
                $stmt->bindValue(":miUsu",$Usuario,PDO::PARAM_STR);
                $stmt->bindValue(":miCon",$Contraseña,PDO::PARAM_STR);
                $stmt->bindValue(":miNom",$Nombre,PDO::PARAM_STR);
                $stmt->bindValue(":miApe",$Apellido,PDO::PARAM_STR);
                $stmt->bindValue(":miCor",$Correo,PDO::PARAM_STR);
                if ( $stmt->execute()){
                    return "OK" ;} 
                    else { 
                    return "Error: se ha generado un error al Insertar la informacion";
                    }
            }
           
         public function Modificar($IdUsuario,$Usuario,$Contraseña,$Nombre,$Apellido,$Correo){
            $sql="UPDATE `login` SET Usuario=:miUsu,Contraseña=:miCon,Nombre=:miNom, 
             Apellido =:miApe,Correo=:miCor WHERE ID=:miId";
            $conexion=new Conexion();
            $stmt=$conexion->prepare( $sql);
            $stmt->bindValue(":miNom",$Usuario,PDO::PARAM_STR);
            $stmt->bindValue(":miApe",$Contraseña,PDO::PARAM_STR);
            $stmt->bindValue(":miDoc",$Nombre,PDO::PARAM_STR);
            $stmt->bindValue(":miTel",$Apellido,PDO::PARAM_STR);
            $stmt->bindValue(":miDir",$Correo,PDO::PARAM_STR);
            $stmt->bindValue(":miId",$IdProfesor,PDO::PARAM_INT);
            if ($stmt->execute()){
                return "OK";
                } else {
                    return "Error: se ha generado un error al Modificar la informacion";
         } }
 /* 
              public function Eliminar($IdProfesor){
                    $sql= "DELETE * FROM `login` WHERE IdAlumno=:miId";
                    $conexion=new Conexion();
                    $stmt=$conexion->prepare($sql);                   
                    $stmt->bindValue(":miId",$IdProfesor,PDO::PARAM_INT);
                    if($stmt->execute()){
                        return "OK";
                    } else {
                            return "Error: se ha generado un error al Eliminar la informacion";
                        }
        
                }*/
             }
?>
