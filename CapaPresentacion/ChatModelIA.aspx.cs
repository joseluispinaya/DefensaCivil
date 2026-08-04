using CapaEntidad.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class ChatModelIA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static string ModeloChatBotIaDos(string pregunta)
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return "Su sesión ha expirado. Recargue la página.";
            }

            try
            {
                if (string.IsNullOrEmpty(pregunta))
                {
                    return "Debe ingresar una pregunta.";
                }

                UsuarioLogDTO usuari = (UsuarioLogDTO)HttpContext.Current.Session["UsuarioLogueado"];

                // Enviamos el Id del usuario para mantener su contexto conversacional único
                var respChatbot = ChatProcesador.GetInstance().GenerateChatbotResponse(usuari.IdUsuario.ToString(), pregunta);

                return respChatbot;
            }
            catch (Exception)
            {
                return "Tu pregunta está fuera de nuestro modelo. Intentá con otra o reformulá tu consulta.";
            }
        }

        [WebMethod]
        public static string ModeloChatBotIa(string pregunta)
        {

            try
            {
                if (string.IsNullOrEmpty(pregunta))
                {
                    return "Debe ingresar una pregunta.";
                }

                return "Respuesta de Pruebas del modelo de IA";

            }
            catch (Exception)
            {
                return "Tu pregunta está fuera de nuestro modelo. Intentá con otra o reformulá tu consulta.";
            }
        }
    }
}