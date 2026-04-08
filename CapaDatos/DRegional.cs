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
    public class DRegional
    {
        #region "PATRON SINGLETON"
        private static DRegional instancia = null;
        private DRegional() { }
        public static DRegional GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DRegional();
            }
            return instancia;
        }
        #endregion

        public Respuesta<int> GuardarOrEditRegional(RegionalesDTO objeto)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditRegional", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // 2. Parámetros del Docente
                        cmd.Parameters.AddWithValue("@IdRegional", objeto.IdRegional);
                        cmd.Parameters.AddWithValue("@IdMunicipio", objeto.IdMunicipio);
                        cmd.Parameters.AddWithValue("@NombreRegional", objeto.NombreRegional);
                        cmd.Parameters.AddWithValue("@Contacto", objeto.Contacto);
                        cmd.Parameters.AddWithValue("@Direccion", objeto.Direccion);
                        cmd.Parameters.AddWithValue("@Descripcion", objeto.Descripcion);

                        // 4. Parámetro de Salida
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

                // 5. Interpretación de la respuesta (Igual que con Carreras y Grados)
                switch (resultadoCodigo)
                {
                    case 1:
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "La regional ya existe.";
                        break;

                    case 2:
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Registrado correctamente.";
                        break;

                    case 3:
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Actualizado correctamente.";
                        break;

                    case 0:
                    default:
                        response.Estado = false;
                        response.Valor = "error";
                        response.Mensaje = "No se pudo completar la operación en la base de datos.";
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

        public Respuesta<List<RegionalesDTO>> ListaRegionales()
        {
            try
            {
                List<RegionalesDTO> rptLista = new List<RegionalesDTO>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerRegionales", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new RegionalesDTO
                                {
                                    IdRegional = Convert.ToInt32(dr["IdRegional"]),
                                    IdMunicipio = Convert.ToInt32(dr["IdMunicipio"]),
                                    NombreRegional = dr["NombreRegional"].ToString(),
                                    NombreMuni = dr["NombreMuni"].ToString(),
                                    IdProvincia = Convert.ToInt32(dr["IdProvincia"]),
                                    NombreProv = dr["NombreProv"].ToString(),
                                    IdDepartamento = Convert.ToInt32(dr["IdDepartamento"]),
                                    Contacto = dr["Contacto"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Descripcion = dr["Descripcion"].ToString(),

                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy"),
                                    Responsable = dr["Responsable"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<RegionalesDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<RegionalesDTO>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

    }
}
