
let mape;
let markers = []; // Arreglo para almacenar los marcadores


async function initMap() {
    const position = { lat: -11.003764, lng: -66.055704 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    mape = new Map(document.getElementById("mapa"), {
        zoom: 13,
        center: position,
        mapId: "DEMOMAPA",
    });

    listaPropiedadesReg();
}

// Función para obtener la lista de veterinarias y crear los marcadores
function listaPropiedadesReg() {
    $.ajax({
        url: "PropiedadesPage.aspx/ListaPropiedadesIdRegional",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#loadinzer").LoadingOverlay("show", {
                image: "",
                custom: '<div class="spinner-border text-warning m-2" style="height: 5rem; width: 5rem;" role="status"></div>',
                text: "Esperando respuesta...",
                textResizeFactor: 0.3,
                textColor: "#ffffff",
                background: "rgba(0, 0, 0, 0.85)"
            });
        },
        success: function (response) {
            $("#loadinzer").LoadingOverlay("hide");
            if (response.d.Estado) {
                const lista = response.d.Data;

                if (lista != null && lista.length > 0) {
                    crearMarcadores(lista);
                } else {
                    mostrarAlertaZero("¡Atención!", "No existen Propiedades para la regional.", "warning");
                }

            } else {
                mostrarAlertaZero("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#loadinzer").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        }
    });
}

// Función para crear múltiples marcadores en el mapa
function crearMarcadores(listaProp) {
    // Limpia los marcadores existentes si ya hay en el mapa
    markers.forEach(marker => marker.map = null);
    markers = [];

    const infoWindow = new google.maps.InfoWindow();

    // Recorre la lista y crea un marcador para cada veterinaria
    listaProp.forEach(vet => {
        const { TipoPropiedad, Latitud, Longitud, CodCatastral, FechaRegistro } = vet;

        if (Latitud && Longitud) { // Verifica que existan coordenadas
            let nuevoMarker = new google.maps.marker.AdvancedMarkerElement({
                position: { lat: parseFloat(Latitud), lng: parseFloat(Longitud) },
                map: mape,
                title: TipoPropiedad
            });

            // Agrega un evento para mostrar el nombre en un InfoWindow o en la consola
            nuevoMarker.addListener("click", () => {
                const contenido = `
                    <div style="font-size:16px; font-weight:bold;">Tipo Prop: ${TipoPropiedad}</div>
                    <div style="font-size:14px;">📍 Cod: ${CodCatastral || 'Sin Codigo Catastral'}</div>
                    <div style="font-size:14px;">📞 Registrado el: ${FechaRegistro}</div>
                `;
                infoWindow.setContent(contenido);
                infoWindow.open(mape, nuevoMarker);
                // Aquí puedes usar InfoWindow si quieres mostrar más detalles
            });

            // Añade el nuevo marcador al arreglo de marcadores
            markers.push(nuevoMarker);
        }
    });

    // Opcional: Ajusta el zoom y el centro del mapa para mostrar todos los marcadores
    ajustarVistaMarcadores();
}


// Función para ajustar el mapa y mostrar todos los marcadores
function ajustarVistaMarcadores() {
    if (markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    markers.forEach(marker => bounds.extend(marker.position));
    mape.fitBounds(bounds);
}

// Configuración del Select2 (AJAX)