namespace CapaEntidad.DTOs
{
    public class UsuarioLogDTO
    {
        public int IdUsuario { get; set; }
        public int IdRegional { get; set; }
        public int IdRol { get; set; }
        public string Descripcion { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string NroCi { get; set; }
        public string Correo { get; set; }
        public string Clave { get; set; }
        public string Celular { get; set; }
        public string FotoUrl { get; set; }
        public bool Estado { get; set; }
        public string Abreviado { get; set; }
        public string FullName => $"{Abreviado} {Apellidos} {Nombres}";
    }
}
