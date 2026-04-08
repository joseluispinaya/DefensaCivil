namespace CapaEntidad.DTOs
{
    public class RegionalesDTO
    {
        public int IdRegional { get; set; }
        public int IdMunicipio { get; set; }
        public string NombreRegional { get; set; }
        public string NombreMuni { get; set; }
        public int IdProvincia { get; set; }
        public string NombreProv { get; set; }
        public int IdDepartamento { get; set; }
        public string Contacto { get; set; }
        public string Direccion { get; set; }
        public string Descripcion { get; set; }
        public bool Estado { get; set; }
        public string FechaRegistro { get; set; }
        public string Responsable { get; set; }
    }
}
