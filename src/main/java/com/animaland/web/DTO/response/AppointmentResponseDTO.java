package com.animaland.web.DTO.response;

import com.animaland.web.DTO.ServiceEntityDTO;

import java.time.LocalDateTime;
import java.util.List;

public class AppointmentResponseDTO {

    private Long appointmentId;
    private String petName;
    private String staffName;
    private List<ServiceEntityDTO> services; // full service objects
    private LocalDateTime appointmentDatetime;
    private String remarks;
    private String status;

    // Getters & Setters
    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public String getPetName() { return petName; }
    public void setPetName(String petName) { this.petName = petName; }

    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }

    public List<ServiceEntityDTO> getServices() { return services; }
    public void setServices(List<ServiceEntityDTO> services) { this.services = services; }

    public LocalDateTime getAppointmentDatetime() { return appointmentDatetime; }
    public void setAppointmentDatetime(LocalDateTime appointmentDatetime) { this.appointmentDatetime = appointmentDatetime; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
