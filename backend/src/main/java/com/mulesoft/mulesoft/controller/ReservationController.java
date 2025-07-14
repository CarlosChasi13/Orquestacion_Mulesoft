package com.mulesoft.mulesoft.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;

import com.mulesoft.mulesoft.model.FlightResponse;
import com.mulesoft.mulesoft.model.HotelResponse;
import com.mulesoft.mulesoft.model.PaymentResponse;
import com.mulesoft.mulesoft.model.ReservationRequest;

@RestController
public class ReservationController {

    @Autowired
    private RestTemplate restTemplate;

    private final String BASE = "http://localhost:8080";

    @PostMapping("/api/reservar")
    public ResponseEntity<?> reservar(@RequestBody ReservationRequest req) {
        // 1) Reserva vuelo
        FlightResponse vuelo = restTemplate.postForObject(
                BASE + "/mock/vuelo", req, FlightResponse.class);

        // 2) Reserva hotel
        HotelResponse hotel = restTemplate.postForObject(
                BASE + "/mock/hotel", req, HotelResponse.class);

        // 3) Intenta procesar pago
        try {
            PaymentResponse pago = restTemplate.postForObject(
                    BASE + "/mock/pago", req, PaymentResponse.class);

            // 4) Todo OK → devuelve 200 con detalle
            Map<String, Object> body = Map.of(
                    "status", "reservas_confirmadas",
                    "vuelo", vuelo,
                    "hotel", hotel,
                    "pago", pago
            );
            return ResponseEntity.ok(body);

        } catch (RestClientResponseException ex) {
            // 5) Si falla el pago → compensaciones
            restTemplate.postForObject(
                    BASE + "/mock/vuelo/cancelar", req, FlightResponse.class);

            restTemplate.postForObject(
                    BASE + "/mock/hotel/cancelar", req, HotelResponse.class);

            Map<String, String> error = Map.of(
                    "error", "Reserva revertida: falla en el pago"
            );
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);
        }
    }
}
