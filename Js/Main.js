var  url2="./../Controlador/Menu.controlador.php";
function cerrarSesion(){
    $.ajax({
    url:url2,
    data:{"accion":"CERRARSESION"},
    type:'POST',
    dataType:'json'
}).done(function(response){
       if(response=="sesionCerrada"){
      alert("Sesion cerrada, hasta luego ")
    location.href= "../Index.html";
  }
}).fail(function(response){
 console.log(response)
});
}
function cargarDatosUsuario (){
    
  $.ajax({
      url:url2,
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

$(document).ready(function() {
   
  cargarDatosUsuario ();
  
});

