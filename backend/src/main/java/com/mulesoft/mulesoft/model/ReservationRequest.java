package com.mulesoft.mulesoft.model;

public class ReservationRequest {

    private String cliente;
    private String vuelo_destino;
    private String hotel_nombre;
    private double monto_total;
    // getters y setters (o @Data de Lombok)

    public ReservationRequest(String cliente, String hotel_nombre, double monto_total, String vuelo_destino) {
        this.cliente = cliente;
        this.hotel_nombre = hotel_nombre;
        this.monto_total = monto_total;
        this.vuelo_destino = vuelo_destino;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getVuelo_destino() {
        return vuelo_destino;
    }

    public void setVuelo_destino(String vuelo_destino) {
        this.vuelo_destino = vuelo_destino;
    }

    public String getHotel_nombre() {
        return hotel_nombre;
    }

    public void setHotel_nombre(String hotel_nombre) {
        this.hotel_nombre = hotel_nombre;
    }

    public double getMonto_total() {
        return monto_total;
    }

    public void setMonto_total(double monto_total) {
        this.monto_total = monto_total;
    }
}
