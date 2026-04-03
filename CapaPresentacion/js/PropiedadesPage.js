
let map;
let marker;

$(document).ready(function () {
    new Wizard("#progressbarwizard", { progress: !0 });
});

async function initMap() {
    const position = { lat: -11.0064, lng: -66.0730 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("mapa"), {
        zoom: 15,
        center: position,
        mapId: "DEMOMAPA",
    });

    // Agregar marcador en la posición inicial
    marker = new AdvancedMarkerElement({
        position: position,
        map: map,
        gmpDraggable: true // Habilitar arrastrar
    });

    // Mostrar las coordenadas iniciales en los inputs
    updateInputs(position.lat, position.lng);

    // Evento para actualizar inputs al mover el marcador
    marker.addListener("dragend", function (event) {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        updateInputs(newLat, newLng);
    });

    // Evento para agregar marcador en un clic en el mapa
    map.addListener("click", function (event) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        marker.position = new google.maps.LatLng(clickedLat, clickedLng);
        //marker.setPosition({ lat: clickedLat, lng: clickedLng });
        updateInputs(clickedLat, clickedLng);
    });

}

// Función para actualizar los inputs
function updateInputs(lat, lng) {
    document.getElementById("txtLatitud").value = lat.toFixed(6);
    document.getElementById("txtLongitud").value = lng.toFixed(6);
}

const TAMANO_MAXIMO = 4 * 1024 * 1024; // 4 MB en bytes

function mostrarPdfSeleccionada(input) {
    let file = input.files[0];

    // 1. Si NO se seleccionó archivo (Cancelado o vacío)
    if (!file) {
        resetearVistaPdf(input);
        return;
    }

    // 2. Validación: Tipo de archivo
    if (!esPdfValida(file)) {
        ToastMaster.fire({
            icon: 'error',
            title: 'El archivo seleccionado no es un PDF válido.'
        });
        resetearVistaPdf(input);
        return;
    }

    // 3. Validación: Tamaño máximo
    if (file.size > TAMANO_MAXIMO) {
        ToastMaster.fire({
            icon: 'error',
            title: 'El archivo supera el tamaño máximo permitido de 4 MB.'
        });
        resetearVistaPdf(input);
        return;
    }

    let blobUrl = URL.createObjectURL(file);
    $('#verPdf').attr('src', blobUrl);

}

// Función auxiliar para validar que sea PDF
function esPdfValida(file) {
    // Validamos por extensión y por tipo MIME
    const extension = file.name.split('.').pop().toLowerCase();
    return file.type === 'application/pdf' || extension === 'pdf';
}

// Función auxiliar para limpiar (DRY - Don't Repeat Yourself)
function resetearVistaPdf(input) {
    $('#verPdf').attr('src', "DocumetPdf/sinPdf.pdf");
    input.value = ""; // Limpia el input file
}

$('#txtPdf').change(function () {
    mostrarPdfSeleccionada(this);
});

// fin