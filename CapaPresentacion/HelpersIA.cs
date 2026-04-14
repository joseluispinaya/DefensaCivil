using CapaEntidad.DTOs;
using CapaEntidad.Responses;
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
    public class HelpersIA
    {
        private static readonly string OpenAIApiKey = ConfigurationManager.AppSettings["OpenAIApiKey"];

        #region "PATRON SINGLETON"
        private static HelpersIA _instancia = null;

        private HelpersIA()
        {

        }

        public static HelpersIA GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new HelpersIA();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<string> AnalizarDescripcionCoordenadas(decimal Latitud, decimal Longitud)
        {
            var url = "https://api.openai.com/v1/chat/completions";

            try
            {
                if (string.IsNullOrWhiteSpace(OpenAIApiKey))
                {
                    return new Respuesta<string>
                    {
                        Estado = false,
                        Mensaje = "Modelo inteligente no disponible. Verifique la configuración."
                    };
                }

                // 1. EL ROL DEL SISTEMA (System Prompt)
                // 1. EL ROL DEL SISTEMA (System Prompt) - MODO AFIRMATIVO ESTRICTO
                string systemContent = @"Eres un analista geoespacial experto y seguro de sí mismo. 
                    Tu tarea es identificar la ciudad de las coordenadas GPS y describir la infraestructura a 500 metros a la redonda con total seguridad.
                    Reglas ESTRICTAS:
                    1. Identifica la ciudad y la zona.
                    2. Menciona la infraestructura urbana que existe en ese radio (hospitales, colegios, mercados, plazas, vías principales).
                    3. PROHIBIDO DUDAR: Bajo ninguna circunstancia uses palabras como 'probable', 'posiblemente', 'quizás', 'puede haber' o 'suele haber'. Redacta de forma 100% afirmativa e indiscutible. (Ejemplo correcto: 'En este radio se encuentra un centro médico, colegios y comercio local...').
                    4. Si conoces lugares o instituciones específicas de esa coordenada, nómbralas.
                    5. Si la coordenada es campo abierto, afirma directamente que es una zona rural sin infraestructura urbana.
                    6. Sé directo, profesional y conciso (máximo 4 líneas).";

                // 2. EL PROMPT DEL USUARIO (User Prompt)
                // Aquí le pasamos los datos reales.
                string userPrompt = $@"Analiza las siguientes coordenadas y describe el entorno a 500 metros:
                    Latitud: {Latitud}
                    Longitud: {Longitud}";

                // model = "gpt-4o-mini",
                var requestBody = new
                {
                    model = "gpt-4o",
                    messages = new[]
                    {
                        new { role = "system", content = systemContent },
                        new { role = "user", content = userPrompt }
                    },
                    temperature = 0.7 // Temperatura baja (0.3 o 0.5) para que sea analítico y no invente tanta ficción
                };

                var json = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                using (var http = new HttpClient())
                {
                    http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", OpenAIApiKey);

                    var response = http
                        .PostAsync(url, content)
                        .GetAwaiter()
                        .GetResult();

                    if (!response.IsSuccessStatusCode)
                    {
                        var errorDetails = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                        return new Respuesta<string>
                        {
                            Estado = false,
                            Mensaje = "Error al comunicarse con el modelo inteligente: " + errorDetails
                        };
                    }

                    var responseJson = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                    // 3. EXTRAER EL TEXTO DE LA RESPUESTA DE OPENAI
                    // OpenAI devuelve un JSON complejo. Necesitamos navegar hasta: choices[0].message.content
                    string textoGenerado = "";
                    using (JsonDocument doc = JsonDocument.Parse(responseJson))
                    {
                        var root = doc.RootElement;
                        if (root.TryGetProperty("choices", out JsonElement choices) && choices.GetArrayLength() > 0)
                        {
                            textoGenerado = choices[0]
                                            .GetProperty("message")
                                            .GetProperty("content")
                                            .GetString();
                        }
                    }

                    // 4. RETORNAR EL DATO AL FRONTEND
                    return new Respuesta<string>
                    {
                        Estado = true,
                        Data = textoGenerado.Trim(), // Aquí va la respuesta limpia de la IA
                        Mensaje = "Descripción generada correctamente"
                    };
                }
            }
            catch (Exception ex)
            {
                return new Respuesta<string>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado al generar la descripción: " + ex.Message
                };
            }
        }

        public Respuesta<string> AnalizarDescripcionCoordenadasNew(decimal Latitud, decimal Longitud)
        {
            var url = "https://api.openai.com/v1/chat/completions";

            try
            {
                if (string.IsNullOrWhiteSpace(OpenAIApiKey))
                {
                    return new Respuesta<string>
                    {
                        Estado = false,
                        Mensaje = "Modelo inteligente no disponible. Verifique la configuración."
                    };
                }

                string serviciosReales = ObtenerLugaresCercanosNew(Latitud, Longitud);

                string systemContent = "Eres un consultor profesional sénior especializado en geografía e infraestructura urbana. Tu tarea es redactar informes técnicos, objetivos y estrictamente factuales sobre el entorno de ubicaciones geográficas de las propiedades. REGLA ABSOLUTA: Tienes PROHIBIDO usar tono comercial o de agente inmobiliario.";

                // 1. EL ROL DEL SISTEMA (System Prompt) - Tono Institucional/Táctico
                //string systemContent = @"Eres un analista de georreferenciación e infraestructura estratégica de Defensa Civil. 
                //    Tu tarea es redactar informes técnicos, objetivos y estrictamente factuales sobre el entorno de las propiedades de la institución.
                //    REGLA ABSOLUTA: Tienes PROHIBIDO usar tono comercial o de agente inmobiliario. NO uses palabras como 'residentes', 'comodidad', 'ideal', 'garantiza', 'ventaja' o 'perfecto'. Limítate a reportar los hechos geográficos como información estratégica.";

                // 2. EL PROMPT DEL USUARIO
                string userPrompt = $@"La propiedad está ubicada en las coordenadas (Lat: {Latitud}, Lng: {Longitud}).
                    El sistema de escaneo de mapas arrojó el siguiente resultado de servicios en un radio de 500 metros: [{serviciosReales}].

                    Instrucciones de redacción basadas en el resultado:
                    - Si el resultado tiene nombres de lugares (ej. hospital, school, pharmacy): Traduce los términos al español y redacta un párrafo técnico, afirmativo y directo (máximo 4 líneas). Enumera la infraestructura circundante como un informe profesional de infraestructura circundante, sin añadir juicios de valor ni beneficios.
                    - Si el resultado es 'sin_servicios': Redacta una oración técnica indicando que la propiedad se encuentra en una ubicación donde no se detecta infraestructura clave o servicios en un radio de 500 metros.
                    - Si el resultado es 'error_api': Indica formalmente que el sistema de mapeo satelital se encuentra temporalmente inaccesible y no es posible generar el reporte de entorno.

                    REGLA DE ORO: No menciones la palabra 'resultado', 'lista', ni 'error_api' literalmente. NO incluyas ninguna referencia a la institución 'Defensa Civil'. Escribe el reporte directamente describiendo el entorno.";

                var requestBody = new
                {
                    model = "gpt-4o-mini",
                    messages = new[]
                    {
                        new { role = "system", content = systemContent },
                        new { role = "user", content = userPrompt }
                    },
                    temperature = 0.3 // Temperatura baja (0.3 o 0.5) para que sea analítico y no invente tanta ficción
                };

                var json = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                using (var http = new HttpClient())
                {
                    http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", OpenAIApiKey);

                    var response = http
                        .PostAsync(url, content)
                        .GetAwaiter()
                        .GetResult();

                    if (!response.IsSuccessStatusCode)
                    {
                        var errorDetails = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                        return new Respuesta<string>
                        {
                            Estado = false,
                            Mensaje = "Error al comunicarse con el modelo inteligente: " + errorDetails
                        };
                    }

                    var responseJson = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                    // 3. EXTRAER EL TEXTO DE LA RESPUESTA DE OPENAI
                    // OpenAI devuelve un JSON complejo. Necesitamos navegar hasta: choices[0].message.content
                    string textoGenerado = "";
                    using (JsonDocument doc = JsonDocument.Parse(responseJson))
                    {
                        var root = doc.RootElement;
                        if (root.TryGetProperty("choices", out JsonElement choices) && choices.GetArrayLength() > 0)
                        {
                            textoGenerado = choices[0]
                                            .GetProperty("message")
                                            .GetProperty("content")
                                            .GetString();
                        }
                    }

                    // 4. RETORNAR EL DATO AL FRONTEND
                    return new Respuesta<string>
                    {
                        Estado = true,
                        Data = textoGenerado.Trim(), // Aquí va la respuesta limpia de la IA
                        Mensaje = "Descripción generada correctamente"
                    };
                }
            }
            catch (Exception)
            {
                return new Respuesta<string>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado al generar la descripción intente mas tarde."
                };
            }
        }

        public string ObtenerLugaresCercanos(decimal lat, decimal lng)
        {
            // Query de Overpass: busca nodos de tipo 'amenity' en un radio de 500 metros
            string query = $"[out:json];node(around:500,{lat.ToString().Replace(",", ".")},{lng.ToString().Replace(",", ".")})[\"amenity\"~\"hospital|school|market|university|clinic|pharmacy|police|place_of_worship\"];out;";
            string url = "https://overpass-api.de/api/interpreter?data=" + Uri.EscapeDataString(query);

            try
            {
                using (var http = new HttpClient())
                {
                    var response = http.GetStringAsync(url).GetAwaiter().GetResult();
                    using (JsonDocument doc = JsonDocument.Parse(response))
                    {
                        var elements = doc.RootElement.GetProperty("elements");
                        List<string> lugaresFound = new List<string>();

                        foreach (var element in elements.EnumerateArray())
                        {
                            if (element.TryGetProperty("tags", out JsonElement tags))
                            {
                                // Intentamos obtener el nombre o al menos el tipo de servicio
                                string tipo = tags.TryGetProperty("amenity", out JsonElement t) ? t.GetString() : "servicio";
                                lugaresFound.Add(tipo);
                            }
                        }

                        // Si no encontró nada, devolvemos una cadena vacía o un aviso
                        return lugaresFound.Count > 0 ? string.Join(", ", lugaresFound.Distinct()) : "zona rural o sin servicios identificados";
                    }
                }
            }
            catch { return "error_api"; }
        }

        public string ObtenerLugaresCercanosNew(decimal lat, decimal lng)
        {
            // MEJORA 1: Usamos CultureInfo.InvariantCulture para asegurar que los decimales 
            // usen punto (.) y no coma (,) sin importar el idioma de tu Windows/Servidor.
            string latStr = lat.ToString(System.Globalization.CultureInfo.InvariantCulture);
            string lngStr = lng.ToString(System.Globalization.CultureInfo.InvariantCulture);

            // MEJORA 2: 
            // - [timeout:10] le dice al servidor que aborte rápido si está muy ocupado.
            // - nwr(...) busca puntos, líneas y polígonos (edificios completos).
            // - marketplace es el tag correcto en OSM para mercados.
            // - out center; devuelve solo el centro del edificio, reduciendo el peso de la descarga.
            string query = $"[out:json][timeout:10];nwr(around:500,{latStr},{lngStr})[\"amenity\"~\"^(hospital|school|marketplace|university|clinic|pharmacy|police|place_of_worship)$\"];out tags center;";
            string url = "https://overpass-api.de/api/interpreter?data=" + Uri.EscapeDataString(query);

            try
            {
                using (var http = new HttpClient())
                {
                    // MEJORA 3: ¡CRÍTICO! Poner un User-Agent. 
                    // Pon el nombre de tu sistema y un correo de contacto (es la política de OSM).
                    http.DefaultRequestHeaders.Add("User-Agent", "AppDefensaCivil_Bolivia/1.0 (joseluisdelta1@gmail.com)");

                    // Le damos 15 segundos a nuestro C# para esperar la respuesta
                    http.Timeout = TimeSpan.FromSeconds(15);

                    var response = http.GetStringAsync(url).GetAwaiter().GetResult();

                    using (System.Text.Json.JsonDocument doc = System.Text.Json.JsonDocument.Parse(response))
                    {
                        var elements = doc.RootElement.GetProperty("elements");
                        List<string> lugaresFound = new List<string>();

                        foreach (var element in elements.EnumerateArray())
                        {
                            if (element.TryGetProperty("tags", out System.Text.Json.JsonElement tags))
                            {
                                if (tags.TryGetProperty("amenity", out System.Text.Json.JsonElement t))
                                {
                                    string tipoEnIngles = t.GetString();
                                    lugaresFound.Add(tipoEnIngles);
                                }
                            }
                        }

                        // Limpiamos duplicados (si hay 3 colegios, solo dice "school" una vez para no saturar a GPT)
                        // return lugaresFound.Count > 0 ? string.Join(", ", lugaresFound.Distinct()) : "zona rural o sin servicios clave identificados";
                        return lugaresFound.Count > 0 ? string.Join(", ", lugaresFound.Distinct()) : "sin_servicios";
                    }
                }
            }
            catch (Exception)
            {
                // Ahora si falla, te dirá exactamente por qué en lugar de un error genérico
                //return "Error al consultar mapa: " + ex.Message;
                return "error_api";
            }
        }

        // modelo ia

        public Respuesta<List<ResultadoIADTO>> GenerarRecomendacion(PropiedadIADTO informacionProp)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(OpenAIApiKey))
                {
                    return new Respuesta<List<ResultadoIADTO>>()
                    {
                        Estado = false,
                        Data = null,
                        Mensaje = "Modelo inteligente no disponible. Verifique la configuración."
                    };
                }

                // MEJORA 1: Le damos un rol más amplio
                string systemContent = @"Eres un Ingeniero Civil y Arquitecto experto en planificación estratégica e infraestructura para instituciones de Defensa Civil y Fuerzas Armadas. 
                Tu objetivo es analizar el tamaño, zona y riesgos de un terreno para recomendar la infraestructura más adecuada de un amplio catálogo de posibilidades. Responde estrictamente en formato JSON.";

                var prompt = ConstruirPrompt(informacionProp);

                var requestBody = new
                {
                    model = "gpt-4o-mini", // Súper rápido y económico para estructurar JSON
                    messages = new[]
                    {
                        new { role = "system", content = systemContent },
                        new { role = "user", content = prompt }
                    },
                    temperature = 0.6, // Temperatura baja para que respete el formato y no alucine
                    response_format = new { type = "json_object" } // Obliga a la API a responder un JSON válido
                };

                var json = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                using (var http = new HttpClient())
                {
                    http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", OpenAIApiKey);

                    var response = http
                        .PostAsync("https://api.openai.com/v1/chat/completions", content)
                        .GetAwaiter()
                        .GetResult();

                    if (!response.IsSuccessStatusCode)
                    {
                        var errorDetails = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                        return new Respuesta<List<ResultadoIADTO>>()
                        {
                            Estado = false,
                            Data = null,
                            Mensaje = "Error al comunicarse con el modelo inteligente: " + errorDetails
                        };
                    }

                    var responseJson = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                    // Llamamos a tu método extractor mejorado
                    var resultado = ExtraerResultado(responseJson);

                    return new Respuesta<List<ResultadoIADTO>>()
                    {
                        Estado = true,
                        Data = resultado,
                        Mensaje = "Recomendaciones generadas correctamente"
                    };
                }
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ResultadoIADTO>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Ocurrió un error inesperado al generar la recomendación: " + ex.Message
                };
            }
        }

        private string ConstruirPrompt(PropiedadIADTO prop)
        {
            var sb = new StringBuilder();

            sb.AppendLine("Analiza las siguientes características de una propiedad de Defensa Civil y sugiere opciones de construcción estratégica:");
            sb.AppendLine();

            // Inyectamos los datos reales del DTO
            sb.AppendLine("=== Características de la propiedad ===");
            sb.AppendLine($"- Tipo: {prop.TipoPropiedad} en Zona {prop.Zona}");
            sb.AppendLine($"- Dimensiones: {prop.AreaM2} m² (Largo: {prop.Largo}m x Ancho: {prop.Ancho}m)");
            sb.AppendLine($"- Topografía: {prop.Topografia}");
            sb.AppendLine($"- Tipo de Suelo: {prop.TipoSuelo}");
            sb.AppendLine($"- Servicios: {prop.EstadoServicios}");
            sb.AppendLine($"- Inundación: {prop.RiesgoInundacion}");
            sb.AppendLine($"- Deslizamiento: {prop.RiesgoDeslizamiento}");

            if (!string.IsNullOrWhiteSpace(prop.NotasAdicionales))
                sb.AppendLine($"- Notas Adicionales: {prop.NotasAdicionales}");

            sb.AppendLine();
            sb.AppendLine("=== INSTRUCCIONES ESTRICTAS ===");

            // MEJORA 3: Instrucción mucho más rica y condicionada
            sb.AppendLine("1. Recomienda exactamente 3 opciones de infraestructura estratégicas, variadas y altamente coherentes con el tamaño (AreaM2) y la Zona del terreno.");
            sb.AppendLine("2. Amplía tu catálogo. Considera opciones como: Oficinas administrativas, Viviendas militares, Centro de acopio, Helipuerto, Almacén de maquinaria pesada, Hospital de campaña, Cuartel logístico, Puesto de control, etc.");
            sb.AppendLine("3. Selecciona infraestructuras lógicas (Ej: No sugieras un gran Cuartel en 300m², sugiere Oficinas. No sugieras infraestructura subterránea en zonas con riesgo de inundación).");
            sb.AppendLine("4. Escribe una 'Justificacion' técnica detallando por qué el tamaño, el suelo, la topografía o la ubicación hacen ideal esta elección.");
            sb.AppendLine();

            // Forzamos la estructura JSON exacta con tus nuevas variables
            sb.AppendLine("Responde ÚNICAMENTE con un JSON válido que siga EXACTAMENTE la siguiente estructura, sin texto adicional ni formato Markdown fuera del JSON:");
            sb.AppendLine("{");
            sb.AppendLine("  \"Recomendaciones\": [");
            sb.AppendLine("    {");
            sb.AppendLine("      \"TipoInfraestructura\": \"nombre de la infraestructura sugerida\",");
            sb.AppendLine("      \"Justificacion\": \"razón técnica detallada de la elección\"");
            sb.AppendLine("    }");
            sb.AppendLine("  ]");
            sb.AppendLine("}");

            return sb.ToString();
        }

        private List<ResultadoIADTO> ExtraerResultado(string jsonResponse)
        {
            try
            {
                using (var doc = JsonDocument.Parse(jsonResponse))
                {
                    var contentString = doc.RootElement
                        .GetProperty("choices")[0]
                        .GetProperty("message")
                        .GetProperty("content")
                        .GetString();

                    // Limpieza de seguridad: Quitamos las etiquetas Markdown si la IA las incluyó
                    if (!string.IsNullOrWhiteSpace(contentString))
                    {
                        contentString = contentString.Trim();
                        if (contentString.StartsWith("```json", StringComparison.OrdinalIgnoreCase))
                        {
                            contentString = contentString.Substring(7);
                        }
                        else if (contentString.StartsWith("```"))
                        {
                            contentString = contentString.Substring(3);
                        }

                        if (contentString.EndsWith("```"))
                        {
                            contentString = contentString.Substring(0, contentString.Length - 3);
                        }
                        contentString = contentString.Trim();
                    }

                    // Opciones flexibles
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };

                    // PARTE CLAVE: Extraemos directamente el array "Recomendaciones" del JSON limpio
                    using (var cleanDoc = JsonDocument.Parse(contentString))
                    {
                        var arrayElement = cleanDoc.RootElement.GetProperty("Recomendaciones");

                        // Deserializamos solo el array a una Lista de C#
                        return JsonSerializer.Deserialize<List<ResultadoIADTO>>(arrayElement.GetRawText(), options);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al procesar el JSON de la IA. Detalle: {ex.Message}");
            }
        }

    }
}