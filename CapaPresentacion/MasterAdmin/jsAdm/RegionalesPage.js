
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    listaRegionales();
    cargarDepartamentos();
});

function listaRegionales() {
    if ($.fn.DataTable.isDataTable("#tbRegionales")) {
        $("#tbRegionales").DataTable().destroy();
        $('#tbRegionales tbody').empty();
    }

    tablaData = $("#tbRegionales").DataTable({
        responsive: true,
        "ajax": {
            "url": 'RegionalesPage.aspx/ListaRegionales',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
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
            { "data": "IdRegional", "visible": false, "searchable": false },
            { "data": "NombreRegional" },
            { "data": "NombreProv" },
            { "data": "NombreMuni" },
            { "data": "Responsable" },
            { "data": "Contacto" },
            { "data": "FechaRegistro" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-2"><i class="ti ti-pencil-plus"></i></button>' +
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="ti ti-eye"></i></button>',
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

function cargarDepartamentos() {

    $("#cboDepartamento").html('<option value="">Cargando Departamentos...</option>');

    $.ajax({
        url: "UbicacionesPage.aspx/ListaDepartamentos",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                let opcionesHTML = '<option value="">-- Seleccione un Depart --</option>';

                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdDepartamento}">${row.NombreDep}</option>`;
                });
                $("#cboDepartamento").html(opcionesHTML);

            } else {
                $("#cboDepartamento").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboDepartamento").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#cboDepartamento").on("change", function () {
    const idDepartamento = $(this).val();

    $("#cboProvincia").empty().append('<option value="">Seleccione una Provincia</option>');
    $("#cboMunicipio").empty().append('<option value="">Seleccione un Municipio</option>');
    $("#cboProvincia").prop("disabled", true);
    $("#cboMunicipio").prop("disabled", true);

    if (idDepartamento) {
        // Al mandarlo así, JS automáticamente asigna null a los otros dos parámetros
        cargarProvincias(idDepartamento);
    }
});

$("#cboProvincia").on("change", function () {
    const idProvincia = $(this).val();

    // 1. Limpiamos y bloqueamos el hijo (Municipio) temporalmente
    $("#cboMunicipio").empty().append('<option value="">Seleccione un Municipio</option>');
    $("#cboMunicipio").prop("disabled", true);

    if (idProvincia) {
        cargarMunicipios(idProvincia);
    }
});

// ====== CARGA DE PROVINCIAS ======
function cargarProvincias(idDepartamento, provinciaPreseleccionada = null, municipioPreseleccionado = null) {

    $("#cboProvincia").html('<option value="">Cargando Prov...</option>');

    var request = { IdDepartamento: parseInt(idDepartamento) };

    $.ajax({
        url: "UbicacionesPage.aspx/ListaProvincias",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                let opcionesHTML = '<option value="">-- Seleccione una Prov. --</option>';

                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdProvincia}">${row.NombreProv}</option>`;
                });

                $("#cboProvincia").html(opcionesHTML).prop("disabled", false);

                // Si viene una provincia para preseleccionar (estamos en modo Edición)
                if (provinciaPreseleccionada) {
                    $("#cboProvincia").val(provinciaPreseleccionada);
                    // Ahora que la provincia está seleccionada, debemos cargar los municipios
                    cargarMunicipios(provinciaPreseleccionada, municipioPreseleccionado);
                }

            } else {
                $("#cboProvincia").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboProvincia").html('<option value="">Error de conexión</option>');
        }
    });
}

// ====== CARGA DE MUNICIPIOS ======
function cargarMunicipios(idProvincia, municipioPreseleccionado = null) {

    $("#cboMunicipio").html('<option value="">Cargando Municipio...</option>');

    var request = { IdProvincia: parseInt(idProvincia) };

    $.ajax({
        url: "UbicacionesPage.aspx/ListaMunicipios",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const lista = response.d.Data;

                if (lista != null && lista.length > 0) {
                    let opcionesHTML = '<option value="">-- Seleccione un Municipio. --</option>';

                    $.each(lista, function (i, row) {
                        opcionesHTML += `<option value="${row.IdMunicipio}">${row.NombreMuni}</option>`;
                    });

                    $("#cboMunicipio").html(opcionesHTML).prop("disabled", false);

                    // Si viene un municipio para preseleccionar (estamos en modo Edición)
                    if (municipioPreseleccionado) {
                        $("#cboMunicipio").val(municipioPreseleccionado);
                    }

                } else {
                    $("#cboMunicipio").html('<option value="">No se encontraron Municipios</option>');
                }
            } else {
                $("#cboMunicipio").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboMunicipio").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#btnNuevore").on("click", function () {
    idEditar = 0;

    // 1. Limpieza de campos de texto
    $("#txtNombreRegional").val("");
    $("#txtNroCel").val("");
    $("#txtDireccion").val("");
    $("#txtDescripGen").val("");

    // 2. Preparar los select para un nuevo registro
    $("#cboDepartamento").val(""); // Resetea al padre principal

    $("#cboProvincia").empty().append('<option value="">Seleccione una Provincia</option>').prop("disabled", true);
    $("#cboMunicipio").empty().append('<option value="">Seleccione un Municipio</option>').prop("disabled", true);

    $("#modalLabeldetalle").text("Nueva Regional");
    $("#modalAdd").modal("show");
});

$('#tbRegionales tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdRegional;

    // 1. Llenar los campos de texto
    $("#txtNombreRegional").val(data.NombreRegional);
    $("#txtNroCel").val(data.Contacto);
    $("#txtDireccion").val(data.Direccion);
    $("#txtDescripGen").val(data.Descripcion);

    // 2. Ejecutar la cascada de los selects
    // a. Seleccionamos el departamento (que ya está cargado en el DOM desde el document.ready)
    $("#cboDepartamento").val(data.IdDepartamento);

    // b. Disparamos la carga de provincias, pasándole qué provincia y qué municipio queremos al final
    cargarProvincias(data.IdDepartamento, data.IdProvincia, data.IdMunicipio);

    $("#modalLabeldetalle").text("Editar Regional");
    $("#modalAdd").modal("show");
});

$("#btnGuardarCambios").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarCambios').prop('disabled', true);

    let idMunicipio = $("#cboMunicipio").val();

    const inputs = $("#modalAdd input.model").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        ToastMaster.fire({
            icon: 'warning',
            title: mensaje
        });
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        $('#btnGuardarCambios').prop('disabled', false);
        return;
    }

    if ($("#txtDescripGen").val().trim() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe completar la Descripcion'
        });

        $("#txtDescripGen").focus();
        $('#btnGuardarCambios').prop('disabled', false);
        return;
    }

    if (idMunicipio === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Debe seleccionar un Municipio' });
        $("#cboMunicipio").focus();
        $('#btnGuardarCambios').prop('disabled', false);
        return;
    }

    const objeto = {
        IdRegional: idEditar,
        IdMunicipio: parseInt(idMunicipio),
        NombreRegional: $("#txtNombreRegional").val().trim(),
        Contacto: $("#txtNroCel").val().trim(),
        Direccion: $("#txtDireccion").val().trim(),
        Descripcion: $("#txtDescripGen").val().trim()
    }

    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "RegionalesPage.aspx/GuardarOrEditRegional",
        data: JSON.stringify({ objeto: objeto }),
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
                listaRegionales();
                idEditar = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnGuardarCambios').prop('disabled', false);
        }
    });

});

// fin