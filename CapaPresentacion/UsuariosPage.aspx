<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="UsuariosPage.aspx.cs" Inherits="CapaPresentacion.UsuariosPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
    <style>
        .usuario-perfil {
            width: 125px;
            height: 125px;
            object-fit: cover; /* Evita que la imagen se estire o aplaste */
            object-position: center; /* Asegura que se vea el centro de la foto */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Usuarios Registrados</h4>
                    <%--<button type="button" id="btnNuevore" class="btn btn-info btn-sm">Agregar <i class="ti ti-user-circle ms-1 fs-20"></i></button>--%>
                </div>

                <div class="card-body">
                    <table class="table table-striped table-hover align-middle table-sm" id="tbUsuarios" cellspacing="0" style="width: 100%">
                        <thead class="table-light">
                            <tr>
                                <th>Id</th>
                                <th class="text-center">Imagen</th>
                                <th><i class="ti ti-user-circle me-1 text-muted"></i>Usuarios</th>
                                <th><i class="ti ti-id-badge me-1 text-muted"></i>Rol</th>
                                <th><i class="ti ti-mail me-1 text-muted"></i>Correo</th>
                                <th class="text-center"><i class="ti ti-activity me-1 text-muted"></i>Estado</th>
                                <th class="text-center"><i class="ti ti-login me-1 text-muted"></i>Accesos</th>
                                <th><i class="ti ti-calendar me-1 text-muted"></i>Fecha Reg.</th>
                                <th class="text-center"><i class="ti ti-settings me-1 text-muted"></i>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <%--<table class="table table-striped table-sm" id="tbUsuarios" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Imagen</th>
                                <th>Usuarios</th>
                                <th>Rol</th>
                                <th>Correos</th>
                                <th>Estado</th>
                                <th>Nro. Acceso</th>
                                <th>Fecha Reg.</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>--%>
                </div>
            </div>
        </div>
    </div>

    <div id="modalAdd" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="modalLabeldetalle"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalle">Usuarios</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-striped table-sm" id="tbDetallesAcceso" cellspacing="0" style="width: 100%">
                                <thead>
                                    <tr>
                                        <th>Fecha y Hora de Accesos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x me-1 fs-20"></i>Salir</button>
                    <button type="button" id="btnReporte" class="btn btn-sm btn-info"><i class="ti ti-printer me-1 fs-20"></i>Reporte</button>
                </div>
                <%--<div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x me-1 fs-20"></i>Salir</button>
                    <button type="button" id="btnGuardarReg" class="btn btn-success btn-sm"><i class="ti ti-device-floppy me-1 fs-20"></i>Guardar</button>
                </div>--%>
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

    <script src="js/UsuariosPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
