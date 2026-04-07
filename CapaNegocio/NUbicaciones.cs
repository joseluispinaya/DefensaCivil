using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;

namespace CapaNegocio
{
    public class NUbicaciones
    {
        #region "PATRON SINGLETON"
        private static NUbicaciones instancia = null;
        private NUbicaciones() { }
        public static NUbicaciones GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NUbicaciones();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<EDepartamento>> ListaDepartamentos()
        {
            return DUbicaciones.GetInstance().ListaDepartamentos();
        }

        public Respuesta<List<EProvincia>> ListaProvincias(int IdDepartamento)
        {
            return DUbicaciones.GetInstance().ListaProvincias(IdDepartamento);
        }
    }
}
