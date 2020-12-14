var url="./../Controlador/Alumno.controlador.php";
var url2="./../Controlador/Materias.controlador.php";
var  url3="./../Controlador/Menu.controlador.php";

/*  Evento de carga del documento*/

$(document).ready(function() {
    cargarDatosUsuario();
    var profe=document.getElementById("Profe").value;    
    var compa='Administrador';
    if(profe==compa){
        alert("Modo Administrador")
        CargarMaterias();
        /*  Funcion para cargar la lista de alumnos completa modo Admin*/
           Consultar();
      } else{
          /* Funcion para cargar la lista de materias que solo son del profesor logueado*/
        listaMaterias();
        Consultarmismaterias();}     
        /*  evento de cambio del select materias*/

        $('#materia').on('change', function ()  { 
             cambiodeMateria();                 
         });
         
  /*  evento click del boton buscar*/
        $('#btnBuscar').click(function (){
        if ($('#BUSCAR').val()==''){
            Consultarmismaterias();
                }else {
                    buscar(); }   
   });


  });




 /* desruye la sesion iniciada */
function cerrarSesion(){
    $.ajax({
    url:url3,
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
/*muestra el nombre del profesor loguiado */
function cargarDatosUsuario (){
    
  $.ajax({
      url:url3,
      data:{"accion":"CONSULTARID"},
      type:'POST',
      dataType:'json'
  }).done(function(response){
   var usuario=response.Nombre;
   document.getElementById("Profe").value=usuario;
    document.getElementById("Profesor").innerHTML=usuario;
   
  }).fail(function(response){
   console.log(response)
  });
}

/* Muestra todos los alumnos de la base de datos solo lo ve el admin */
function Consultar(){
  $.ajax({
    url:url,
    data:{"accion":"CONSULTAR"},
    type:'POST',
    dataType:'json'
}).done(function(response){
var html="";
$.each(response, function(index,data){
    html += "<tr class='btn-outline-info'>"; 
    html += "<td>" + data.Nombre +"</td>";
    html += "<td>" + data.Apellido +"</td>";
    html += "<td>" + data.Documento +"</td>";
    html += "<td>" + data.Telefono +"</td>";
    html += "<td>" + data.Dirreccion +"</td>";
    html += "<td>" + data.Correo +"</td>";
    html += "<td>";
    html += "<button class='btn btn-outline-warning mr-1 btn-modificar' id='btn-modificar' onclick='ConsultarPorId(" + data.IdAlumno + ")' data-toggle='modal' data-target='#modal-Alumno' > <span class='fa fa-edit'></span>Modificar</button>";
    html += "<button class='btn btn-outline-danger' id='boton-eliminar' onclick='Eliminar(" + data.IdAlumno + ")'><span class='fa fa-trash'></span>Eliminar</button>";
    html += "</td>";
    html += "</tr>";
});
document.getElementById("datos").innerHTML=html;

}).fail(function(response){
 console.log(response)
});
}
/* muestra los alumnos que cursan esa materia */
function  Consultarmismaterias(){
    $.ajax({
        url:url,
        data:{"accion":"CONSULTARMat"},
        type:'POST',
        dataType:'json'
    }).done(function(response){
    var html="";
    $.each(response, function(index,data){
        html += "<tr class='btn-outline-info'>"; 
        html += "<td>" + data.Nombre +"</td>";
        html += "<td>" + data.Apellido +"</td>";
        html += "<td>" + data.Documento +"</td>";
        html += "<td>" + data.Telefono +"</td>";
        html += "<td>" + data.Dirreccion +"</td>";
        html += "<td>" + data.Correo +"</td>";
        html += "<td>";
        html += "<button class='btn btn-outline-warning mr-1 btn-modificar' id='btn-modificar' onclick='ConsultarPorId(" + data.IdAlumno + ")' data-toggle='modal' data-target='#modal-Alumno' > <span class='fa fa-edit'></span>Modificar</button>";
        html += "<button class='btn btn-outline-danger' id='boton-eliminar' onclick='Eliminar(" + data.IdAlumno + ")'><span class='fa fa-trash'></span>Eliminar</button>";
        html += "</td>";
        html += "</tr>";
    });
    document.getElementById("datos").innerHTML=html;
        }).fail(function(response){
     console.log(response)
    });
}
/* selecciona de la base de datos un alumno filtrado por el id */
function ConsultarPorId (IdAlumno){
    mostrarbtnModificar();
    $.ajax({
        url:url,
        data:{"accion":"CONSULTAR_ID","IdAlumno":IdAlumno},
        type:'POST',
        dataType:'json'
   })  .done(function(response){
        $("#Nombre").val(response.Nombre);
        $("#Apellido").val(response.Apellido);
        $("#Documento").val(response.Documento);
        $("#Telefono").val(response.Telefono);
        $("#Dirreccion").val(response.Dirreccion);
        $("#Correo").val(response.Correo);
        $("#IdAlumno").val(response.IdAlumno);
            var html="<span class='badge badge-pill badge-primary'>" + response.IdAlumno + "  </span>";
               document.getElementById("IdAlum").innerHTML=html;
    }) .fail(function(response){
     console.log(response)
    });
}
/* busca los datos de la base de datos */
function buscar(){
    var BUSCAR=$("#BUSCAR").val();
   
    $.ajax({
        url:url,
        data:{"accion":"BUSCAR","BUSCAR":BUSCAR},
        type:'POST',
        dataType:'json'
   })  .done(function(response){
    var html="";
    $.each(response, function(index,data){
        html += "<tr class='btn-outline-info'>"; 
        html += "<td>" + data.Nombre +"</td>";
        html += "<td>" + data.Apellido +"</td>";
        html += "<td>" + data.Documento +"</td>";
        html += "<td>" + data.Telefono +"</td>";
        html += "<td>" + data.Dirreccion +"</td>";
        html += "<td>" + data.Correo +"</td>";
        html += "<td>";
        html += "<button class='btn btn-warning mr-1 btn-modificar' id='btn-modificar' onclick='ConsultarPorId(" + data.IdAlumno + ")' data-toggle='modal' data-target='#modal-Alumno' > <span class='fa fa-edit'></span>Modificar</button>";
        html += "<button class='btn btn-danger' id='boton-eliminar' onclick='Eliminar(" + data.IdAlumno + ")'><span class='fa fa-trash'></span>Eliminar</button>";
        html += "</td>";
        html += "</tr>";
    });
    document.getElementById("datos").innerHTML=html;
    }) .fail(function(response){
     console.log(response)
    });
}

/* elimina los datos de la base de datos */
function Eliminar(IdAlumno){
    $.ajax({
        url:url,
        data:{"accion":"ELIMINAR","IdAlumno":IdAlumno},
        type:'POST',
        dataType:'json'
    }).done(function(response){
     if (response=="OK"){
        alert("Datos Borrados con exito");
        
    }else {
        alert(response);
    }
    }).fail(function(response){
        console.log(response);
    });
    Consultarmismaterias();
}
/* modifica los datos ingresados en el modal */
function Modificar(){
        $.ajax({
        url:url,
        data:retornarDatos("MODIFICAR"),
        type:'POST',
        dataType:'json'
    }).done(function(response){
        if (response=="OK"){
            alert("Datos Modificados con exito");
            Consultar()
        }else {
            alert(response);
        }
    }).fail(function(response){
        console.log(response);
    });
    Consultarmismaterias();
}
/* Inserta los datos ingresados en el modal */
function Insertar(){
    $.ajax({
    url:url,
    data: retornarDatos("INSERTAR"),
    type:'POST',
    dataType:'json'
    }) .done(function(response){
         if (response!=""){
            var idnuevo=response;
            insertarMateriaAlumno(idnuevo);           
        }else {
            alert(response);
        }
    }).fail(function(response){
        console.log(response);
    });
    
    Consultarmismaterias();
    }

/* retorna los valores obteniidos de los elementos del dom */
function retornarDatos(accion){
    return { "accion":accion,
    "Nombre":$("#Nombre").val(),
    "Apellido":$("#Apellido").val(),
    "Documento":$("#Documento").val(),
    "Telefono":$("#Telefono").val(),
    "Dirreccion":$("#Dirreccion").val(),
    "Correo":$("#Correo").val(), 
       "IdAlumno":$("#IdAlumno").val()}
}
/* muestra los botones dentro del modal */
function mostrarbtnModificar(){
    $('#btnModificar').show(); //muestro mediante id
    $('.modal-footer #btnInsertar').hide(); //oculta mediante id
}
/* Oculta los botones dentro del modal */
function ocultarbtnModificar(){
    $('.modal-footer #btnModificar').hide(); //oculta mediante id
    $('.modal-footer #btnInsertar').show(); //oculta mediante id
    $('.modal-header #IdAlum').hide(); //oculta mediante id
}
/* Limpia los inputs dentro del modal para que se ingresen datos nuevos */
function BorrarInputs(){
         $(".modal-body input").each(function(){
        $('input[type="text"]').val('');
            });   
            ocultarbtnModificar(); 
}
/* Cargar todas las materias en el select correspondiente al docente logueado */
function listaMaterias(){
    $.ajax({
        url:url2,
        data:{"accion":"Materias"},
        type:'POST',
        dataType:'json'
    }).done(function(response){
    var html="";
    var html2="";
    html +="<option value='todas'>Todas</option>";
    $.each(response, function(index,data){
        html += "<option value="+ data.IdMateria + ">"+ data.Asignatura +" "+ data.Division +"</option>";
        html2 += "<option value="+ data.IdMateria + ">"+ data.Asignatura +" "+ data.Division +"</option>";
    });
    document.getElementById("materia").innerHTML=html;
    document.getElementById("materia2").innerHTML=html2;
    }).fail(function(response){
     console.log(response)
    });
}
 /* Cargar todas las materias  en el sistema solo admin las Materias en el select */
function CargarMaterias(){
    $.ajax({
        url:url2,
        data:{"accion":"CONSULTAR"},
        type:'POST',
        dataType:'json'
    }).done(function(response){
    var html="";
    var html2="";
     html +="<option value='todas'>Todas</option>";     
    $.each(response, function(index,data){
        html += "<option value="+ data.IdMateria + ">"+ data.Asignatura +" "+ data.Division +"</option>";
        html2 +="<option value="+ data.IdMateria + ">"+ data.Asignatura +" "+ data.Division +"</option>";
    });
    document.getElementById("materia").innerHTML=html;
    document.getElementById("materia2").innerHTML=html2;
    }).fail(function(response){
     console.log(response)
    });
}
/* muestra en la tabla todos los alumnos que estan registrados en la materia seleccionada en el select */
function seleccionMateria(){
    var IdMateria=$("#materia").val();
    $.ajax({
        url:url,
        data:{"accion":"CONSULTAR_IDMat","IdMateria":IdMateria},
        type:'POST',
        dataType:'json'
   })  .done(function(response){
    var html="";
    $.each(response, function(index,data){
        html += "<tr class='btn-outline-info'>"; 
        html += "<td>" + data.Nombre +"</td>";
        html += "<td>" + data.Apellido +"</td>";
        html += "<td>" + data.Documento +"</td>";
        html += "<td>" + data.Telefono +"</td>";
        html += "<td>" + data.Dirreccion +"</td>";
        html += "<td>" + data.Correo +"</td>";
        html += "<td>";
        html += "<button class='btn btn-warning mr-1 btn-modificar' id='btn-modificar' onclick='ConsultarPorId(" + data.IdAlumno + ")' data-toggle='modal' data-target='#modal-Alumno' > <span class='fa fa-edit'></span>Modificar</button>";
        html += "<button class='btn btn-danger' id='boton-eliminar' onclick='Eliminar(" + data.IdAlumno + ")'><span class='fa fa-trash'></span>Eliminar</button>";
        html += "</td>";
        html += "</tr>";
    });
    document.getElementById("datos").innerHTML=html;
    }) .fail(function(response){
     console.log(response)
    });

}
/* agrega los datos a la tabla foranea alumnos materias */
function insertarMateriaAlumno(idnuevo){
var idalu= idnuevo;
var Idmat=$("#materia2").val();
$.ajax({
    url:url,
    data:{"accion":"INSERTAREXTRA","IdMateria":Idmat,"IdAlumno":idalu},
    type:'POST',
    dataType:'json'
    }) .done(function(response){
            if (response=="OK"){
            alert("Datos Añadidos con exito");
              }else {
            alert(response);
        }
    }).fail(function(response){
        console.log(response);
    });

}


/*  evalua si se selecciona la opcion todos*/
  function cambiodeMateria(){    
     if ($('#materia').val()=='todas'){
         Consultarmismaterias();}
else { seleccionMateria();}                 
}

/*     var parametro='todas';
      $('#materia').on('change', function ()       
        { if (materiaselecinada==parametro){
        Consultarmismaterias();
                   }else {
            seleccionMateria();  }                 
    }); */