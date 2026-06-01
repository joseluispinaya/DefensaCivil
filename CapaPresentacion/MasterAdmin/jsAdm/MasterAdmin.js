
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

    const usuarioLog = sessionStorage.getItem('usuaAdmin');

    if (!usuarioLog) {
        window.location.replace('../Login.aspx');
        return;
    }

    try {
        const usua = JSON.parse(usuarioLog);
        // mostrar la imagen y nombre del usuairo 

        $("#imgAdmins").attr("src", usua.ImagenUser || "/Imagenes/sinimagen.png");
        $("#txtApellidosAdm").text(usua.Apellidos);

    } catch (error) {
        console.error("Error leyendo sesión", error);
        sessionStorage.clear();
        window.location.replace('../Login.aspx');
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
    window.location.replace('../Login.aspx');
}

// fin