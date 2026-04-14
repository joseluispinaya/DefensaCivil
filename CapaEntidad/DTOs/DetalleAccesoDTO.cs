using System;

namespace CapaEntidad.DTOs
{
    public class DetalleAccesoDTO
    {
        public int IdAcceso { get; set; }
        public int IdUsuario { get; set; }
        public string FechaHoraLocal { get; set; }
        public string FechaHoraNew { get; set; }
        public DateTime FechaFiltroOculta { get; set; }
    }
}
