package com.animaland.web.DTO.appointment;

import java.util.List;

public class CompleteAppointmentDTO {

    private Long appointmentId;

    private String findings;
    private String medicinePrescribed;

    // comma-separated service names
    private String servicesGiven;

    private Double totalBill;

    // JSON string
    private String billBreakdownJson;

    // ===== Getters & Setters =====

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getFindings() {
        return findings;
    }

    public void setFindings(String findings) {
        this.findings = findings;
    }

    public String getMedicinePrescribed() {
        return medicinePrescribed;
    }

    public void setMedicinePrescribed(String medicinePrescribed) {
        this.medicinePrescribed = medicinePrescribed;
    }

    public String getServicesGiven() {
        return servicesGiven;
    }

    public void setServicesGiven(String servicesGiven) {
        this.servicesGiven = servicesGiven;
    }

    public Double getTotalBill() {
        return totalBill;
    }

    public void setTotalBill(Double totalBill) {
        this.totalBill = totalBill;
    }

    public String getBillBreakdownJson() {
        return billBreakdownJson;
    }

    public void setBillBreakdownJson(String billBreakdownJson) {
        this.billBreakdownJson = billBreakdownJson;
    }
}