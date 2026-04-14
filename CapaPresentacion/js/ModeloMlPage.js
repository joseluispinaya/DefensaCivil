
$(document).ready(function () {
    cargarBuscadorPropiedadesNew();
});

$("#btnUbicacion").on("click", function () {

    $("#loadinzero").LoadingOverlay("show", {
        image: "",
        custom: '<div class="spinner-border text-warning m-2" style="height: 5rem; width: 5rem;" role="status"></div>',
        text: "Esperando respuesta...",
        textResizeFactor: 0.2,
        textColor: "#ffffff",
        background: "rgba(0, 0, 0, 0.85)"
    });

    setTimeout(function () {
        $("#loadinzero").LoadingOverlay("hide");
    }, 4000);

});

$("#btnConsultar").on("click", function () {
    $('#btnConsultar').prop('disabled', true);

    if ($("#txtLatitud").val() === "" || $("#txtLongitud").val() === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Debe ingresar ubicación para la consulta.' });
        $('#btnConsultar').prop('disabled', false); // Liberar si falta la ubicación
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
                $("#txtResultado").val(response.d.Data);
                ToastMaster.fire({ icon: 'success', title: 'Respuesta obtenida correctamente.' });
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
            $('#btnConsultar').prop('disabled', false);
        }
    });

});

function cargarBuscadorPropiedadesNew() {
    $("#cboBuscarPropied").select2({
        ajax: {
            type: "POST",
            url: "ConsultasPage.aspx/FiltroPropiedades",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                // params.term es lo que el usuario va escribiendo
                return JSON.stringify({ busqueda: params.term || "" });
            },
            processResults: function (data) {
                // 1. VALIDACIÓN: ¿Respondió bien el WebMethod? (Estado == true)
                if (!data.d.Estado) {
                    // Mostramos el mensaje que mandó C# (Ej: "Su sesión ha expirado" o error del Catch)
                    mostrarAlertaZero("Atención", data.d.Mensaje, "warning");

                    // Retornamos un array vacío para que Select2 no colapse
                    return { results: [] };
                }

                // 2. Si todo está bien, mapeamos los datos
                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdPropiedad,
                        text: item.NroFolio + ' - ' + item.TipoPropiedad, // Le agregué un guion para que se vea más ordenado
                        codCatastral: item.CodCatastral,
                        zona: item.Zona,
                        dataCompleta: item // Guardamos todo el objeto por si lo ocupas al seleccionar
                    }))
                };
            },
            // 3. VALIDACIÓN DE RED: Por si se corta el internet o falla el servidor
            error: function (xhr, ajaxOptions, thrownError) {
                // IGNORAR SI EL ERROR ES PORQUE SELECT2 CANCELÓ LA PETICIÓN VIEJA
                if (xhr.status === 0 || thrownError === 'abort') {
                    return; // Salimos silenciosamente sin mostrar alerta
                }

                // Si es un error real (500, 404, etc.), sí mostramos la alerta
                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                mostrarAlertaZero("Error de Conexión", "No se pudo comunicar con el servidor.", "error");
            }
        },
        language: "es",
        placeholder: 'Nro. Folio o Cod. Catastral...',
        minimumInputLength: 3, // Muy buena práctica para no saturar la BD
        templateResult: formatoResultados
    });
}

function formatoResultados(data) {
    if (data.loading) return data.text;

    // logo a mostrar
    var imagenMostrar = 'Imagenes/selectimg.png';

    var contenedor = $(
        `<div class="d-flex align-items-center">
            <img src="${imagenMostrar}" style="height:40px; width:40px; margin-right:10px; border-radius:50%; object-fit:cover;"/>
            <div>
                <div style="font-weight: bold;">${data.text}</div>
                <div style="font-size: 0.85em; color: #666;">Cod: ${data.codCatastral} | Zona: ${data.zona}</div>
            </div>
         </div>`
    );

    return contenedor;
}

// 4. Evento al SELECCIONAR
$("#cboBuscarPropied").on("select2:select", function (e) {
    const data = e.params.data.dataCompleta;
    $("#txtIdPropiedad").val(data.IdPropiedad);
    $("#lblDescripcionGe").text(data.DescripcionGen);
    $("#lblAncho").text(data.Ancho + " Mts");
    $("#lblLargo").text(data.Largo + " Mts");
    $("#lblArea").text(data.AreaM2 + " m²");
    $("#lblNrofolio").text(data.NroFolio);

    //const url = data.ServiciosBas ? "Si" : "No";
    //$("#cboEstado").val(data.Estado ? 1 : 0);

    $("#cboBuscarPropied").val(null).trigger("change");
});


$("#btnReporte").on("click", function () {

    $('#btnReporte').prop('disabled', true);

    let idPropiedad = $("#txtIdPropiedad").val().trim();

    if (idPropiedad === "0" || idPropiedad === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe realizar la busqueda de una propiedad'
        });
        $('#btnReporte').prop('disabled', false);
        return;
    }

    $("#loadinzer").LoadingOverlay("show", {
        image: "",
        custom: '<div class="spinner-border text-warning m-2" style="height: 5rem; width: 5rem;" role="status"></div>',
        text: "Esperando respuesta...",
        textResizeFactor: 0.3,
        textColor: "#ffffff",
        background: "rgba(0, 0, 0, 0.85)"
    });

    $.ajax({
        url: "ModeloLmPage.aspx/InfoPropiedad",
        type: "POST",
        data: JSON.stringify({ IdPropiedad: parseInt(idPropiedad) }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            $("#loadinzer").LoadingOverlay("hide");
            if (response.d.Estado) {
                const data = response.d.Data;
                console.log("Datos de la propiedad:", JSON.stringify(data, null, 4));
                ToastMaster.fire({ icon: 'success', title: 'Datos obtenida correctamente.' });
            } else {
                mostrarAlertaZero("¡Atención!", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#loadinzer").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnReporte').prop('disabled', false);
        }
    });

});


