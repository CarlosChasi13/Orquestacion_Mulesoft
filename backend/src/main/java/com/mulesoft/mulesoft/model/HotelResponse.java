package com.mulesoft.mulesoft.model;

public class HotelResponse {

    private String status;

    public HotelResponse() {
    }

    public HotelResponse(String status) {
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
