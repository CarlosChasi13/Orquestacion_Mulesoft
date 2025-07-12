"use client"

import { useState } from "react"
import { submitBooking } from "../assets/services/api"

const BookingForm = ({ onResult }) => {
  const [formData, setFormData] = useState({
    cliente: "",
    vuelo_destino: "",
    hotel_nombre: "",
    monto_total: 0,
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.cliente.trim()) {
      newErrors.cliente = "El nombre del cliente es requerido"
    }

    if (!formData.vuelo_destino.trim()) {
      newErrors.vuelo_destino = "El destino del vuelo es requerido"
    }

    if (!formData.hotel_nombre.trim()) {
      newErrors.hotel_nombre = "El nombre del hotel es requerido"
    }

    if (formData.monto_total <= 0) {
      newErrors.monto_total = "El monto debe ser mayor a 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const result = await submitBooking(formData)
      onResult({
        success: true,
        message: "¡Reserva realizada exitosamente!",
        data: result,
      })
    } catch (error) {
      onResult({
        success: false,
        message: error.message || "Error al procesar la reserva. La transacción fue revertida.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const resetForm = () => {
    setFormData({
      cliente: "",
      vuelo_destino: "",
      hotel_nombre: "",
      monto_total: 0,
    })
    setErrors({})
    onResult(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Nueva Reserva de Viaje
        </h2>
        <p className="text-gray-600">Complete los datos para reservar su paquete de vuelo + hotel</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cliente */}
        <div className="space-y-2">
          <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">
            Nombre del Cliente
          </label>
          <input
            id="cliente"
            type="text"
            placeholder="Ej: Ana Torres"
            value={formData.cliente}
            onChange={(e) => handleInputChange("cliente", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.cliente ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cliente && <p className="text-sm text-red-500">{errors.cliente}</p>}
        </div>

        {/* Destino del Vuelo */}
        <div className="space-y-2">
          <label htmlFor="vuelo_destino" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Destino del Vuelo
          </label>
          <input
            id="vuelo_destino"
            type="text"
            placeholder="Ej: Madrid"
            value={formData.vuelo_destino}
            onChange={(e) => handleInputChange("vuelo_destino", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.vuelo_destino ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.vuelo_destino && <p className="text-sm text-red-500">{errors.vuelo_destino}</p>}
        </div>

        {/* Hotel */}
        <div className="space-y-2">
          <label htmlFor="hotel_nombre" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Nombre del Hotel
          </label>
          <input
            id="hotel_nombre"
            type="text"
            placeholder="Ej: Hotel Central"
            value={formData.hotel_nombre}
            onChange={(e) => handleInputChange("hotel_nombre", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.hotel_nombre ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.hotel_nombre && <p className="text-sm text-red-500">{errors.hotel_nombre}</p>}
        </div>

        {/* Monto Total */}
        <div className="space-y-2">
          <label htmlFor="monto_total" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Monto Total (USD)
          </label>
          <input
            id="monto_total"
            type="number"
            step="0.01"
            min="0"
            placeholder="850.00"
            value={formData.monto_total || ""}
            onChange={(e) => handleInputChange("monto_total", Number.parseFloat(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.monto_total ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.monto_total && <p className="text-sm text-red-500">{errors.monto_total}</p>}

          {formData.monto_total > 1000 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-yellow-700 text-sm">
                ⚠️ Montos superiores a $1000 pueden fallar en el procesamiento de pago (simulación de error)
              </p>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Procesando Reserva...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Realizar Reserva
              </>
            )}
          </button>

          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm
