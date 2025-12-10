package com.animaland.web.DTO.dashboard;

import java.time.LocalDateTime;

public record RecentAppointmentResponse(
        Long appointmentId,
        String petName,
        String ownerName,
        String serviceName,
        LocalDateTime appointmentDatetime
) {}
