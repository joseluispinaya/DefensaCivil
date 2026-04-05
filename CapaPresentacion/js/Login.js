
// Configuramos SweetAlert para que actúe como un Toast
// (Le agregué fondo oscuro para que combine con el nuevo diseño)
const ToastLogin = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#1a1d24',
    color: '#fff',
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
        background: '#1a1d24',
        color: '#fff',
        confirmButtonText: "Ok",
        buttonsStyling: false, // Esto es importante en tu plantilla para usar los botones de Bootstrap
        customClass: {
            confirmButton: claseBoton
        }
    });
}

$(document).ready(function () {

    // Generar el Captcha al cargar la página
    show();

    // Botón para recargar el Captcha si no se entiende
    $('#btnReloadCaptcha').on('click', function () {
        show();
        $('#inputCaptcha').val('').focus();
    });

    // ==========================================
    // EVENTO SUBMIT DEL FORMULARIO DE LOGIN
    // ==========================================
    $('#frmLogin').on('submit', function (e) {
        // A) Evitamos que la página web se recargue por defecto
        e.preventDefault();

        // B) Bloqueamos el botón para evitar doble clic
        let btnSubmit = $(this).find('button[type="submit"]');
        btnSubmit.prop('disabled', true);

        // C) Capturamos los valores
        let usuario = $('#inputCorreo').val().trim();
        let password = $('#inputPassword').val().trim();
        let captchaInput = $('#inputCaptcha').val().trim();
        let captchaGenerado = $('#muestracapchap').text();

        // D) Validación estricta del Captcha (Sensible a mayúsculas/minúsculas)
        if (captchaInput !== captchaGenerado) {
            ToastLogin.fire({
                icon: 'error',
                title: 'El código de seguridad no coincide. Intente nuevamente.'
            });

            show(); // Regeneramos código
            $('#inputCaptcha').val('').focus();
            btnSubmit.prop('disabled', false); // Liberamos el botón
            return;
        }

        // E) Mostrar Pantalla de Carga (LoadingOverlay en modo oscuro)
        $.LoadingOverlay("show", {
            image: "",
            custom: '<div class="spinner-border text-warning m-2" style="height: 5rem; width: 5rem;" role="status"></div>',
            //fontawesome: "ti ti-loader-2 ti-spin",
            text: "Verificando credenciales...",
            textColor: "#ffffff",
            background: "rgba(0, 0, 0, 0.85)"
        });

        $.ajax({
            url: "Login.aspx/LoginUsuario",
            type: "POST",
            data: JSON.stringify({ Correo: usuario, Clave: password }),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (response) {

                $.LoadingOverlay("hide");
                if (response.d.Estado) {
                    const user = response.d.Data;

                    sessionStorage.clear();
                    // Almacenar el objeto usuario completo en sessionStorage
                    sessionStorage.setItem('usuaLog', JSON.stringify(user));

                    Swal.fire({
                        icon: 'success',
                        title: '¡Acceso Autorizado!',
                        text: '¡Bienvenido al sistema usuario!',
                        background: '#1a1d24',
                        color: '#fff',
                        showConfirmButton: false,
                        timer: 2000
                    });

                    $("#inputCorreo, #inputPassword, #inputCaptcha").val("");

                    setTimeout(() => window.location.href = 'Inicio.aspx', 2200);

                } else {
                    mostrarAlerta("¡Atención!", response.d.Mensaje, "warning", "btn btn-warning");
                    // Si falla la contraseña, también es buena práctica cambiar el captcha
                    show();
                    $('#inputCaptcha').val('');
                    $('#inputPassword').val('').focus();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $.LoadingOverlay("hide");
                mostrarAlerta("Error", "Error de comunicación con el servidor.", "error", "btn btn-danger");
                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            },
            complete: function () {
                btnSubmit.prop('disabled', false); // Liberamos el botón
            }
        });
    });

    // ==========================================
    // EVENTO SUBMIT DEL FORMULARIO DE RECUPERAR
    // ==========================================
    $('#frmRecuperar').on('submit', function (e) {
        e.preventDefault();

        let btnSubmit = $(this).find('button[type="submit"]');
        btnSubmit.prop('disabled', true);

        // el hide debe estar mas abajo una vez todo sea correcto recien cerrarlo
        $('#modalRecuperar').modal('hide');

        $.LoadingOverlay("show", {
            image: "",
            custom: '<div class="spinner-border text-warning m-2" style="height: 5rem; width: 5rem;" role="status"></div>',
            //custom: '<i class="ti ti-cube-send" style="font-size: 20rem; color: #fff;"></i>',
            //custom: '<i class="ti ti-cube-send" style="height: 10rem; width: 10rem;"></i>',
            //fontawesome: "ti ti-cube-send",
            text: "Enviando instrucciones...",
            textColor: "#ffffff",
            background: "rgba(0, 0, 0, 0.85)"
        });

        setTimeout(function () {
            $.LoadingOverlay("hide");

            Swal.fire({
                icon: 'success',
                title: 'Instrucciones Enviadas',
                text: 'Revise su correo para restablecer su clave.',
                background: '#1a1d24',
                color: '#fff',
                showConfirmButton: false,
                timer: 2000
            });

            $('#emailRecuperacion').val('');
            btnSubmit.prop('disabled', false);
        }, 2000);
    });

});

// ==========================================
// FUNCIÓN PARA GENERAR EL CAPTCHA ALFANUMÉRICO
// ==========================================
function show() {
    let character = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    let com = '';
    for (let i = 0; i < 6; i++) {
        let store = character.charAt(Math.floor(Math.random() * character.length));
        com = com + store;
    }
    $("#muestracapchap").text(com);
}

// fin