<%@ Page Title="" Language="C#" MasterPageFile="~/MasterAdmin/MasterAdminHo.Master" AutoEventWireup="true" CodeBehind="UbicacionesPage.aspx.cs" Inherits="CapaPresentacion.MasterAdmin.UbicacionesPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="mb-3">Departamentos / Provincias / Municipios</h5>
                    <div class="d-flex align-items-center gap-2 border border-dashed p-2 rounded mb-3 ms-0">
                        <div class="avatar-xl bg-light rounded-circle d-flex align-items-center justify-content-center">
                            <img src="../Imagenes/iconlo.png" alt="" class="avatar-xl">
                        </div>
                        <div>
                            <h5 class="fw-medium fs-15">Departamentos</h5>
                            <p class="mb-0 mt-1">Lista de Departamentos</p>
                        </div>
                    </div>

                    <div class="d-flex align-items-center gap-2 border border-dashed p-2 rounded mb-3 ms-0">
                        <div class="avatar-xl bg-light rounded-circle d-flex align-items-center justify-content-center">
                            <img src="../Imagenes/iconlo.png" alt="" class="avatar-xl">
                        </div>
                        <div>
                            <h5 class="fw-medium fs-15">Provincias</h5>
                            <%--<a href="#!" class="fw-medium fs-15">Book a Demo</a>--%>
                            <p class="mb-0 mt-1">Lista de Provincias</p>
                        </div>
                    </div>

                    <div class="d-flex align-items-center gap-2 border border-dashed p-2 rounded ms-0">
                        <div class="avatar-xl bg-light rounded-circle d-flex align-items-center justify-content-center">
                            <img src="../Imagenes/iconlo.png" alt="" class="avatar-xl">
                        </div>
                        <div>
                            <h5 class="fw-medium fs-15">Municipios</h5>
                            <p class="mb-0 mt-1">Lista de Municipios</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-8">
            <div class="card">
                <div class="card-header border-bottom border-dashed d-flex align-items-center">
                    <h4 class="header-title">Panel de Ubicaciones</h4>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-9">
                            <div class="tab-content" id="v-pills-tabContent-right">
                                <div class="tab-pane fade active show" id="v-pills-home2" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    <%--<p class="mb-2">Welcome atmosphere with our selection of home decor</p>--%>

                                    <div class="mb-3">
                                        <div class="d-flex justify-content-center">
                                            <button type="button" id="btnNuevoDep" class="btn btn-sm btn-info"><i class="ti ti-plus me-1 fs-20"></i>Registrar</button>
                                        </div>
                                    </div>

                                    <%--<div class="d-flex justify-content-center">
                                        <div class="input-group input-group-sm mb-3">
                                            <label class="input-group-text" for="inputGroupSelect01">Options</label>
                                            <select class="form-select" id="inputGroupSelect01">
                                                <option selected>Choose...</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </div>--%>

                                    <table class="table table-striped table-sm" id="tbDeparta" cellspacing="0" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Departamentos</th>
                                                <th>Nro Prov</th>
                                                <th>Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="v-pills-profile2" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">

                                        <div class="input-group input-group-sm w-100" style="max-width: 390px;">
                                            <span class="input-group-text bg-light text-muted fw-semibold" id="addon-departa">
                                                <i class="ti ti-map-2 me-1"></i>Departamento
                                            </span>
                                            <select class="form-select" id="cboDepartamento" aria-describedby="addon-departa">
                                            </select>
                                        </div>

                                        <button type="button" id="btnNuevaProv" class="btn btn-sm btn-info">
                                            <i class="ti ti-plus fs-16 align-middle me-1"></i>Nuevo Registro
                                        </button>

                                    </div>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-sm" id="tbProvin" cellspacing="0" style="width: 100%">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Provincias</th>
                                                    <th>Nro Muns</th>
                                                    <th>Opciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-settings2" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                    <%--<div class="mb-2">
                                        <div class="d-flex justify-content-center">
                                            <button type="button" id="btnNuevoMunic" class="btn btn-sm btn-info"><i class="ti ti-plus me-1 fs-20"></i>Registrar</button>
                                        </div>
                                    </div>--%>

                                    <div class="row gy-2 gx-2 align-items-end mb-3">

                                        <div class="col-auto">
                                            <label for="cboDepartamentoMun" class="form-label mb-1 text-muted fw-semibold">Depto.</label>
                                            <select class="form-select form-select-sm" id="cboDepartamentoMun" style="min-width: 200px;">
                                                <option value="0" selected disabled>Seleccione dep...</option>
                                            </select>
                                        </div>

                                        <div class="col-auto">
                                            <label for="cboProvincia" class="form-label mb-1 text-muted fw-semibold">Prov.</label>
                                            <select class="form-select form-select-sm" id="cboProvincia" style="min-width: 220px;" disabled>
                                                <option value="0" selected disabled>Elija un depto. primero...</option>
                                            </select>
                                        </div>

                                        <div class="col-auto">
                                            <button type="button" id="btnNuevoMuni" class="btn btn-sm btn-info">
                                                <i class="ti ti-plus fs-16 align-middle me-1"></i>Nuevo
                                            </button>
                                        </div>

                                    </div>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-sm table-hover align-middle" id="tbMunici" cellspacing="0" style="width: 100%">
                                            <thead class="table-light">
                                                <tr>
                                                    <th style="width: 10%;">Id</th>
                                                    <th style="width: 70%;">Municipios</th>
                                                    <th style="width: 20%;" class="text-center">Opciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-3 mt-2 mt-sm-0">
                            <div class="nav flex-column nav-pills nav-pills-secondary" id="v-pills-tab2" role="tablist" aria-orientation="vertical">
                                <a class="nav-link p-2 active show" id="v-pills-home-tab2" data-bs-toggle="pill" href="#v-pills-home2" role="tab" aria-controls="v-pills-home2" aria-selected="true">
                                    <i class="ti ti-map-pin fs-18 me-1"></i>
                                    <span class="d-none d-md-inline-block">Departamentos</span>
                                </a>
                                <a class="nav-link p-2" id="v-pills-profile-tab2" data-bs-toggle="pill" href="#v-pills-profile2" role="tab" aria-controls="v-pills-profile2" aria-selected="false">
                                    <i class="ti ti-device-ipad-pin fs-18 me-1"></i>
                                    <span class="d-none d-md-inline-block">Provincias</span>
                                </a>
                                <a class="nav-link p-2" id="v-pills-settings-tab2" data-bs-toggle="pill" href="#v-pills-settings2" role="tab" aria-controls="v-pills-settings2" aria-selected="false">
                                    <i class="ti ti-droplet-pin fs-18 me-1"></i>
                                    <span class="d-none d-md-inline-block">Municipios</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div id="modalDepart" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabeldeparta" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabeldeparta">Departamentos</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-1">
                        <label for="txtNombreDe" class="form-label">Departamento</label>
                        <input type="text" id="txtNombreDe" name="Nombre Departamento" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                    <button type="button" id="btnGuardarRegDepa" class="btn btn-sm btn-success"><i class="ti ti-device-floppy fs-16 align-middle me-1"></i>Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <div id="modalProvin" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabelprovi" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabelprovi">Provincias</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-1">
                        <label for="cboDepartaModal" class="form-label mb-1 text-muted fw-semibold">Selecione Departamento</label>
                        <select class="form-select form-select-sm" id="cboDepartaModal">
                        </select>
                    </div>
                    <div class="mb-1">
                        <label for="txtNombreProvi" class="form-label">Provincia</label>
                        <input type="text" id="txtNombreProvi" name="Nombre Provincia" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                    <button type="button" id="btnGuardarRegProv" class="btn btn-sm btn-success"><i class="ti ti-device-floppy fs-16 align-middle me-1"></i>Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <div id="modalMunici" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabelmunicip" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabelmunicip">Municipio</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-1">
                        <label for="cboDepartaModalmuni" class="form-label mb-1 text-muted fw-semibold">Selecione Departamento</label>
                        <select class="form-select form-select-sm" id="cboDepartaModalmuni">
                        </select>
                    </div>
                    <div class="mb-1">
                        <label for="cboProviModalmuni" class="form-label mb-1 text-muted fw-semibold">Selecione Provincia</label>
                        <select class="form-select form-select-sm" id="cboProviModalmuni">
                        </select>
                    </div>
                    <div class="mb-1">
                        <label for="txtNombreMunicipio" class="form-label">Municipio</label>
                        <input type="text" id="txtNombreMunicipio" name="Nombre Municipio" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                    <button type="button" id="btnGuardarRegMunic" class="btn btn-sm btn-success"><i class="ti ti-device-floppy fs-16 align-middle me-1"></i>Guardar</button>
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

    <script src="jsAdm/UbicacionesPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
