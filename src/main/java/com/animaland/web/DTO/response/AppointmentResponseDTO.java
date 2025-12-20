package com.animaland.web.DTO.response;

import java.time.LocalDateTime;
import java.util.List;

public class AppointmentResponseDTO {

    private Long appointmentId;
    private Long petId;
    private String petName;
    private String petSpecies;
    private String ownerName;

    private List<Long> serviceIds;
    private List<String> serviceNames;

    private Long staffId;
    private String staffName;

    private LocalDateTime appointmentDatetime;
    private String status;
    private String remarks;

    public AppointmentResponseDTO(
            Long appointmentId,
            Long petId,
            String petName,
            String petSpecies,
            String ownerName,
            List<Long> serviceIds,
            List<String> serviceNames,
            Long staffId,
            String staffName,
            LocalDateTime appointmentDatetime,
            String status,
            String remarks
    ) {
        this.appointmentId = appointmentId;
        this.petId = petId;
        this.petName = petName;
        this.petSpecies = petSpecies;
        this.ownerName = ownerName;
        this.serviceIds = serviceIds;
        this.serviceNames = serviceNames;
        this.staffId = staffId;
        this.staffName = staffName;
        this.appointmentDatetime = appointmentDatetime;
        this.status = status;
        this.remarks = remarks;
    }

    // GETTERS
    public Long getAppointmentId() { return appointmentId; }
    public Long getPetId() { return petId; }
    public String getPetName() { return petName; }
    public String getPetSpecies() { return petSpecies; }
    public String getOwnerName() { return ownerName; }
    public List<Long> getServiceIds() { return serviceIds; }
    public List<String> getServiceNames() { return serviceNames; }
    public Long getStaffId() { return staffId; }
    public String getStaffName() { return staffName; }
    public LocalDateTime getAppointmentDatetime() { return appointmentDatetime; }
    public String getStatus() { return status; }
    public String getRemarks() { return remarks; }
}
