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
        <div class="card shadow-sm">
            <div class="card-body">
                <h4 class="header-title mb-2"><i class="ri-search-line me-1 text-primary"></i> Consulta de Propiedad</h4>
                <p class="text-muted fs-13 mb-3">
                    Realice la búsqueda ingresando el Nro. de Folio o Código Catastral.
                </p>
                
                <div class="mb-3">
                    <select id="cboBuscarPropied" class="form-control select2" style="width: 100%;">
                        <option value="">Buscar propiedad...</option>
                    </select>
                </div>

                <hr class="border-light">

                <h4 class="header-title mb-3"><i class="ri-folder-info-line me-1 text-primary"></i> Documento Legal</h4>
                
                <div class="border border-dashed rounded p-4 text-center bg-light" id="boxDocumento">
                    
                    <div id="estadoVacioPdf">
                        <i class="ri-file-search-line fs-1 d-block text-muted opacity-50 mb-2"></i>
                        <span class="text-muted fs-13">Seleccione una propiedad para visualizar su documentación.</span>
                    </div>

                    <a href="#" id="btnVerPdf" target="_blank" class="btn btn-danger w-100 d-none shadow-sm fw-medium">
                        <i class="ri-file-pdf-2-fill me-1 fs-18 align-middle"></i> Ver Documento PDF
                    </a>

                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-8">
        <div class="card shadow-sm">
            <div class="card-body">
                <h4 class="text-dark fw-bold text-center mb-3">Detalle General de la Propiedad</h4>

                <h5 class="font-15 fw-semibold mb-2">Descripción</h5>
                <p id="lblDescripcionGe" class="text-muted bg-light p-2 rounded fs-14 border mb-3">---</p>

                <div class="row g-2 text-center mb-3">
                    <div class="col-6 col-md-3">
                        <div class="border rounded p-2 bg-light">
                            <span class="d-block text-muted fs-12 text-uppercase fw-semibold">Ancho</span>
                            <span id="lblAncho" class="text-dark fw-bold fs-15">---</span>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="border rounded p-2 bg-light">
                            <span class="d-block text-muted fs-12 text-uppercase fw-semibold">Largo</span>
                            <span id="lblLargo" class="text-dark fw-bold fs-15">---</span>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="border rounded p-2 bg-light">
                            <span class="d-block text-muted fs-12 text-uppercase fw-semibold">Área Total</span>
                            <span id="lblArea" class="text-primary fw-bold fs-15">---</span>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="border rounded p-2 bg-light">
                            <span class="d-block text-muted fs-12 text-uppercase fw-semibold">Nro. Folio</span>
                            <span id="lblNrofolio" class="text-dark fw-bold fs-15">---</span>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-5 mb-4 mb-lg-0">
                        <h4 class="header-title mt-2 mb-3">Información Adicional</h4>
                        <div class="table-responsive">
                            <table class="table table-sm table-borderless mb-0 fs-14">
                                <tbody>
                                    <tr class="border-bottom border-light">
                                        <td class="text-muted"><i class="ri-water-flash-line me-1"></i>Servicios Básicos</td>
                                        <td class="text-end text-dark fw-semibold"><span id="lblSerBasi">---</span></td>
                                    </tr>
                                    <tr class="border-bottom border-light">
                                        <td class="text-muted"><i class="ri-flood-line me-1"></i>Riesgo Inundación</td>
                                        <td class="text-end text-dark fw-semibold"><span id="lblRiesgoInun">---</span></td>
                                    </tr>
                                    <tr class="border-bottom border-light">
                                        <td class="text-muted"><i class="ri-earthquake-line me-1"></i>Riesgo Deslizamiento</td>
                                        <td class="text-end text-dark fw-semibold"><span id="lblRiesgoDesli">---</span></td>
                                    </tr>
                                    <tr class="border-bottom border-light">
                                        <td class="text-muted"><i class="ri-landscape-line me-1"></i>Topografía</td>
                                        <td class="text-end text-dark fw-semibold"><span id="lblTopografia">---</span></td>
                                    </tr>
                                    <tr class="border-bottom border-light">
                                        <td class="text-muted"><i class="ri-seedling-line me-1"></i>Tipo Suelo</td>
                                        <td class="text-end text-dark fw-semibold"><span id="lblTipoSuelo">---</span></td>
                                    </tr>
                                    <tr class="border-bottom border-light">
                                        <td class="text-muted"><i class="ri-building-4-line me-1"></i>Tipo Propiedad</td>
                                        <td class="text-end text-dark fw-semibold"><span id="lblTipoPropi">---</span></td>
                                    </tr>
                                    <tr>
                                        <td class="text-muted"><i class="ri-shield-check-line me-1"></i>Estado Legal</td>
                                        <td class="text-end text-dark fw-semibold"><span id="lblTipoEstado">---</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="col-lg-7">
                        <h4 class="header-title text-center mt-2 mb-3">Ubicación Geográfica</h4>
                        <div class="border rounded p-1">
                            <div id="mapa" class="gmaps" style="height: 250px;"></div>
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
