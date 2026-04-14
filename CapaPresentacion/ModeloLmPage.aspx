<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="ModeloLmPage.aspx.cs" Inherits="CapaPresentacion.ModeloLmPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body p-0">
                    <div class="bg-dark shadow text-center p-3 rounded-top">
                        <p class="fs-18 fw-semibold text-white mb-1"><i class="ti ti-robot me-2"></i>Asistente Inteligente</p>
                        <p class="mb-0 text-white-50" style="font-size: 0.85rem;">Evaluación estratégica del terreno</p>
                    </div>

                    <div class="p-3">
                        <div class="mb-3">
                            <label class="form-label">Buscar Propiedad:</label>
                            <select id="cboBuscarPropied" class="form-control select2" style="width: 100%;">
                                <option value="">Nro. Folio o Cod. Catastral...</option>
                            </select>
                        </div>

                        <div class="d-flex justify-content-center">
                            <button type="button" id="btnGenerarConsul" class="btn btn-sm btn-info me-2">
                                <i class="ti ti-map-pin fs-16 align-middle me-1"></i>Generar Consulta
                            </button>
                            <%--<button type="button" id="btnGenerarPruebas" class="btn btn-sm btn-danger me-2">
                                <i class="ti ti-map-pin fs-16 align-middle me-1"></i>
                            </button>--%>
                            <button type="button" id="btnReporte" class="btn btn-sm btn-success">
                                <i class="ti ti-home-search fs-16 align-middle me-1"></i>Reporte
                            </button>
                        </div>
                    </div>

                    <div class="bg-body-secondary border-top p-3 rounded-bottom">
                        <h5 class="mb-2 fs-15 fw-bold text-body"><i class="ti ti-info-circle text-info fs-18 align-middle me-1"></i>Guía de Análisis</h5>
                        <div class="alert alert-info px-2 py-2 mb-2 border-0 shadow-none" role="alert" style="font-size: 0.8rem;">
                            <i class="ti ti-bulb me-1"></i>El modelo evalúa la topografía, el suelo y los riesgos registrados.
                        </div>
                        <ul class="text-muted mb-0 ps-3" style="font-size: 0.85rem; line-height: 1.5;">
                            <li class="mb-1">Busque y seleccione una propiedad.</li>
                            <li class="mb-1">Haga clic en <strong>Generar Consulta</strong>.</li>
                            <li>El asistente le sugerirá 3 opciones viables de infraestructura estratégica.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card" id="loadinzer">
                <div class="card-body">

                    <h4 class="text-dark fw-medium text-center">Detalle de la Propiedad</h4>
                    <input type="hidden" value="0" id="txtIdPropiedad">

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
                    <h4 class="text-dark fw-medium text-center mt-3 mb-3">Resultados de la consulta</h4>
                    <table class="table table-striped table-hover align-middle w-100" id="tbResult">
                        <thead class="table-light">
                            <tr>
                                <th>Infraestructura</th>
                                <th>Justificacion</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.responsive.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.buttons.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/jszip.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.html5.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.print.min.js"></script>

    <script src="js/ModeloMlPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
