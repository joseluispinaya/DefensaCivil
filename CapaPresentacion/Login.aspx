<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.Login" %>

<!DOCTYPE html>

<html lang="es">

<head>
    <meta charset="utf-8" />
    <title>Iniciar Sesión | SIPRO - Defensa Civil</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Sistema de Control de Propiedades del Viceministerio de Defensa Civil" name="description" />

    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <!-- Theme Config Js -->
    <script src="assets/js/config.js"></script>

    <link href="assets/css/vendor.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/app.min.css" rel="stylesheet" type="text/css" id="app-style" />
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    
    <link href="assets/vendor/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />

    <style>
        /* Ajustes extra para asegurar el modo oscuro amigable a la vista */
        body { background-color: #121418; }
        .bg-custom-dark { background-color: #1a1d24; }
        .bg-custom-darker { background-color: #15171c; }
        .input-dark { background-color: #222630 !important; color: #fff !important; border-color: #2d323f !important; }
        .input-dark:focus { border-color: #00e5ff !important; box-shadow: none; }
        .captcha-box { letter-spacing: 5px; font-family: 'Courier New', Courier, monospace; background: #000; padding: 5px 15px; border-radius: 5px; user-select: none; }
    </style>
</head>

<body>
    <div class="d-flex min-vh-100 justify-content-center align-items-center p-3">
        
        <div class="card bg-custom-dark text-light border-0 shadow-lg overflow-hidden w-100" style="max-width: 900px;">
            <div class="row g-0">
                
                <div class="col-md-5 bg-custom-darker d-none d-md-flex flex-column justify-content-center align-items-center p-5 border-end border-secondary border-opacity-25">
                    <img src="https://www.mindef.gob.bo/wp-content/uploads/2025/12/logo-MinDef-25-Oficial-Vert-01.png" alt="Logo Defensa Civil" style="max-width: 280px; filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5));">
                    <h4 class="fw-bold mt-4 mb-1 text-center text-uppercase">Defensa Civil</h4>
                    <p class="text-muted fs-14 text-center">Sistema de Control de Propiedades a Nivel Nacional</p>
                </div>

                <div class="col-md-7 p-4 p-md-5">
                    
                    <div class="d-md-none text-center mb-4">
                        <img src="https://www.mindef.gob.bo/wp-content/uploads/2025/12/logo-MinDef-25-Oficial-Vert-01.png" alt="Logo" style="max-width: 100px;">
                    </div>

                    <h4 class="fw-semibold mb-2">Bienvenido de nuevo</h4>
                    <p class="text-muted mb-4">Ingrese sus credenciales para acceder al sistema.</p>

                    <form id="frmLogin" class="text-start mb-3" autocomplete="off">
                        
                        <div class="mb-3">
                            <label class="form-label text-light" for="inputCorreo">Correo Electrónico o CI</label>
                            <div class="input-group">
                                <span class="input-group-text bg-custom-darker border-secondary border-opacity-25 text-muted"><i class="ti ti-user fs-18"></i></span>
                                <input type="text" id="inputCorreo" class="form-control input-dark" placeholder="Ej: 12345678" required autocomplete="nope" value="luispacod@yopmail.com">
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="d-flex justify-content-between">
                                <label class="form-label text-light" for="inputPassword">Contraseña</label>
                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#modalRecuperar" class="text-info fs-13 text-decoration-none">¿Olvidó su clave?</a>
                            </div>
                            <div class="input-group">
                                <span class="input-group-text bg-custom-darker border-secondary border-opacity-25 text-muted"><i class="ti ti-lock fs-18"></i></span>
                                <input type="password" id="inputPassword" class="form-control input-dark" placeholder="••••••••" required autocomplete="new-password" value="76453231">
                            </div>
                        </div>

                        <div class="mb-4 bg-custom-darker p-3 rounded border border-secondary border-opacity-25 text-center">
                            <label class="form-label text-light fw-bold mb-2"><i class="ti ti-shield-check text-success me-1"></i> Control de Seguridad</label>
                            
                            <div class="d-flex justify-content-center align-items-center gap-2 mb-2">
                                <span id="muestracapchap" class="fs-4 fw-bolder text-warning captcha-box"></span>
                                <button type="button" class="btn btn-sm btn-outline-secondary" id="btnReloadCaptcha" title="Cambiar código">
                                    <i class="ti ti-refresh text-light"></i>
                                </button>
                            </div>
                            
                            <input type="text" id="inputCaptcha" class="form-control input-dark text-center mx-auto" style="max-width: 150px;" placeholder="Ingrese el código" required autocomplete="off">
                        </div>

                        <div class="d-grid">
                            <button class="btn btn-primary text-uppercase fw-bold" type="submit">
                                <i class="ti ti-login me-1"></i> Ingresar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalRecuperar" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-custom-dark border-secondary">
                <div class="modal-header border-bottom border-secondary border-opacity-25">
                    <h5 class="modal-title fw-bold text-light"><i class="ti ti-key text-warning me-1"></i> Recuperar Acceso</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <p class="text-muted fs-14 mb-3">Ingrese el correo electrónico asociado a su cuenta. Le enviaremos las instrucciones.</p>
                    <form id="frmRecuperar">
                        <div class="mb-3">
                            <label class="form-label text-light" for="emailRecuperacion">Correo Electrónico</label>
                            <input type="email" class="form-control input-dark" id="emailRecuperacion" placeholder="ejemplo@defensa.gob.bo" required>
                        </div>
                        <div class="d-grid mt-4">
                            <button type="submit" class="btn btn-info fw-bold">Enviar Instrucciones</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/vendor.min.js"></script>
    <script src="assets/js/app.js"></script>
    
    <script src="assets/vendor/sweetalert2/sweetalert2.min.js"></script>
    <!-- <script src="assets/plugin/loadingoverlay/loadingoverlay.js"></script> -->
    <script src="assets/vendor/loadingoverlay/loadingoverlay.min.js"></script>
    
    <script src="js/Login.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</body>
</html>
