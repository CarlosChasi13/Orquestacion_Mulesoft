package com.mulesoft.mulesoft.model;

public class PaymentResponse {

    private String status;

    public PaymentResponse() {
    }

    public PaymentResponse(String status) {
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
