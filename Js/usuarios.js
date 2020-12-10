var url="./../Controlador/Menu.controlador.php";


$(document).ready(function() {
    //oculta por defecto el boton de ocultar
    $("#ojocerrado").hide(); 
   //muestra en los correspondientes elementos visuales los datos de la cuenta actualmente logueada.
    cargarDatosUsuario ();
    //almacena en una variable un elemento del dom identificado con el id.
    password1=document.getElementById("Contraseña");
    //muestra la contraseña y el boton de ocultar.
    $("#ojoabierto").click(function(){
        password1.type="text";
        $("#ojocerrado").show();
        $("#ojoabierto").hide();
        });
        //oculta la contraseña y el boton de ocultar.
        $("#ojocerrado").click(function(){
            password1.type="password";
            $("#ojocerrado").hide();           
            $("#ojoabierto").show();
            });
//Guarda las modificaciones de los datos de la cuenta del usuario.
$("#guardarUsuario").click(function(){
    ModificarCuenta();
});

 });

 function cargarDatosUsuario (){
           $.ajax({
        url:url,
        data:{"accion":"CONSULTARID"},
        type:'POST',
        dataType:'json'
    }).done(function(response){
      var usua=response.Usuario;
      var cont=response.Contraseña;
      var nom=response.Nombre;
      var ape=response.Apellido;
      var cor=response.Correo;
        $("#Usuario").val(usua);
        $("#Contraseña").val(cont);
        $("#Nombre").val(nom);
        $("#Apellido").val(ape)
        $("#Correo").val(cor);
       document.getElementById("Profesor").innerHTML=nom +" "+ ape;
    }).fail(function(response){
     console.log(response)
    });
 }



function ModificarCuenta(){
            $.ajax({
            url:url,
            data:retornarDatos("MODIFICAR"),
            type:'POST',
            dataType:'json'
        }).done(function(response){
            if (response=="OK"){
                alert("Cuenta Modificada con exito");
                }else {
                alert(response);}
        }).fail(function(response){
         console.log(response)
        });
        cargarDatosUsuario ();
}

function cerrarSesion(){
    $.ajax({
    url:url,
    data:{"accion":"CERRARSESION"},
    type:'POST',
    dataType:'json'
}).done(function(response){
 var usuario=response.Nombre;
  if(response=="sesionCerrada"){
      alert("Sesion cerrada, hasta luego " +usuario)
    location.href= "Login.html";
  }
}).fail(function(response){
 console.log(response)
});
}

function retornarDatos(accion){
    return { "accion":accion,
    "Usuario":$("#Usuario").val(),
    "Contraseña":$("#Contraseña").val(),
    "Nombre":$("#Nombre").val(),
    "Apellido":$("#Apellido").val(),
    "Correo":$("#Correo").val(),
    }
}