package com.mulesoft.mulesoft.model;

public class FlightResponse {

    private String status;

    public FlightResponse() {
    }

    public FlightResponse(String status) {
        this.status = status;
    }
    // getter + setter

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
