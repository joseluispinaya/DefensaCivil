
// Configuramos SweetAlert para que actúe como un Toast
const ToastMaster = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

function mostrarAlerta(titulo, mensaje, icono, claseBoton = "btn btn-primary") {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonText: "Ok",
        buttonsStyling: false, // Esto es importante en tu plantilla para usar los botones de Bootstrap
        customClass: {
            confirmButton: claseBoton
        }
    });
}

function mostrarAlertaZero(titulo, mensaje, icono) {

    let btnClass = 'btn-primary';

    // Asignamos el color del botón según el estilo de Color Admin
    if (icono === 'success') btnClass = 'btn-success';
    else if (icono === 'warning') btnClass = 'btn-warning';
    else if (icono === 'error') btnClass = 'btn-danger';
    else if (icono === 'info') btnClass = 'btn-info';

    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonText: "Ok",
        buttonsStyling: false, // Esto es importante en tu plantilla para usar los botones de Bootstrap
        customClass: {
            confirmButton: 'btn ' + btnClass
        }
    });
}

$(document).ready(function () {

    const usuarioLog = sessionStorage.getItem('usuaLog');

    if (!usuarioLog) {
        window.location.replace('Login.aspx');
        return;
    }

    try {
        const usua = JSON.parse(usuarioLog);
        // mostrar la imagen y nombre del usuairo 

        $("#imgAdmins").attr("src", usua.FotoUrl || "Imagenes/sinimagen.png");
        $("#txtApellidosAdm").text(usua.Apellidos);

        const rolUser = usua.IdRol;

        // Oculta todo al inicio
        $(".menu-adminz").hide();

        // Mostrar u ocultar elementos del menú según el rol del usuario
        if (rolUser === 1) { // Rol de Administrador
            $(".menu-adminz").show();
        } else {
            $(".menu-adminz").hide();
        }

        // Iniciar el temporizador de inactividad
        //iniciarTemporizadorInactividad();

        // Detectar actividad del usuario para reiniciar el temporizador
        //$(document).on('mousemove keypress click scroll', reiniciarTemporizadorInactividad);

    } catch (error) {
        console.error("Error leyendo sesión", error);
        sessionStorage.clear();
        window.location.replace('Login.aspx');
    }

});

$('#salirsis').on('click', function (e) {
    e.preventDefault();

    // Opcional: Preguntar antes de salir con SweetAlert
    Swal.fire({
        title: '¿Cerrar Sesión?',
        text: "Saldrás del sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            EjecutarCierreSesion();
        }
    })
});

function EjecutarCierreSesion() {
    $.ajax({
        // Asegúrate que la ruta apunte a donde pusiste el WebMethod
        // Si estás en MasterEstudiante/Inicio.aspx, la ruta es "Inicio.aspx/CerrarSesion"
        url: "Inicio.aspx/CerrarSesion",
        type: "POST",
        data: "{}",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if (response.d.Estado) {
                // 1. Limpiar rastro en cliente
                sessionStorage.clear();
                localStorage.clear(); // Por si usaste localstorage

                // 2. Redireccionar
                // Usamos 'replace' para que el usuario no pueda volver atrás con el botón del navegador
                // Ajusta la ruta "../Login.aspx" dependiendo de qué tan adentro esté tu archivo
                window.location.replace('Login.aspx');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error al cerrar sesión");
            // Si falla el servidor, igual sacamos al usuario visualmente por seguridad
            window.location.replace('Login.aspx');
        }
    });
}

//function EjecutarCierreSesion() {
//    sessionStorage.clear();
//    window.location.replace('Login.aspx');
//}

// Cierre de sesión por inactividad
//5 minutos = 5 * 60 * 1000 = 300000 ms
//var tiempoMaximoInactividad = 300000;
var tiempoMaximoInactividad = 60000; // 1 minuto (60000 ms)
var temporizadorInactividad;

function iniciarTemporizadorInactividad() {
    // Iniciar el temporizador de inactividad
    temporizadorInactividad = setTimeout(cerrarSesionPorInactividad, tiempoMaximoInactividad);
}

function reiniciarTemporizadorInactividad() {
    // Reiniciar el temporizador de inactividad cuando detecta actividad del usuario
    clearTimeout(temporizadorInactividad);
    iniciarTemporizadorInactividad();
}

// Función para cerrar sesión debido a la inactividad
function cerrarSesionPorInactividad() {
    Swal.fire({
        icon: "warning",
        title: "Cerrando Sesion..",
        text: "La Sesión se cerrara por inactividad.",
        showConfirmButton: false,
        timer: 2000
    });

    setTimeout(function () {
        EjecutarCierreSesion();  // Llama a EjecutarCierreSesion después del retraso
    }, 2200);
}

// Función global para mostrar alertas SweetAlert