"use client"
import React from 'react'
import { Toaster } from "react-hot-toast"
import BookingForm from "../components/BookingForm"

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Viajes 360</h1>
          <p className="text-lg text-gray-600">Orquestador de Reservas de Viajes</p>
        </div>

        {/* Formulario */}
        <BookingForm />

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

        {/* Toast Container */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              style: {
                background: "#10B981",
              },
            },
            error: {
              style: {
                background: "#EF4444",
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default Home
