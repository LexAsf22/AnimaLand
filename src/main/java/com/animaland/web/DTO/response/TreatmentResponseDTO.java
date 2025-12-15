package com.animaland.web.DTO.response;

public class TreatmentResponseDTO {

    private Long treatmentId;
    private String petName;
    private String serviceGiven;
    private String staffName;
    private String ownerName;
    private String serviceDate;
    private String medicinePrescribed;
    private Double totalBill;

    public TreatmentResponseDTO(Long treatmentId, String petName, String serviceGiven,
                                String staffName, String ownerName, String serviceDate,
                                String medicinePrescribed, Double totalBill) {
        this.treatmentId = treatmentId;
        this.petName = petName;
        this.serviceGiven = serviceGiven;
        this.staffName = staffName;
        this.ownerName = ownerName;
        this.serviceDate = serviceDate;
        this.medicinePrescribed = medicinePrescribed;
        this.totalBill = totalBill;
    }

    // Getters & Setters
    public Long getTreatmentId() { return treatmentId; }
    public void setTreatmentId(Long treatmentId) { this.treatmentId = treatmentId; }

    public String getPetName() { return petName; }
    public void setPetName(String petName) { this.petName = petName; }

    public String getServiceGiven() { return serviceGiven; }
    public void setServiceGiven(String serviceGiven) { this.serviceGiven = serviceGiven; }

    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getServiceDate() { return serviceDate; }
    public void setServiceDate(String serviceDate) { this.serviceDate = serviceDate; }

    public String getMedicinePrescribed() { return medicinePrescribed; }
    public void setMedicinePrescribed(String medicinePrescribed) { this.medicinePrescribed = medicinePrescribed; }

    public Double getTotalBill() { return totalBill; }
    public void setTotalBill(Double totalBill) { this.totalBill = totalBill; }
}
