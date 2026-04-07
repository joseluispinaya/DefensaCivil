namespace CapaEntidad.Entidades
{
    public class EProvincia
    {
        public int IdProvincia { get; set; }
        public int IdDepartamento { get; set; }
        public string NombreProv { get; set; }
        public int NroMunici { get; set; }
        public string CantMuni =>
            NroMunici == 0
            ? "0 Municipios"
            : NroMunici == 1
                ? "1 Municipio"
                : $"{NroMunici} Municipios";
    }
}
