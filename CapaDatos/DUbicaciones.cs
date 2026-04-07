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

    }
}
