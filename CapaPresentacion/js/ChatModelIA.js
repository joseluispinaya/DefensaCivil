
$(document).ready(function () {

    //buscadorPropiedades();

    // Disparar evento al hacer clic en el botón Enviar
    $("#btnEnviar").on("click", function () {
        generarRespuesta();
    });

    // Disparar evento al presionar la tecla "Enter" en el input
    $("#txtPregunta").on("keypress", function (e) {
        if (e.which === 13) {
            generarRespuesta();
        }
    });

    // NUEVA LÓGICA: Web Speech API (Micrófono)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let reconocimiento;

    if (SpeechRecognition) {
        reconocimiento = new SpeechRecognition();
        reconocimiento.lang = 'es-BO'; // Español de Bolivia (puedes usar 'es-ES' si prefieres)
        reconocimiento.continuous = false; // false = se detiene solo cuando el usuario deja de hablar
        reconocimiento.interimResults = false; // Solo devuelve el texto final, no los fragmentos en vivo

        reconocimiento.onstart = function () {
            // UX: Cambiamos el color del botón a rojo y el texto del input para avisar que está grabando
            $("#btnMicrofono").removeClass("btn-soft-primary").addClass("btn-danger");
            $("#txtPregunta").val(""); // Limpiamos el input
            $("#txtPregunta").attr("placeholder", "Escuchando... hable ahora.");
        };

        reconocimiento.onresult = function (event) {
            // Capturamos la transcripción de la voz
            const textoDictado = event.results[0][0].transcript;

            // Lo colocamos en la caja de texto
            $("#txtPregunta").val(textoDictado);
        };

        reconocimiento.onerror = function (event) {
            console.error("Error en el micrófono: ", event.error);
            $("#txtPregunta").attr("placeholder", "Error al escuchar. Intente de nuevo.");
        };

        reconocimiento.onend = function () {
            // UX: Restauramos el color del botón y el placeholder original cuando termina de escuchar
            $("#btnMicrofono").removeClass("btn-danger").addClass("btn-soft-primary");
            $("#txtPregunta").attr("placeholder", "Escriba su mensaje aquí...");
        };

        // Evento click para el nuevo botón del micrófono
        $("#btnMicrofono").on("click", function () {
            try {
                reconocimiento.start();
            } catch (ex) {
                // Si el usuario hace doble clic rápido y ya estaba iniciado, evitamos un error en consola
                reconocimiento.stop();
            }
        });
    } else {
        // Fallback por si el navegador es antiguo y no soporta la API
        $("#btnMicrofono").on("click", function () {
            mostrarAlertaZero("¡Atención!", "Su navegador actual no soporta el dictado por voz. Intente utilizar Google Chrome o Microsoft Edge.", "warning");
        });
    }

});

function generarRespuesta() {
    let $inputPregunta = $("#txtPregunta");
    let pregunta = $inputPregunta.val().trim();
    let $btnEnviar = $("#btnEnviar");

    // Evitar enviar peticiones si el input está vacío
    if (pregunta === "") return;

    // 1. Agregar la pregunta del usuario al chat visualmente
    agregarMensajeUsuario(pregunta);

    // 2. Limpiar el input para la siguiente pregunta
    $inputPregunta.val("");

    // 3. UI: Mostrar indicador de carga y deshabilitar botón temporalmente
    $("#indicadorEscribiendo").removeClass("d-none");
    $btnEnviar.prop("disabled", true);
    hacerScrollAbajo(); // Hacemos scroll para que el usuario vea el "Escribiendo..."

    var request = {
        pregunta: pregunta
    };

    $.ajax({
        type: "POST",
        url: "ChatModelIA.aspx/ModeloChatBotIaDos",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            let respuestaIA = response.d;
            // 4. Procesar saltos de línea y renderizar respuesta
            agregarMensajeIA(respuestaIA);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            agregarMensajeIA("Lo siento, ocurrió un error al procesar la solicitud.");
        },
        complete: function () {
            // 5. UI: Ocultar indicador y rehabilitar el botón, sin importar el resultado
            $("#indicadorEscribiendo").addClass("d-none");
            $btnEnviar.prop("disabled", false);
            // Dar el foco de vuelta al input para facilitar la escritura continua
            $inputPregunta.focus();
        }
    });
}

// Helper: Convertir saltos de línea (\n) a etiquetas <br>
function formatearTextoIA(texto) {
    if (!texto) return "";
    return texto.replace(/\n/g, '<br>');
}

// Función para construir e inyectar el HTML del mensaje de la IA
function agregarMensajeIA(textoBase) {
    let horaActual = obtenerHoraActual();

    // Aplicamos el formato para los saltos de línea
    let textoFormateado = formatearTextoIA(textoBase);

    // Estructura HTML estándar del template (alineado a la izquierda)
    let htmlIA = `
        <li class="chat-group">
            <img src="Imagenes/botMd.jpg" class="avatar-sm rounded-circle" alt="avatar-ia" />
            <div class="chat-body">
                <div>
                    <h6 class="d-inline-flex">Asistente IA</h6>
                    <h6 class="d-inline-flex text-muted"> ${horaActual}</h6>
                </div>
                <div class="chat-message">
                    <p>${textoFormateado}</p>
                </div>
            </div>
        </li>
    `;

    // Inyectamos el mensaje justo ANTES del indicador de escribiendo
    $(htmlIA).insertBefore("#indicadorEscribiendo");
    hacerScrollAbajo();
}

// (La función agregarMensajeUsuario se queda igual, no necesita formateo complejo)
function agregarMensajeUsuario(texto) {
    let horaActual = obtenerHoraActual();

    let htmlUsuario = `
        <li class="chat-group odd">
            <img src="Imagenes/logomaster.png" class="avatar-sm rounded-circle" alt="avatar-usuario" />
            <div class="chat-body">
                <div>
                    <h6 class="d-inline-flex">Tú</h6>
                    <h6 class="d-inline-flex text-muted"> ${horaActual}</h6>
                </div>
                <div class="chat-message">
                    <p>${texto}</p>
                </div>
            </div>
        </li>
    `;

    // Lo inyectamos de la misma forma para mantener el orden
    $(htmlUsuario).insertBefore("#indicadorEscribiendo");
    hacerScrollAbajo();
}

// Helper: Obtener hora actual en formato "10:05pm"
function obtenerHoraActual() {
    let fecha = new Date();
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    let ampm = horas >= 12 ? 'pm' : 'am';
    horas = horas % 12;
    horas = horas ? horas : 12;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    return horas + ':' + minutos + ampm;
}

// Helper: Bajar el scroll automáticamente cuando hay nuevos mensajes
function hacerScrollAbajo() {
    setTimeout(function () {
        let $scrollWrapper = $(".chat-scroll .simplebar-content-wrapper");
        if ($scrollWrapper.length === 0) {
            $scrollWrapper = $(".chat-scroll");
        }
        $scrollWrapper.animate({ scrollTop: $scrollWrapper[0].scrollHeight }, 300);
    }, 100);
}

// final del script