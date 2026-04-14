using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class UsuariosPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EFuerzas>> ListaFuerzas()
        {
            return NUbicaciones.GetInstance().ListaFuerzas();
        }

        [WebMethod]
        public static Respuesta<List<EGrados>> ListaGrados(int IdFuerza)
        {
            return NUbicaciones.GetInstance().ListaGrados(IdFuerza);
        }

        [WebMethod]
        public static Respuesta<List<ERol>> ListaRoles()
        {
            return NUsuarios.GetInstance().ListaRoles();
        }

        [WebMethod]
        public static Respuesta<List<UsuarioDTO>> ListaUsuariosIdRegional(int IdRegional)
        {
            return NUsuarios.GetInstance().ListaUsuariosIdRegional(IdRegional);
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditUsuarios(UsuarioDTO objeto, string base64Image)
        {
            try
            {
                var utilidades = Utilidades.GetInstance();

                // 1. Manejo de la foto
                if (!string.IsNullOrEmpty(base64Image))
                {
                    byte[] imageBytes = Convert.FromBase64String(base64Image);
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imagenes/";
                        objeto.FotoUrl = utilidades.UploadPhoto(stream, folder);
                    }
                }
                else
                {
                    objeto.FotoUrl = "";
                }

                // 2. Manejo de la clave
                if (objeto.IdUsuario == 0)
                {
                    string clavePlana = objeto.NroCi;
                    objeto.Clave = utilidades.Hash(clavePlana);
                }
                else
                {
                    objeto.Clave = "";
                }

                return NUsuarios.GetInstance().GuardarOrEditUsuarios(objeto);
            }
            catch (Exception ex)
            {
                return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "Error en el servidor: " + ex.Message };
            }
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<List<UsuarioAccesoDTO>> ControlUsuariosIdRegional()
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<List<UsuarioAccesoDTO>> { Estado = false, Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                // 3. Obtener el ID del Docente de la sesión (Seguro)
                UsuarioLogDTO usuari = (UsuarioLogDTO)HttpContext.Current.Session["UsuarioLogueado"];

                return NUsuarios.GetInstance().ControlUsuariosIdRegional(usuari.IdRegional);
            }
            catch (Exception ex)
            {
                // Captura cualquier error no previsto en la capa de presentación
                return new Respuesta<List<UsuarioAccesoDTO>> { Estado = false, Mensaje = "Ocurrió un error inesperado: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<List<DetalleAccesoDTO>> HistorialAccesoUser(int IdUsuario)
        {
            return NUsuarios.GetInstance().HistorialAccesoUser(IdUsuario);
        }

    }
}