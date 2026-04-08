using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad.Entidades;
using CapaEntidad.DTOs;
using CapaEntidad.Responses;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion.MasterAdmin
{
    public partial class RegionalesPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<RegionalesDTO>> ListaRegionales()
        {
            return NRegional.GetInstance().ListaRegionales();
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditRegional(RegionalesDTO objeto)
        {
            return NRegional.GetInstance().GuardarOrEditRegional(objeto);
        }

    }
}