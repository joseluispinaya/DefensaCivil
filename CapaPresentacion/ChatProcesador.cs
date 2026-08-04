using CapaEntidad.DTOs;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Web;

namespace CapaPresentacion
{
    public class ChatProcesador
    {
        private static readonly string OpenAIApiKey = ConfigurationManager.AppSettings["OpenAIApiKey"];
        private static List<PropiedadIADTO> _propiedadesCache = null;

        // Caché de conversaciones en memoria (Ideal para pruebas, en producción podrías usar Redis o SQL)
        private static readonly Dictionary<string, List<object>> _conversationHistory = new Dictionary<string, List<object>>();

        #region "PATRON SINGLETON"
        private static ChatProcesador _instancia = null;

        private ChatProcesador()
        {

        }

        public static ChatProcesador GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new ChatProcesador();
            }
            return _instancia;
        }
        #endregion

        private void SaveConversation(string sessionId, string role, string content)
        {
            if (!_conversationHistory.ContainsKey(sessionId))
                _conversationHistory[sessionId] = new List<object>();

            _conversationHistory[sessionId].Add(new { role = role, content = content });

            // Mantener solo las últimas 20 interacciones para no exceder el límite de tokens
            if (_conversationHistory[sessionId].Count > 20)
            {
                _conversationHistory[sessionId] = _conversationHistory[sessionId].Skip(_conversationHistory[sessionId].Count - 20).ToList();
            }
        }

        private List<object> GetConversationHistory(string sessionId)
        {
            if (_conversationHistory.ContainsKey(sessionId))
                return _conversationHistory[sessionId];
            return new List<object>();
        }

        public List<PropiedadIADTO> GetPropiedades()
        {
            if (_propiedadesCache != null && _propiedadesCache.Count > 0)
                return _propiedadesCache;

            // Aquí llamas a tu procedimiento almacenado
            UsuarioLogDTO usuari = (UsuarioLogDTO)HttpContext.Current.Session["UsuarioLogueado"];

            var response = NPropiedad.GetInstance().ListaPropiedadesModelo(usuari.IdRegional);
            _propiedadesCache = response.Estado ? response.Data : new List<PropiedadIADTO>();

            return _propiedadesCache;
        }

        public string GenerateChatbotResponse(string sessionId, string preguntaUsuario)
        {
            if (string.IsNullOrWhiteSpace(OpenAIApiKey))
            {
                return "Modelo inteligente no disponible. Verifique la configuración.";
            }

            var propiedades = GetPropiedades();
            if (propiedades == null || propiedades.Count == 0)
                return "En este momento no hay propiedades disponibles en el sistema.";

            var systemPrompt = ConstruirPromptDos(propiedades);

            // Armar el historial de mensajes
            var messages = new List<object>
            {
                new { role = "system", content = systemPrompt }
            };
            messages.AddRange(GetConversationHistory(sessionId));
            messages.Add(new { role = "user", content = preguntaUsuario });

            var requestBody = new
            {
                model = "gpt-4o-mini", // Adoptamos tu sugerencia: súper rápido y económico
                messages,
                temperature = 0.7 // Un buen balance para interactuar en chat
            };

            var jsonBody = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            try
            {
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", OpenAIApiKey);

                    // CORRECCIÓN: Pasamos la URL y el 'content'. Usamos GetAwaiter().GetResult() como en tu código.
                    var response = client
                        .PostAsync("https://api.openai.com/v1/chat/completions", content)
                        .GetAwaiter()
                        .GetResult();

                    if (response.IsSuccessStatusCode)
                    {
                        var responseString = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                        using (JsonDocument doc = JsonDocument.Parse(responseString))
                        {
                            var respuestaIA = doc.RootElement
                                .GetProperty("choices")[0]
                                .GetProperty("message")
                                .GetProperty("content")
                                .GetString();

                            // Guardar la interacción en el historial en memoria
                            SaveConversation(sessionId, "user", preguntaUsuario);
                            SaveConversation(sessionId, "assistant", respuestaIA);

                            return respuestaIA;
                        }
                    }
                    else
                    {
                        var errorDetails = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                        return $"Error en la solicitud: {response.StatusCode}. Detalle: {errorDetails}";
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Ocurrió un error al procesar tu consulta: {ex.Message}";
            }
        }

        private string ConstruirPromptDos(List<PropiedadIADTO> propiedades)
        {
            var sb = new StringBuilder();

            // 1. Definir la personalidad y el rol principal
            sb.AppendLine("Eres un Ingeniero Civil y Arquitecto experto en planificación estratégica e infraestructura, y un asesor inmobiliario altamente capacitado.");
            sb.AppendLine("Tu objetivo es responder consultas técnicas sobre construcción (ej. viabilidad para cuarteles, hospitales, edificios) basándote en las características de las propiedades proporcionadas.");
            sb.AppendLine("También debes recomendar propiedades específicas de la lista proporcionada si el usuario busca un terreno que se ajuste a sus necesidades.");
            sb.AppendLine("Responde de manera profesional, técnica pero comprensible, y siempre basándote en la realidad de la ingeniería civil.");
            sb.AppendLine("");

            // 2. Reglas estrictas de comportamiento y formato (Guardrails)
            sb.AppendLine("REGLAS ESTRICTAS QUE DEBES CUMPLIR OBLIGATORIAMENTE:");
            sb.AppendLine("1. BREVEDAD: Sé directo y conciso. Limita tus respuestas a un máximo de 2 o 3 párrafos cortos. Ve directo al grano.");
            sb.AppendLine("2. FUERA DE CONTEXTO: Si el usuario te hace una pregunta que NO está relacionada con bienes raíces, construcción, ingeniería civil o el catálogo de propiedades (por ejemplo, preguntas sobre el clima, chistes, programación, etc.), DEBES rechazar la pregunta. Responde ÚNICAMENTE con una variante de: 'Lo siento, mi experiencia se limita a asesorar sobre ingeniería civil y nuestro inventario de propiedades. ¿En qué puedo ayudarte respecto a estos temas?'.");
            sb.AppendLine("3. SIN FORMATO: Debes responder estrictamente en texto plano. NO uses Markdown. Está PROHIBIDO usar asteriscos (*), comillas invertidas (`), almohadillas (#) o cualquier otro carácter para dar formato de negrita, cursiva o listas.");
            sb.AppendLine("");

            // 3. Inyectar la data de la base de datos
            sb.AppendLine("Aquí tienes el inventario actual de propiedades disponibles:");

            foreach (var p in propiedades)
            {
                sb.AppendLine($"- Zona: {p.Zona} | Tipo: {p.TipoPropiedad} | Área: {p.AreaM2} m2 | Dimensiones: {p.Largo}m x {p.Ancho}m | Topografía: {p.Topografia} | Tipo de Suelo: {p.TipoSuelo} | Servicios: {p.EstadoServicios} | Riesgo Inundación: {p.RiesgoInundacion} | Riesgo Deslizamiento: {p.RiesgoDeslizamiento}. Notas: {p.NotasAdicionales}");
            }

            return sb.ToString();
        }

        private string ConstruirPrompt(List<PropiedadIADTO> propiedades)
        {
            var sb = new StringBuilder();

            // 1. Definir la personalidad y reglas (El rol de Ingeniero Civil)
            sb.AppendLine("Eres un Ingeniero Civil experto y un asesor inmobiliario altamente capacitado.");
            sb.AppendLine("Tu objetivo es responder consultas técnicas sobre construcción (ej. viabilidad para cuarteles, hospitales, edificios) basándote en el tipo de suelo y topografía.");
            sb.AppendLine("También debes recomendar propiedades específicas de la lista proporcionada si el usuario busca un terreno que se ajuste a sus necesidades.");
            sb.AppendLine("Responde de manera profesional, técnica pero comprensible, y siempre basándote en la realidad de la ingeniería civil.");
            sb.AppendLine("");

            // 2. Inyectar la data de la base de datos
            sb.AppendLine("Aquí tienes el inventario actual de propiedades disponibles:");

            foreach (var p in propiedades)
            {
                sb.AppendLine($"- Zona: {p.Zona} | Tipo: {p.TipoPropiedad} | Área: {p.AreaM2} m2 | Dimensiones: {p.Largo}m x {p.Ancho}m | Topografía: {p.Topografia} | Suelo: {p.TipoSuelo} | Servicios: {p.EstadoServicios} | Riesgo Inundación: {p.RiesgoInundacion} | Riesgo Deslizamiento: {p.RiesgoDeslizamiento}. Notas: {p.NotasAdicionales}");
            }

            return sb.ToString();
        }

    }
}