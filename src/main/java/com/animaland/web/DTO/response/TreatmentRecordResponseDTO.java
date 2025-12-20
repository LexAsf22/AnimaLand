package com.animaland.web.DTO.response;

public class TreatmentRecordResponseDTO {

    private Long treatmentId;
    private String petName;
    private String ownerName;
    private String staffName;
    private String serviceGiven;
    private Double servicePrice;
    private String findings;
    private String medicinePrescribed;
    private String serviceDate;
    private Double totalBill;

    public TreatmentRecordResponseDTO(Long treatmentId, String petName, String ownerName, String staffName,
                                      String serviceGiven, Double servicePrice, String findings,
                                      String medicinePrescribed, String serviceDate, Double totalBill) {
        this.treatmentId = treatmentId;
        this.petName = petName;
        this.ownerName = ownerName;
        this.staffName = staffName;
        this.serviceGiven = serviceGiven;
        this.servicePrice = servicePrice;
        this.findings = findings;
        this.medicinePrescribed = medicinePrescribed;
        this.serviceDate = serviceDate;
        this.totalBill = totalBill;
    }

    // Getters & Setters
    public Long getTreatmentId() { return treatmentId; }
    public void setTreatmentId(Long treatmentId) { this.treatmentId = treatmentId; }

    public String getPetName() { return petName; }
    public void setPetName(String petName) { this.petName = petName; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }

    public String getServiceGiven() { return serviceGiven; }
    public void setServiceGiven(String serviceGiven) { this.serviceGiven = serviceGiven; }

    public Double getServicePrice() { return servicePrice; }
    public void setServicePrice(Double servicePrice) { this.servicePrice = servicePrice; }

    public String getFindings() { return findings; }
    public void setFindings(String findings) { this.findings = findings; }

    public String getMedicinePrescribed() { return medicinePrescribed; }
    public void setMedicinePrescribed(String medicinePrescribed) { this.medicinePrescribed = medicinePrescribed; }

    public String getServiceDate() { return serviceDate; }
    public void setServiceDate(String serviceDate) { this.serviceDate = serviceDate; }

    public Double getTotalBill() { return totalBill; }
    public void setTotalBill(Double totalBill) { this.totalBill = totalBill; }
}
