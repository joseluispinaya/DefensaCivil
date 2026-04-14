
let tablaData;
let idEditar = 0;

$(document).ready(function () {

    listaUsuariosNew();
});

function listaUsuariosNew() {

    if ($.fn.DataTable.isDataTable("#tbUsuarios")) {
        $("#tbUsuarios").DataTable().destroy();
        $('#tbUsuarios tbody').empty();
    }

    tablaData = $("#tbUsuarios").DataTable({
        responsive: true,
        "ajax": {
            "url": 'UsuariosPage.aspx/ControlUsuariosIdRegional',
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
            { "data": "IdUsuario", "visible": false, "searchable": false },
            {
                "data": "FotoUrl",
                "orderable": false,
                "searchable": false,
                "className": "text-center",
                render: function (data) {
                    // Agregamos object-fit: cover para que la imagen no se deforme si no es cuadrada
                    let img = data ? data : 'Imagenes/sinimagen.png';
                    return `<img src="${img}" alt="avatar" class="img-fluid avatar-md rounded-circle border shadow-sm" style="object-fit: cover;">`;
                }
            },
            {
                "data": "Usua",
                render: function (data) {
                    // Ponemos el nombre en negrita para resaltarlo
                    return `<span class="fw-bold text-body">${data}</span>`;
                }
            },
            {
                "data": "Descripcion",
                render: function (data) {
                    // Un badge gris suave para el rol
                    return `<span class="badge bg-secondary-subtle text-secondary border border-secondary-subtle"><i class="ti ti-shield me-1"></i>${data}</span>`;
                }
            },
            {
                "data": "Correo",
                render: function (data) {
                    // Lo hacemos clickeable para abrir el gestor de correos
                    return `<a href="mailto:${data}" class="text-body text-decoration-none"><i class="ti ti-mail-forward text-muted me-1"></i>${data}</a>`;
                }
            },
            {
                "data": "Estado",
                "className": "text-center",
                render: function (data) {
                    // Badges modernos (subtle) de Bootstrap 5
                    if (data === true)
                        return '<span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1"><i class="ti ti-check me-1"></i>Activo</span>';
                    else
                        return '<span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1"><i class="ti ti-x me-1"></i>Inactivo</span>';
                }
            },
            {
                // Usamos el entero para que el DataTable ordene matemáticamente (ej. 1, 2, 10, 15)
                "data": "NroAccesos",
                "className": "text-center",
                // Agregamos 'type' y 'row' a los parámetros de la función render
                render: function (data, type, row) {

                    // 'data' es el número puro (ej. 0)
                    // 'row' es todo el objeto C#, por lo que row.CantAccesos tiene tu texto ("0 Accesos")

                    if (data === 0) {
                        return `<span class="badge bg-danger-subtle text-danger border border-danger-subtle">${row.CantAccesos}</span>`;
                    }

                    return `<span class="badge bg-info-subtle text-info border border-info-subtle"><i class="ti ti-chart-dots me-1"></i>${row.CantAccesos}</span>`;
                }
            },
            {
                "data": "FechaRegistro",
                render: function (data) {
                    // Texto un poco más pequeño y de color tenue para la fecha
                    return `<div class="text-muted fs-13"><i class="ti ti-clock-hour-4 me-1"></i>${data}</div>`;
                }
            },
            {
                // Botón con estilo moderno (outline) para no saturar la tabla de colores fuertes
                "defaultContent": '<button class="btn btn-outline-primary btn-detalle btn-sm fw-medium"><i class="ti ti-list-details fs-16 align-middle me-1"></i>Detalle</button>',
                "orderable": false,
                "searchable": false,
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function listaUsuarios() {

    if ($.fn.DataTable.isDataTable("#tbUsuarios")) {
        $("#tbUsuarios").DataTable().destroy();
        $('#tbUsuarios tbody').empty();
    }

    tablaData = $("#tbUsuarios").DataTable({
        responsive: true,
        "ajax": {
            "url": 'UsuariosPage.aspx/ControlUsuariosIdRegional',
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
            { "data": "IdUsuario", "visible": false, "searchable": false },
            {
                "data": "FotoUrl",
                "orderable": false,
                "searchable": false,
                "className": "text-center",
                render: function (data) {
                    if (!data) return '<img src="Imagenes/sinimagen.png" alt="imagen" class="img-fluid avatar-md rounded-circle">';

                    return `<img src="${data}" alt="imagen" class="img-fluid avatar-md rounded-circle">`;
                }
            },
            { "data": "Usua" },
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
            { "data": "CantAccesos" },
            { "data": "FechaRegistro" },
            {
                "defaultContent": '<button class="btn btn-info btn-detalle btn-sm"><i class="ti ti-eye me-1"></i>Detalle</button>',
                "orderable": false,
                "searchable": false,
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#tbUsuarios tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    detalleHistorial(data.IdUsuario);
    const textoSms = `Usua: ${data.Usua}.`;

    $("#modalLabeldetalle").text(textoSms);
    $("#modalAdd").modal("show");
});

function detalleHistorial(idUsuario) {

    if ($.fn.DataTable.isDataTable("#tbDetallesAcceso")) {
        $("#tbDetallesAcceso").DataTable().destroy();
        $('#tbDetallesAcceso tbody').empty();
    }

    var request = {
        IdUsuario: parseInt(idUsuario)
    };

    $("#tbDetallesAcceso").DataTable({
        responsive: true,
        searching: false,
        lengthChange: false,
        info: false,
        "ajax": {
            "url": 'UsuariosPage.aspx/HistorialAccesoUser',
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
            {
                "data": "FechaHoraNew", "className": "align-middle text-center", render: function (data) {
                    return `
                        <div class="d-flex align-items-center">
                            <div class="bg-primary-subtle text-primary rounded p-2 me-3">
                                <i class="ti ti-calendar-clock fs-20"></i>
                            </div>
                            <span class="fw-bold fs-15 text-body">${data}</span>
                        </div>`;
                }
            }
        ],
        "order": [],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

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
    $('#imgUsureg').attr('src', "Imagenes/sinimagen.png");
    input.value = ""; // Limpia el input file
}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});

$("#btnNuevore").on("click", function () {

    idEditar = 0;
    $("#modalAdd").modal("show");
})

// fin