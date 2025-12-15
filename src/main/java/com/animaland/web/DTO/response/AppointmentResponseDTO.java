package com.animaland.web.DTO.response;

import java.time.LocalDateTime;

public class AppointmentResponseDTO {

    private Long appointmentId;
    private Long petId;
    private String petName;
    private String petSpecies;
    private String ownerName;
    private Long serviceId;
    private String serviceName;
    private Long staffId;
    private String staffName;
    private LocalDateTime appointmentDatetime;
    private String status;
    private String remarks;

    public AppointmentResponseDTO() {} // ✅ No-args constructor

    // Optional: All-args constructor
    public AppointmentResponseDTO(Long appointmentId, Long petId, String petName, String petSpecies,
                                  String ownerName, Long serviceId, String serviceName, Long staffId,
                                  String staffName, LocalDateTime appointmentDatetime, String status, String remarks) {
        this.appointmentId = appointmentId;
        this.petId = petId;
        this.petName = petName;
        this.petSpecies = petSpecies;
        this.ownerName = ownerName;
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.staffId = staffId;
        this.staffName = staffName;
        this.appointmentDatetime = appointmentDatetime;
        this.status = status;
        this.remarks = remarks;
    }

    // -------- Getters & Setters --------
    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public Long getPetId() { return petId; }
    public void setPetId(Long petId) { this.petId = petId; }

    public String getPetName() { return petName; }
    public void setPetName(String petName) { this.petName = petName; }

    public String getPetSpecies() { return petSpecies; }
    public void setPetSpecies(String petSpecies) { this.petSpecies = petSpecies; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public Long getStaffId() { return staffId; }
    public void setStaffId(Long staffId) { this.staffId = staffId; }

    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }

    public LocalDateTime getAppointmentDatetime() { return appointmentDatetime; }
    public void setAppointmentDatetime(LocalDateTime appointmentDatetime) { this.appointmentDatetime = appointmentDatetime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
