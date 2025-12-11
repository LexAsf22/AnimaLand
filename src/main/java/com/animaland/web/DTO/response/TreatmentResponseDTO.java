package com.animaland.web.DTO.response;

import java.time.LocalDate;

public class TreatmentResponseDTO {
    private Long treatmentId;
    private Long appointmentId;
    private String findings;
    private String serviceGiven;
    private String medicinePrescribed;
    private LocalDate serviceDate;

    public TreatmentResponseDTO() {}

    public TreatmentResponseDTO(Long treatmentId, Long appointmentId, String findings,
                                String serviceGiven, String medicinePrescribed, LocalDate serviceDate) {
        this.treatmentId = treatmentId;
        this.appointmentId = appointmentId;
        this.findings = findings;
        this.serviceGiven = serviceGiven;
        this.medicinePrescribed = medicinePrescribed;
        this.serviceDate = serviceDate;
    }

    // Getters & Setters
    public Long getTreatmentId() { return treatmentId; }
    public void setTreatmentId(Long treatmentId) { this.treatmentId = treatmentId; }
    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }
    public String getFindings() { return findings; }
    public void setFindings(String findings) { this.findings = findings; }
    public String getServiceGiven() { return serviceGiven; }
    public void setServiceGiven(String serviceGiven) { this.serviceGiven = serviceGiven; }
    public String getMedicinePrescribed() { return medicinePrescribed; }
    public void setMedicinePrescribed(String medicinePrescribed) { this.medicinePrescribed = medicinePrescribed; }
    public LocalDate getServiceDate() { return serviceDate; }
    public void setServiceDate(LocalDate serviceDate) { this.serviceDate = serviceDate; }
}
