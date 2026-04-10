using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;

namespace CapaDatos
{
    public class DUbicaciones
    {
        #region "PATRON SINGLETON"
        private static DUbicaciones instancia = null;
        private DUbicaciones() { }
        public static DUbicaciones GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DUbicaciones();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EDepartamento>> ListaDepartamentos()
        {
            try
            {
                List<EDepartamento> rptLista = new List<EDepartamento>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarDepartamentos", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EDepartamento
                                {
                                    IdDepartamento = Convert.ToInt32(dr["IdDepartamento"]),
                                    NombreDep = dr["NombreDep"].ToString(),
                                    NroProvi = Convert.ToInt32(dr["NroProvi"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EDepartamento>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EDepartamento>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<List<EProvincia>> ListaProvincias(int IdDepartamento)
        {
            try
            {
                List<EProvincia> rptLista = new List<EProvincia>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarProvincias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdDepartamento", IdDepartamento);
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EProvincia
                                {
                                    IdProvincia = Convert.ToInt32(dr["IdProvincia"]),
                                    IdDepartamento = Convert.ToInt32(dr["IdDepartamento"]),
                                    NombreProv = dr["NombreProv"].ToString(),
                                    NroMunici = Convert.ToInt32(dr["NroMunici"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EProvincia>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EProvincia>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }


        public Respuesta<List<EMunicipio>> ListaMunicipios(int IdProvincia)
        {
            try
            {
                List<EMunicipio> rptLista = new List<EMunicipio>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarMunicipiosFull", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdProvincia", IdProvincia);
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EMunicipio
                                {
                                    IdMunicipio = Convert.ToInt32(dr["IdMunicipio"]),
                                    IdProvincia = Convert.ToInt32(dr["IdProvincia"]),
                                    NombreMuni = dr["NombreMuni"].ToString(),
                                    IdDepartamento = Convert.ToInt32(dr["IdDepartamento"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EMunicipio>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EMunicipio>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<int> GuardarOrEditMunicipio(EMunicipio objeto)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditMunicipios", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdMunicipio", objeto.IdMunicipio);
                        cmd.Parameters.AddWithValue("@IdProvincia", objeto.IdProvincia);
                        cmd.Parameters.AddWithValue("@NombreMuni", objeto.NombreMuni);

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

                // Asignamos el código numérico a Data (por si se necesita lógica extra)
                response.Data = resultadoCodigo;

                switch (resultadoCodigo)
                {
                    case 1: // Duplicado
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "El Municipio ingresado ya existe.";
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

        public Respuesta<int> GuardarOrEditProvincia(EProvincia objeto)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditProvincias", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdProvincia", objeto.IdProvincia);
                        cmd.Parameters.AddWithValue("@IdDepartamento", objeto.IdDepartamento);
                        cmd.Parameters.AddWithValue("@NombreProv", objeto.NombreProv);

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

                // Asignamos el código numérico a Data (por si se necesita lógica extra)
                response.Data = resultadoCodigo;

                switch (resultadoCodigo)
                {
                    case 1: // Duplicado
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "La Provincia ingresado ya existe.";
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

        // fuerzas y grados
        public Respuesta<List<EFuerzas>> ListaFuerzas()
        {
            try
            {
                List<EFuerzas> rptLista = new List<EFuerzas>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarFuerzas", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EFuerzas
                                {
                                    IdFuerza = Convert.ToInt32(dr["IdFuerza"]),
                                    Descripcion = dr["Descripcion"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EFuerzas>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EFuerzas>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<List<EGrados>> ListaGrados(int IdFuerza)
        {
            try
            {
                List<EGrados> rptLista = new List<EGrados>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarGrados", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdFuerza", IdFuerza);
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EGrados
                                {
                                    IdGrado = Convert.ToInt32(dr["IdGrado"]),
                                    IdFuerza = Convert.ToInt32(dr["IdFuerza"]),
                                    NombreGrado = dr["NombreGrado"].ToString(),
                                    Abreviado = dr["Abreviado"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EGrados>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EGrados>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

    }
}
