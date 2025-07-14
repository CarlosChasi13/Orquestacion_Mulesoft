package com.mulesoft.mulesoft.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.mulesoft.mulesoft.model.FlightResponse;
import com.mulesoft.mulesoft.model.HotelResponse;
import com.mulesoft.mulesoft.model.PaymentResponse;
import com.mulesoft.mulesoft.model.ReservationRequest;

@RestController
public class MockController {

    @PostMapping("/mock/vuelo")
    public FlightResponse reservarVuelo(@RequestBody ReservationRequest req) {
        return new FlightResponse("reserva_vuelo_confirmada");
    }

    @PostMapping("/mock/vuelo/cancelar")
    public FlightResponse cancelarVuelo(@RequestBody ReservationRequest req) {
        return new FlightResponse("reserva_vuelo_cancelada");
    }

    @PostMapping("/mock/hotel")
    public HotelResponse reservarHotel(@RequestBody ReservationRequest req) {
        return new HotelResponse("reserva_hotel_confirmada");
    }

    @PostMapping("/mock/hotel/cancelar")
    public HotelResponse cancelarHotel(@RequestBody ReservationRequest req) {
        return new HotelResponse("reserva_hotel_cancelada");
    }

    @PostMapping("/mock/pago")
    public PaymentResponse procesarPago(@RequestBody ReservationRequest req) {
        if (req.getMonto_total() > 1000) {
            // fuerza fallo para probar compensaciones
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Pago rechazado: monto supera el límite"
            );
        }
        return new PaymentResponse("pago_confirmado");
    }
}
