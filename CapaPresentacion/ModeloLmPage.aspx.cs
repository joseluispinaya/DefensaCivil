using CapaEntidad.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class ModeloLmPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<string> AnalizarCoordenadas(decimal Latitud, decimal Longitud)
        {
            try
            {
                return HelpersIA.GetInstance().AnalizarDescripcionCoordenadasNew(Latitud, Longitud);
            }
            catch (Exception ex)
            {
                // Captura cualquier error no previsto en la capa de presentación
                return new Respuesta<string> { Estado = false, Mensaje = "Ocurrió un error en el servidor: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<string> CoordenadasApistre(decimal Latitud, decimal Longitud)
        {
            try
            {
                string serviciosReales = HelpersIA.GetInstance().ObtenerLugaresCercanosNew(Latitud, Longitud);
                return new Respuesta<string>
                {
                    Estado = true,
                    Data = serviciosReales,
                    Mensaje = "Descripción generada correctamente"
                };
            }
            catch (Exception ex)
            {
                // Captura cualquier error no previsto en la capa de presentación
                return new Respuesta<string> { Estado = false, Mensaje = "Ocurrió un error en el servidor: " + ex.Message };
            }
        }

    }
}