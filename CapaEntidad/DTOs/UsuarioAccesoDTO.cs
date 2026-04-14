namespace CapaEntidad.DTOs
{
    public class UsuarioAccesoDTO
    {
        public int IdUsuario { get; set; }
        public string Usua { get; set; }
        public string Descripcion { get; set; }
        public string Correo { get; set; }
        public string FotoUrl { get; set; }
        public bool Estado { get; set; }
        public string FechaRegistro { get; set; }
        public int NroAccesos { get; set; }
        public string CantAccesos =>
            NroAccesos == 0
            ? "0 Accesos"
            : NroAccesos == 1
                ? "1 Acceso"
                : $"{NroAccesos} Accesos";
    }
}
