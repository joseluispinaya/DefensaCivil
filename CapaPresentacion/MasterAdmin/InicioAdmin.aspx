<%@ Page Title="" Language="C#" MasterPageFile="~/MasterAdmin/MasterAdminHo.Master" AutoEventWireup="true" CodeBehind="InicioAdmin.aspx.cs" Inherits="CapaPresentacion.MasterAdmin.InicioAdmin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        /* ==========================================================================
   ESTILOS PRESENTACIÓN ADMINISTRADOR
   ========================================================================== */
        .bg-gradient-institucional {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }

        .logo-institucional {
            max-height: 110px;
            object-fit: contain;
            filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.4));
        }

        /* Forzamos el diseño de los círculos de íconos para que no se rompan */
        .avatar-presentacion {
            width: 4.5rem;
            height: 4.5rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .card-presentacion {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-bottom: 4px solid transparent;
        }

            .card-presentacion:hover {
                transform: translateY(-5px);
                box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
            }

        .card-hover-info:hover {
            border-bottom-color: var(--bs-info);
        }

        .card-hover-primary:hover {
            border-bottom-color: var(--bs-primary);
        }

        .card-hover-success:hover {
            border-bottom-color: var(--bs-success);
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row mb-4 mt-2">
    <div class="col-12">
        <div class="card bg-gradient-institucional border-0 shadow mb-0">
            <div class="card-body p-4">
                <div class="row align-items-center">
                    <div class="col-sm-auto text-center text-sm-start mb-3 mb-sm-0 pe-sm-4 border-sm-end border-secondary border-opacity-25">
                        <img src="https://www.mindef.gob.bo/wp-content/uploads/2025/12/logo-MinDef-25-Oficial-Vert-01.png" alt="Ministerio de Defensa" class="logo-institucional">
                    </div>
                    <div class="col-sm text-center text-sm-start ps-sm-4">
                        <span class="badge bg-danger text-white rounded-pill px-3 py-1 mb-2 fw-semibold tracking-wide shadow-sm">
                            <i class="ti ti-shield-check me-1 fs-14 align-middle"></i> SEGURIDAD NIVEL 1
                        </span>
                        <h2 class="fw-bolder text-white mb-2">Panel de Control Central</h2>
                        <p class="text-white-50 mb-0 fs-15" style="max-width: 700px;">
                            Bienvenido al sistema de administración unificado. Desde aquí podrá supervisar las operaciones de todas las regionales, auditar accesos y gestionar los permisos del personal.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    
    <div class="col-md-4 mb-4">
        <div class="card shadow-sm border-0 h-100 card-presentacion card-hover-info bg-light-subtle">
            <div class="card-body text-center p-4">
                <div class="avatar-presentacion bg-info text-white rounded-circle shadow-sm mb-3 fs-3">
                    <i class="ti ti-map-pin"></i>
                </div>
                <h4 class="fw-bold text-dark mt-0">Regionales</h4>
                <p class="text-muted fs-14 mb-4">
                    Control absoluto de todas las sedes operativas a nivel nacional. Supervise el estado y la configuración de cada recinto.
                </p>
                <h3 class="text-info fw-bolder mb-0">12 <span class="fs-14 fw-normal text-muted">Sedes Activas</span></h3>
            </div>
        </div>
    </div>

    <div class="col-md-4 mb-4">
        <div class="card shadow-sm border-0 h-100 card-presentacion card-hover-primary bg-light-subtle">
            <div class="card-body text-center p-4">
                <div class="avatar-presentacion bg-primary text-white rounded-circle shadow-sm mb-3 fs-3">
                    <i class="ti ti-users"></i>
                </div>
                <h4 class="fw-bold text-dark mt-0">Personal</h4>
                <p class="text-muted fs-14 mb-4">
                    Administración de cuentas de usuario, asignación de credenciales y configuración estricta de roles operativos.
                </p>
                <h3 class="text-primary fw-bolder mb-0">145 <span class="fs-14 fw-normal text-muted">Registrados</span></h3>
            </div>
        </div>
    </div>

    <div class="col-md-4 mb-4">
        <div class="card shadow-sm border-0 h-100 card-presentacion card-hover-success bg-light-subtle">
            <div class="card-body text-center p-4">
                <div class="avatar-presentacion bg-success text-white rounded-circle shadow-sm mb-3 fs-3">
                    <i class="ti ti-activity"></i>
                </div>
                <h4 class="fw-bold text-dark mt-0">Auditoría</h4>
                <p class="text-muted fs-14 mb-4">
                    Monitoreo en tiempo real. Revise la bitácora de accesos, direcciones IP y conexiones activas en el sistema.
                </p>
                <h3 class="text-success fw-bolder mb-0">34 <span class="fs-14 fw-normal text-muted">Sesiones Hoy</span></h3>
            </div>
        </div>
    </div>

</div>

<div class="row">
    <div class="col-lg-6 mb-4">
        <div class="card shadow-sm border-0 h-100">
            <div class="card-body p-4">
                <div class="d-flex align-items-start">
                    <div class="flex-shrink-0 text-primary fs-2 bg-primary-subtle p-2 rounded">
                        <i class="ti ti-lock-square-rounded"></i>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h5 class="fw-bold mt-0 mb-1 text-dark">Protocolo de Seguridad</h5>
                        <p class="text-muted fs-14 mb-0">
                            Todas las acciones realizadas desde este panel de control quedan registradas permanentemente bajo el identificador de su usuario administrativo.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-6 mb-4">
        <div class="card shadow-sm border-0 h-100">
            <div class="card-body p-4">
                <div class="d-flex align-items-start">
                    <div class="flex-shrink-0 text-warning fs-2 bg-warning-subtle p-2 rounded">
                        <i class="ti ti-headset"></i>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h5 class="fw-bold mt-0 mb-1 text-dark">Asistencia Técnica</h5>
                        <p class="text-muted fs-14 mb-0">
                            Para configuraciones avanzadas de red o reportes de intrusión, comuníquese inmediatamente con el departamento de infraestructura y TI.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
