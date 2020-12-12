var  url3="./../Controlador/Menu.controlador.php";
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

/* */
var url="./../Controlador/Alumno.controlador.php";
var url2="./../Controlador/Materias.controlador.php";



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
CargarMaterias();
}).fail(function(response){
 console.log(response)
});
}
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
    Consultar();
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
    Consultar();
}
/* Inserta los datos ingresados en el modal */
function Insertar(){
    $.ajax({
    url:url,
    data: retornarDatos("INSERTAR"),
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
    Consultar();
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
    html +="<option value='todas'>Todas</option>";
    $.each(response, function(index,data){
        html += "<option value="+ data.IdMateria + ">"+ data.Asignatura +" "+ data.Division +"</option>";
    });
    document.getElementById("materia").innerHTML=html;
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
    html +="<option value='todas'>Todas</option>";
    $.each(response, function(index,data){
        html += "<option value="+ data.IdMateria + ">"+ data.Asignatura +" "+ data.Division +"</option>";
    });
    document.getElementById("materia").innerHTML=html;
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



/*  Evento de carga del documento*/

$(document).ready(function() {
    cargarDatosUsuario();
    var profe=document.getElementById("Profe").value;    
    var compa='Administrador';
    if(profe==compa){
        alert("Como Administrador Puedes ver todas las materias registradas en el sistema y su respectivo Profesor")
        CargarMaterias();
        /*  Funcion para cargar la lista de alumnos completa modo Admin*/
           Consultar();

      } else{
          /*  Funcion para cargar la lista de materias que solo son del profesor logueado*/
        listaMaterias();
      }
        /*  evento de cambio del select materias*/
    $('#materia').on('change', function ()
    { if ($('#materia').val()=='todas'){
        Consultarmismaterias();
                   }else {
            seleccionMateria();  }                 
    });


  /*  evento click del boton buscar*/
  $('#btnBuscar').click(function (){
    if ($('#BUSCAR').val()==''){
        Consultarmismaterias();
               }else {
                buscar();
    }   
   });


  });