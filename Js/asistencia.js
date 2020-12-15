/* funciones basicas de todos los archivos */
var url2="./../Controlador/Menu.controlador.php";
var url3="./../Controlador/Materias.controlador.php";
var url4="./../Controlador/Alumno.controlador.php";
var url5="./../Controlador/Clases.controlador.php";
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
function cargarDatosUsuario(){
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
  // muestra el nombre del profesor loguado
  cargarDatosUsuario();
  // agrega las opciones al select materias
  listaMaterias();
   // agrega los alumnos a la tabla dependiendo de la materia seleccionada en el select
  seleccionMateria();
  //muestra en la tabla todos los alumnos del profesor logueado
  Consultarmismaterias(); 
  //cuando cambie de seleccion el select se actualiza la lista de alumnos
  cambiodeMateria();  
 
  
  
});


/* consult*/
 function cambiodeMateria(){
    /*  evento de cambio del select materias*/
  $("#materia").change(function(){
    var idmat = $(this).val();
   
    if(idmat!="todas") { 
           //si el select es distinto de todas entonces la tabla se llena con los de cierta materia
      seleccionMateria();
      ConsultarClases();  
      //.delay(1000);   
     contarAsistenciaPorAlumnos();
    } else{ 
      //sino se llena con todas las del profesor logueado
       Consultarmismaterias();}

  });
  //$("#tablaimpr").change();
               
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
  /*html +="<option value='todas'>Todas</option>";*/
  html +="<option value=''>Seleccione una materia</option>";
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
    var html2="";
    var cla= $("#nclass").val();
    $.each(response, function(index,data){
      
      html += "<tr class='btn-outline-info'>"; 
      html += "<td>" + data.Documento +"</td>";
      html += "<td>" + data.Nombre +"</td>";
      html += "<td>" + data.Apellido +"</td>";     
      html += "<td>";
      html += "<input type='checkbox' class='check' name='check' id='check' value="+ data.IdAlumno +" onclick='ConsultarPorId("+data.IdAlumno+")' >";
      html += "</td>";
      html += "</tr>";
      html2 += "<tr class='fila'>"; 
      html2 += "<td>" + data.Documento +"</td>";
      html2 += "<td>" + data.Nombre +"</td>";
      html2 += "<td>" + data.Apellido +"</td>";
      html2 += "<td id='cpre' name='cpre' class='cpre'> <input type='hidden' class='cpre' id='cpre' value="+ data.IdAlumno +"> asist.PorAlum. </input></td>";
       html2 += "<td id='Pasis' class='Pasis'> %Asistencia Por alumno</td>";
      html2 += "</tr>";     
    });
    document.getElementById("alumnos-asistencia").innerHTML=html;
    document.getElementById("tablaimpr").innerHTML=html2;
   
    }) .fail(function(response){
     console.log(response)
    });
    //$('#tablaimpr').change();
    //cuenta la asistencia que tiene cada alumno y la vuelca en la tabla cuando cambia
    
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
/* Guarda la tabla en un formato Pdf */
function pdf(){ 
  var doc= new jsPDF();

// var HTMLelement=$("#tablax").html();
 //  doc.fromHTML(HTMLelement,10,10,{
 //   'width':190  })
   doc.autoTable({html:'#tablax'});
 
  doc.save("Asistencia.pdf");
}


//insertar datos en la tabla clases
function insertClases(fecha,tema,IdMateria){
  $.ajax({
    url:url5,
    data:{"accion":"INSERTAR","Fecha":fecha,"Descripcion":tema,"IdMateria":IdMateria},
    type:'POST',
    dataType:'json'
    }) .done(function(response){
         if (response!=""){
            var idnuevo=response;
            insertAsistencia(idnuevo); 
            alert("Asistencia Registrada con exito") ;           
        }else {
            alert(response);
        }
    }).fail(function(response){
        console.log(response);
    });
    
}
//insertar datos en asistencia
function insertAsistencia(idnuevo){
  $("#ListPresentes tr input.txtId").each(function(){
    var IdAlumno=$(this).val();
        $.ajax({
      url:url5,
      data:{"accion":"INSERTARasis","IdClase":idnuevo,"IdAlumno":IdAlumno},
      type:'POST',
      dataType:'json'
      }) .done(function(response){
           if (response=="OK"){
            ConsultarAlumnos(IdAlumno); 
          }else {
              alert(response);
          }
      }).fail(function(response){
          console.log(response);
      });
  });
}
/* inserta la clase y la asistencia de los alumnos a esta clase nueva */
function insertarlista(){
  var fecha=$("#fechaclase").val();
  var tema=$("#txtTema").val();
  var IdMateria=$("#materia").val();
  //alert(fecha+tema+IdMateria);
  insertClases(fecha,tema,IdMateria) ;
  cambiodeMateria();
  
}
//cuenta todas las clases registradas para cada materia
function ConsultarClases(){
     var idmat=$("#materia").val();
       $.ajax({
      url:url5,
      data:{"accion":"CONSULTARCLASES","IdMateria":idmat},
      type:'POST',
      dataType:'json'
      }).done(function(response){
           
             document.getElementById("nclass").innerHTML=response;
      }).fail(function(response){
          console.log(response);
    
    });
}
//cuenta la cantidad de asistencias registradas de un alumno especifico
function contarAsistenciaPorAlumnos(){
  alert("En pantalla podras ver dos tablas que tienen los datos correspondiente a la materia que seleccionaste")
  $("#tablaimpr tr").each(function(){
    var idAlu= $(this).find("input.cpre").val();
     var fila=$(this).find("td.cpre"); 
     var col=$(this).find("td.Pasis");
     var cla=$("#nclass").text();
    var porc=100;
  $.ajax({
  url:url5,
  data:{"accion":"ContarAlumnos","IdAlumno":idAlu},
  type:'POST',
  dataType:'json'
  }) .done(function(response){
     // var html ="";
     // html="<tr><td><input type='text' id='inaux' value="+response+"> </td></tr>";
    // document.getElementById("tablaimpr").innerHTML+= html;
    fila.text(response);
    total=(response*porc)/cla;
    col.text(total +" %")
  }).fail(function(response){
      console.log(response);
  });    
});
  
  
}
function ejecutar(){
 
}
/*function cambioentablaimpr(){
  
  $("#tablaimpr").change(function(){
    
      alert("hubo un cambio en la tabla");
      contarAsistenciaPorAlumnos();
  
  }); 
}*/