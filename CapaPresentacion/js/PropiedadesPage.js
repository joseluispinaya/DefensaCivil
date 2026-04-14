
let map;
let marker;

$(document).ready(function () {
    new Wizard("#progressbarwizard", { progress: !0 });
    cargarTiposPropiedad();
    cargarEstadoPropied();
});

async function initMap() {
    const position = { lat: -11.0064, lng: -66.0730 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("mapa"), {
        zoom: 15,
        center: position,
        mapId: "DEMOMAPA",
    });

    // Agregar marcador en la posición inicial
    marker = new AdvancedMarkerElement({
        position: position,
        map: map,
        gmpDraggable: true // Habilitar arrastrar
    });

    // Mostrar las coordenadas iniciales en los inputs
    updateInputs(position.lat, position.lng);

    // Evento para actualizar inputs al mover el marcador
    marker.addListener("dragend", function (event) {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        updateInputs(newLat, newLng);
    });

    // Evento para agregar marcador en un clic en el mapa
    map.addListener("click", function (event) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        marker.position = new google.maps.LatLng(clickedLat, clickedLng);
        //marker.setPosition({ lat: clickedLat, lng: clickedLng });
        updateInputs(clickedLat, clickedLng);
    });

}

// Función para actualizar los inputs
function updateInputs(lat, lng) {
    document.getElementById("txtLatitud").value = lat.toFixed(6);
    document.getElementById("txtLongitud").value = lng.toFixed(6);
}

function cargarTiposPropiedad() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboTipoPro").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "PropiedadesPage.aspx/ListaTiposPropiedad",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdTipoPropi}">${row.NombreTipo}</option>`;
                });

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboTipoPro").html(opcionesHTML);

            } else {
                $("#cboTipoPro").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboTipoPro").html('<option value="">Error de conexión</option>');
        }
    });
}

function cargarEstadoPropied() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboEstadoPro").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "PropiedadesPage.aspx/ListaEstadoPropiedad",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdEstadoProp}">${row.Descripcion}</option>`;
                });

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboEstadoPro").html(opcionesHTML);

            } else {
                $("#cboEstadoPro").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboEstadoPro").html('<option value="">Error de conexión</option>');
        }
    });
}

const TAMANO_MAXIMO = 8 * 1024 * 1024; // 4 MB en bytes

function mostrarPdfSeleccionada(input) {
    let file = input.files[0];

    // 1. Si NO se seleccionó archivo (Cancelado o vacío)
    if (!file) {
        resetearVistaPdf(input);
        return;
    }

    // 2. Validación: Tipo de archivo
    if (!esPdfValida(file)) {
        ToastMaster.fire({
            icon: 'error',
            title: 'El archivo seleccionado no es un PDF válido.'
        });
        resetearVistaPdf(input);
        return;
    }

    // 3. Validación: Tamaño máximo
    if (file.size > TAMANO_MAXIMO) {
        ToastMaster.fire({
            icon: 'error',
            title: 'El archivo supera el tamaño máximo permitido de 8 MB.'
        });
        resetearVistaPdf(input);
        return;
    }

    let blobUrl = URL.createObjectURL(file);
    $('#verPdf').attr('src', blobUrl);

}

// Función auxiliar para validar que sea PDF
function esPdfValida(file) {
    // Validamos por extensión y por tipo MIME
    const extension = file.name.split('.').pop().toLowerCase();
    return file.type === 'application/pdf' || extension === 'pdf';
}

// Función auxiliar para limpiar (DRY - Don't Repeat Yourself)
function resetearVistaPdf(input) {
    $('#verPdf').attr('src', "DocumetPdf/sinPdf.pdf");
    input.value = ""; // Limpia el input file
}

$('#txtPdf').change(function () {
    mostrarPdfSeleccionada(this);
});

function habilitarBoton() {
    $('#btnGuardar').prop('disabled', false);
}

