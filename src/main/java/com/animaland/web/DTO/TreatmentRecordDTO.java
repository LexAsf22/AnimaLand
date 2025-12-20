package com.animaland.web.DTO;

public class TreatmentRecordDTO {

    private Long petId;
    private Long appointmentId;
    private Long serviceId;               // link to ServiceEntity
    private String serviceGiven;
    private String findings;
    private String medicinePrescribed;
    private String serviceDate;           // yyyy-MM-dd
    private Double servicePrice;          // price of the service
    private Double totalBill;

    // Getters & Setters
    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public Long getPetId() { return petId; }
    public void setPetId(Long petId) { this.petId = petId; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public String getServiceGiven() { return serviceGiven; }
    public void setServiceGiven(String serviceGiven) { this.serviceGiven = serviceGiven; }

    public String getFindings() { return findings; }
    public void setFindings(String findings) { this.findings = findings; }

    public String getMedicinePrescribed() { return medicinePrescribed; }
    public void setMedicinePrescribed(String medicinePrescribed) { this.medicinePrescribed = medicinePrescribed; }

    public String getServiceDate() { return serviceDate; }
    public void setServiceDate(String serviceDate) { this.serviceDate = serviceDate; }

    public Double getServicePrice() { return servicePrice; }
    public void setServicePrice(Double servicePrice) { this.servicePrice = servicePrice; }

    public Double getTotalBill() { return totalBill; }
    public void setTotalBill(Double totalBill) { this.totalBill = totalBill; }
}
