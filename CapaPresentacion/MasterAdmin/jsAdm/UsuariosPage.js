
let tablaData;
let idEditar = 0;


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
    $('#imgUsureg').attr('src', "/Imagenes/sinimagen.png");
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