package com.animaland.web.DTO;

import java.time.LocalDateTime;

public class AppointmentResponseDTO {
    private Long appointmentId;
    private LocalDateTime appointmentDatetime;
    private String status;
    private String remarks;
    private Long staffId;
    private String staffName;
    private Long petId;
    private String petName;
    private Long serviceId;
    private String serviceName;

    public AppointmentResponseDTO() {}

    public AppointmentResponseDTO(Long appointmentId, LocalDateTime appointmentDatetime, String status, String remarks,
                                  Long staffId, String staffName, Long petId, String petName, Long serviceId, String serviceName) {
        this.appointmentId = appointmentId;
        this.appointmentDatetime = appointmentDatetime;
        this.status = status;
        this.remarks = remarks;
        this.staffId = staffId;
        this.staffName = staffName;
        this.petId = petId;
        this.petName = petName;
        this.serviceId = serviceId;
        this.serviceName = serviceName;
    }

    // Getters & Setters
    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }
    public LocalDateTime getAppointmentDatetime() { return appointmentDatetime; }
    public void setAppointmentDatetime(LocalDateTime appointmentDatetime) { this.appointmentDatetime = appointmentDatetime; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    public Long getStaffId() { return staffId; }
    public void setStaffId(Long staffId) { this.staffId = staffId; }
    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }
    public Long getPetId() { return petId; }
    public void setPetId(Long petId) { this.petId = petId; }
    public String getPetName() { return petName; }
    public void setPetName(String petName) { this.petName = petName; }
    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }
    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }
}
