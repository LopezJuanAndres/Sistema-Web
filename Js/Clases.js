var url="./../Controlador/Materias.controlador.php";
var  url2="./../Controlador/Menu.controlador.php";
var  url3="./../Controlador/Clases.controlador.php";


$(document).ready(function() {
   
    cargarDatosUsuario ();
    listaMaterias();
    todaslasclasesdelprofesor();
    todaslasclasesdelamateria();
    
  });


//cierra la sesion 
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
//muestra el nombre del profesor logueado en el  span
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

/* carga las opciones en el select */
function listaMaterias(){
    $.ajax({
        url:url,
        data:{"accion":"Materias"},
        type:'POST',
        dataType:'json'
    }).done(function(response){
    var html="";
    /*html +="<option value='todas'>Todas</option>";*/
    html +="<option value='todas'>Seleccione una materia</option>";
    $.each(response, function(index,data){
        html += "<option value="+ data.IdMateria + ">"+ data.Asignatura +" "+ data.Division +"</option>";
    });
    document.getElementById("materia").innerHTML=html;
    }).fail(function(response){
     console.log(response)
    });
  }
//muestra en la tabla solo las coincidencias de buscar un tema dado
  function buscarTema(){
      var tema=$("#busca").val();      
      $.ajax({
        url:url3,
        data:{"accion":"Buscartema","Tema":tema},
        type:'POST',
        dataType:'json'
    }).done(function(response){
    var html="";    
    $.each(response, function(index,data){
        html +="<tr>"
        html += "<td>"+data.Fecha +"</td>" ;
        html += "<td>"+data.Descripcion+"</td>" ;
        html += "<td class='npre'><input class='nAlum' type=''hidden value="+ data.IdClase+"></td>" ;
        html += "<td></td>" ;
        html +="</tr>"
    });
    document.getElementById("Clases").innerHTML=html;
    }).fail(function(response){
     console.log(response)
    });
    $("#busca").val("");
    $("#Clases").change();
  }

//cuenta los alumnos que asistieron a esa clase
  function contaralumnosporclases(){
    $("#Clases").change(function(){
        $("#Clases td.npre").each(function(){
            var idalum= $(this).find("input.nAlum").text();
            alert(idalum);
          });
    });
     
   /* $.ajax({
        url:url3,
        data:{"accion":"ContarAlumnosEnClase","IdClase":IdClase},
        type:'POST',
        dataType:'json'
    }).done(function(response){
     var html="";
     html+="<td> <input class='nAlum' type=''hidden value="+ response+"></td>" ;
        document.getElementById("Clases").innerHTML=html;
    
    }).fail(function(response){
     console.log(response)
    }); */

  }

//mostrar todas las clases que tiene el profesor loguiado
function todaslasclasesdelprofesor(){
    $.ajax({
        url:url3,
        data:{"accion":"todaslasclases"},
        type:'POST',
        dataType:'json'
    }).done(function(response){
    var html="";    
    $.each(response, function(index,data){
        html +="<tr>"
        html += "<td>"+data.Fecha +"</td>" ;
        html += "<td>"+data.Descripcion+"</td>" ;
        html += "<td class='npre'><input class='nAlum' type=''hidden value="+ data.IdClase+"></td>" ;
        html += "<td></td>" ;
        html +="</tr>"
    });
    document.getElementById("Clases").innerHTML=html;
    }).fail(function(response){
     console.log(response)
    });
}
//muestra todas las clases de la materia seleccionada en el select
function todaslasclasesdelamateria(){
    $("#materia").change(function(){
       var idmat = $(this).val();
       if(idmat!="todas") { 
       $.ajax({
        url:url3,
        data:{"accion":"mostrarpormateria","IdMateria":idmat},
        type:'POST',
        dataType:'json'
    }).done(function(response){
    var html="";    
    $.each(response, function(index,data){
        html +="<tr>"
        html += "<td>"+data.Fecha +"</td>" ;
        html += "<td>"+data.Descripcion+"</td>" ;
        html += "<td class='npre'><input class='nAlum' type=''hidden value="+ data.IdClase+"></td>" ;
        html += "<td></td>" ;
        html +="</tr>"
    });
    document.getElementById("Clases").innerHTML=html;
    }).fail(function(response){
     console.log(response)
    });
    $("#Clases").change();
        } else {
            todaslasclasesdelprofesor();
        }
    });
}

/* Muestra todas las asignaturas y cursos en la tabla exclusivos del docente loguiado 
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
  }*/

