$(document).ready(function() {
       Consultar();
       Profesor();

});

var url="./../Controlador/Materias.controlador.php";


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
/* Muestra asignatura y curso en la tabla */

function Consultar(){
    $.ajax({
      url:url,
      data:{"accion":"CONSULTAR"},
      type:'POST',
      dataType:'json'
  }).done(function(response){
  var clases=0;
  var guachos=0;
  var html="";
  $.each(response, function(index,data){
    var idcelda="cantAlum"+index;
      html += "<tr class='btn-outline-info'>"; 
      html += "<td>" + data.Asignatura +"</td>";
      html += "<td>" + data.Division +"</td>";
      html += "<td>";
      html += "<button class='btn btn-outline-warning mr-1 btn-modificar' id='btn-modificar' onclick='ConsultarPorId("+ data.IdMateria + ")' data-toggle='modal' data-target='#modalMateria'> <span class='fa fa-edit'></span>Editar</button>";
      html += "<button class='btn btn-outline-danger' id='boton-eliminar' onclick='Eliminar(" + data.IdMateria + ")'><span class='fa fa-trash'></span>Borrar</button>";
      html += "</td>";
      html += "</tr>";
  });
  document.getElementById("materias").innerHTML=html;
    }).fail(function(response){
   console.log(response)
  });
  }

  function modificar(){
    
    $.ajax({
      url:url,
      data:{"accion":"MODIFICAR",},
      type:'POST',
      dataType:'JSON'
 }) .done(function(response){
   $(".Materia").val(response.Asignatura);
   $(".Curso").val(response.Division);
   $("#opcionesMat").show();
     
       }) .fail(function(response){
   console.log(response)
  });
  }
   function nuevaMateria(){
    document.getElementById("TituloModal").innerHTML="Nueva Materia";
    $(".modal-body input").each(function(){
      $('input[type="text"]').val('');
          });   
         $("#botonModificar").hide();
         $("span#IdMateria").hide();
         $("#botonAgregar").show();
   }
   

   
  

 