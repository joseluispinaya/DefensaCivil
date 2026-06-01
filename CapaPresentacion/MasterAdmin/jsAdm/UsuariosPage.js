
let tablaData;
let idEditar = 0;

$(document).ready(function () {

    cargarTodasLascargarRegionales();
    cargarFuerzas();
    cargarRoles();
});

function cargarFuerzas() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboFuerzas").html('<option value="">Cargando fuerzas...</option>');

    $.ajax({
        url: "/UsuariosPage.aspx/ListaFuerzas",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione Fuerza --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdFuerza}">${row.Descripcion}</option>`;
                });

                //$.each(response.d.Data, function (i, row) {
                //    if (row.Estado === true) {
                //        opcionesHTML += `<option value="${row.IdGradoAcademico}">${row.Nombre}</option>`;
                //    }
                //});

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboFuerzas").html(opcionesHTML);

            } else {
                $("#cboFuerzas").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboFuerzas").html('<option value="">Error de conexión</option>');
        }
    });
}

function cargarRoles() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboRoles").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "/UsuariosPage.aspx/ListaRoles",
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
                    opcionesHTML += `<option value="${row.IdRol}">${row.Descripcion}</option>`;
                });
                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboRoles").html(opcionesHTML);

            } else {
                $("#cboRoles").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboRoles").html('<option value="">Error de conexión</option>');
        }
    });
}

function cargarTodasLascargarRegionales() {
    // 1. Agrupamos TODOS los IDs de los selects que necesitan Departamentos separados por coma
    let combosRegionales = $("#cboRegional, #cboRegionalModal");

    // 2. Mostramos el mensaje de carga en todos a la vez
    combosRegionales.html('<option value="">Cargando Regionales...</option>');

    $.ajax({
        url: "RegionalesPage.aspx/ListaRegionales",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                let opcionesHTML = '<option value="">-- Seleccione Regional --</option>';

                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdRegional}">${row.NombreRegional}</option>`;
                });

                // 3. ¡LA MAGIA! Inyectamos el HTML en los 4 selects al mismo tiempo ${row.NombreMuni} ${row.NombreRegional}
                combosRegionales.html(opcionesHTML);

            } else {
                combosRegionales.html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            combosRegionales.html('<option value="">Error de conexión</option>');
        }
    });
}

$("#cboRegional").on("change", function () {
    const idRegional = $(this).val();

    // 3. LIMPIAR TABLA VISUALMENTE
    if ($.fn.DataTable.isDataTable("#tbUsuarios")) {
        $("#tbUsuarios").DataTable().clear().draw();
    }

    if (idRegional) {
        listaUsuarios(idRegional);
    }
});

function listaUsuarios(idRegional) {

    if ($.fn.DataTable.isDataTable("#tbUsuarios")) {
        $("#tbUsuarios").DataTable().destroy();
        $('#tbUsuarios tbody').empty();
    }

    var request = {
        IdRegional: parseInt(idRegional)
    };

    tablaData = $("#tbUsuarios").DataTable({
        responsive: true,
        "ajax": {
            "url": '/UsuariosPage.aspx/ListaUsuariosIdRegional',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdUsuario", "visible": false, "searchable": false },
            {
                "data": "FotoUrl",
                "orderable": false,
                "searchable": false,
                "className": "text-center",
                render: function (data) {
                    if (!data) return '<img src="/Imagenes/sinimagen.png" alt="imagen" class="img-fluid avatar-md rounded-circle">';

                    return `<img src="${data}" alt="imagen" class="img-fluid avatar-md rounded-circle">`;
                }
            },
            { "data": "FullName" },
            { "data": "NroCi" },
            { "data": "Celular" },
            { "data": "Descripcion" },
            { "data": "Correo" },
            {
                "data": "Estado", "className": "text-center", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-success">Activo</span>';
                    else
                        return '<span class="badge bg-danger">Inactivo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-2"><i class="ti ti-pencil-plus"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "100px",
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#cboFuerzas").on("change", function () {
    const idFuerza = $(this).val();

    $("#cboGrados").empty().append('<option value="">Seleccione</option>');
    $("#cboGrados").prop("disabled", true);

    if (idFuerza) {
        cargarGrados(idFuerza, null);
    }
});

function cargarGrados(idFuerza, provinPreseleccionada) {

    $("#cboGrados").html('<option value="">Cargando...</option>');
    var request = {
        IdFuerza: parseInt(idFuerza)
    };

    $.ajax({
        url: "/UsuariosPage.aspx/ListaGrados",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione. --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdGrado}">${row.Abreviado}</option>`;
                });

                $("#cboGrados").html(opcionesHTML);
                $("#cboGrados").prop("disabled", false);

                if (provinPreseleccionada) {
                    $("#cboGrados").val(provinPreseleccionada);
                }

            } else {
                $("#cboGrados").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboGrados").html('<option value="">Error de conexión</option>');
        }
    });
}


// validacion de datos
$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function (e) { // Captura el evento como 'e'
        if (inputFilter(this.value) || e.key === "Backspace" || e.key === " ") { // se usa 'e' en lugar de 'event'
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
    });
};

$("#txtNombrees").inputFilter(function (value) {
    return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/u.test(value);
});

$("#txtApellidos").inputFilter(function (value) {
    return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/u.test(value);
});

$("#txtCelular").inputFilter(function (value) {
    return /^\d*$/.test(value) && value.length <= 8;
});

