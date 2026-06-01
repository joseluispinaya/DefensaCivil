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
using CapaEntidad.DTOs;

namespace CapaPresentacion
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<UsuarioLogDTO> Iniciar(string Correo, string Clave)
        {
            try
            {
                bool esAdmin = ValidarSuperAdmin(Correo);
                if (!esAdmin)
                {
                    return new Respuesta<UsuarioLogDTO>
                    {
                        Estado = false,
                        Valor = "admin",
                        Mensaje = "Entra como super admin"
                    };
                }

                var resp = NUsuarios.GetInstance().LogeoUsuario(Correo);
                if (!resp.Estado || resp.Data == null)
                {
                    // En lugar de "adivinar" qué pasó, simplemente devolvemos el mensaje 
                    // que la Capa de Datos ya preparó inteligentemente para nosotros.
                    return new Respuesta<UsuarioLogDTO>
                    {
                        Estado = false,
                        Valor = "",
                        Mensaje = resp.Mensaje
                    };
                }

                var objUsua = resp.Data;

                // verificamos si está activo
                if (!objUsua.Estado)
                {
                    return new Respuesta<UsuarioLogDTO>
                    {
                        Estado = false,
                        Valor = "",
                        Mensaje = "Su cuenta se encuentra inactiva. contáctese con Dep. de Sistemas."
                    };
                }

                // verificamos la contraseña (BCrypt)
                bool passCorrecta = Utilidades.GetInstance().Verify(Clave, objUsua.Clave);

                if (!passCorrecta)
                {
                    return new Respuesta<UsuarioLogDTO>
                    {
                        Estado = false,
                        Valor = "",
                        Mensaje = "Usuario o Contraseña incorrectos."
                    };
                }

                HttpContext.Current.Session["UsuarioLogueado"] = objUsua;
                HttpContext.Current.Session["TipoUsuario"] = "UsuarioRegular";

                // Registramos el acceso llamando a la CAPA DE NEGOCIO
                NUsuarios.GetInstance().RegistrarAcceso(objUsua.IdUsuario);

                // devolvemos el objeto (limpiando el hash por seguridad antes de enviarlo al front)
                objUsua.Clave = "";

                return new Respuesta<UsuarioLogDTO>
                {
                    Estado = true,
                    Data = objUsua,
                    Valor = "",
                    Mensaje = "Bienvenido al sistema"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<UsuarioLogDTO>
                {
                    Estado = false,
                    Valor = "",
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<EUsuarios> LoginAdmin(string Correo, string Clave)
        {
            try
            {
                var resp = NUsuarios.GetInstance().LoginUsuario(Correo);

                if (!resp.Estado || resp.Data == null)
                {
                    return new Respuesta<EUsuarios>
                    {
                        Estado = false,
                        Mensaje = resp.Mensaje // Mensaje genérico por seguridad
                    };
                }

                var objUser = resp.Data;

                // 2. Validar Contraseña (Simulación directa vs Hash real)
                // NOTA: Cuando pases a producción, aquí usarás: BCrypt.Net.BCrypt.Verify(Clave, objUser.ClaveHash)
                if (Clave != objUser.ClaveHash)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Usuario o Contraseña incorrectos." };
                }

                // 3. Validar Estado
                if (!objUser.Estado)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Su cuenta se encuentra inactiva." };
                }

                HttpContext.Current.Session["UsuarioLogueado"] = objUser;
                HttpContext.Current.Session["TipoUsuario"] = "Admin"; // Para saber qué menú mostrar

                objUser.ClaveHash = "";

                return new Respuesta<EUsuarios>
                {
                    Estado = true,
                    Data = objUser,
                    Mensaje = "Bienvenido al sistema"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuarios>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        private static bool ValidarSuperAdmin(string correo)
        {
            var correoPrueba = "mamfreddev@yopmail.com";

            if (correoPrueba.ToLower() != correo.Trim().ToLower())
            {
                return true;
            }

            return false;
        }

    }
}