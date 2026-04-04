<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="ConsultasPage.aspx.cs" Inherits="CapaPresentacion.ConsultasPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .gmapz {
            height: 264px;
            width: 100%;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="mb-2">Consulta de Propiedad</h5>
                    <p class="mb-2">
                        Puede realizar una bisqueda de la propiedad e interactuar para verificar posibles mejoras o recomendaciones
                    </p>
                    <div class="mb-3">
                        <label class="form-label">Buscar Propiedad:</label>
                        <select class="form-control select2" data-toggle="select2">
                            <option>Select</option>
                            <optgroup label="Alaskan/Hawaiian Time Zone">
                                <option value="AK">Alaska</option>
                                <option value="HI">Hawaii</option>
                            </optgroup>
                            <optgroup label="Pacific Time Zone">
                                <option value="CA">California</option>
                                <option value="WA">Washington</option>
                            </optgroup>
                            <optgroup label="Mountain Time Zone">
                                <option value="AZ">Arizona</option>
                                <option value="CO">Colorado</option>
                                <option value="ID">Idaho</option>
                                <option value="WY">Wyoming</option>
                            </optgroup>
                            <optgroup label="Central Time Zone">
                                <option value="AL">Alabama</option>
                                <option value="AR">Arkansas</option>
                                <option value="IL">Illinois</option>
                                <option value="IA">Iowa</option>
                                <option value="WI">Wisconsin</option>
                            </optgroup>
                            <optgroup label="Eastern Time Zone">
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="WV">West Virginia</option>
                            </optgroup>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="txtConsulta">Consulta</label>
                        <textarea class="form-control" id="txtConsulta" placeholder="Ingrese su consulta" rows="5"></textarea>
                    </div>

                    <div class="mb-2">
                        <div class="d-flex justify-content-center">
                            <button type="button" id="btnConsultar" class="btn btn-sm btn-info me-2"><i class="ti ti-home-search me-1 fs-20"></i>Consultar</button>
                            <button type="button" id="btnNuevaCons" class="btn btn-sm btn-success"><i class="ti ti-home-plus me-1 fs-20"></i>Nuevo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-body">
                    <h4 class="text-dark fw-medium text-center">Detalle General de la Propiedad</h4>

                    <h5 class="mb-2">Descripcion</h5>
                    <%--<p class="fs-15 fw-medium mb-0 text-muted mb-1">Descripcion</p>--%>

                    <p class="mb-2">
                        Bring Axis home and watch life revolve around it. This 2-seat sofa offers exceptional
                    durability for family rooms and casual living rooms, featuring track arms that create a clean look. Low
                    back cushions and deep seats encourage lounging with family and friends.
                    </p>

                    <div class="border border-dashed p-2 rounded text-center">
                        <div class="row">
                            <div class="col-lg-3 col-4 border-end">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Ancho : </span>54 mts</p>
                            </div>
                            <div class="col-lg-3 col-4 border-end">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Largo : </span>67 mts</p>
                            </div>
                            <div class="col-lg-3 col-4 border-end">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Area M2 : </span>365 mts</p>
                            </div>
                            <div class="col-lg-3 col-4 border-end">
                                <p class="text-muted fw-medium fs-14 mb-0">
                                    <span class="text-dark">Nro Folio : </span>4654sd12
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-5">
                            <h4 class="card-title mt-3">Informacion adicional</h4>
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <tbody>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Servicios basicos : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0">Si</td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Riesgo de Inundacion : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0">No</td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Riesgo deslizamiento : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0">No</td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Topografia : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0">Irregular</td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Tipo Suelo : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0">Arcilloso</td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Tipo Propiedad : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0">Vivienda</td>
                                        </tr>
                                        <tr>
                                            <td class="px-0">
                                                <p class="d-flex mb-0 align-items-center gap-1">Estado : </p>
                                            </td>
                                            <td class="text-end text-dark fw-medium px-0">Observacion</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <h4 class="card-title text-center mt-3">Ubicacion</h4>
                            <div class="card">
                                <div class="card-body">
                                    <div class="mapouter">
                                        <div class="gmap_canvas">
                                            <iframe
                                                class="gmap_iframe gmapz rounded"
                                                frameborder="0"
                                                scrolling="no"
                                                marginheight="0"
                                                marginwidth="0"
                                                src="https://maps.google.com/maps?q=-11.004188,-66.055628&t=&z=15&ie=UTF8&iwloc=&output=embed"></iframe>
                                        </div>
                                    </div>
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
</asp:Content>
