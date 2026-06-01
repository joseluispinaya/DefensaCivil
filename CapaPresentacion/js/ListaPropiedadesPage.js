
let tablaData;

$(document).ready(function () {

    listaPropiedadesNew();
});

function listaPropiedadesNew() {

    if ($.fn.DataTable.isDataTable("#tbPropiedades")) {
        $("#tbPropiedades").DataTable().destroy();
        $('#tbPropiedades tbody').empty();
    }

    tablaData = $("#tbPropiedades").DataTable({
        responsive: true,
        // ESTO ES CLAVE: Define dónde van los Botones(B), Filtro(f), Tabla(t), Info(i) y Paginación(p) usando grid de Bootstrap
        dom: "<'row mb-3'<'col-sm-12 col-md-6 d-flex align-items-center'B><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row mt-2'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        buttons: [
            { extend: 'excelHtml5', className: 'btn btn-outline-success btn-sm me-1', text: '<i class="ti ti-file-spreadsheet me-1"></i>Excel' },
            { extend: 'pdfHtml5', className: 'btn btn-outline-danger btn-sm me-1', text: '<i class="ti ti-file-description me-1"></i>PDF' },
            { extend: 'print', className: 'btn btn-outline-info btn-sm', text: '<i class="ti ti-printer me-1"></i>Imprimir' }
        ],
        "ajax": {
            "url": 'PropiedadesPage.aspx/ListaPropiedadesIdRegional',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                return json.d.Estado ? json.d.Data : [];
            }
        },
        "columns": [
            { "data": "IdPropiedad", "visible": false, "searchable": false },

            // 1. Mostrar el Tipo de Propiedad (Dato nuevo)
            { "data": "TipoPropiedad" },

            // 2. Combinar Código y Folio en dos líneas usando flexbox de Bootstrap
            {
                "data": "CodCatastral",
                render: function (data, type, row) {
                    return `
                        <div class="d-flex flex-column">
                            <span class="fw-semibold">${data}</span>
                            <span class="text-muted" style="font-size: 0.85em;">Folio: ${row.NroFolio}</span>
                        </div>`;
                }
            },

            {
                "data": "Direccion",
                render: function (data, type, row) {
                    let linkMapa = `https://www.google.com/maps/search/?api=1&query=${row.Latitud},${row.Longitud}`;
                    return `
                        <div class="d-flex flex-column">
                            <a href="${linkMapa}" target="_blank" class="link-warning"><i class="ti ti-map-pin me-1"></i>Ver en Mapa</a>
                            <span class="text-muted" style="font-size: 0.85em;">${data}</span>
                        </div>`;
                }
            },

            // 4. Formatear el Área para que diga "m²"
            {
                "data": "AreaM2",
                render: function (data) {
                    return `<strong>${data}</strong> <span class="text-muted">m²</span>`;
                }
            },
            { "data": "Zona" },
            { "data": "FechaRegistro" },
            {
                "data": "Estado",
                "className": "text-center",
                render: function (data) {
                    // Usamos bg-success-subtle y text-success para un look más moderno si tu template lo soporta, 
                    // de lo contrario bg-success normal funciona perfecto.
                    return data
                        ? '<span class="badge bg-success">Activo</span>'
                        : '<span class="badge bg-danger">Inactivo</span>';
                }
            }
            //{
            //    "data": null,
            //    "orderable": false,
            //    "searchable": false,
            //    "className": "text-center",
            //    render: function (data, type, row) {

            //        let btnEdit = `<button class="btn btn-outline-warning btn-editar btn-sm me-1" title="Editar"><i class="ti ti-pencil"></i></button>`;
            //        let btnView = `<button class="btn btn-outline-info btn-detalle btn-sm me-1" title="Ver Detalles"><i class="ti ti-eye"></i></button>`;
            //        let btnDel = `<button class="btn btn-outline-danger btn-eliminar btn-sm" title="Eliminar"><i class="ti ti-trash"></i></button>`;

            //        return btnEdit + btnView + btnDel;
            //    }
            //}
        ],
        "order": [[6, "desc"]], // Ordenar por la columna de FechaRegistro (índice 6 visible)
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#btnNuevaPropiedad").on("click", function () {

    window.location.href = 'PropiedadesPage.aspx';
})

function listaPropiedades() {

    if ($.fn.DataTable.isDataTable("#tbPropiedades")) {
        $("#tbPropiedades").DataTable().destroy();
        $('#tbPropiedades tbody').empty();
    }

    tablaData = $("#tbPropiedades").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PropiedadesPage.aspx/ListaPropiedadesIdRegional',
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
            { "data": "IdPropiedad", "visible": false, "searchable": false },
            { "data": "CodCatastral" },
            { "data": "NroFolio" },
            { "data": "AreaM2" },
            { "data": "Zona" },
            { "data": "Topografia" },
            { "data": "FechaRegistro" },
            {
                "data": "Estado", "className": "text-center", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-success">Activo</span>';
                    else
                        return '<span class="badge bg-danger">Inactivo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-2"><i class="ti ti-pencil-plus"></i></button>' +
                    '<button class="btn btn-info btn-detalle btn-sm me-2"><i class="ti ti-eye"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="ti ti-trash"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "170px",
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

// fin codigo