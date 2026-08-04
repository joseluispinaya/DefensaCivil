<%@ Page Title="" Language="C#" MasterPageFile="~/MasterHome.Master" AutoEventWireup="true" CodeBehind="ChatModelIA.aspx.cs" Inherits="CapaPresentacion.ChatModelIA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-4">
            <div class="card">

                <div class="card-header d-flex align-items-center gap-3 border-bottom">
                    <div class="avatar-sm bg-primary-subtle rounded d-flex align-items-center justify-content-center">
                        <i class="ti ti-robot fs-22"></i>
                    </div>
                    <div>
                        <h4 class="card-title mb-0">Asistente Inteligente</h4>
                        <p class="text-muted fs-13 mb-0">Chat Inteligente</p>
                    </div>
                </div>

                <div class="card-body">

                    <h5 class="fs-15 fw-bold mb-2">
                        <i class="ti ti-target text-success fs-18 align-middle me-1"></i>¿Qué puede hacer?
                    </h5>
                    <ul class="list-unstyled text-muted fs-14 mb-3">
                        <li class="mb-2">
                            <i class="ti ti-check text-success me-2"></i>
                            <strong>Viabilidad:</strong> Cuarteles, hospitales, edificios.
                        </li>
                        <li class="mb-2">
                            <i class="ti ti-check text-success me-2"></i>
                            <strong>Evaluación:</strong> Topografía, suelo y dimensiones.
                        </li>
                        <li class="mb-2">
                            <i class="ti ti-check text-success me-2"></i>
                            <strong>Riesgos:</strong> Zonas de inundación y deslizamiento.
                        </li>
                    </ul>

                    <hr class="border-light mb-2">

                    <h5 class="fs-15 fw-bold mb-2">
                        <i class="ti ti-alert-circle text-warning fs-18 align-middle me-1"></i>Consideraciones
                    </h5>

                    <div class="alert alert-warning border-0 shadow-none mb-0" role="alert" style="font-size: 0.85rem;">
                        <div class="d-flex align-items-start">
                            <i class="ti ti-bulb fs-16 me-2 mt-1"></i>
                            <div>
                                <strong>Contexto cerrado:</strong> El modelo <u>solo</u> responderá consultas relacionadas
                            con el catálogo de terrenos y términos de construcción. Preguntas fuera de este ámbito serán
                            descartadas.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="chat d-flex">

                    <div class="chat-content card border-0 rounded-0 shadow-none mb-0">
                        <div class="card-header py-2 px-3 border-bottom">
                            <div class="d-flex align-items-center justify-content-between py-1">
                                <div class="d-flex align-items-center gap-2">

                                    <img src="Imagenes/botMd.jpg" class="avatar-lg rounded-circle" alt="">

                                    <div>
                                        <h5 class="my-0 lh-base">
                                            <a href="#" class="text-reset">Asistente IA</a>
                                        </h5>
                                        <p class="mb-0 text-muted">
                                            <small class="ti ti-circle-filled text-success"></small> En línea
                                        </p>
                                    </div>
                                </div>

                                <div class="d-flex align-items-center gap-2">

                                    <a href="javascript: void(0);" class="btn btn-sm btn-icon btn-ghost-light d-xl-flex">
                                        <i class="ti ti-info-circle fs-20"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="chat-scroll p-3" data-simplebar="">
                                <ul class="chat-list" data-apps-chat="messages-list">
                                    <li id="indicadorEscribiendo" class="chat-group d-none">
                                        <img src="Imagenes/botMd.jpg" class="avatar-sm rounded-circle" alt="avatar-ia" />
                                        <div class="chat-body">
                                            <div class="chat-message" style="background-color: transparent !important; box-shadow: none !important; padding-left: 0;">
                                                <p class="text-muted mb-0">
                                                    <small><i>Escribiendo...</i></small>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </div>

                            <div class="p-3 border-top position-sticky bottom-0 w-100 mb-0">
                                <div class="row align-items-center g-2">
                                    <div class="col">
                                        <input id="txtPregunta" type="text" name="message" class="form-control" placeholder="Escriba su mensaje aquí...">
                                    </div>
                                    <div class="col-sm-auto">
                                        <div class="d-flex align-items-center gap-2">
                                            <button id="btnEnviar" type="button" class="btn btn-icon btn-success">
                                                <i class='ti ti-send'></i>
                                            </button>
                                            <button id="btnMicrofono" type="button" class="btn btn-icon btn-soft-primary" title="Dictar mensaje por voz">
                                                <i class="ti ti-microphone"></i>
                                            </button>
                                            <%--<a href="#" class="btn btn-icon btn-soft-primary"><i class="ti ti-microphone"></i></a>--%>
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
    <script src="js/ChatModelIA.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
