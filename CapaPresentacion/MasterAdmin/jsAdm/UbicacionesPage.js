

let tablaDataDep;
let idEditarDep = 0;

let tablaDataProv;
let idEditarProv = 0;

let tablaDataMuni;
let idEditarMuni = 0;

$(document).ready(function () {
    listaDepartamentos();
    cargarTodosLosDepartamentos();
    //departamentosApi();
});

function departamentosApi() {
    $.ajax({
        type: "GET",
        url: "https://localhost:44306/api/departamentos/lista",
        dataType: "json",
        success: function (response) {
            if (response.Estado) {
                console.log(response.Data);
                mostrarAlertaZero("Mensaje", response.Mensaje, "success");
            } else {
                mostrarAlertaZero("Mensaje", response.Mensaje, "warning");
            }
            
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function cargarTodosLosDepartamentos() {
    // 1. Agrupamos TODOS los IDs de los selects que necesitan Departamentos separados por coma
    let combosDepartamentos = $("#cboDepartamento, #cboDepartaModal, #cboDepartamentoMun, #cboDepartaModalmuni");

    // 2. Mostramos el mensaje de carga en todos a la vez
    combosDepartamentos.html('<option value="">Cargando Departamentos...</option>');

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

                // 3. ¡LA MAGIA! Inyectamos el HTML en los 4 selects al mismo tiempo
                combosDepartamentos.html(opcionesHTML);

            } else {
                combosDepartamentos.html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            combosDepartamentos.html('<option value="">Error de conexión</option>');
        }
    });
}

// Departamento

function listaDepartamentos() {
    if ($.fn.DataTable.isDataTable("#tbDeparta")) {
        $("#tbDeparta").DataTable().destroy();
        $('#tbDeparta tbody').empty();
    }

    tablaDataDep = $("#tbDeparta").DataTable({
        responsive: true,
        "ajax": {
            "url": 'UbicacionesPage.aspx/ListaDepartamentos',
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
            { "data": "IdDepartamento", "visible": false, "searchable": false },
            { "data": "NombreDep" },
            { "data": "CantProvi" },
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

$('#tbDeparta tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaDataDep.row(fila).data();
    idEditarDep = data.IdDepartamento;
    $("#txtNombreDe").val(data.NombreDep);
    $("#modalLabeldeparta").text("Editar Departamento");
    $("#modalDepart").modal("show");

});

$("#btnNuevoDep").on("click", function () {

    idEditarDep = 0;
    $("#txtNombreDe").val("");

    $("#modalLabeldeparta").text("Nuevo Departamento");

    $("#modalDepart").modal("show");

})

// Provincias

$("#cboDepartamento").on("change", function () {
    const idDepartamento = $(this).val();

    // 3. LIMPIAR TABLA VISUALMENTE
    if ($.fn.DataTable.isDataTable("#tbProvin")) {
        $("#tbProvin").DataTable().clear().draw();
    }

    if (idDepartamento) {
        listaProvin(idDepartamento);
    }
});

function listaProvin(idDepartamento) {
    if ($.fn.DataTable.isDataTable("#tbProvin")) {
        $("#tbProvin").DataTable().destroy();
        $('#tbProvin tbody').empty();
    }

    var request = {
        IdDepartamento: parseInt(idDepartamento)
    };

    tablaDataProv = $("#tbProvin").DataTable({
        responsive: true,
        "ajax": {
            "url": 'UbicacionesPage.aspx/ListaProvincias',
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
            { "data": "IdProvincia", "visible": false, "searchable": false },
            { "data": "NombreProv" },
            { "data": "CantMuni" },
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

$('#tbProvin tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaDataProv.row(fila).data();
    idEditarProv = data.IdProvincia;
    $("#cboDepartaModal").val(data.IdDepartamento);
    $("#txtNombreProvi").val(data.NombreProv);
    $("#modalLabelprovi").text("Editar Provincia");
    $("#modalProvin").modal("show");

});

$("#btnNuevaProv").on("click", function () {

    idEditarProv = 0;
    $("#txtNombreProvi").val("");
    // <-- Forma directa de resetear al valor "-- Seleccione --"
    $("#cboDepartaModal").val("");

    $("#modalLabelprovi").text("Nueva Provincia");

    $("#modalProvin").modal("show");

})

$("#btnGuardarRegProv").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarRegProv').prop('disabled', true);

    let idDepartamento = $("#cboDepartaModal").val();

    if ($("#txtNombreProvi").val().trim() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe completar el nombre de la provincia'
        });

        $("#txtNombreProvi").focus();
        $('#btnGuardarRegProv').prop('disabled', false);
        return;
    }

    if (idDepartamento === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar un departamento'
        });
        $("#cboDepartaModal").focus();
        $('#btnGuardarRegProv').prop('disabled', false);
        return;
    }

    const objeto = {
        IdProvincia: idEditarProv,
        IdDepartamento: parseInt(idDepartamento),
        NombreProv: $("#txtNombreProvi").val().trim()
    }

    $("#modalProvin").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "UbicacionesPage.aspx/GuardarOrEditProvincia",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalProvin").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                response.d.Mensaje, // Texto del servidor
                response.d.Valor // Icono (success/error/warning)
            );

            if (response.d.Estado) {
                $("#modalProvin").modal("hide");
                listaDepartamentos();
                listaProvin(idDepartamento);
                idEditarProv = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalProvin").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnGuardarRegProv').prop('disabled', false);
        }
    });

});

// municipios
$("#cboDepartamentoMun").on("change", function () {
    const idDepartamento = $(this).val();

    $("#cboProvincia").empty().append('<option value="">Seleccione una Provincia</option>');
    $("#cboProvincia").prop("disabled", true);

    // 3. LIMPIAR TABLA VISUALMENTE
    if ($.fn.DataTable.isDataTable("#tbMunici")) {
        $("#tbMunici").DataTable().clear().draw();
    }

    if (idDepartamento) {
        //$("#cboProvincia").prop("disabled", false);
        cargarProvincias(idDepartamento);
    }
});

