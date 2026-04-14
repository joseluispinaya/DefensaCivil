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
    public class NPropiedad
    {
        #region "PATRON SINGLETON"
        private static NPropiedad instancia = null;
        private NPropiedad() { }
        public static NPropiedad GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NPropiedad();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ETiposPropiedad>> ListaTiposPropiedad()
        {
            return DPropiedad.GetInstance().ListaTiposPropiedad();
        }

        public Respuesta<List<EEstadoPropiedad>> ListaEstadoPropiedad()
        {
            return DPropiedad.GetInstance().ListaEstadoPropiedad();
        }

        public Respuesta<int> GuardarPropiedades(PropiedadesDTO objeto)
        {
            return DPropiedad.GetInstance().GuardarPropiedades(objeto);
        }

        public Respuesta<int> ActualizarPropiedades(PropiedadesDTO objeto)
        {
            return DPropiedad.GetInstance().ActualizarPropiedades(objeto);
        }

        public Respuesta<List<PropiedadesDTO>> ListaPropiedadesIdRegional(int IdRegional)
        {
            return DPropiedad.GetInstance().ListaPropiedadesIdRegional(IdRegional);
        }

        public Respuesta<List<PropiedadesCoordeDTO>> ListaPropiedadesCoordenadas(int IdRegional, decimal LatitudActual, decimal LongitudActual)
        {
            return DPropiedad.GetInstance().ListaPropiedadesCoordenadas(IdRegional, LatitudActual, LongitudActual);
        }

        public Respuesta<List<PropiedadesDTO>> FiltroPropiedades(string Busqueda, int IdRegional)
        {
            return DPropiedad.GetInstance().FiltroPropiedades(Busqueda, IdRegional);
        }

        public Respuesta<PropiedadIADTO> InfoPropiedad(int IdPropiedad)
        {
            return DPropiedad.GetInstance().InfoPropiedad(IdPropiedad);
        }
    }
}
