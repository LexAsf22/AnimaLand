package com.animaland.web.DTO.response;

public class TreatmentResponseDTO {
    private Long treatmentId;
    private Long appointmentId;
    private String serviceGiven;
    private String findings;
    private String medicinePrescribed;
    private String serviceDate; // keep as String for frontend
    private Long petId;
    private String petName;
    private String petSpecies;
    private Long ownerId;
    private String ownerFirstName;
    private String ownerLastName;
    private Double totalBill;

    public TreatmentResponseDTO(Long treatmentId, Long appointmentId, String serviceGiven,
                                String findings, String medicinePrescribed, String serviceDate,
                                Long petId, String petName, String petSpecies,
                                Long ownerId, String ownerFirstName, String ownerLastName,
                                Double totalBill) {
        this.treatmentId = treatmentId;
        this.appointmentId = appointmentId;
        this.serviceGiven = serviceGiven;
        this.findings = findings;
        this.medicinePrescribed = medicinePrescribed;
        this.serviceDate = serviceDate;
        this.petId = petId;
        this.petName = petName;
        this.petSpecies = petSpecies;
        this.ownerId = ownerId;
        this.ownerFirstName = ownerFirstName;
        this.ownerLastName = ownerLastName;
        this.totalBill = totalBill;
    }

    // Getters & Setters
    public Long getTreatmentId() { return treatmentId; }
    public void setTreatmentId(Long treatmentId) { this.treatmentId = treatmentId; }

    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public String getServiceGiven() { return serviceGiven; }
    public void setServiceGiven(String serviceGiven) { this.serviceGiven = serviceGiven; }

    public String getFindings() { return findings; }
    public void setFindings(String findings) { this.findings = findings; }

    public String getMedicinePrescribed() { return medicinePrescribed; }
    public void setMedicinePrescribed(String medicinePrescribed) { this.medicinePrescribed = medicinePrescribed; }

    public String getServiceDate() { return serviceDate; }
    public void setServiceDate(String serviceDate) { this.serviceDate = serviceDate; }

    public Long getPetId() { return petId; }
    public void setPetId(Long petId) { this.petId = petId; }

    public String getPetName() { return petName; }
    public void setPetName(String petName) { this.petName = petName; }

    public String getPetSpecies() { return petSpecies; }
    public void setPetSpecies(String petSpecies) { this.petSpecies = petSpecies; }

    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }

    public String getOwnerFirstName() { return ownerFirstName; }
    public void setOwnerFirstName(String ownerFirstName) { this.ownerFirstName = ownerFirstName; }

    public String getOwnerLastName() { return ownerLastName; }
    public void setOwnerLastName(String ownerLastName) { this.ownerLastName = ownerLastName; }

    public Double getTotalBill() { return totalBill; }
    public void setTotalBill(Double totalBill) { this.totalBill = totalBill; }
}
