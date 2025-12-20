
package com.animaland.web.DTO.dashboard;

import java.time.LocalDateTime;

public class RecentAppointmentResponse {

    private Long appointmentId;
    private String petName;
    private String ownerFullName;
    private String serviceName;
    private LocalDateTime appointmentDatetime;

    public RecentAppointmentResponse(Long appointmentId, String petName, String ownerFullName, String serviceName, LocalDateTime appointmentDatetime) {
        this.appointmentId = appointmentId;
        this.petName = petName;
        this.ownerFullName = ownerFullName;
        this.serviceName = serviceName;
        this.appointmentDatetime = appointmentDatetime;
    }

    public Long getAppointmentId() { return appointmentId; }
    public String getPetName() { return petName; }
    public String getOwnerFullName() { return ownerFullName; }
    public String getServiceName() { return serviceName; }
    public LocalDateTime getAppointmentDatetime() { return appointmentDatetime; }
}
