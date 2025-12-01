package com.animaland.web.DTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class AppointmentDTO {

    private Long appointmentId;

    @NotNull(message = "Appointment date and time is required")
    private LocalDateTime appointmentDatetime;

    @NotBlank(message = "Remarks are required")
    private String remarks;

    @NotNull(message = "Pet ID is required")
    private Long petId;

    @NotNull(message = "Service ID is required")
    private Long serviceId;

    @NotNull(message = "Staff ID is required")
    private Long staffId;

    private List<Long> treatmentIds;

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public LocalDateTime getAppointmentDatetime() {
        return appointmentDatetime;
    }

    public void setAppointmentDatetime(LocalDateTime appointmentDatetime) {
        this.appointmentDatetime = appointmentDatetime;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Long getPetId() {
        return petId;
    }

    public void setPetId(Long petId) {
        this.petId = petId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }

    public List<Long> getTreatmentIds() {
        return treatmentIds;
    }

    public void setTreatmentIds(List<Long> treatmentIds) {
        this.treatmentIds = treatmentIds;
    }
}
