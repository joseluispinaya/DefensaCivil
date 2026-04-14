<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="ConsultasPage.aspx.cs" Inherits="CapaPresentacion.ConsultasPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .gmapz {
            height: 264px;
            width: 100%;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="mb-2">Consulta de Propiedad</h5>
                    <p class="mb-2">
                        Puede realizar una busqueda de la propiedad e interactuar para verificar posibles mejoras o recomendaciones
                    </p>
                    <div class="mb-3">
                        <label class="form-label">Buscar Propiedad:</label>
                        <select id="cboBuscarPropied" class="form-control select2" style="width: 100%;">
                            <option value="">Nro. Folio o Cod. Catastral...</option>
                        </select>
                    </div>

                    <%--<div class="mb-3">
                        <label class="form-label" for="txtConsulta">Consulta</label>
                        <textarea class="form-control" id="txtConsulta" placeholder="Ingrese su consulta" rows="5"></textarea>
                    </div>--%>

                    <div class="mb-2">
                        <div class="d-flex justify-content-center">
                            <button type="button" id="btnConsultar" class="btn btn-sm btn-info me-2"><i class="ti ti-home-search me-1 fs-20"></i>Reporte</button>
                            <button type="button" id="btnNuevaCons" class="btn btn-sm btn-success"><i class="ti ti-home-plus me-1 fs-20"></i>Nuevo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-body">
                    <h4 class="text-dark fw-medium text-center">Detalle General de la Propiedad</h4>

                    <h5 class="mb-2">Descripcion</h5>
                    <%--<p class="fs-15 fw-medium mb-0 text-muted mb-1">Descripcion</p>--%>

                    <p id="lblDescripcionGe" class="mb-2">Esperando...</p>

                    <div class="border border-dashed p-2 rounded text-center">
                        <div class="row">
                            <div class="col-lg-3 col-4 border-end">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Ancho : </span><span id="lblAncho">Esperando...</span></p>
                            </div>
                            <div class="col-lg-3 col-4 border-end">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Largo : </span><span id="lblLargo">Esperando...</span></p>
                            </div>
                            <div class="col-lg-3 col-4 border-end">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Area : </span><span id="lblArea">Esperando...</span></p>
                            </div>
                            <div class="col-lg-3 col-4">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Nro Folio : </span><span id="lblNrofolio">Esperando...</span></p>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-5">
                            <h4 class="card-title mt-3">Informacion adicional</h4>
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <tbody>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Servicios basicos : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0"><span id="lblSerBasi">Esperando...</span></td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Riesgo de Inundacion : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0"><span id="lblRiesgoInun">Esperando...</span></td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Riesgo deslizamiento : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0"><span id="lblRiesgoDesli">Esperando...</span></td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Topografia : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0"><span id="lblTopografia">Esperando...</span></td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Tipo Suelo : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0"><span id="lblTipoSuelo">Esperando...</span></td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Tipo Propiedad : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0"><span id="lblTipoPropi">Esperando...</span></td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Tipo Estado : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0"><span id="lblTipoEstado">Esperando...</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <h4 class="card-title text-center mt-3">Ubicacion</h4>
                            <div class="card">
                                <div class="card-body">
                                    <div id="mapa" class="gmaps mb-3"></div>
                                    <%--<div class="mapouter">
                                        <div class="gmap_canvas">
                                            <iframe
                                                class="gmap_iframe gmapz rounded"
                                                frameborder="0"
                                                scrolling="no"
                                                marginheight="0"
                                                marginwidth="0"
                                                src="https://maps.google.com/maps?q=-11.004188,-66.055628&t=&z=15&ie=UTF8&iwloc=&output=embed"></iframe>
                                        </div>
                                    </div>--%>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/ConsultasPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF1HcfGOeusxinFBpjXsMccjQxCtxRrV4&loading=async&callback=initMap"></script>
</asp:Content>
