<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row text-center">
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-muted fs-13 text-uppercase" title="Number of Orders">Total Orders</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 my-2 py-1">
                        <div class="user-img fs-42 flex-shrink-0">
                            <span class="avatar-title text-bg-primary rounded-circle fs-22">
                                <iconify-icon icon="solar:case-round-minimalistic-bold-duotone"></iconify-icon>
                            </span>
                        </div>
                        <h3 class="mb-0 fw-bold">687.3k</h3>
                    </div>
                    <p class="mb-0 text-muted">
                        <span class="text-danger me-2"><i class="ti ti-caret-down-filled"></i>9.19%</span>
                        <span class="text-nowrap">Since last month</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- end col -->

        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-muted fs-13 text-uppercase" title="Number of Orders">Total Returns</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 my-2 py-1">
                        <div class="user-img fs-42 flex-shrink-0">
                            <span class="avatar-title text-bg-primary rounded-circle fs-22">
                                <iconify-icon icon="solar:bill-list-bold-duotone"></iconify-icon>
                            </span>
                        </div>
                        <h3 class="mb-0 fw-bold">9.62k</h3>
                    </div>
                    <p class="mb-0 text-muted">
                        <span class="text-success me-2"><i class="ti ti-caret-up-filled"></i>26.87%</span>
                        <span class="text-nowrap">Since last month</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- end col -->

        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-muted fs-13 text-uppercase" title="Number of Orders">Avg. Sales Earnings</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 my-2 py-1">
                        <div class="user-img fs-42 flex-shrink-0">
                            <span class="avatar-title text-bg-primary rounded-circle fs-22">
                                <iconify-icon icon="solar:wallet-money-bold-duotone"></iconify-icon>
                            </span>
                        </div>
                        <h3 class="mb-0 fw-bold">$98.24 <small class="text-muted">USD</small></h3>
                    </div>
                    <p class="mb-0 text-muted">
                        <span class="text-success me-2"><i class="ti ti-caret-up-filled"></i>3.51%</span>
                        <span class="text-nowrap">Since last month</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- end col -->

        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-muted fs-13 text-uppercase" title="Number of Orders">Number of Visits</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 my-2 py-1">
                        <div class="user-img fs-42 flex-shrink-0">
                            <span class="avatar-title text-bg-primary rounded-circle fs-22">
                                <iconify-icon icon="solar:eye-bold-duotone"></iconify-icon>
                            </span>
                        </div>
                        <h3 class="mb-0 fw-bold">87.94M</h3>
                    </div>
                    <p class="mb-0 text-muted">
                        <span class="text-danger me-2"><i class="ti ti-caret-down-filled"></i>1.05%</span>
                        <span class="text-nowrap">Since last month</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Categorias Registradas</h4>
                    <button type="button" id="btnNuevore" class="btn btn-info btn-sm">Agregar <i class="ti ti-plus ms-1"></i></button>
                    <!-- <a href="javascript:void(0);" class="btn btn-sm btn-secondary">Add Brand <i class="ti ti-plus ms-1"></i></a> -->
                </div>

                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-sm" id="tbCategorias" cellspacing="0" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombres</th>
                                    <th>Descripciones</th>
                                    <th>Descripcioness</th>
                                    <th>Estado</th>
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
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
