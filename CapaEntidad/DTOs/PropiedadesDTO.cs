namespace CapaEntidad.DTOs
{
    public class PropiedadesDTO
    {
        public int IdPropiedad { get; set; }
        public int IdRegional { get; set; }
        public int IdTipoPropi { get; set; }
        public string TipoPropiedad { get; set; }
        public int IdEstadoProp { get; set; }
        public string EstadoLegal { get; set; }
        public string CodCatastral { get; set; }
        public string NroFolio { get; set; }
        public string DocumentacionUrl { get; set; }
        public string DescripcionGen { get; set; }
        public string Direccion { get; set; }
        public string Zona { get; set; }
        public decimal Latitud { get; set; }
        public decimal Longitud { get; set; }
        public decimal AreaM2 { get; set; }
        public decimal Largo { get; set; }
        public decimal Ancho { get; set; }
        public string Topografia { get; set; }
        public string TipoSuelo { get; set; }
        public bool ServiciosBas { get; set; }
        public bool RiesgoInundacion { get; set; }
        public bool RiesgoDeslizamiento { get; set; }
        public bool Estado { get; set; }
        public string FechaRegistro { get; set; }
        //public string FullName => $"{Abreviado} {Apellidos} {Nombres}";
    }
}
