var url="./Controlador/Login.controlador.php";

$(document).ready(function() {
    
    ControlarSesionesIniciadas();
        
 });
//funcion para comparar los datos ingresados con los de la base de datos
function ControlarSesionesIniciadas(){
    $.ajax({
    url:url,
    data:{"accion":"ESTADO"},
    type:'POST',
    dataType:'json'
}).done(function(response){
    if(response=="SesionAbierta"){
        location.href="Menu.html";
    }
}).fail(function(response){
 console.log(response)
});
   
}


//funcion para comparar los datos ingresados con los de la base de datos
function Login(){
        $.ajax({
        url:url,
        data:{"accion":"CONSULTAR"},
        type:'POST',
        dataType:'json'
    }).done(function(response){
        var usua=$("#Usuario").val();
        var cont=$("#Contraseña").val();
        var aux=false;
        
        if(usua!="" && cont!="" ){
            var Apellido;
                var Nombre;
                var IdUsuario;
                var usuaregistrado
                var contregistrada
            $.each(response, function(index,data){
                usuaregistrado =data.Usuario;
                contregistrada =data.Contraseña;
               if (usuaregistrado===usua && contregistrada===cont){
                    aux=true;} 
                usuaregistrado =data.Correo;
                if(usuaregistrado===usua && contregistrada===cont){
                   aux=true; 
                }
                 if(aux==true){
                    Apellido=data.Apellido;
                    Nombre=data.Nombre;
                    IdUsuario=data.ID;
                    inicioSesion(IdUsuario,Nombre,Apellido);
                    return false;
                }
           });
             if(aux==false){
                alert("Error, Los datos ingresados NO coinciden con los de la Base de Datos");
              } 
               
            }else {
        alert("Por favor Ingrese todos los campos");
    }
    }).fail(function(response){
     console.log(response)
    });
       
}
// funcion para registrar una nueva cuenta
function nuevaCuenta(){
        var usua=$("#nuevousuario").val();
        var cont=$("#nuevaContraseña").val();
        var nom=$("#Nombre").val();
        var ape=$("#Apellido").val();
        var cor=$("#Correo").val();
          if(usua!="" && cont!=""&& nom!=""&& ape!=""&& cor!="" ){
            $.ajax({
                url:url,
                data:retornarDatos("INSERTAR"),
                type:'POST',
                dataType:'json'
            }).done(function(response){
                if (response=="OK"){
                    alert("Cuenta Registrada con exito");
                    }else {
                    alert(response);
                }
            }).fail(function(response){
             console.log(response)
            });
    }else {
        alert("Por favor Complete todos los campos");
    }
   }
   function retornarDatos(accion){
    return { "accion":accion,
    "Usuario":$("#nuevousuario").val(),
    "Contraseña":$("#nuevaContraseña").val(),
    "Nombre":$("#Nombre").val(),
    "Apellido":$("#Apellido").val(),
    "Correo":$("#Correo").val(),
}
    
}/**/
function inicioSesion(IdUsuario){
       $.ajax({
        url:url,
        data:{"accion":"IniciarSesion","IdUsuario":IdUsuario},
        type:'POST',
        dataType:'json'
    }).done(function(response){
        var nuevaURL="Vista/Menu.html";
        alert("¡¡Bienvenido!! Usuario y Contraseña Correctos.");
         location.href= nuevaURL
    }).fail(function(response){
     console.log(response)
    });
}