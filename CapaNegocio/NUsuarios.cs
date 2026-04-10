using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaEntidad.DTOs;

namespace CapaNegocio
{
    public class NUsuarios
    {
        #region "PATRON SINGLETON"
        private static NUsuarios instancia = null;
        private NUsuarios() { }
        public static NUsuarios GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NUsuarios();
            }
            return instancia;
        }
        #endregion

        public Respuesta<int> GuardarOrEditUsuarios(UsuarioDTO objeto)
        {
            return DUsuario.GetInstance().GuardarOrEditUsuarios(objeto);
        }


        public Respuesta<List<UsuarioDTO>> ListaUsuariosIdRegional(int IdRegional)
        {
            return DUsuario.GetInstance().ListaUsuariosIdRegional(IdRegional);
        }

        // original
        public Respuesta<UsuarioLogDTO> LogeoUsuario(string Correo)
        {
            return DUsuario.GetInstance().LoginUsuario(Correo);
        }

        public void RegistrarAcceso(int idUsuario)
        {
            // Si en el futuro necesitas validar algo (ej. "solo registrar accesos de ciertos roles"),
            // la lógica iría aquí. Por ahora, solo pasamos la orden a la Capa de Datos.
            DUsuario.GetInstance().RegistrarAcceso(idUsuario);
        }

        public Respuesta<List<ERol>> ListaRoles()
        {
            return DUsuario.GetInstance().ListaRoles();
        }

        public Respuesta<EUsuarios> LoginUsuario(string Correo)
        {
            var correoPrueba = "joseluisdev@yopmail.com";

            if (correoPrueba.ToLower() != Correo.Trim().ToLower())
            {
                return new Respuesta<EUsuarios>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Usuario o Contraseña incorrectos."
                };
            }


            EUsuarios obj = new EUsuarios
            {
                IdUsuario = 1,
                Nombres = "Jose Dev",
                Apellidos = "Pinaya Seo",
                NroCi = "32547854",
                Correo = "joseluisdev@yopmail.com",
                Celular = "73999748",
                ClaveHash = "123456789",
                ImagenUser = "/Imagenes/fotop4.jpg",
                Cargo = "Jefe de carrera",
                IdRol = 2,
                Estado = true
            };

            return new Respuesta<EUsuarios>
            {
                Estado = true,
                Data = obj,
                Mensaje = "Bienvenido al sistema"
            };

        }
    }
}
