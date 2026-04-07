
let tablaDataDep;
let idEditarDep = 0;

let tablaDataProv;
let idEditarProv = 0;

let tablaDataMuni;
let idEditarMuni = 0;

$(document).ready(function () {

    listaDepartamentos();
    cargarDepartTablaProv();
    cargarDepartModalPro();
});

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

function cargarDepartTablaProv() {

    $("#cboDepartamento").html('<option value="">Cargando Depart...</option>');

    $.ajax({
        url: "UbicacionesPage.aspx/ListaDepartamentos",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione un Depart --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
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

function cargarDepartModalPro() {

    $("#cboDepartaModal").html('<option value="">Cargando Depart...</option>');

    $.ajax({
        url: "UbicacionesPage.aspx/ListaDepartamentos",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione un Depart --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdDepartamento}">${row.NombreDep}</option>`;
                });

                $("#cboDepartaModal").html(opcionesHTML);

            } else {
                $("#cboDepartaModal").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboDepartaModal").html('<option value="">Error de conexión</option>');
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

$("#btnNuevoDep").on("click", function () {

    idEditarDep = 0;
    $("#txtNombreDe").val("");

    $("#modalLabeldeparta").text("Nuevo Departamento");

    $("#modalDepart").modal("show");

})

$("#btnNuevaProv").on("click", function () {

    idEditarProv = 0;
    $("#txtNombreProvi").val("");
    // <-- Forma directa de resetear al valor "-- Seleccione --"
    $("#cboDepartaModal").val("");

    $("#modalLabelprovi").text("Nueva Provincia");

    $("#modalProvin").modal("show");

})

$("#btnNuevoMuni").on("click", function () {

    idEditarMuni = 0;
    $("#txtNombreMunicipio").val("");
    // <-- Limpiar padre Forma directa de resetear al valor "-- Seleccione --"
    //$("#cboDepartaModalmuni").val("");
    // Limpiar hijo
    //$("#cboProviModalmuni").empty().append('<option value="">-- Seleccione --</option>');

    $("#modalLabelmunicip").text("Nuevo Municipio");

    $("#modalMunici").modal("show");

})

// fin