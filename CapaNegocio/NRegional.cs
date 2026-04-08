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
    public class NRegional
    {
        #region "PATRON SINGLETON"
        private static NRegional instancia = null;
        private NRegional() { }
        public static NRegional GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NRegional();
            }
            return instancia;
        }
        #endregion
        public Respuesta<int> GuardarOrEditRegional(RegionalesDTO objeto)
        {
            return DRegional.GetInstance().GuardarOrEditRegional(objeto);
        }

        public Respuesta<List<RegionalesDTO>> ListaRegionales()
        {
            return DRegional.GetInstance().ListaRegionales();
        }
    }
}
