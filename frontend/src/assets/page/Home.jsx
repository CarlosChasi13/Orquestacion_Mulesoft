"use client"

import { useState } from "react"
import BookingForm from "../../components/BookingForm"

const Home = () => {
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Viajes 360</h1>
          <p className="text-lg text-gray-600">Orquestador de Reservas de Viajes</p>
        </div>

        {/* Formulario */}
        <BookingForm onResult={setResult} />

        {/* Resultado */}
        {result && (
          <div
            className={`mt-6 rounded-lg shadow-lg p-6 border-2 ${
              result.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
            }`}
          >
            <div className="flex items-start gap-3">
              {result.success ? (
                <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <div className="flex-1">
                <h3 className={`font-semibold ${result.success ? "text-green-800" : "text-red-800"}`}>
                  {result.success ? "Reserva Exitosa" : "Error en la Reserva"}
                </h3>
                <p className={`mt-1 ${result.success ? "text-green-700" : "text-red-700"}`}>{result.message}</p>
                {result.success && result.data && result.data.reserva_id && (
                  <p className="mt-2 text-sm text-green-600">
                    <strong>ID de Reserva:</strong> {result.data.reserva_id}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Información del Sistema */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Sistema</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Proceso:</strong> Reserva de Vuelo → Reserva de Hotel → Procesamiento de Pago
            </p>
            <p>
              <strong>Compensación:</strong> En caso de error, se cancelan automáticamente las reservas realizadas
            </p>
            <p>
              <strong>Simulación de Error:</strong> Montos superiores a $1000 fallarán intencionalmente
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
