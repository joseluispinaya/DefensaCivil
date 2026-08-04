<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="PropiedadesPage.aspx.cs" Inherits="CapaPresentacion.PropiedadesPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header border-bottom border-dashed d-flex align-items-center">
                    <h4 class="header-title">Registro de Propiedades</h4>
                </div>

                <div class="card-body">
                    <form>
                        <div id="progressbarwizard">

                            <ul class="nav nav-pills nav-justified form-wizard-header mb-3">
                                <li class="nav-item">
                                    <a href="#account-2" data-bs-toggle="tab" data-toggle="tab"
                                        class="nav-link rounded-0 py-2">
                                        <i class="bi bi-person-circle fs-18 align-middle me-1"></i>
                                        <span class="d-none d-sm-inline">Formulario 1</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#profile-tab-2" data-bs-toggle="tab" data-toggle="tab"
                                        class="nav-link rounded-0 py-2">
                                        <i class="bi bi-emoji-smile fs-18 align-middle me-1"></i>
                                        <span class="d-none d-sm-inline">Formulario 2</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#finish-2" data-bs-toggle="tab" data-toggle="tab"
                                        class="nav-link rounded-0 py-2">
                                        <i class="bi bi-check2-circle fs-18 align-middle me-1"></i>
                                        <span class="d-none d-sm-inline">Formulario 3</span>
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content b-0 mb-0">

                                <div id="bar" class="progress mb-3" style="height: 7px;">
                                    <div class="bar progress-bar progress-bar-striped progress-bar-animated bg-success">
                                    </div>
                                </div>

                                <div class="tab-pane" id="account-2">
                                    <div class="row">
                                        <div class="mb-3 col-md-3">
                                            <label for="txtCodCatas" class="form-label">Cod. Catastral</label>
                                            <input type="text" id="txtCodCatas" name="Cod. Catastral" class="form-control form-control-sm model">
                                        </div>
                                        <div class="mb-3 col-md-3">
                                            <label for="txtNroFolio" class="form-label">Nro. Folio</label>
                                            <input type="text" id="txtNroFolio" name="Nro. Folio" class="form-control form-control-sm model">
                                        </div>
                                        <div class="mb-3 col-md-2">
                                            <label for="cboTipoPro" class="form-label">Tipo Propiedad</label>
                                            <select class="form-select form-select-sm" id="cboTipoPro">
                                            </select>
                                        </div>
                                        <div class="mb-3 col-md-2">
                                            <label for="cboEstadoPro" class="form-label">Estado Propiedad</label>
                                            <select class="form-select form-select-sm" id="cboEstadoPro">
                                            </select>
                                        </div>
                                        <div class="mb-3 col-md-2">
                                            <label for="cboZona" class="form-label">Tipo de Zona</label>
                                            <select class="form-select form-select-sm" id="cboZona">
                                                <option value="">Seleccione Zona</option>
                                                <option value="Urbana">Urbana</option>
                                                <option value="Rural">Rural</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="txtDireccionPro" class="form-label">Direccion</label>
                                            <input type="text" id="txtDireccionPro" name="Direccion" class="form-control form-control-sm model">
                                        </div>
                                        <div class="mb-3 col-md-3">
                                            <label for="txtTopografia" class="form-label">Topografia</label>
                                            <input type="text" id="txtTopografia" name="Topografia" class="form-control form-control-sm model">
                                        </div>
                                        <div class="mb-3 col-md-3">
                                            <label for="txtTipoSuelo" class="form-label">Tipo de Suelo</label>
                                            <input type="text" id="txtTipoSuelo" name="Tipo de Suelo" class="form-control form-control-sm model">
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane" id="profile-tab-2">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class="mb-3">
                                                <label class="form-label" for="txtDescripGen">Descripcion General</label>
                                                <textarea class="form-control model" id="txtDescripGen" name="Descripcion General" placeholder="Ingrese una descripcion general de la propiedad" rows="5"></textarea>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h5 class="mb-2">Servicios Basicos?</h5>
                                                    <ul class="list-group mb-3">
                                                        <li class="list-group-item">
                                                            <input class="form-check-input me-1" type="radio" name="serviciosGroupRadio" value="" id="radioSi" checked>
                                                            <label class="form-check-label" for="radioSi">Si</label>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <input class="form-check-input me-1" type="radio" name="serviciosGroupRadio" value="" id="radioNo">
                                                            <label class="form-check-label" for="radioNo">No</label>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-md-6">
                                                    <h5 class="mb-2">Riesgo Inundacion?</h5>
                                                    <ul class="list-group mb-3">
                                                        <li class="list-group-item">
                                                            <input class="form-check-input me-1" type="radio" name="riesgoGroupRadio" value="" id="radioInuSi" checked>
                                                            <label class="form-check-label" for="radioInuSi">Si</label>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <input class="form-check-input me-1" type="radio" name="riesgoGroupRadio" value="" id="radioInuNo">
                                                            <label class="form-check-label" for="radioInuNo">No</label>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h5 class="mb-2">Riesgo deslizamineto?</h5>
                                                    <ul class="list-group mb-3">
                                                        <li class="list-group-item">
                                                            <input class="form-check-input me-1" type="radio" name="deslizamientoGroupRadio" value=""
                                                                id="radiodeslizaSi" checked>
                                                            <label class="form-check-label" for="radiodeslizaSi">Si</label>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <input class="form-check-input me-1" type="radio" name="deslizamientoGroupRadio" value=""
                                                                id="radiodeslizaNo">
                                                            <label class="form-check-label" for="radiodeslizaNo">No</label>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-md-6">
                                                    <h5 class="mb-2">Dimencion de la Propiedad</h5>
                                                    <div class="input-group input-group-sm mb-3 flex-nowrap">
                                                        <span class="input-group-text" id="grouplargo">Largo Mts</span>
                                                        <input type="number" class="form-control" id="txtLargo" aria-label="Largo" aria-describedby="grouplargo">
                                                    </div>
                                                    <div class="input-group input-group-sm flex-nowrap">
                                                        <span class="input-group-text" id="groupancho">Ancho Mts</span>
                                                        <input type="number" class="form-control" id="txtAncho" aria-label="Ancho" aria-describedby="groupancho">
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-md-7">
                                            <div class="card card-body" id="loadinzero">
                                                <h5 class="mb-2">Seleccione Ubicacion</h5>
                                                <div id="mapa" class="gmaps mb-3"></div>

                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="input-group input-group-sm flex-nowrap">
                                                            <span class="input-group-text" id="grouplati">Latitud</span>
                                                            <input type="text" class="form-control" id="txtLatitud" aria-label="Latitud"
                                                                aria-describedby="grouplati" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="input-group input-group-sm flex-nowrap">
                                                            <span class="input-group-text" id="grouplongi">Longitud</span>
                                                            <input type="text" class="form-control" id="txtLongitud" aria-label="Longitud"
                                                                aria-describedby="grouplongi" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <button type="button" id="btnConsultarDes" class="btn btn-sm btn-success">
                                                            <i class="ti ti-home-search fs-16 align-middle me-1"></i>Generar Des.
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane" id="finish-2">
                                    <div class="row">
                                        <div class="col-sm-5">
                                            <div class="card card-body">
                                                <p class="text-muted">Seleccione un documento en PDF de la propiedad a registrar no mayor a 10 MB</p>

                                                <div class="mb-3">
                                                    <label for="txtPdf" class="form-label">Seleccione Documento</label>
                                                    <input type="file" id="txtPdf" class="form-control form-control-sm" accept=".pdf">
                                                </div>

                                                <div class="mb-2">
                                                    <div class="d-flex justify-content-center gap-2">
                                                        <button type="button" id="btnGuardar" class="btn btn-success gap-1"><i class="ti ti-device-floppy fs-16"></i>Registrar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-7">
                                            <div class="card card-body">
                                                <div class="text-center">
                                                    <iframe id="verPdf" src="DocumetPdf/sinPdf.pdf" style="width: 90%; height: 400px; border: none;"></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex wizard justify-content-between flex-wrap gap-2 mt-3">
                                    <div class="first">
                                        <a href="javascript:void(0);" class="btn btn-primary">Primer
                                        </a>
                                    </div>
                                    <div class="d-flex flex-wrap gap-2">
                                        <div class="previous">
                                            <a href="javascript:void(0);" class="btn btn-primary">
                                                <i class="bx bx-left-arrow-alt me-2"></i>Volver al anterior
                                            </a>
                                        </div>
                                        <div class="next">
                                            <a href="javascript:void(0);" class="btn btn-primary mt-3 mt-md-0">Siguiente<i class="bx bx-right-arrow-alt ms-2"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="last">
                                        <a href="javascript:void(0);" class="btn btn-primary mt-3 mt-md-0">Final
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <!-- tab-content -->
                        </div>
                        <!-- end #progressbarwizard-->
                    </form>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <!-- Bootstrap Wizard Form js -->
    <script src="assets/vendor/vanilla-wizard/js/wizard.min.js"></script>
    <script src="js/PropiedadesPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF1HcfGOeusxinFBpjXsMccjQxCtxRrV4&loading=async&callback=initMap"></script>
</asp:Content>
