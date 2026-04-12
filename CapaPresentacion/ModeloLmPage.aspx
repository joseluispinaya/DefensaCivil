<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="ModeloLmPage.aspx.cs" Inherits="CapaPresentacion.ModeloLmPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="mb-2 fs-15 fw-bold text-body">
                        <i class="ti ti-help-circle text-primary fs-18 align-middle me-1"></i>¿Resultado ML ubicación?
                    </h5>
                    <div class="input-group input-group-sm flex-nowrap mb-2">
                        <span class="input-group-text" id="grouplati">Latitud actual</span>
                        <input type="text" class="form-control" id="txtLatitud" aria-label="Latitud"
                            aria-describedby="grouplati" value="-10.999185">
                    </div>
                    <div class="input-group input-group-sm flex-nowrap mb-2">
                        <span class="input-group-text" id="grouplongi">Longitud actual</span>
                        <input type="text" class="form-control" id="txtLongitud" aria-label="Longitud"
                            aria-describedby="grouplongi" value="-66.060844">
                    </div>

                    <div class="d-flex justify-content-center">
                        <button type="button" id="btnUbicacion" class="btn btn-sm btn-info me-2">
                            <i class="ti ti-map-pin fs-16 align-middle me-1"></i>Ubicacion
                        </button>
                        <button type="button" id="btnConsultar" class="btn btn-sm btn-success">
                            <i class="ti ti-home-search fs-16 align-middle me-1"></i>Consultar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-body" id="loadinzero">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="bg-body-secondary">
                                <h5 class="mb-2 fs-15 fw-bold text-body">
                                    <i class="ti ti-help-circle text-primary fs-18 align-middle me-1"></i>¿Resultado ML ubicación?
                                </h5>
                                <div class="alert alert-warning px-2 py-2 mb-0" role="alert" style="font-size: 0.8rem;">
                                    <i class="ti ti-alert-triangle me-1"></i><strong>Requisito:</strong> Su navegador le pedirá permiso
                                para acceder al GPS.
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="mb-3">
                                <label class="form-label" for="txtResultado">Descripcion de la propiedad</label>
                                <textarea class="form-control" id="txtResultado" rows="6" readonly></textarea>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/ModeloMlPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
