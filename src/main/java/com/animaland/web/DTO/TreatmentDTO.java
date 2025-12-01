package com.animaland.web.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class TreatmentDTO {

    private Long treatmentId;

    @NotBlank(message = "Findings are required")
    private String findings;

    @NotBlank(message = "Service given is required")
    private String serviceGiven;

    @NotBlank(message = "Medicine prescribed is required")
    private String medicinePrescribed;

    @NotNull(message = "Service date is required")
    private LocalDate serviceDate;

    @NotNull(message = "Appointment ID is required")
    private Long appointmentId;

    public Long getTreatmentId() {
        return treatmentId;
    }

    public void setTreatmentId(Long treatmentId) {
        this.treatmentId = treatmentId;
    }

    public String getFindings() {
        return findings;
    }

    public void setFindings(String findings) {
        this.findings = findings;
    }

    public String getServiceGiven() {
        return serviceGiven;
    }

    public void setServiceGiven(String serviceGiven) {
        this.serviceGiven = serviceGiven;
    }

    public String getMedicinePrescribed() {
        return medicinePrescribed;
    }

    public void setMedicinePrescribed(String medicinePrescribed) {
        this.medicinePrescribed = medicinePrescribed;
    }

    public LocalDate getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(LocalDate serviceDate) {
        this.serviceDate = serviceDate;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }
}
