<?php

class Conexion extends PDO {

public function __construct(){

    try{
        parent::__construct('mysql:host=mysql_db:3306; dbname=gestorasistencia','root','root');
        parent::exec("set names utf8");
    }catch(PDOException $e){
        echo "Error al conectar". $e->getMessage();
        exit;
    }
}

}

?>