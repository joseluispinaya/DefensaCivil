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
    public class DPropiedad
    {
        #region "PATRON SINGLETON"
        private static DPropiedad instancia = null;
        private DPropiedad() { }
        public static DPropiedad GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DPropiedad();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ETiposPropiedad>> ListaTiposPropiedad()
        {
            try
            {
                List<ETiposPropiedad> rptLista = new List<ETiposPropiedad>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_TiposPropiedad", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ETiposPropiedad
                                {
                                    IdTipoPropi = Convert.ToInt32(dr["IdTipoPropi"]),
                                    NombreTipo = dr["NombreTipo"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ETiposPropiedad>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ETiposPropiedad>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<List<EEstadoPropiedad>> ListaEstadoPropiedad()
        {
            try
            {
                List<EEstadoPropiedad> rptLista = new List<EEstadoPropiedad>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_EstadoPropiedad", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EEstadoPropiedad
                                {
                                    IdEstadoProp = Convert.ToInt32(dr["IdEstadoProp"]),
                                    Descripcion = dr["Descripcion"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EEstadoPropiedad>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EEstadoPropiedad>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<int> GuardarPropiedades(PropiedadesDTO objeto)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarPropiedad", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdRegional", objeto.IdRegional);
                        cmd.Parameters.AddWithValue("@IdTipoPropi", objeto.IdTipoPropi);
                        cmd.Parameters.AddWithValue("@IdEstadoProp", objeto.IdEstadoProp);

                        cmd.Parameters.AddWithValue("@CodCatastral", objeto.CodCatastral);
                        cmd.Parameters.AddWithValue("@NroFolio", objeto.NroFolio);
                        cmd.Parameters.AddWithValue("@DocumentacionUrl", objeto.DocumentacionUrl);

                        cmd.Parameters.AddWithValue("@DescripcionGen", objeto.DescripcionGen);
                        cmd.Parameters.AddWithValue("@Direccion", objeto.Direccion);
                        cmd.Parameters.AddWithValue("@Zona", objeto.Zona);

                        cmd.Parameters.AddWithValue("@Latitud", objeto.Latitud);
                        cmd.Parameters.AddWithValue("@Longitud", objeto.Longitud);
                        cmd.Parameters.AddWithValue("@AreaM2", objeto.AreaM2);
                        cmd.Parameters.AddWithValue("@Largo", objeto.Largo);
                        cmd.Parameters.AddWithValue("@Ancho", objeto.Ancho);

                        cmd.Parameters.AddWithValue("@Topografia", objeto.Topografia);
                        cmd.Parameters.AddWithValue("@TipoSuelo", objeto.TipoSuelo);
                        cmd.Parameters.AddWithValue("@ServiciosBas", objeto.ServiciosBas);
                        cmd.Parameters.AddWithValue("@RiesgoInundacion", objeto.RiesgoInundacion);
                        cmd.Parameters.AddWithValue("@RiesgoDeslizamiento", objeto.RiesgoDeslizamiento);

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
                        response.Mensaje = "Ya existe el Código Catastral o el Nro Folio.";
                        break;

                    case 2: // Registro Nuevo
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Propiedad Registrada correctamente.";
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

        public Respuesta<int> ActualizarPropiedades(PropiedadesDTO objeto)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ActualizarPropiedad", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdPropiedad", objeto.IdPropiedad);
                        cmd.Parameters.AddWithValue("@IdRegional", objeto.IdRegional);
                        cmd.Parameters.AddWithValue("@IdTipoPropi", objeto.IdTipoPropi);
                        cmd.Parameters.AddWithValue("@IdEstadoProp", objeto.IdEstadoProp);

                        cmd.Parameters.AddWithValue("@CodCatastral", objeto.CodCatastral);
                        cmd.Parameters.AddWithValue("@NroFolio", objeto.NroFolio);
                        //cmd.Parameters.AddWithValue("@DocumentacionUrl", objeto.DocumentacionUrl);
                        cmd.Parameters.AddWithValue("@DocumentacionUrl", string.IsNullOrEmpty(objeto.DocumentacionUrl) ? "" : objeto.DocumentacionUrl);

                        cmd.Parameters.AddWithValue("@DescripcionGen", objeto.DescripcionGen);
                        cmd.Parameters.AddWithValue("@Direccion", objeto.Direccion);
                        cmd.Parameters.AddWithValue("@Zona", objeto.Zona);

                        cmd.Parameters.AddWithValue("@Latitud", objeto.Latitud);
                        cmd.Parameters.AddWithValue("@Longitud", objeto.Longitud);
                        cmd.Parameters.AddWithValue("@AreaM2", objeto.AreaM2);
                        cmd.Parameters.AddWithValue("@Largo", objeto.Largo);
                        cmd.Parameters.AddWithValue("@Ancho", objeto.Ancho);

                        cmd.Parameters.AddWithValue("@Topografia", objeto.Topografia);
                        cmd.Parameters.AddWithValue("@TipoSuelo", objeto.TipoSuelo);
                        cmd.Parameters.AddWithValue("@ServiciosBas", objeto.ServiciosBas);
                        cmd.Parameters.AddWithValue("@RiesgoInundacion", objeto.RiesgoInundacion);
                        cmd.Parameters.AddWithValue("@RiesgoDeslizamiento", objeto.RiesgoDeslizamiento);

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
                        response.Mensaje = "Ya existe el Código Catastral o el Folio en otro registro.";
                        break;

                    case 3: // Actualización
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Propiedad Actualizada Correctamente.";
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

        public Respuesta<List<PropiedadesDTO>> ListaPropiedadesIdRegional(int IdRegional)
        {
            try
            {
                List<PropiedadesDTO> rptLista = new List<PropiedadesDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPropiedadesPorRegional", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdRegional", IdRegional);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new PropiedadesDTO
                                {
                                    IdPropiedad = Convert.ToInt32(dr["IdPropiedad"]),
                                    IdRegional = Convert.ToInt32(dr["IdRegional"]),
                                    IdTipoPropi = Convert.ToInt32(dr["IdTipoPropi"]),
                                    TipoPropiedad = dr["TipoPropiedad"].ToString(), // Ej: 'Terreno', 'Cuartel'
                                    IdEstadoProp = Convert.ToInt32(dr["IdEstadoProp"]),
                                    EstadoLegal = dr["EstadoLegal"].ToString(), // Ej: 'Donacion', 'En adjudicacion'
                                    CodCatastral = dr["CodCatastral"].ToString(),
                                    NroFolio = dr["NroFolio"].ToString(),
                                    DocumentacionUrl = dr["DocumentacionUrl"].ToString(),
                                    DescripcionGen = dr["DescripcionGen"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Zona = dr["Zona"].ToString(),
                                    Latitud = Convert.ToDecimal(dr["Latitud"]),
                                    Longitud = Convert.ToDecimal(dr["Longitud"]),
                                    AreaM2 = Convert.ToDecimal(dr["AreaM2"]),
                                    Largo = Convert.ToDecimal(dr["Largo"]),
                                    Ancho = Convert.ToDecimal(dr["Ancho"]),
                                    Topografia = dr["Topografia"].ToString(),
                                    TipoSuelo = dr["TipoSuelo"].ToString(),

                                    ServiciosBas = Convert.ToBoolean(dr["ServiciosBas"]),
                                    RiesgoInundacion = Convert.ToBoolean(dr["RiesgoInundacion"]),
                                    RiesgoDeslizamiento = Convert.ToBoolean(dr["RiesgoDeslizamiento"]),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy")
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<PropiedadesDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<PropiedadesDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<PropiedadesCoordeDTO>> ListaPropiedadesCoordenadas(int IdRegional, decimal LatitudActual, decimal LongitudActual)
        {
            try
            {
                List<PropiedadesCoordeDTO> rptLista = new List<PropiedadesCoordeDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_PropiedadesPorCordenadas", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdRegional", IdRegional);
                        comando.Parameters.AddWithValue("@LatitudActual", LatitudActual);
                        comando.Parameters.AddWithValue("@LongitudActual", LongitudActual);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new PropiedadesCoordeDTO
                                {
                                    IdPropiedad = Convert.ToInt32(dr["IdPropiedad"]),
                                    CodCatastral = dr["CodCatastral"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Zona = dr["Zona"].ToString(),
                                    Latitud = Convert.ToDecimal(dr["Latitud"]),
                                    Longitud = Convert.ToDecimal(dr["Longitud"]),
                                    DistanciaMetros = Convert.ToDecimal(dr["DistanciaMetros"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<PropiedadesCoordeDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<PropiedadesCoordeDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