$("#btnGenerarPruebas").on("click", function () {

    $('#btnGenerarPruebas').prop('disabled', true);

    const mockDataIA = {
        "Recomendaciones": [
            {
                "TipoInfraestructura": "Oficinas administrativas",
                "Justificacion": "El terreno de 360 m² es adecuado para la construcción de oficinas administrativas, dado que la topografía es plana y el suelo es franco, lo que permite una cimentación estable. Además, la cercanía a servicios como farmacia, escuela y estación de policía proporciona un entorno seguro y accesible para el personal que trabajará en estas oficinas."
            },
            {
                "TipoInfraestructura": "Centro de acopio",
                "Justificacion": "Un centro de acopio es ideal para este terreno, ya que su área permite el almacenamiento de suministros y equipos necesarios para operaciones de defensa civil. La ubicación en zona urbana facilita la logística de distribución y el acceso a servicios básicos, mientras que la estabilidad del terreno asegura la integridad de las estructuras de almacenamiento."
            },
            {
                "TipoInfraestructura": "Puesto de control",
                "Justificacion": "La construcción de un puesto de control es adecuada en este terreno, ya que su tamaño permite establecer un punto de vigilancia y seguridad. La ubicación en un área urbana, junto con la cercanía a la estación de policía, refuerza la capacidad de respuesta ante emergencias, y la topografía plana del terreno favorece la visibilidad y el acceso rápido a la zona."
            }
        ]
    };

    $("#loadinzer").LoadingOverlay("show", {
        image: "",
        custom: '<div class="spinner-border text-warning m-2" style="height: 5rem; width: 5rem;" role="status"></div>',
        text: "Esperando respuesta...",
        textResizeFactor: 0.3,
        textColor: "#ffffff",
        background: "rgba(0, 0, 0, 0.85)"
    });

    setTimeout(function () {
        $("#loadinzer").LoadingOverlay("hide");

        mostrarResultados(mockDataIA.Recomendaciones);

        $('#btnGenerarPruebas').prop('disabled', false);
    }, 3000); // 1 segundo de retraso simulado

});

$("#btnGenerarConsul").on("click", function () {

    $('#btnGenerarConsul').prop('disabled', true);

    let idPropiedad = $("#txtIdPropiedad").val().trim();

    if (idPropiedad === "0" || idPropiedad === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe realizar la busqueda de una propiedad'
        });
        $('#btnGenerarConsul').prop('disabled', false);
        return;
    }

    $("#loadinzer").LoadingOverlay("show", {
        image: "",
        custom: '<div class="spinner-border text-warning m-2" style="height: 5rem; width: 5rem;" role="status"></div>',
        text: "Esperando respuesta...",
        textResizeFactor: 0.3,
        textColor: "#ffffff",
        background: "rgba(0, 0, 0, 0.85)"
    });

    $.ajax({
        url: "ModeloLmPage.aspx/ResultadoModeloLm",
        type: "POST",
        data: JSON.stringify({ IdPropiedad: parseInt(idPropiedad) }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            $("#loadinzer").LoadingOverlay("hide");
            if (response.d.Estado) {
                const data = response.d.Data;
                // El 'null' es para no filtrar nada, y el '4' es la cantidad de espacios de sangría
                console.log(JSON.stringify(data, null, 4));

                mostrarResultados(data);
            } else {
                mostrarAlertaZero("¡Atención!", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#loadinzer").LoadingOverlay("hide");
            ToastMaster.fire({ icon: 'error', title: 'Error de comunicación con el servidor.' });
        },
        complete: function () {
            $('#btnGenerarConsul').prop('disabled', false);
        }
    });

});

function mostrarResultados(listaInfraestructuras) {

    // 1. Destruir tabla previa si existe
    if ($.fn.DataTable.isDataTable("#tbResult")) {
        $("#tbResult").DataTable().destroy();
        $('#tbResult tbody').empty();
    }

    // 2. Inicializar DataTable
    $("#tbResult").DataTable({
        responsive: true,
        data: listaInfraestructuras,
        paging: false,
        searching: false,
        info: false,
        columns: [
            {
                data: "TipoInfraestructura",
                width: "35%",
                className: "align-middle",
                render: function (data) {
                    // Diseño elegante con un contenedor sutil y un ícono de edificio
                    return `
                        <div class="d-flex align-items-center">
                            <div class="bg-primary-subtle text-primary rounded p-2 me-2">
                                <i class="ti ti-building-arch fs-20"></i>
                            </div>
                            <span class="fw-bold fs-15 text-body">${data}</span>
                        </div>`;
                }
            },
            {
                data: "Justificacion",
                width: "65%",
                className: "text-wrap align-middle",
                render: function (data) {
                    // Texto en cursiva con un ícono de cita (Tabler Icons)
                    return `
                        <div class="d-flex">
                            <i class="ti ti-quote fs-18 text-secondary me-2 mt-1"></i>
                            <span class="fst-italic text-muted" style="font-size: 0.9rem;">${data}</span>
                        </div>`;
                }
            }
        ],
        order: [], // Sin ordenamiento inicial para respetar el orden 1,2,3 que mande la IA
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

// fin codigo