var url="./../Controlador/Materias.controlador.php";
var  url2="./../Controlador/Menu.controlador.php";
var  url3="./../Controlador/Clases.controlador.php";


$(document).ready(function() {
   
    cargarDatosUsuario ();
    listaMaterias();
    todaslasclasesdelprofesor();
    todaslasclasesdelamateria();
    $("#Clases").change(function(){
      //setTimeout(contaralumnosporclases(),4000);
      contaralumnosporclases().delay(4000);
    })
    
    
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
        html += "<td class='npre'><input class='nAlum' type='hidden' value="+ data.IdClase+"></td>" ;
        html += "<td></td>" ;
        html +="</tr>"
    });
    document.getElementById("Clases").innerHTML=html;
    }).fail(function(response){
     console.log(response)
    });
    $("#Clases").change();
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
    var nalumnos=0;   
    $.each(response, function(index,data){
    
        html +="<tr>"
        html += "<td>"+data.Fecha +"</td>" ;
        html += "<td>"+data.Descripcion+"</td>" ;
        html += "<td class='npre'><input class='nAlum' type='hidden' value="+ data.IdClase+">"+nalumnos+"</td>" ;
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

function contarclasesporasistencia(IdClase,fila){
 
  $.ajax({
    url:url3,
    data:{"accion":"clasesenAsistencia","IdClase":IdClase},
    type:'POST',
    dataType:'json'
}).done(function(response){
  fila.find("td.npre").text(response);
  
}).fail(function(response){
 console.log(response)
});
}

//cuenta los alumnos que asistieron a esa clase
function contaralumnosporclases(){
  alert("al seleccionar la materia puede ver todas las clases que se dictaron");
  $("#Clases tr").each(function(){
      var idalum= $(this).find("input.nAlum").val();
      var fila=$(this);
      contarclasesporasistencia(idalum,fila);
    });   


}
 /*
function cambiodeMateria(){
   evento de cambio del select materias
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
             
}*/