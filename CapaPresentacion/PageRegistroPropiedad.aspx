<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="PageRegistroPropiedad.aspx.cs" Inherits="CapaPresentacion.PageRegistroPropiedad" %>
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
                    <div id="progressbarwizard">

                        <!-- Cabecera del Wizard (Reducida a 2 pasos) -->
                        <ul class="nav nav-pills nav-justified form-wizard-header mb-3">
                            <li class="nav-item">
                                <a href="#paso-1" data-bs-toggle="tab" data-toggle="tab" class="nav-link rounded-0 py-2">
                                    <i class="bi bi-map fs-18 align-middle me-1"></i>
                                    <span class="d-none d-sm-inline">1. Datos y Ubicación</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#paso-2" data-bs-toggle="tab" data-toggle="tab" class="nav-link rounded-0 py-2">
                                    <i class="bi bi-file-earmark-pdf fs-18 align-middle me-1"></i>
                                    <span class="d-none d-sm-inline">2. Características y Documento</span>
                                </a>
                            </li>
                        </ul>

                        <div class="tab-content b-0 mb-0">

                            <!-- Barra de progreso -->
                            <div id="bar" class="progress mb-4" style="height: 7px;">
                                <div class="bar progress-bar progress-bar-striped progress-bar-animated bg-success"></div>
                            </div>

                            <!-- ========================================== -->
                            <!-- PASO 1: DATOS GENERALES, MAPA Y DESCRIPCIÓN -->
                            <!-- ========================================== -->
                            <div class="tab-pane" id="paso-1">

                                <!-- Fila 1: Datos Básicos -->
                                <div class="row">
                                    <div class="mb-2 col-md-3">
                                        <label for="txtCodCatas" class="form-label">Cod. Catastral</label>
                                        <input type="text" id="txtCodCatas" name="Cod. Catastral" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2 col-md-3">
                                        <label for="txtNroFolio" class="form-label">Nro. Folio</label>
                                        <input type="text" id="txtNroFolio" name="Nro. Folio" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2 col-md-3">
                                        <label for="cboTipoPro" class="form-label">Tipo Propiedad</label>
                                        <select class="form-select form-select-sm" id="cboTipoPro"></select>
                                    </div>
                                    <div class="mb-2 col-md-3">
                                        <label for="cboEstadoPro" class="form-label">Estado Propiedad</label>
                                        <select class="form-select form-select-sm" id="cboEstadoPro"></select>
                                    </div>
                                </div>

                                <!-- Fila 2: Dirección y Terreno -->
                                <div class="row">
                                    <div class="mb-2 col-md-4">
                                        <label for="txtDireccionPro" class="form-label">Dirección</label>
                                        <input type="text" id="txtDireccionPro" name="Dirección" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2 col-md-2">
                                        <label for="cboZona" class="form-label">Tipo de Zona</label>
                                        <select class="form-select form-select-sm" id="cboZona">
                                            <option value="">Seleccione...</option>
                                            <option value="Urbana">Urbana</option>
                                            <option value="Rural">Rural</option>
                                        </select>
                                    </div>
                                    <div class="mb-2 col-md-3">
                                        <label for="txtTopografia" class="form-label">Topografía</label>
                                        <input type="text" id="txtTopografia" name="Topografía" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2 col-md-3">
                                        <label for="txtTipoSuelo" class="form-label">Tipo de Suelo</label>
                                        <input type="text" id="txtTipoSuelo" name="Tipo de Suelo" class="form-control form-control-sm model">
                                    </div>
                                </div>

                                <hr class="border-dashed my-2">

                                <!-- Fila 3: Mapa interactivo y Generador de IA lado a lado -->
                                <div class="row mt-3">
                                    <!-- Columna Izquierda: Mapa -->
                                    <div class="col-md-6">
                                        <h5 class="mb-2 fs-14"><i class="ti ti-map-pin me-1 text-danger"></i>Ubicación Geográfica</h5>
                                        <div id="mapa" class="gmaps mb-2" style="height: 320px; border-radius: 8px;"></div>
                                        <div class="row g-2">
                                            <div class="col-6">
                                                <div class="input-group input-group-sm">
                                                    <span class="input-group-text bg-light">Latitud</span>
                                                    <input type="text" class="form-control" id="txtLatitud" readonly>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="input-group input-group-sm">
                                                    <span class="input-group-text bg-light">Longitud</span>
                                                    <input type="text" class="form-control" id="txtLongitud" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Columna Derecha: Descripción e IA (Aquí aplicamos el ID loadinzero para el overlay) -->
                                    <div class="col-md-6" id="loadinzero">
                                        <div class="d-flex justify-content-between align-items-end mb-2">
                                            <label for="txtDescripGen" class="form-label mb-0">Descripción General</label>

                                            <!-- Botón reubicado estratégicamente -->
                                            <button type="button" id="btnConsultarDes" class="btn btn-sm btn-success shadow-sm">
                                                <i class="ti ti-robot fs-16 align-middle me-1"></i>Generar con IA
                                            </button>
                                        </div>
                                        <textarea class="form-control model" id="txtDescripGen" name="Descripción General" placeholder="Puede escribir manualmente o generar la descripción usando el botón superior tras marcar la ubicación en el mapa." style="height: 320px; resize: none;"></textarea>
                                    </div>
                                </div>
                            </div>

                            <!-- ========================================== -->
                            <!-- PASO 2: CARACTERÍSTICAS Y DOCUMENTACIÓN -->
                            <!-- ========================================== -->
                            <div class="tab-pane" id="paso-2">
                                <div class="row">

                                    <!-- Columna Izquierda: Checklists y Dimensiones -->
                                    <div class="col-md-5 border-end border-dashed">
                                        <h5 class="mb-3 fs-15 text-primary">Evaluación de Riesgos y Servicios</h5>

                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label mb-1">¿Servicios Básicos?</label>
                                                <div class="form-check mb-1">
                                                    <input class="form-check-input" type="radio" name="serviciosGroupRadio" id="radioSi" checked>
                                                    <label class="form-check-label" for="radioSi">Sí cuenta</label>
                                                </div>
                                                <div class="form-check mb-3">
                                                    <input class="form-check-input" type="radio" name="serviciosGroupRadio" id="radioNo">
                                                    <label class="form-check-label" for="radioNo">No cuenta</label>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label mb-1">¿Riesgo Inundación?</label>
                                                <div class="form-check mb-1">
                                                    <input class="form-check-input" type="radio" name="riesgoGroupRadio" id="radioInuSi" checked>
                                                    <label class="form-check-label" for="radioInuSi">Sí existe</label>
                                                </div>
                                                <div class="form-check mb-3">
                                                    <input class="form-check-input" type="radio" name="riesgoGroupRadio" id="radioInuNo">
                                                    <label class="form-check-label" for="radioInuNo">No existe</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-12">
                                                <label class="form-label mb-1">¿Riesgo de Deslizamiento?</label>
                                                <div class="d-flex gap-3">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="deslizamientoGroupRadio" id="radiodeslizaSi" checked>
                                                        <label class="form-check-label" for="radiodeslizaSi">Sí existe</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="deslizamientoGroupRadio" id="radiodeslizaNo">
                                                        <label class="form-check-label" for="radiodeslizaNo">No existe</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr class="border-dashed my-3">

                                        <h5 class="mb-3 fs-15 text-primary">Dimensiones del Terreno</h5>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="input-group input-group-sm mb-3">
                                                    <span class="input-group-text bg-light" id="grouplargo" style="width: 90px;">Largo (m)</span>
                                                    <input type="number" class="form-control" id="txtLargo" aria-label="Largo">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="input-group input-group-sm mb-3">
                                                    <span class="input-group-text bg-light" id="groupancho" style="width: 90px;">Ancho (m)</span>
                                                    <input type="number" class="form-control" id="txtAncho" aria-label="Ancho">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <label for="txtPdf" class="form-label">Seleccione documento PDF (Max. 8 MB)</label>
                                            <input type="file" id="txtPdf" class="form-control form-control-sm" accept=".pdf">
                                        </div>

                                        <%--<div class="input-group input-group-sm mb-3">
                                            <span class="input-group-text bg-light" id="grouplargo" style="width: 90px;">Largo (m)</span>
                                            <input type="number" class="form-control" id="txtLargo" aria-label="Largo">
                                        </div>
                                        <div class="input-group input-group-sm mb-4">
                                            <span class="input-group-text bg-light" id="groupancho" style="width: 90px;">Ancho (m)</span>
                                            <input type="number" class="form-control" id="txtAncho" aria-label="Ancho">
                                        </div>--%>
                                    </div>

                                    <!-- Columna Derecha: Carga de PDF -->
                                    <div class="col-md-7 ps-md-4">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <h5 class="mb-0 fs-15 text-primary">Documentación de Respaldo</h5>
                                            <button type="button" id="btnGuardar" class="btn btn-success shadow-sm">
                                                <i class="ti ti-device-floppy fs-16 me-1"></i>Guardar Propiedad
                                            </button>
                                        </div>

                                        

                                        <div class="card border bg-light shadow-none">
                                            <div class="card-body p-2 text-center">
                                                <iframe id="verPdf" src="DocumetPdf/sinPdf.pdf" style="width: 100%; height: 380px; border: none; border-radius: 4px;"></iframe>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <!-- Botones de Navegación del Wizard -->
                            <div class="d-flex wizard justify-content-between flex-wrap gap-2 mt-4 pt-3 border-top border-dashed">
                                <div class="first d-none">
                                    <!-- Oculto 'first' porque con 2 pasos no es necesario saltar al principio -->
                                    <a href="javascript:void(0);" class="btn btn-soft-secondary">Inicio</a>
                                </div>
                                <div class="previous">
                                    <a href="javascript:void(0);" class="btn btn-secondary">
                                        <i class="ti ti-arrow-left me-1"></i>Volver
                                    </a>
                                </div>
                                <div class="next ms-auto">
                                    <a href="javascript:void(0);" class="btn btn-primary">Siguiente Paso <i class="ti ti-arrow-right ms-1"></i>
                                    </a>
                                </div>
                                <div class="last d-none">
                                    <!-- Oculto 'last' porque el botón guardar está dentro del paso 2 -->
                                    <a href="javascript:void(0);" class="btn btn-primary">Finalizar</a>
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
    <script src="assets/vendor/vanilla-wizard/js/wizard.min.js"></script>
    <script src="js/PageRegistroPropiedad.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF1HcfGOeusxinFBpjXsMccjQxCtxRrV4&loading=async&callback=initMap"></script>
</asp:Content>
