
let tablaData;

function obtenerUbicacionUsuarioNew() {
    // 1. Verificamos si el navegador soporta GPS
    if (!navigator.geolocation) {
        ToastMaster.fire({ icon: 'error', title: 'Tu navegador no soporta geolocalización.' });
        return;
    }

    // 2. Bloqueamos el botón y mostramos feedback visual para que el usuario espere
    let btnOriginal = $('#btnUbicacion').html(); // Guardamos el diseño original del botón
    $('#btnUbicacion').prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Buscando GPS...');

    // 3. Opciones avanzadas de precisión
    const opciones = {
        enableHighAccuracy: true, // Obliga a usar el GPS real del dispositivo (más preciso)
        timeout: 10000,           // Tiempo máximo de espera: 10 segundos
        maximumAge: 0             // 0 = Obliga a buscar la ubicación actual, no una guardada en caché
    };

    navigator.geolocation.getCurrentPosition(
        function (position) {
            // ÉXITO
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            $("#txtLatitud").val(lat.toFixed(7));
            $("#txtLongitud").val(lng.toFixed(7));

            ToastMaster.fire({ icon: 'success', title: 'Ubicación obtenida. Listo para consultar.' });

            // Restauramos el botón
            $('#btnUbicacion').prop('disabled', false).html(btnOriginal);
        },
        function (error) {
            // ERROR: Manejo específico de cada caso
            let mensajeError = "";
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    mensajeError = "Debes permitir el acceso a la ubicación en tu navegador.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    mensajeError = "La información de ubicación no está disponible.";
                    break;
                case error.TIMEOUT:
                    mensajeError = "Se agotó el tiempo de espera para obtener la ubicación.";
                    break;
                default:
                    mensajeError = "Ocurrió un error desconocido al obtener el GPS.";
                    break;
            }

            ToastMaster.fire({ icon: 'error', title: mensajeError });

            // Restauramos el botón
            $('#btnUbicacion').prop('disabled', false).html(btnOriginal);
        },
        opciones // Le pasamos la configuración
    );
}

function obtenerUbicacionUsuario() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        document.getElementById("txtLatitud").value = lat.toFixed(7);
        document.getElementById("txtLongitud").value = lng.toFixed(7);

    }, function (error) {
        console.log(`Error:${error}`)
    });
}

$("#btnUbicacion").on("click", function () {

    obtenerUbicacionUsuarioNew();

})

function listaPropiedades() {

    // 1. Destruimos la tabla si ya existe para cargar los datos nuevos
    if ($.fn.DataTable.isDataTable("#tbPropiedades")) {
        $("#tbPropiedades").DataTable().destroy();
        $('#tbPropiedades tbody').empty();
    }

    // 2. Armamos el request asegurándonos de capturar el ID correcto para Longitud
    var request = {
        LatitudActual: parseFloat($("#txtLatitud").val()),
        LongitudActual: parseFloat($("#txtLongitud").val()) // ¡Corregido!
    };

    tablaData = $("#tbPropiedades").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PropiedadesPage.aspx/ListaPropiedadesCoordenadas',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                // Si hay un error de sesión, json.d.Estado será false.
                if (!json.d.Estado) {
                    mostrarAlertaZero("Atención", json.d.Mensaje, "warning");
                    return [];
                }
                return json.d.Data;
            }
        },
        "columns": [
            { "data": "IdPropiedad", "visible": false, "searchable": false },
            {
                "data": "CodCatastral",
                render: function (data, type, row) {
                    return `
                        <div class="d-flex flex-column">
                            <span class="fw-bold text-primary">Cod: ${data}</span>
                            <span class="text-muted" style="font-size: 0.85em;"><i class="ti ti-map-pin-filled me-1"></i>${row.Direccion}</span>
                        </div>`;
                }
            },
            {
                "data": "Zona",
                render: function (data, type, row) {
                    // ¡Corregido! URL oficial de búsqueda de Google Maps
                    let linkMapa = `https://www.google.com/maps/search/?api=1&query=${row.Latitud},${row.Longitud}`;
                    return `
                        <div class="d-flex flex-column">
                            <a href="${linkMapa}" target="_blank" class="text-success fw-semibold text-decoration-none mb-1">
                                <i class="ti ti-map-pin me-1"></i>Ver en Mapa
                            </a>
                            <span class="text-muted" style="font-size: 0.85em;">Zona: ${data}</span>
                        </div>`;
                }
            },
            {
                "data": "DistanciaMetros",
                render: function (data) {
                    // Formateamos para que resalte la distancia
                    return `<span class="badge bg-warning text-dark fs-6">${data} mts</span>`;
                }
            },
            {
                "defaultContent": '<button class="btn btn-outline-info btn-detalle btn-sm" title="Ver Detalles"><i class="ti ti-eye me-1"></i> Detalles</button>',
                "orderable": false,
                "searchable": false,
                "className": "text-center"
            }
        ],
        // ¡Corregido! Array vacío para que DataTables respete el "ORDER BY DistanciaMetros ASC" de tu SQL
        "order": [],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        },
        // ¡Nuevo! Liberamos el botón cuando la tabla termina de cargar los datos
        "initComplete": function (settings, json) {
            $('#btnConsultar').prop('disabled', false);
        }
    });
}

$("#btnConsultar").on("click", function () {
    // Bloqueo inmediato para evitar doble consulta
    $('#btnConsultar').prop('disabled', true);

    if ($("#txtLatitud").val() === "" || $("#txtLongitud").val() === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Debe presionar el botón de ubicación para la consulta.' });
        $('#btnConsultar').prop('disabled', false); // Liberar si falta la ubicación
        return;
    }

    listaPropiedades();
});

// fin codigo