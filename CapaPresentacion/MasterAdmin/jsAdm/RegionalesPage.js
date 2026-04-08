
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    cargarDepartamentos();
});

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

    $("#cboMunicipio").empty().append('<option value="">Seleccione Municipio</option>');
    $("#cboMunicipio").prop("disabled", true);

    if (idProvincia) {
        cargarMunicipios(idProvincia);
    }
});

function cargarMunicipios(idProvincia) {

    $("#cboMunicipio").html('<option value="">Cargando Municipio...</option>');
    var request = {
        IdProvincia: parseInt(idProvincia)
    };

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
                    // 1. Empezamos con la opción por defecto
                    let opcionesHTML = '<option value="">-- Seleccione un Municipio. --</option>';

                    // 2. Concatenamos todas las opciones en la variable (en memoria)
                    $.each(lista, function (i, row) {
                        opcionesHTML += `<option value="${row.IdMunicipio}">${row.NombreMuni}</option>`;
                    });

                    $("#cboMunicipio").html(opcionesHTML);
                    $("#cboMunicipio").prop("disabled", false);

                } else {
                    // Si la lista está vacía
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

    // Limpieza de campos
    $("#txtNombreRegional").val("");
    $("#txtNroCel").val("");
    $("#txtDireccion").val("");
    $("#txtDescripGen").val("");

    $("#modalLabeldetalle").text("Nuevo Registro");
    $("#modalAdd").modal("show");
    //mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
});

// fin