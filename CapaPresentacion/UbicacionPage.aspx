<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="UbicacionPage.aspx.cs" Inherits="CapaPresentacion.UbicacionPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Departamentos Registrados</h4>
                    <button type="button" id="btnNuevoDep" class="btn btn-info btn-sm">Registrar <i class="ti ti-plus ms-1"></i></button>
                    <!-- <a href="javascript:void(0);" class="btn btn-sm btn-secondary">Add Brand <i class="ti ti-plus ms-1"></i></a> -->
                </div>

                <div class="card-body">
                    <table class="table table-striped table-sm" id="tbDeparta" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Departamentos</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Provincias Registradas</h4>
                    <button type="button" id="btnNuevaProv" class="btn btn-info btn-sm">Registrar <i class="ti ti-plus ms-1"></i></button>
                    <!-- <a href="javascript:void(0);" class="btn btn-sm btn-secondary">Add Brand <i class="ti ti-plus ms-1"></i></a> -->
                </div>

                <div class="card-body">
                    <table class="table table-striped table-sm" id="tbProvin" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Provincias</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Municipios Registrados</h4>
                    <button type="button" id="btnNuevoMunic" class="btn btn-info btn-sm">Registrar <i class="ti ti-plus ms-1"></i></button>
                    <!-- <a href="javascript:void(0);" class="btn btn-sm btn-secondary">Add Brand <i class="ti ti-plus ms-1"></i></a> -->
                </div>

                <div class="card-body">
                    <table class="table table-striped table-sm" id="tbMunici" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Municipios</th>
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
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
