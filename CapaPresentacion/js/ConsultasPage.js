
let map;
let marker;

$(document).ready(function () {
    cargarBuscadorPropiedadesNew();
});

async function initMap() {
    const position = { lat: -11.003764, lng: -66.055704 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("mapa"), {
        zoom: 17,
        center: position,
        mapId: "DEMOMAPA",
    });

}

// Configuración del Select2 (AJAX)
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
    //$("#txtIdTutor").val(data.id);
    $("#lblDescripcionGe").text(data.DescripcionGen);
    $("#lblAncho").text(data.Ancho + " Mts");
    $("#lblLargo").text(data.Largo + " Mts");
    $("#lblArea").text(data.AreaM2 + " m²");
    $("#lblNrofolio").text(data.NroFolio);

    //const url = data.ServiciosBas ? "Si" : "No";
    //$("#cboEstado").val(data.Estado ? 1 : 0);

    $("#lblSerBasi").text(data.ServiciosBas ? "Sí" : "No");
    $("#lblRiesgoInun").text(data.RiesgoInundacion ? "Sí" : "No");
    $("#lblRiesgoDesli").text(data.RiesgoDeslizamiento ? "Sí" : "No");

    $("#lblTopografia").text(data.Topografia);
    $("#lblTipoSuelo").text(data.TipoSuelo);
    $("#lblTipoPropi").text(data.TipoPropiedad);
    $("#lblTipoEstado").text(data.EstadoLegal);

    // --- LECTURA DE COORDENADAS ---
    let lat = parseFloat(data.Latitud);
    let lng = parseFloat(data.Longitud);

    map.setCenter({ lat, lng });
    map.setZoom(17);

    new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: { lat, lng },
        title: "punto de ubicación"
    })

    $("#cboBuscarPropied").val(null).trigger("change");
});

// Configuración del Select2 (AJAX)