$('#tbUsuarios tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdUsuario;

    //cboRegionalModal
    $("#cboRegionalModal").val(data.IdRegional);
    $("#txtNombrees").val(data.Nombres);
    $("#txtApellidos").val(data.Apellidos);
    $("#txtCorreo").val(data.Correo);
    $("#txtCelular").val(data.Celular);
    $("#txtNroci").val(data.NroCi);

    $("#cboRoles").val(data.IdRol);
    $("#cboFuerzas").val(data.IdFuerza);
    cargarGrados(data.IdFuerza, data.IdGrado);
    $("#cboEstado").val(data.Estado ? 1 : 0).prop("disabled", false);

    $("#imgUsureg").attr("src", data.FotoUrl || "/Imagenes/sinimagen.png");
    $("#txtFoto").val("");

    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");
});

const TAMANO_MAXIMO = 2 * 1024 * 1024; // 4 MB en bytes

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        resetearVistaFoto(input);
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagen(file)) {
        ToastMaster.fire({
            icon: 'error',
            title: 'El archivo seleccionado no es una imagen válida.'
        });
        resetearVistaFoto(input);
        return;
    }

    // 3. Validación: Tamaño máximo
    if (file.size > TAMANO_MAXIMO) {
        ToastMaster.fire({
            icon: 'error',
            title: 'La imagen supera el tamaño máximo permitido de 2 MB.'
        });
        resetearVistaFoto(input);
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgUsureg').attr('src', e.target.result);
    reader.readAsDataURL(file);
}

function esImagen(file) {
    return file && file.type.startsWith("image/");
}

// Función auxiliar para limpiar (DRY - Don't Repeat Yourself)
function resetearVistaFoto(input) {
    $('#imgUsureg').attr('src', "/Imagenes/sinimagen.png");
    input.value = ""; // Limpia el input file
}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});

$("#btnNuevore").on("click", function () {

    idEditar = 0;

    $("#cboRegionalModal").val("");
    $("#txtNombrees").val("");
    $("#txtApellidos").val("");
    $("#txtCorreo").val("");
    $("#txtCelular").val("");
    $("#txtNroci").val("");

    $("#cboRoles").val("");
    // Limpiar padre
    $("#cboFuerzas").val("");
    $("#cboGrados").empty().append('<option value="">Seleccione</option>').prop("disabled", true);
    $("#cboEstado").val(1).prop("disabled", true);

    $('#imgUsureg').attr('src', "/Imagenes/sinimagen.png");
    $("#txtFoto").val("");

    $("#modalLabeldetalle").text("Nuevo Registro");

    $("#modalAdd").modal("show");

})

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

$("#btnGuardarCambios").on("click", function () {
    // Bloqueo inmediato
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("#modalAdd input.model").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        ToastMaster.fire({
            icon: 'warning',
            title: mensaje
        });
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        habilitarBoton();
        return;
    }

    if ($("#cboRegionalModal").val() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar una Regional.'
        });
        $("#cboRegionalModal").focus();
        habilitarBoton();
        return;
    }

    if ($("#cboRoles").val() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar un Rol.'
        });
        $("#cboRoles").focus();
        habilitarBoton();
        return;
    }

    if ($("#cboGrados").val() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar un Grado.'
        });
        $("#cboGrados").focus();
        habilitarBoton();
        return;
    }

    // 2. ARMAR EL OBJETO
    const objeto = {
        IdUsuario: idEditar,
        IdRegional: parseInt($("#cboRegionalModal").val()),
        IdGrado: parseInt($("#cboGrados").val()),
        IdRol: parseInt($("#cboRoles").val()),
        Nombres: $("#txtNombrees").val().trim(),
        Apellidos: $("#txtApellidos").val().trim(),
        NroCi: $("#txtNroci").val().trim(),
        Correo: $("#txtCorreo").val().trim(),
        Celular: $("#txtCelular").val().trim(),
        Estado: ($("#cboEstado").val() === "1" ? true : false),
        FotoUrl: "" // Lo enviamos siempre vacío. Si hay foto nueva, el Base64 la reemplazará en C#.
    };

    //let ver = objeto.IdRegional;

    // 3. PROCESAR EL INPUT FILE
    const fileInput = document.getElementById('txtFoto');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Extraemos solo el texto Base64, quitando la cabecera (data:image/jpeg;base64,)
            const base64String = e.target.result.split(',')[1];

            // Disparamos el AJAX enviando la imagen
            enviarAjaxUsuario(objeto, base64String);
        };
        reader.readAsDataURL(file);
    } else {
        // Si no hay foto, disparamos el AJAX mandando el base64 vacío
        enviarAjaxUsuario(objeto, "");
    }
});

function enviarAjaxUsuario(objeto, base64String) {
    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "/UsuariosPage.aspx/GuardarOrEditUsuarios",
        data: JSON.stringify({ objeto: objeto, base64Image: base64String }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");

            mostrarAlertaZero(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                response.d.Mensaje, // Texto del servidor
                response.d.Valor // Icono (success/error/warning) 
            );

            if (response.d.Estado) {
                $("#modalAdd").modal("hide");
                let idRegional = objeto.IdRegional;
                $("#cboRegional").val(idRegional);
                listaUsuarios(idRegional);
                idEditar = 0;
            }
        },
        error: function () {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });
}

// fin