$("#btnGuardar").on("click", function () {
    // 1. Bloqueo inmediato para evitar doble clic
    $('#btnGuardar').prop('disabled', true);

    // --- VALIDACIÓN DINÁMICA DE CAMPOS OBLIGATORIOS (.model) ---
    // Cambiamos '#modalAdd input.model' por '#progressbarwizard .model' 
    // Usamos solo '.model' para que también atrape <textarea> o <select> si en el futuro les pones esa clase.
    const inputs = $("#progressbarwizard .model").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const campoFaltante = inputs_sin_valor[0].name;
        ToastMaster.fire({
            icon: 'warning',
            title: `Debe completar el campo: "${campoFaltante}"`
        });

        // Ponemos el foco en el elemento (usamos [name="..."] sin la palabra 'input' por si es un textarea)
        $(`[name="${campoFaltante}"]`).focus();
        habilitarBoton();
        return;
    }

    // --- VALIDACIONES DE COMBOS ---
    if ($("#cboTipoPro").val() === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Debe seleccionar Tipo de Propiedad.' });
        $("#cboTipoPro").focus();
        habilitarBoton();
        return;
    }
    if ($("#cboEstadoPro").val() === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Debe seleccionar Estado de la Propiedad.' });
        $("#cboEstadoPro").focus();
        habilitarBoton();
        return;
    }
    if ($("#cboZona").val() === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Debe seleccionar el Tipo de Zona.' });
        $("#cboZona").focus();
        habilitarBoton();
        return;
    }

    //if ($("#txtCodCatas").val().trim() === "") {
    //    ToastMaster.fire({ icon: 'warning', title: 'Ingrese el Código Catastral.' });
    //    $("#txtCodCatas").focus();
    //    habilitarBoton();
    //    return;
    //}

    //if ($("#txtNroFolio").val().trim() === "") {
    //    ToastMaster.fire({ icon: 'warning', title: 'Ingrese el Nro de Folio.' });
    //    $("#txtNroFolio").focus();
    //    habilitarBoton();
    //    return;
    //}

    if ($("#txtLargo").val() === "" || $("#txtAncho").val() === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Debe ingresar las dimensiones (Largo y Ancho).' });
        $("#txtLargo").focus();
        habilitarBoton();
        return;
    }

    // --- CÁLCULO DE DIMENSIONES Y MANEJO DE DECIMALES ---
    // Usamos parseFloat para asegurar que JS lo trate como número con punto (.)
    let largo = parseFloat($("#txtLargo").val());
    let ancho = parseFloat($("#txtAncho").val());
    let areaCalculada = largo * ancho;

    // --- LECTURA DE COORDENADAS ---
    let latitud = parseFloat($("#txtLatitud").val()) || 0;
    let longitud = parseFloat($("#txtLongitud").val()) || 0;

    // --- 2. ARMAR EL OBJETO ---
    const objeto = {
        IdTipoPropi: parseInt($("#cboTipoPro").val()),
        IdEstadoProp: parseInt($("#cboEstadoPro").val()),
        CodCatastral: $("#txtCodCatas").val().trim(),
        NroFolio: $("#txtNroFolio").val().trim(),
        DescripcionGen: $("#txtDescripGen").val().trim(),
        Direccion: $("#txtDireccionPro").val().trim(),
        Zona: $("#cboZona").val(),

        // Coordenadas
        Latitud: latitud,
        Longitud: longitud,

        // Dimensiones (Aseguramos máximo 2 decimales para C#)
        AreaM2: parseFloat(areaCalculada.toFixed(2)),
        Largo: parseFloat(largo.toFixed(2)),
        Ancho: parseFloat(ancho.toFixed(2)),

        // Datos complementarios
        Topografia: $("#txtTopografia").val().trim(),
        TipoSuelo: $("#txtTipoSuelo").val().trim(),

        // Lectura de Radio Buttons (Si el ID "radioSi" está chequeado, devuelve true)
        ServiciosBas: $("#radioSi").is(":checked"),
        RiesgoInundacion: $("#radioInuSi").is(":checked"),
        RiesgoDeslizamiento: $("#radiodeslizaSi").is(":checked")
    };

    // --- 3. PROCESAR EL INPUT FILE (PDF) ---
    const fileInput = document.getElementById('txtPdf');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64String = e.target.result.split(',')[1];
            enviarAjaxPropieda(objeto, base64String);
        };
        reader.readAsDataURL(file);
    } else {
        // Si no hay pdf, disparamos el AJAX mandando el base64 vacío
        enviarAjaxPropieda(objeto, "");
    }
});

function enviarAjaxPropieda(objeto, base64String) {
    // Bloqueamos el contenedor del formulario para que el usuario espere
    $("#progressbarwizard").LoadingOverlay("show", {
        text: "Registrando propiedad, por favor espere..."
    });

    $.ajax({
        type: "POST",
        url: "PropiedadesPage.aspx/Guardar",
        data: JSON.stringify({ objeto: objeto, base64Pdf: base64String }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            $("#progressbarwizard").LoadingOverlay("hide");

            if (response.d.Estado) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Excelente!',
                    text: response.d.Mensaje,
                    showConfirmButton: false,
                    timer: 2000
                });

                // Redireccionar al listado tras registrar con éxito
                setTimeout(() => window.location.href = 'ListapropiedadesPage.aspx', 2200);

            } else {
                mostrarAlertaZero("¡Atención!", response.d.Mensaje, response.d.Valor);
                habilitarBoton(); // Si falla (ej. Código duplicado), liberamos el botón para corregir
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#progressbarwizard").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            habilitarBoton();
        }
    });
}

$("#btnConsultarDes").on("click", function () {
    $('#btnConsultarDes').prop('disabled', true);

    if ($("#txtLatitud").val() === "" || $("#txtLongitud").val() === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Debe ingresar ubicación para la consulta.' });
        $('#btnConsultarDes').prop('disabled', false); // Liberar si falta la ubicación
        return;
    }

    var request = {
        Latitud: parseFloat($("#txtLatitud").val()),
        Longitud: parseFloat($("#txtLongitud").val())
    };

    $("#loadinzero").LoadingOverlay("show", {
        image: "",
        custom: '<div class="spinner-border text-warning m-2" style="height: 5rem; width: 5rem;" role="status"></div>',
        text: "Esperando respuesta...",
        textResizeFactor: 0.2,
        textColor: "#ffffff",
        background: "rgba(0, 0, 0, 0.85)"
    });

    $.ajax({
        url: "ModeloLmPage.aspx/AnalizarCoordenadas",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            $("#loadinzero").LoadingOverlay("hide");
            if (response.d.Estado) {
                //console.log("Respuesta del servidor:", response.d.Data);
                $("#txtDescripGen").val(response.d.Data);
                ToastMaster.fire({ icon: 'success', title: 'Descripcion obtenida correctamente.' });
            } else {
                mostrarAlertaZero("¡Atención!", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#loadinzero").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnConsultarDes').prop('disabled', false);
        }
    });

});

// fin