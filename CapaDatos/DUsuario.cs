using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaEntidad.DTOs;

namespace CapaDatos
{
    public class DUsuario
    {
        #region "PATRON SINGLETON"
        private static DUsuario instancia = null;
        private DUsuario() { }
        public static DUsuario GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DUsuario();
            }
            return instancia;
        }
        #endregion

        public Respuesta<int> GuardarOrEditUsuarios(UsuarioDTO objeto)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditUsuarios", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdUsuario", objeto.IdUsuario);
                        cmd.Parameters.AddWithValue("@IdRegional", objeto.IdRegional);
                        cmd.Parameters.AddWithValue("@IdGrado", objeto.IdGrado);

                        cmd.Parameters.AddWithValue("@IdRol", objeto.IdRol);
                        cmd.Parameters.AddWithValue("@Nombres", objeto.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", objeto.Apellidos);

                        cmd.Parameters.AddWithValue("@NroCi", objeto.NroCi);
                        cmd.Parameters.AddWithValue("@Correo", objeto.Correo);

                        // Blindaje contra nulos en la Clave (Si es Update, puede que venga nula. La mandamos vacía para que el SP la ignore)
                        cmd.Parameters.AddWithValue("@Clave", string.IsNullOrEmpty(objeto.Clave) ? "" : objeto.Clave);
                        //cmd.Parameters.AddWithValue("@Clave", objeto.Clave);

                        cmd.Parameters.AddWithValue("@Celular", objeto.Celular);
                        // Lo que hiciste con FotoUrl está perfecto porque el SP usa ISNULL(@FotoUrl, '')
                        cmd.Parameters.AddWithValue("@FotoUrl", string.IsNullOrEmpty(objeto.FotoUrl) ? "" : objeto.FotoUrl);
                        cmd.Parameters.AddWithValue("@Estado", objeto.Estado);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();

                        resultadoCodigo = Convert.ToInt32(outputParam.Value);
                    }
                }

                response.Data = resultadoCodigo;

                switch (resultadoCodigo)
                {
                    case 1: // Duplicado
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "Ocurrio un problema el NroCi o Correo ya existe";
                        break;

                    case 2: // Registro Nuevo
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Registrado correctamente.";
                        break;

                    case 3: // Actualización
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Actualizado correctamente.";
                        break;

                    case 4: // Responsable duplicado
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "La Regional ya tiene un Responsable asignado.";
                        break;

                    case 0: // Error
                    default:
                        response.Estado = false;
                        response.Valor = "error";
                        response.Mensaje = "No se pudo completar la operación.";
                        break;
                }
            }
            catch (Exception ex)
            {
                response.Data = 0;
                response.Estado = false;
                response.Valor = "error";
                response.Mensaje = "Error interno: " + ex.Message;
            }

            return response;
        }

        public Respuesta<List<UsuarioDTO>> ListaUsuariosIdRegional(int IdRegional)
        {
            try
            {
                List<UsuarioDTO> rptLista = new List<UsuarioDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_UsuariosRegional", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdRegional", IdRegional);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new UsuarioDTO
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    IdRegional = Convert.ToInt32(dr["IdRegional"]),
                                    IdGrado = Convert.ToInt32(dr["IdGrado"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Descripcion = dr["Descripcion"].ToString(), // rol
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    NroCi = dr["NroCi"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    FotoUrl = dr["FotoUrl"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    IdFuerza = Convert.ToInt32(dr["IdFuerza"]),
                                    Abreviado = dr["Abreviado"].ToString(),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy")
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<UsuarioDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<UsuarioDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<UsuarioLogDTO> LoginUsuario(string Correo)
        {
            try
            {
                UsuarioLogDTO obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_LoginUsuario", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@Correo", Correo);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new UsuarioLogDTO
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    IdRegional = Convert.ToInt32(dr["IdRegional"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Descripcion = dr["Descripcion"].ToString(), // rol
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    NroCi = dr["NroCi"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    FotoUrl = dr["FotoUrl"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    Abreviado = dr["Abreviado"].ToString()
                                };
                            }
                        }
                    }
                }

                return new Respuesta<UsuarioLogDTO>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Bienvenido usuario" : "Usuario o Contraseña incorrectos."
                };
            }
            catch (Exception)
            {
                return new Respuesta<UsuarioLogDTO>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error en el servidor. Intente más tarde.",
                    Data = null
                };
            }
        }

        public void RegistrarAcceso(int idUsuario)
        {
            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_RegistrarAcceso", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdUsuario", idUsuario);

                        con.Open();
                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
                // Se captura el error pero no se lanza (throw) para que, 
                // si la BD de auditoría falla, no le impida al usuario entrar al sistema.
            }
        }

        public Respuesta<List<ERol>> ListaRoles()
        {
            try
            {
                List<ERol> rptLista = new List<ERol>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_Roles", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ERol
                                {
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ERol>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ERol>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<List<UsuarioAccesoDTO>> ControlUsuariosIdRegional(int IdRegional)
        {
            try
            {
                List<UsuarioAccesoDTO> rptLista = new List<UsuarioAccesoDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ControlAccesoUser", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdRegional", IdRegional);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new UsuarioAccesoDTO
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    Usua = dr["Usua"].ToString(),
                                    Descripcion = dr["Descripcion"].ToString(), // rol
                                    Correo = dr["Correo"].ToString(),
                                    FotoUrl = dr["FotoUrl"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy"),
                                    NroAccesos = Convert.ToInt32(dr["NroAccesos"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<UsuarioAccesoDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<UsuarioAccesoDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<DetalleAccesoDTO>> HistorialAccesoUser(int IdUsuario)
        {
            try
            {
                List<DetalleAccesoDTO> rptLista = new List<DetalleAccesoDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_HistorialAccesoUser", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdUsuario", IdUsuario);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new DetalleAccesoDTO
                                {
                                    IdAcceso = Convert.ToInt32(dr["IdAcceso"]),
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    //OPCIÓN 1: Formato tradicional (Ej: 14/04/2026 15:30:21)
                                    FechaHoraLocal = dr["FechaHoraLocal"].ToString(),
                                    //OPCIÓN 2: Formato amigable en español (Ej: 14 de abril de 2026 15:30:21)
                                    FechaHoraNew = dr["FechaHoraNew"].ToString(),
                                    FechaFiltroOculta = Convert.ToDateTime(dr["FechaFiltroOculta"].ToString())
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<DetalleAccesoDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<DetalleAccesoDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
