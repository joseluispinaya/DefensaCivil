namespace CapaEntidad.DTOs
{
    public class PropiedadIADTO
    {
        public string TipoPropiedad { get; set; }
        public string SituacionLegal { get; set; }
        public string Zona { get; set; }
        public decimal AreaM2 { get; set; }
        public decimal Largo { get; set; }
        public decimal Ancho { get; set; }
        public string Topografia { get; set; }
        public string TipoSuelo { get; set; }
        public string Direccion { get; set; }
        public string NotasAdicionales { get; set; }

        // Variables traducidas
        public string EstadoServicios { get; set; }
        public string RiesgoInundacion { get; set; }
        public string RiesgoDeslizamiento { get; set; }
    }
}
