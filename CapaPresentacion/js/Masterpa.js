
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

$(document).ready(function () {

    const usuarioLog = sessionStorage.getItem('usuaLog');

    if (!usuarioLog) {
        window.location.replace('Login.aspx');
        return;
    }

    try {
        const usua = JSON.parse(usuarioLog);
        // mostrar la imagen y nombre del usuairo 

        $("#imgAdmins").attr("src", usua.ImagenUser || "Imagenes/sinimagen.png");
        $("#txtApellidosAdm").text(usua.Apellidos);

        // Iniciar el temporizador de inactividad
        iniciarTemporizadorInactividad();

        // Detectar actividad del usuario para reiniciar el temporizador
        $(document).on('mousemove keypress click scroll', reiniciarTemporizadorInactividad);

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
    sessionStorage.clear();
    window.location.replace('Login.aspx');
}

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