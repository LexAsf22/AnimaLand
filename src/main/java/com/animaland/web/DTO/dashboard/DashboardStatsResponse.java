package com.animaland.web.DTO.dashboard;

public record DashboardStatsResponse(
        long totalOwners,
        long totalEmployees,
        long totalAppointments,
        long totalPets
) {}
