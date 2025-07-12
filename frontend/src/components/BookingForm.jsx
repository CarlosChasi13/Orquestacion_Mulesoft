"use client"

import React from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { submitBooking } from "../services/api"
import {
  User,
  PlaneTakeoff,
  Hotel,
  CreditCard,
  Loader2,
  AlertTriangle,
  Send,
  Trash2
} from "lucide-react"

const BookingForm = () => {
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
    if (!formData.cliente.trim()) newErrors.cliente = "El nombre del cliente es requerido"
    if (!formData.vuelo_destino.trim()) newErrors.vuelo_destino = "El destino del vuelo es requerido"
    if (!formData.hotel_nombre.trim()) newErrors.hotel_nombre = "El nombre del hotel es requerido"
    if (formData.monto_total <= 0) newErrors.monto_total = "El monto debe ser mayor a 0"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error("Por favor, completa todos los campos requeridos")
      return
    }

    setLoading(true)
    const loadingToast = toast.loading("Procesando reserva...")

    try {
      const result = await submitBooking(formData)
      toast.dismiss(loadingToast)
      toast.success("¡Reserva realizada exitosamente!", { duration: 5000, icon: "✈️" })
      if (result.reserva_id) {
        setTimeout(() => {
          toast.success(`ID de Reserva: ${result.reserva_id}`, { duration: 8000 })
        }, 1000)
      }
      resetForm()
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error(error.message || "Error al procesar la reserva. La transacción fue revertida.", { duration: 6000 })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const resetForm = () => {
    setFormData({ cliente: "", vuelo_destino: "", hotel_nombre: "", monto_total: 0 })
    setErrors({})
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <PlaneTakeoff className="w-5 h-5" />
          Nueva Reserva de Viaje
        </h2>
        <p className="text-gray-600">Complete los datos para reservar su paquete de vuelo + hotel</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {["cliente", "vuelo_destino", "hotel_nombre"].map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              {field === "cliente" ? <User className="w-4 h-4" /> : field === "vuelo_destino" ? <PlaneTakeoff className="w-4 h-4" /> : <Hotel className="w-4 h-4" />}
              {field === "cliente" ? "Nombre del Cliente" : field === "vuelo_destino" ? "Destino del Vuelo" : "Nombre del Hotel"}
            </label>
            <input
              id={field}
              type="text"
              placeholder={field === "cliente" ? "Ej: Ana Torres" : field === "vuelo_destino" ? "Ej: Madrid" : "Ej: Hotel Central"}
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[field] && <p className="text-sm text-red-500">{errors[field]}</p>}
          </div>
        ))}

        <div className="space-y-2">
          <label htmlFor="monto_total" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
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
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-700" />
              <p className="text-yellow-700 text-sm">
                Montos superiores a $1000 pueden fallar en el procesamiento de pago (simulación de error)
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Procesando Reserva...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Realizar Reserva
              </>
            )}
          </button>

          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Limpiar
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm
