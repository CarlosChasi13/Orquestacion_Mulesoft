"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plane, Building2, CreditCard, CheckCircle, XCircle } from "lucide-react"

interface ReservaData {
  cliente: string
  vuelo_destino: string
  hotel_nombre: string
  monto_total: number
}

interface ApiResponse {
  success: boolean
  message: string
  reserva_id?: string
}

export default function Component() {
  const [formData, setFormData] = useState<ReservaData>({
    cliente: "",
    vuelo_destino: "",
    hotel_nombre: "",
    monto_total: 0,
  })

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setResponse(null)

    try {
      // Aquí iría la URL de tu API de MuleSoft
      const apiUrl = "http://localhost:8081/api/reservas" // Ajusta según tu configuración

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setResponse({
          success: true,
          message: "¡Reserva realizada exitosamente!",
          reserva_id: data.reserva_id || "RES-" + Date.now(),
        })
      } else {
        setResponse({
          success: false,
          message: data.message || "Error al procesar la reserva. La transacción fue revertida.",
        })
      }
    } catch (error) {
      setResponse({
        success: false,
        message: "Error de conexión. Por favor, verifica que el servicio esté disponible.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof ReservaData, value: string | number) => {
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
    setResponse(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Viajes 360</h1>
          <p className="text-lg text-gray-600">Orquestador de Reservas de Viajes</p>
        </div>

        {/* Formulario Principal */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="w-5 h-5" />
              Nueva Reserva de Viaje
            </CardTitle>
            <CardDescription>Complete los datos para reservar su paquete de vuelo + hotel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cliente */}
              <div className="space-y-2">
                <Label htmlFor="cliente">Nombre del Cliente</Label>
                <Input
                  id="cliente"
                  type="text"
                  placeholder="Ej: Ana Torres"
                  value={formData.cliente}
                  onChange={(e) => handleInputChange("cliente", e.target.value)}
                  className={errors.cliente ? "border-red-500" : ""}
                />
                {errors.cliente && <p className="text-sm text-red-500">{errors.cliente}</p>}
              </div>

              {/* Destino del Vuelo */}
              <div className="space-y-2">
                <Label htmlFor="vuelo_destino" className="flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Destino del Vuelo
                </Label>
                <Input
                  id="vuelo_destino"
                  type="text"
                  placeholder="Ej: Madrid"
                  value={formData.vuelo_destino}
                  onChange={(e) => handleInputChange("vuelo_destino", e.target.value)}
                  className={errors.vuelo_destino ? "border-red-500" : ""}
                />
                {errors.vuelo_destino && <p className="text-sm text-red-500">{errors.vuelo_destino}</p>}
              </div>

              {/* Hotel */}
              <div className="space-y-2">
                <Label htmlFor="hotel_nombre" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Nombre del Hotel
                </Label>
                <Input
                  id="hotel_nombre"
                  type="text"
                  placeholder="Ej: Hotel Central"
                  value={formData.hotel_nombre}
                  onChange={(e) => handleInputChange("hotel_nombre", e.target.value)}
                  className={errors.hotel_nombre ? "border-red-500" : ""}
                />
                {errors.hotel_nombre && <p className="text-sm text-red-500">{errors.hotel_nombre}</p>}
              </div>

              {/* Monto Total */}
              <div className="space-y-2">
                <Label htmlFor="monto_total" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Monto Total (USD)
                </Label>
                <Input
                  id="monto_total"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="850.00"
                  value={formData.monto_total || ""}
                  onChange={(e) => handleInputChange("monto_total", Number.parseFloat(e.target.value) || 0)}
                  className={errors.monto_total ? "border-red-500" : ""}
                />
                {errors.monto_total && <p className="text-sm text-red-500">{errors.monto_total}</p>}
                {formData.monto_total > 1000 && (
                  <Alert className="border-yellow-500 bg-yellow-50">
                    <AlertDescription className="text-yellow-700">
                      ⚠️ Montos superiores a $1000 pueden fallar en el procesamiento de pago (simulación de error)
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Procesando Reserva...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Realizar Reserva
                    </>
                  )}
                </Button>

                <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
                  Limpiar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Respuesta del Servidor */}
        {response && (
          <Card
            className={`border-2 ${response.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                {response.success ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3 className={`font-semibold ${response.success ? "text-green-800" : "text-red-800"}`}>
                    {response.success ? "Reserva Exitosa" : "Error en la Reserva"}
                  </h3>
                  <p className={`mt-1 ${response.success ? "text-green-700" : "text-red-700"}`}>{response.message}</p>
                  {response.success && response.reserva_id && (
                    <p className="mt-2 text-sm text-green-600">
                      <strong>ID de Reserva:</strong> {response.reserva_id}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Información del Sistema */}
        <Card className="mt-6 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-sm">Información del Sistema</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Proceso:</strong> Reserva de Vuelo → Reserva de Hotel → Procesamiento de Pago
            </p>
            <p>
              <strong>Compensación:</strong> En caso de error, se cancelan automáticamente las reservas realizadas
            </p>
            <p>
              <strong>Simulación de Error:</strong> Montos superiores a $1000 fallarán intencionalmente
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
