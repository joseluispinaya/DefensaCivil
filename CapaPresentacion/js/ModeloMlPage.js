
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

// fin codigo