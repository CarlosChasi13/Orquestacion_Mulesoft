# 🧳 Frontend - Orquestador de Reservas "Viajes 360"

Este proyecto es un frontend construido con **React + Vite + Tailwind CSS** para interactuar con un orquestador de servicios desarrollado en **MuleSoft**. Permite enviar datos de reserva de un paquete de viaje (vuelo + hotel + pago) y visualizar si la operación fue exitosa o revertida.

## 🚀 Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Fetch API (para consumir el servicio MuleSoft)

## 🖼️ Funcionalidad

El formulario permite ingresar:
- Nombre del cliente
- Destino del vuelo
- Nombre del hotel
- Monto total

Al enviar la información:
- Si `monto_total ≤ 1000`, la reserva se procesa exitosamente.
- Si `monto_total > 1000`, el orquestador simula un error de pago y ejecuta un rollback (cancelación de vuelo y hotel).

## 📦 Instalación

```bash
git clone https://github.com/tu_usuario/tu_repo.git
cd frontend
npm install
npm run dev
