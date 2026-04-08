using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion.MasterAdmin
{
    public partial class UbicacionesPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EDepartamento>> ListaDepartamentos()
        {
            return NUbicaciones.GetInstance().ListaDepartamentos();
        }

        [WebMethod]
        public static Respuesta<List<EProvincia>> ListaProvincias(int IdDepartamento)
        {
            return NUbicaciones.GetInstance().ListaProvincias(IdDepartamento);
        }

        [WebMethod]
        public static Respuesta<List<EMunicipio>> ListaMunicipios(int IdProvincia)
        {
            return NUbicaciones.GetInstance().ListaMunicipios(IdProvincia);
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditMunicipio(EMunicipio objeto)
        {
            return NUbicaciones.GetInstance().GuardarOrEditMunicipio(objeto);
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditProvincia(EProvincia objeto)
        {
            return NUbicaciones.GetInstance().GuardarOrEditProvincia(objeto);
        }
    }
}