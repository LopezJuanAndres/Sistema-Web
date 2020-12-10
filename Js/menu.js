var url="./../Controlador/Menu.controlador.php";
$(document).ready(function() {
   
    cargarDatosUsuario ();
    
 });

 function cargarDatosUsuario (){
    
    $.ajax({
        url:url,
        data:{"accion":"CONSULTARID"},
        type:'POST',
        dataType:'json'
    }).done(function(response){
     var usuario=response.Nombre;
       document.getElementById("Profesor").innerHTML=usuario;
    }).fail(function(response){
     console.log(response)
    });
 }
 function cerrarSesion(){
        $.ajax({
        url:url,
        data:{"accion":"CERRARSESION"},
        type:'POST',
        dataType:'json'
    }).done(function(response){
           if(response=="sesionCerrada"){
          alert("Sesion cerrada, hasta luego")
        location.href= "Login.html";
      }
    }).fail(function(response){
     console.log(response)
    });
 }