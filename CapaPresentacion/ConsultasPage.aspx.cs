using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class ConsultasPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<List<PropiedadesDTO>> FiltroPropiedades(string busqueda)
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<List<PropiedadesDTO>> { Estado = false, Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                UsuarioLogDTO usuari = (UsuarioLogDTO)HttpContext.Current.Session["UsuarioLogueado"];

                return NPropiedad.GetInstance().FiltroPropiedades(busqueda, usuari.IdRegional);
            }
            catch (Exception ex)
            {
                return new Respuesta<List<PropiedadesDTO>> { Estado = false, Mensaje = "Ocurrió un error inesperado: " + ex.Message };
            }
        }

    }
}