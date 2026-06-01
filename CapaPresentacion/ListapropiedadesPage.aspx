<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="ListapropiedadesPage.aspx.cs" Inherits="CapaPresentacion.ListapropiedadesPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow-sm">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title mb-0">Gestión de Propiedades</h4>
                    <button type="button" id="btnNuevaPropiedad" class="btn btn-primary btn-sm">
                        <i class="ti ti-plus fs-16 align-middle me-1"></i>Nuevo Registro
                    </button>
                </div>

                <div class="card-body">
                    <table class="table table-striped table-hover align-middle w-100" id="tbPropiedades">
                        <thead class="table-light">
                            <tr>
                                <th>Id</th>
                                <th>Tipo Propiedad</th>
                                <th>Catastral / Folio</th>
                                <th>Dirección</th>
                                <th>Área</th>
                                <th>Zona</th>
                                <th>Fecha Reg.</th>
                                <th class="text-center">Estado</th>
                                <%--<th class="text-center">Opciones</th>--%>
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

    <script src="js/ListaPropiedadesPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
