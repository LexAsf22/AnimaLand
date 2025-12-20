package com.animaland.web.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class TreatmentRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long treatmentId;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    private String serviceGiven;
    private String findings;
    private String medicinePrescribed;
    private LocalDate serviceDate;
    private Double totalBill;

    // Getters and Setters
    public Long getTreatmentId() { return treatmentId; }
    public void setTreatmentId(Long treatmentId) { this.treatmentId = treatmentId; }

    public Appointment getAppointment() { return appointment; }
    public void setAppointment(Appointment appointment) { this.appointment = appointment; }

    public String getServiceGiven() { return serviceGiven; }
    public void setServiceGiven(String serviceGiven) { this.serviceGiven = serviceGiven; }

    public String getFindings() { return findings; }
    public void setFindings(String findings) { this.findings = findings; }

    public String getMedicinePrescribed() { return medicinePrescribed; }
    public void setMedicinePrescribed(String medicinePrescribed) { this.medicinePrescribed = medicinePrescribed; }

    public LocalDate getServiceDate() { return serviceDate; }
    public void setServiceDate(LocalDate serviceDate) { this.serviceDate = serviceDate; }

    public Double getTotalBill() { return totalBill; }
    public void setTotalBill(Double totalBill) { this.totalBill = totalBill; }
}
