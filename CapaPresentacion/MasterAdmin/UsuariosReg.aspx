<%@ Page Title="" Language="C#" MasterPageFile="~/MasterAdmin/MasterAdminHo.Master" AutoEventWireup="true" CodeBehind="UsuariosReg.aspx.cs" Inherits="CapaPresentacion.MasterAdmin.UsuariosReg" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
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
                    <div class="mb-2">
                        <div class="d-flex justify-content-center">
                            <div class="input-group input-group-sm w-100 me-2" style="max-width: 390px;">
                                <span class="input-group-text bg-light text-muted fw-semibold" id="addon-regional">
                                    <i class="ti ti-map-2 me-1"></i>Regional
                                </span>
                                <select class="form-select" id="cboRegional" aria-describedby="addon-regional">
                                    <option value="1">Responsable satatatat</option>
                                </select>
                            </div>
                            <button type="button" id="btnNuevore" class="btn btn-sm btn-info"><i class="ti ti-plus fs-16 align-middle me-1"></i>Nuevo Registro</button>
                        </div>
                    </div>

                    <table class="table table-striped table-sm" id="tbUsuarios" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Imagen</th>
                                <th>Grado</th>
                                <th>Usuarios</th>
                                <th>Rol</th>
                                <th>Correos</th>
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
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalle">Usuarios</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-7">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-2">
                                        <label for="txtNombrees" class="form-label">Nombres</label>
                                        <input type="text" id="txtNombrees" name="Nombre" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2">
                                        <label for="txtCorreo" class="form-label">Correo</label>
                                        <input type="text" id="txtCorreo" name="Correo" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2">
                                        <label for="txtNroci" class="form-label">Nro C.I.</label>
                                        <input type="text" id="txtNroci" name="NroCI" class="form-control form-control-sm model">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-2">
                                        <label for="txtApellidos" class="form-label">Apellidos</label>
                                        <input type="text" id="txtApellidos" name="Apellidos" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2">
                                        <label for="txtCelular" class="form-label">Celular</label>
                                        <input type="number" id="txtCelular" name="Celular" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2">
                                        <label for="cboRoles" class="form-label">Rol</label>
                                        <select class="form-select form-select-sm" id="cboRoles">
                                            <option value="1">Responsable</option>
                                            <option value="2">Tecnico</option>
                                            <option value="3">Auxiliar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-2">
                                <label for="txtFoto" class="form-label">Seleccione imagen</label>
                                <input type="file" id="txtFoto" class="form-control form-control-sm" accept="image/*">
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="row">
                                <div class="mb-3 col-md-6">
                                    <label for="cboFuerzas" class="form-label">Fuerza</label>
                                    <select class="form-select form-select-sm" id="cboFuerzas">
                                        <option value="1">Ejercito</option>
                                        <option value="2">Fuerza Aerea</option>
                                        <option value="3">Armada</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="cboGrados" class="form-label">Grado</label>
                                    <select class="form-select form-select-sm" id="cboGrados">
                                        <option value="1">Sargento</option>
                                        <option value="2">Fuerza Aerea</option>
                                        <option value="3">Armada</option>
                                    </select>
                                </div>
                            </div>
                            <div class="text-center mb-3">
                                <img src="../Imagenes/sinimagen.png" id="imgUsureg" alt="image" class="img-fluid rounded-circle usuario-perfil" />
                            </div>
                            <div class="mb-2">
                                <div class="d-flex justify-content-center border border-dashed rounded p-2">
                                    <button type="button" class="btn btn-sm btn-secondary me-2" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                                    <button type="button" id="btnGuardarReg" class="btn btn-sm btn-success"><i class="ti ti-device-floppy fs-16 align-middle me-1"></i>Guardar</button>
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
    <script src="../assets/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="../assets/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="../assets/vendor/datatables/extensiones/js/dataTables.responsive.min.js"></script>

    <script src="../assets/vendor/datatables/extensiones/js/dataTables.buttons.min.js"></script>
    <script src="../assets/vendor/datatables/extensiones/js/jszip.min.js"></script>
    <script src="../assets/vendor/datatables/extensiones/js/buttons.html5.min.js"></script>
    <script src="../assets/vendor/datatables/extensiones/js/buttons.print.min.js"></script>

    <script src="jsAdm/UsuariosPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
