
let tablaDataDep;
let idEditarDep = 0;

let tablaDataProv;
let idEditarProv = 0;

let tablaDataMuni;
let idEditarMuni = 0;

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
    //$("#cboDepartaModal").val("");

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