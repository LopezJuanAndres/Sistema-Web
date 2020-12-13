/* funciones basicas de todos los archivos */
var  url2="./../Controlador/Menu.controlador.php";
var url3="./../Controlador/Materias.controlador.php";
var url4="./../Controlador/Alumno.controlador.php";
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
/* muestra en el logo el nombre del usuario logueado */
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


/* evento de carga del documento */

$(document).ready(function() {   
  cargarDatosUsuario ();
  listaMaterias();
  Consultarmismaterias();  
  $('#materia').on('change', function () {
    cambiodeMateria();
  });
  $('input.check').on('click',function(){
    alert("hice click en el check")
  });
  
});

/* Funciones Varias */
 function cambiodeMateria(){
     /*  evento de cambio del select materias*/
      if ($('#materia').val()=='todas'){
       alert("verdadero")
      Consultarmismaterias();}
 else { seleccionMateria();}                 
 }
 /* carga las opciones en el select */
 function listaMaterias(){
  $.ajax({
      url:url3,
      data:{"accion":"Materias"},
      type:'POST',
      dataType:'json'
  }).done(function(response){
  var html="";
  html +="<option value='todas'>Todas</option>";
  $.each(response, function(index,data){
      html += "<option value="+ data.IdMateria + ">"+ data.Asignatura +" "+ data.Division +"</option>";
  });
  document.getElementById("materia").innerHTML=html;
  }).fail(function(response){
   console.log(response)
  });
}

/* muestra los alumnos que tienen el mismo profesor */
function  Consultarmismaterias(){
  $.ajax({
      url:url4,
      data:{"accion":"CONSULTARMat"},
      type:'POST',
      dataType:'json'
  }).done(function(response){
  var html="";
  $.each(response, function(index,data){
      html += "<tr class='btn-outline-info'>"; 
      html += "<td>" + data.Documento +"</td>";
      html += "<td>" + data.Nombre +"</td>";
      html += "<td>" + data.Apellido +"</td>";     
      html += "<td>";
      html += "<input type='checkbox' class='check' name='check' id='check' value="+ data.IdAlumno +" >";
      html += "</td>";
      html += "</tr>";
  }); 
  document.getElementById("alumnos-asistencia").innerHTML=html;
      }).fail(function(response){
   console.log(response)
  });
}

/* muestra en la tabla todos los alumnos de la materia seleccionada */
function seleccionMateria(){
    var IdMateria=$("#materia").val();
    $.ajax({
        url:url4,
        data:{"accion":"CONSULTAR_IDMat","IdMateria":IdMateria},
        type:'POST',
        dataType:'json'
   })  .done(function(response){
    var html="";
    $.each(response, function(index,data){
      html += "<tr class='btn-outline-info'>"; 
      html += "<td>" + data.Documento +"</td>";
      html += "<td>" + data.Nombre +"</td>";
      html += "<td>" + data.Apellido +"</td>";     
      html += "<td>";
      html += "<input type='checkbox' class='check' name='check' id='check' value="+ data.IdAlumno +" onclick='ConsultarPorId("+data.IdAlumno+")' >";
      html += "</td>";
      html += "</tr>";
    });
    document.getElementById("alumnos-asistencia").innerHTML=html;
    }) .fail(function(response){
     console.log(response)
    });

}
function insertarlista(){
  var fecha=$("#fechaclase").val();
  var tema=$("#txtTema").val();
  alert(fecha+tema);

  $("#ListPresentes tr input.txtId").each(function(){
    var IdAlumno=$(this).val();
    alert (IdAlumno);
  });
  
}
/* carga los alumnos tildados en la tabla del modal */
function vercheckActivos(){
  var html="";
  document.getElementById("ListPresentes").innerHTML=html;
  $('.check:checked').each(function(){
        ConsultarPorId($(this).val());
         });   
    }


/* selecciona de la base de datos un alumno filtrado por el id */
function ConsultarPorId (IdAlumno){
  $.ajax({
      url:url4,
      data:{"accion":"CONSULTAR_ID","IdAlumno":IdAlumno},
      type:'POST',
      dataType:'json'
 })  .done(function(response){   
        var html="";
        var dni=response.Documento;
        var nom=response.Nombre;
        var ape =response.Apellido;        
      html+="<tr class='btn-outline-info'>";
      html+="<td>"+ dni +"</td>";
      html+="<td>" + nom +"</td>";
      html+="<td>" + ape +" <input type='hidden' name='txtId' id='txtId'class='txtId' value="+ IdAlumno +"></td></tr>";
      document.getElementById("ListPresentes").innerHTML+=html;
     
  }) .fail(function(response){
   console.log(response)
  });
}