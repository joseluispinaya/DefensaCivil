<%@ Page Title="" Language="C#" MasterPageFile="~/MasterAdmin/MasterAdminHo.Master" AutoEventWireup="true" CodeBehind="RegionalesPage.aspx.cs" Inherits="CapaPresentacion.MasterAdmin.RegionalesPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Regionales Registradas</h4>
                    <button type="button" id="btnNuevore" class="btn btn-info btn-sm">
                        <i class="ti ti-plus fs-16 align-middle me-1"></i>Nuevo Registro
                    </button>
                </div>

                <div class="card-body">
                    <table class="table table-striped table-sm" id="tbRegionales" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Regional</th>
                                <th>Provincia</th>
                                <th>Municipio</th>
                                <th>Responsable</th>
                                <th>Contacto</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div id="modalAdd" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="modalLabeldetalle"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalle">Regionales</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-2">
                                <label for="cboDepartamento" class="form-label mb-1 text-muted fw-semibold">Selecione Departamento</label>
                                <select class="form-select form-select-sm" id="cboDepartamento">
                                </select>
                            </div>
                            <div class="mb-2">
                                <label for="cboProvincia" class="form-label mb-1 text-muted fw-semibold">Selecione Provincia</label>
                                <select class="form-select form-select-sm" id="cboProvincia" disabled>
                                </select>
                            </div>
                            <div class="mb-2">
                                <label for="cboMunicipio" class="form-label mb-1 text-muted fw-semibold">Selecione Municipio</label>
                                <select class="form-select form-select-sm" id="cboMunicipio" disabled>
                                </select>
                            </div>
                            
                        </div>
                        <div class="col-md-6">
                            <div class="mb-2">
                                <label for="txtNombreRegional" class="form-label mb-1 text-muted fw-semibold">Nombre Regional</label>
                                <input type="text" id="txtNombreRegional" name="Nombre Regional" class="form-control form-control-sm model">
                            </div>
                            <div class="mb-2">
                                <label for="txtNroCel" class="form-label mb-1 text-muted fw-semibold">Nro de Cel</label>
                                <input type="number" id="txtNroCel" name="Nro de Cel" class="form-control form-control-sm model">
                            </div>
                            <div class="mb-2">
                                <label for="txtDireccion" class="form-label mb-1 text-muted fw-semibold">Direccion</label>
                                <input type="text" id="txtDireccion" name="Direccion" class="form-control form-control-sm model">
                            </div>
                            
                        </div>
                    </div>
                    <div class="mb-1">
                        <label class="form-label mb-1 text-muted fw-semibold" for="txtDescripGen">Descripcion</label>
                        <textarea class="form-control" id="txtDescripGen" rows="2"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                    <button type="button" id="btnGuardarCambios" class="btn btn-sm btn-success"><i class="ti ti-device-floppy fs-16 align-middle me-1"></i>Guardar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="../assets/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="../assets/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="../assets/vendor/datatables/extensiones/js/dataTables.responsive.min.js"></script>

    <script src="../assets/vendor/datatables/extensiones/js/dataTables.buttons.min.js"></script>
    <script src="../assets/vendor/datatables/extensiones/js/jszip.min.js"></script>
    <script src="../assets/vendor/datatables/extensiones/js/buttons.html5.min.js"></script>
    <script src="../assets/vendor/datatables/extensiones/js/buttons.print.min.js"></script>

    <script src="jsAdm/RegionalesPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
