<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="UbicacionPage.aspx.cs" Inherits="CapaPresentacion.UbicacionPage" %>
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
                        <p class="fs-18 fw-semibold text-white mb-1"><i class="ti ti-map-search me-2"></i>Georreferenciación</p>
                        <p class="mb-0 text-white-50" style="font-size: 0.85rem;">Active el GPS para ver propiedades cercanas</p>
                    </div>

                    <div class="p-3">
                        <div class="input-group input-group-sm flex-nowrap mb-2">
                            <span class="input-group-text bg-body-secondary" id="grouplati">Latitud</span>
                            <input type="text" class="form-control fw-semibold text-primary" id="txtLatitud" aria-label="Latitud" aria-describedby="grouplati" placeholder="Esperando..." readonly>
                        </div>
                        <div class="input-group input-group-sm flex-nowrap mb-3">
                            <span class="input-group-text bg-body-secondary" id="grouplongi">Longitud</span>
                            <input type="text" class="form-control fw-semibold text-primary" id="txtLongitud" aria-label="Longitud" aria-describedby="grouplongi" placeholder="Esperando..." readonly>
                        </div>

                        <div class="d-flex justify-content-center">
                            <button type="button" id="btnUbicacion" class="btn btn-sm btn-info me-2">
                                <i class="ti ti-map-pin fs-16 align-middle me-1"></i>Ubicación
                            </button>
                            <button type="button" id="btnConsultar" class="btn btn-sm btn-success">
                                <i class="ti ti-home-search fs-16 align-middle me-1"></i>Consultar
                            </button>
                        </div>
                    </div>

                    <div class="bg-body-secondary border-top p-3 rounded-bottom">
                        <h5 class="mb-2 fs-15 fw-bold text-body"><i class="ti ti-help-circle text-primary fs-18 align-middle me-1"></i>¿Cómo activar mi ubicación?</h5>
                        <div class="alert alert-warning px-2 py-2 mb-2" role="alert" style="font-size: 0.8rem;">
                            <i class="ti ti-alert-triangle me-1"></i><strong>Requisito:</strong> Su navegador le pedirá permiso para acceder al GPS.
                        </div>
                        <ul class="text-muted mb-0 ps-3" style="font-size: 0.85rem; line-height: 1.5;">
                            <li class="mb-1">Haga clic en el botón <strong>"Ubicación"</strong>.</li>
                            <li class="mb-1">En la alerta que aparecerá arriba a la izquierda, seleccione <strong>"Permitir"</strong>.</li>
                            <li>Si la bloqueó por error, haga clic en el ícono del <strong>candado <i class="ti ti-lock"></i></strong>junto a la barra de direcciones web y cambie el permiso.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Propiedades Encontradas</h4>
                </div>

                <div class="card-body">
                    <%--<div class="mb-3">
                        <div class="d-flex justify-content-center">
                            <div class="input-group input-group-sm flex-nowrap me-2">
                                <span class="input-group-text" id="grouplati">Latitud</span>
                                <input type="text" class="form-control" id="txtLatitud" aria-label="Latitud" aria-describedby="grouplati" readonly>
                            </div>

                            <div class="input-group input-group-sm flex-nowrap me-2">
                                <span class="input-group-text" id="grouplongi">Longitud</span>
                                <input type="text" class="form-control" id="txtLongitud" aria-label="Longitud" aria-describedby="grouplongi" readonly>
                            </div>

                            <button type="button" id="btnUbicacion" class="btn btn-sm btn-info"><i class="ti ti-map-pin fs-16 align-middle me-1"></i>Ubicacion</button>
                        </div>
                    </div>--%>

                    <table class="table table-striped table-hover align-middle w-100" id="tbPropiedades">
                        <thead class="table-light">
                            <tr>
                                <th>Id</th>
                                <th>Cod. / Dirección</th>
                                <th>Zona</th>
                                <th>Distancia</th>
                                <th class="text-center">Opciones</th>
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

    <script src="js/UbicacionGeoPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
