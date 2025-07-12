// Configuración de la API usando variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api"
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000

/**
 * Envía una reserva al orquestador de MuleSoft
 * @param {Object} bookingData - Datos de la reserva
 * @param {string} bookingData.cliente - Nombre del cliente
 * @param {string} bookingData.vuelo_destino - Destino del vuelo
 * @param {string} bookingData.hotel_nombre - Nombre del hotel
 * @param {number} bookingData.monto_total - Monto total de la reserva
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const submitBooking = async (bookingData) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch(`${API_BASE_URL}/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bookingData),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      // Intentar obtener el mensaje de error del servidor
      let errorMessage = "Error al procesar la reserva"

      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch (parseError) {
        // Si no se puede parsear el JSON de error, usar mensaje genérico
        errorMessage = `Error ${response.status}: ${response.statusText}`
      }

      throw new Error(errorMessage)
    }

    // Parsear la respuesta exitosa
    const data = await response.json()

    // Agregar ID de reserva si no viene del servidor
    if (!data.reserva_id) {
      data.reserva_id = `RES-${Date.now()}`
    }

    return data
  } catch (error) {
    clearTimeout(timeoutId)

    // Manejar timeout
    if (error.name === "AbortError") {
      throw new Error("Tiempo de espera agotado. El servidor tardó demasiado en responder.")
    }

    // Manejar errores de red o de conexión
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Error de conexión. Verifica que el servicio de MuleSoft esté disponible.")
    }

    // Re-lanzar otros errores
    throw error
  }
}

/**
 * Función auxiliar para verificar el estado del servicio
 * @returns {Promise<boolean>} True si el servicio está disponible
 */
export const checkServiceHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    return response.ok
  } catch (error) {
    return false
  }
}

// Función para obtener la configuración actual
export const getApiConfig = () => {
  return {
    baseUrl: API_BASE_URL,
    timeout: API_TIMEOUT,
    environment: import.meta.env.VITE_ENVIRONMENT || "development",
  }
}
