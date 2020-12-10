$(document).ready(function() {
       Consultar();
        $("#opcionesMat").hide();
      /*  $(".Materia").hide();
       $(".Curso").hide(); 
     evento de cambio del select materias
$('#materia').on('change', function (){
    if ($('#materia').val()=='todas'){
        Consultar();
               }else {
        seleccionMateria();
    }   
  
}); */
/*  Funcion para cargar la lista de alumnos
Consultar();
*/
/*  evento click del boton buscar
$('#btnBuscar').click(function (){
if ($('#BUSCAR').val()==''){
    Consultar();
           }else {
            buscar();
}   
});
*/

});

var url="./../Controlador/Materias.controlador.php";


/* Muestra cantidad de alumnos en la tabla*/
function ConsultarPorId(IdMateria){
  
     $.ajax({
     url:url,
     data:{"accion":"CONSULTAR_ID","IdMateria":IdMateria},
     type:'POST',
     dataType:'JSON'
}) .done(function(response){
  $(".Materia").val(response.Asignatura);
  $(".Curso").val(response.Division);
  $("#opcionesMat").show();
    /* var html="<span class='badge badge-pill badge-primary'>" + filas + "  </span>";
    document.getElementById("cantAlum").innerHTML=html;*/
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
      html += "<button class='btn btn-outline-warning mr-1 btn-modificar' id='btn-modificar' onclick='ConsultarPorId("+ data.IdMateria + ")'> <span class='fa fa-edit'></span>Editar</button>";
      html += "<button class='btn btn-outline-danger' id='boton-eliminar' onclick='Eliminar(" + data.IdMateria + ")'><span class='fa fa-trash'></span>Borrar</button>";
      html += "</td>";
      html += "</tr>";
  });
  document.getElementById("materias").innerHTML=html;
    }).fail(function(response){
   console.log(response)
  });
  }

  function recorrerid(){
    var total=0;
    var filas=0;
    
    //selector &gt;&gt;  $("#GridView1 tr").find('td:eq(1)')
    //De esta manera utilizando eq seleccionamos la segunda fila, ya que la primera es 0
    $("#tablamaterias tr").find('td:eq(0)').each(function () {
     
     //obtenemos el valor de la celda
      valor = $(this).html();
     
     //le asigna a idmateria el valor que contiene la celda
     var IdMateria = parseInt(valor);
      //Envia la id y la consulta
     ConsultarPorId(IdMateria);
     
    
    })
     
    


  }

 