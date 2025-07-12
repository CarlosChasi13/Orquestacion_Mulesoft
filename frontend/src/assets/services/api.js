// Configuración de la API
const API_BASE_URL = "http://localhost:8081/api" // Ajusta según tu configuración de MuleSoft

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
  try {
    const response = await fetch(`${API_BASE_URL}/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bookingData),
    })

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

/**
 * Configuración para desarrollo local
 * Puedes cambiar estas URLs según tu entorno
 */
export const API_CONFIG = {
  development: "http://localhost:8081/api",
  production: "https://tu-dominio-mulesoft.com/api",
  staging: "https://staging-mulesoft.com/api",
}

// Función para cambiar la URL base según el entorno
export const setApiBaseUrl = (environment = "development") => {
  const newUrl = API_CONFIG[environment]
  if (newUrl) {
    // Aquí podrías implementar lógica para cambiar la URL base
    console.log(`API Base URL configurada para ${environment}: ${newUrl}`)
  }
}
