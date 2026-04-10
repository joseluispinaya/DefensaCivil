namespace CapaEntidad.DTOs
{
    public class PropiedadesCoordeDTO
    {
        public int IdPropiedad { get; set; }
        public string CodCatastral { get; set; }
        public string Direccion { get; set; }
        public string Zona { get; set; }
        public decimal Latitud { get; set; }
        public decimal Longitud { get; set; }
        public decimal DistanciaMetros { get; set; }
        //public string DistanciaStr => DistanciaMetros.ToString("0.00") + " Mts";
    }
}
