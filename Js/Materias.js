/*Funciones Basicas que tienen todas las paginas */
var  url2="./../Controlador/Menu.controlador.php";
var url="./../Controlador/Materias.controlador.php";
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
     $("#Profe").val()=usuario;
  }).fail(function(response){
   console.log(response)
  });
}

/* Funciones Especificas de Materias */


$(document).ready(function() {
  $("#Profe").val("");
  cargarDatosUsuario ();
  if($("#Profe").val("Administrador")){
    alert("Como Administrador Puedes ver todas las materias registradas en el sistema y su respectivo Profesor")
    Consultar();
  } else{
    listaMaterias();
  }
        

});
/* Muestra cantidad de alumnos en la tabla*/
function ConsultarPorId(IdMateria){    
  document.getElementById("TituloModal").innerHTML="Modificar Materia";
  document.getElementById("IdMateria").innerHTML=IdMateria;
     $.ajax({
     url:url,
     data:{"accion":"CONSULTAR_ID","IdMateria":IdMateria},
     type:'POST',
     dataType:'JSON'
}) .done(function(response){
  var html="";
  $("#Materia").val(response.Asignatura);
  $("#Curso").val(response.Division);
  $("#IdMateria").val(response.IdMateria);
  $("#botonModificar").show();
  $("span#IdMateria").show();
  $("#botonAgregar").hide();
}) .fail(function(response){
  console.log(response)
 });
}
/* Muestra todas las asignaturas y cursos en la tabla solo se usa cuando se loguea el administrador */ 
function Consultar(){
    $.ajax({
      url:url,
      data:{"accion":"CONSULTAR"},
      type:'POST',
      dataType:'json'
  }).done(function(response){
    var html="";  
    var Profesor="";
  $.each(response,function(index,data){      
    var IdProfesor=data.IdProfesor; 
        Profesor=$("#nprof").val();
        html += "<tr class='btn-outline-success'>"; 
      html += "<td>" + data.Asignatura + " <br ><span class='badge badge-pill badge-primary' Id='Prof"+index+"'></td>";
      html += "<td>" + data.Division +"</td>";
      html += "<td>";
      html += "<button class='btn btn-outline-info mr-1 btn-informacion' id='btn-modificar' onclick='NombreProfesor("+ IdProfesor+")' > <i class='fas fa-info'></i> Profesor</button>";
      html += "<button class='btn btn-outline-warning mr-1 btn-modificar' id='btn-modificar' onclick='ConsultarPorId("+ data.IdMateria+")' data-toggle='modal' data-target='#modalMateria'> <span class='fa fa-edit'></span>Editar</button>";
      html += "<button class='btn btn-outline-danger' id='boton-eliminar' onclick='EliminarMateria("+ data.IdMateria+")'><span class='fa fa-trash'></span>Borrar</button>";
      html += "</td>";
      html += "</tr>";
      
  });
  document.getElementById("materias").innerHTML=html;
    }).fail(function(response){
   console.log(response)
  });
  } 
  function NombreProfesor(IdProfesor){
          $.ajax({
      url:url,
      data:{"accion":"Profesor","IdProfesor":IdProfesor},
      type:'POST',
      dataType:'json'
  }).done(function(response){
     Profesor=response.Nombre;
   alert("Profesor a cargo :"+ Profesor)
    
   }).fail(function(response){
    console.log(response)
   });
  }
/* Muestra todas las asignaturas y cursos en la tabla exclusivos del docente loguiado */
  function listaMaterias(){
    $.ajax({
      url:url,
      data:{"accion":"Materias"},
      type:'POST',
      dataType:'json'
  }).done(function(response){
   var html="";
  $.each(response,function(index,data){
      html += "<tr class='btn-outline-info'>"; 
      html += "<td>" + data.Asignatura +"</td>";
      html += "<td>" + data.Division +"</td>";
      html += "<td>";
      html += "<button class='btn btn-outline-warning mr-1 btn-modificar' id='btn-modificar' onclick='ConsultarPorId("+ data.IdMateria+")' data-toggle='modal' data-target='#modalMateria'> <span class='fa fa-edit'></span>Editar</button>";
      html += "<button class='btn btn-outline-danger' id='boton-eliminar' onclick='EliminarMateria("+ data.IdMateria+")'><span class='fa fa-trash'></span>Borrar</button>";
      html += "</td>";
      html += "</tr>";
  });
  document.getElementById("materias").innerHTML=html;
    }).fail(function(response){
   console.log(response)
  });
  }
/* Modifica la informacion de las materias en el sistema */
  function modificar(){    
    $.ajax({
      url:url,
      data:retornarDatos("MODIFICAR"),
      type:'POST',
      dataType:'json'
 }) .done(function(response){
  if (response=="OK"){
    alert("Materia Modificada con exito");
    listaMaterias();
    }else {
    alert(response);} 
 }) .fail(function(response){
   console.log(response)
  });
  
  }
  /* Modifica el modal para que se ingrese una nueva materia */
   function nuevaMateria(){
    document.getElementById("TituloModal").innerHTML="Nueva Materia";
    $(".modal-body input").each(function(){
      $('input[type="text"]').val('');
          });   
         $("#botonModificar").hide();
         $("span#IdMateria").hide();
         $("#botonAgregar").show();
   }
   /* Registra los datos ingresados por el usuario a la base de datos*/
    function AgregarMateria(){
      $.ajax({
        url:url,
        data:retornarDatos("INSERTAR"),
        type:'POST',
        dataType:'json'
    }).done(function(response){
      if (response=="OK"){
        alert("Materia Registrada con exito");
        listaMaterias();
        }else {
        alert(response);}         
    }).fail(function(response){
     console.log(response)
    });    
    }
/* Elimina la materia de la base de datos*/
    function EliminarMateria(IdMateria){
      $.ajax({
        url:url,
        data:{"accion":"ELIMINAR","IdMateria":IdMateria},
        type:'POST',
        dataType:'json'
    }).done(function(response){
      if (response=="OK"){
      alert("Materia Eliminada con exito");
      listaMaterias();
       }else { alert(response);} 
    }).fail(function(response){
     console.log(response)
    });
   
    }
   /* Toma los valores almacenados en los elemntos  del dom referenciados exclusivamente con el ID */
    function retornarDatos(accion){
      return {"accion":accion,
      "Asignatura":$("#Materia").val(),
      "Curso":$("#Curso").val(),
      "IdMateria":$("#IdMateria").val(),}
  }
   
  

 