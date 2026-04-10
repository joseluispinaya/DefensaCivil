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
    public partial class PropiedadesPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ETiposPropiedad>> ListaTiposPropiedad()
        {
            return NPropiedad.GetInstance().ListaTiposPropiedad();
        }

        [WebMethod]
        public static Respuesta<List<EEstadoPropiedad>> ListaEstadoPropiedad()
        {
            return NPropiedad.GetInstance().ListaEstadoPropiedad();
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<List<PropiedadesDTO>> ListaPropiedadesIdRegional()
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<List<PropiedadesDTO>> { Estado = false, Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                // 3. Obtener el ID del Docente de la sesión (Seguro)
                UsuarioLogDTO usuari = (UsuarioLogDTO)HttpContext.Current.Session["UsuarioLogueado"];

                return NPropiedad.GetInstance().ListaPropiedadesIdRegional(usuari.IdRegional);
            }
            catch (Exception ex)
            {
                // Captura cualquier error no previsto en la capa de presentación
                return new Respuesta<List<PropiedadesDTO>> { Estado = false, Mensaje = "Ocurrió un error inesperado: " + ex.Message };
            }
        }


        [WebMethod(EnableSession = true)]
        public static Respuesta<List<PropiedadesCoordeDTO>> ListaPropiedadesCoordenadas(decimal LatitudActual, decimal LongitudActual)
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<List<PropiedadesCoordeDTO>> { Estado = false, Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                // 3. Obtener el ID del Docente de la sesión (Seguro)
                UsuarioLogDTO usuari = (UsuarioLogDTO)HttpContext.Current.Session["UsuarioLogueado"];

                return NPropiedad.GetInstance().ListaPropiedadesCoordenadas(usuari.IdRegional, LatitudActual, LongitudActual);
            }
            catch (Exception ex)
            {
                // Captura cualquier error no previsto en la capa de presentación
                return new Respuesta<List<PropiedadesCoordeDTO>> { Estado = false, Mensaje = "Ocurrió un error inesperado: " + ex.Message };
            }
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<int> Guardar(PropiedadesDTO objeto, string base64Pdf)
        {
            // 1. Validar que la sesión exista (Evita accesos no autorizados)
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                var utilidades = Utilidades.GetInstance();
                string documentoUrl = string.Empty;

                // 2. Rescatamos el usuario real del servidor
                UsuarioLogDTO usuari = (UsuarioLogDTO)HttpContext.Current.Session["UsuarioLogueado"];

                if (!string.IsNullOrEmpty(base64Pdf))
                {
                    byte[] documentBytes = Convert.FromBase64String(base64Pdf);
                    using (var stream = new MemoryStream(documentBytes))
                    {
                        string folder = "/DocumetPdf/";
                        documentoUrl = utilidades.UploadPdf(stream, folder);
                    }
                }

                // 3. Forzamos el ID desde el servidor (¡Seguridad máxima!)
                objeto.IdRegional = usuari.IdRegional;
                objeto.DocumentacionUrl = documentoUrl;

                return NPropiedad.GetInstance().GuardarPropiedades(objeto);
            }
            catch (Exception ex)
            {
                return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod(EnableSession = true)] // Agregamos EnableSession aquí también
        public static Respuesta<int> Actualizar(PropiedadesDTO objeto, string base64Pdf)
        {
            // 1. Validar que la sesión exista
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                var utilidades = Utilidades.GetInstance();

                // Rescatamos el usuario de la sesión
                UsuarioLogDTO usuari = (UsuarioLogDTO)HttpContext.Current.Session["UsuarioLogueado"];

                if (!string.IsNullOrEmpty(base64Pdf))
                {
                    byte[] documentBytes = Convert.FromBase64String(base64Pdf);
                    using (var stream = new MemoryStream(documentBytes))
                    {
                        string folder = "/DocumetPdf/";
                        objeto.DocumentacionUrl = utilidades.UploadPdf(stream, folder);
                    }
                }
                else
                {
                    objeto.DocumentacionUrl = ""; // El SP conservará la que ya existe gracias a tu CASE WHEN
                }

                // 2. Forzamos el ID de la regional desde el servidor. 
                // Así evitamos que un usuario cambie el ID en JS y le robe la propiedad a otra regional.
                objeto.IdRegional = usuari.IdRegional;

                return NPropiedad.GetInstance().ActualizarPropiedades(objeto);
            }
            catch (Exception ex)
            {
                return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}