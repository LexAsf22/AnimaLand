package com.animaland.web.DTO.appointment;

public class BillItemDTO {

    private String description;
    private Double amount;

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
}