function cargarProvincias(idDepartamento) {

    $("#cboProvincia").html('<option value="">Cargando Prov...</option>');
    var request = {
        IdDepartamento: parseInt(idDepartamento)
    };

    $.ajax({
        url: "UbicacionesPage.aspx/ListaProvincias",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione una Prov. --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdProvincia}">${row.NombreProv}</option>`;
                });

                $("#cboProvincia").html(opcionesHTML);
                $("#cboProvincia").prop("disabled", false);

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

$("#cboProvincia").on("change", function () {
    const idProvincia = $(this).val();

    // 3. LIMPIAR TABLA VISUALMENTE
    if ($.fn.DataTable.isDataTable("#tbMunici")) {
        $("#tbMunici").DataTable().clear().draw();
    }

    if (idProvincia) {
        listaMunicipios(idProvincia);
    }
});

function listaMunicipios(idProvincia) {
    if ($.fn.DataTable.isDataTable("#tbMunici")) {
        $("#tbMunici").DataTable().destroy();
        $('#tbMunici tbody').empty();
    }

    var request = {
        IdProvincia: parseInt(idProvincia)
    };

    tablaDataMuni = $("#tbMunici").DataTable({
        responsive: true,
        "ajax": {
            "url": 'UbicacionesPage.aspx/ListaMunicipios',
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
            { "data": "IdMunicipio", "visible": false, "searchable": false },
            { "data": "NombreMuni" },
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

// logica de registro
$("#cboDepartaModalmuni").on("change", function () {
    const idDepartamento = $(this).val();

    $("#cboProviModalmuni").empty().append('<option value="">Seleccione</option>');
    $("#cboProviModalmuni").prop("disabled", true);

    if (idDepartamento) {
        cargarProvinciasModal(idDepartamento, null);
    }
});

function cargarProvinciasModal(idDepartamento, provinPreseleccionada) {

    $("#cboProviModalmuni").html('<option value="">Cargando Prov...</option>');
    var request = {
        IdDepartamento: parseInt(idDepartamento)
    };

    $.ajax({
        url: "UbicacionesPage.aspx/ListaProvincias",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione una Prov. --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdProvincia}">${row.NombreProv}</option>`;
                });

                $("#cboProviModalmuni").html(opcionesHTML);
                $("#cboProviModalmuni").prop("disabled", false);

                if (provinPreseleccionada) {
                    $("#cboProviModalmuni").val(provinPreseleccionada);
                }

            } else {
                $("#cboProviModalmuni").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboProviModalmuni").html('<option value="">Error de conexión</option>');
        }
    });
}

$('#tbMunici tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaDataMuni.row(fila).data();
    idEditarMuni = data.IdMunicipio;
    $("#txtNombreMunicipio").val(data.NombreMuni);
    $("#cboDepartaModalmuni").val(data.IdDepartamento);

    cargarProvinciasModal(data.IdDepartamento, data.IdProvincia);

    $("#modalLabelmunicip").text("Editar Municipio");
    $("#modalMunici").modal("show");

});

$("#btnNuevoMuni").on("click", function () {

    idEditarMuni = 0;
    $("#txtNombreMunicipio").val("");

    // Limpiar padre
    $("#cboDepartaModalmuni").val("");

    // Limpiar hijo y DESHABILITARLO por seguridad
    $("#cboProviModalmuni").empty().append('<option value="">-- Seleccione --</option>');
    $("#cboProviModalmuni").prop("disabled", true); // <--- AGREGAR ESTA LÍNEA

    $("#modalLabelmunicip").text("Nuevo Municipio");
    $("#modalMunici").modal("show");

});

$("#btnGuardarRegMunic").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarRegMunic').prop('disabled', true);

    let idProvincia = $("#cboProviModalmuni").val();

    if ($("#txtNombreMunicipio").val().trim() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe completar el nombre del municipio'
        });

        $("#txtNombreMunicipio").focus();
        $('#btnGuardarRegMunic').prop('disabled', false);
        return;
    }

    if (idProvincia === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Debe seleccionar una Provincia' });
        $("#cboProviModalmuni").focus();
        $('#btnGuardarRegMunic').prop('disabled', false);
        return;
    }

    const objeto = {
        IdMunicipio: idEditarMuni,
        IdProvincia: parseInt(idProvincia),
        NombreMuni: $("#txtNombreMunicipio").val().trim()
    }

    $("#modalMunici").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "UbicacionesPage.aspx/GuardarOrEditMunicipio",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalMunici").find("div.modal-content").LoadingOverlay("hide");
            //const tituloSwal = response.d.Estado ? '¡Excelente!' : 'Atención';
            //mostrarAlerta("¡Mensaje!", response.d.Mensaje, "success", "btn btn-success");
            mostrarAlertaZero(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                response.d.Mensaje, // Texto del servidor
                response.d.Valor // Icono (success/error/warning)
            );

            if (response.d.Estado) {
                $("#modalMunici").modal("hide");
                listaMunicipios(idProvincia);
                idEditarMuni = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalMunici").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnGuardarRegMunic').prop('disabled', false);
        }
    });

});

$("#btnPruebaSwal").on("click", function () {
    Swal.fire({
        title: '¡Atención!',
        text: 'Error de comunicación con el servidor.',
        icon: 'error',
        confirmButtonText: "Ok",
        buttonsStyling: false, // Esto es importante en tu plantilla para usar los botones de Bootstrap
        customClass: {
            confirmButton: 'btn btn-primary'
        }
    });

    //mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
});

// fin