package com.animaland.web.controller.api;

import com.animaland.web.DTO.dashboard.DashboardStatsResponse;
import com.animaland.web.DTO.dashboard.RecentAppointmentResponse;
import com.animaland.web.DTO.dashboard.RecentPetResponse;
import com.animaland.web.repository.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final EmployeeRepository employeeRepository;
    private final AppointmentRepository appointmentRepository;
    private final PetRepository petRepository;
    private final OwnerRepository ownerRepository;

    public DashboardController(EmployeeRepository employeeRepository,
                               AppointmentRepository appointmentRepository,
                               PetRepository petRepository,
                               OwnerRepository ownerRepository) {
        this.employeeRepository = employeeRepository;
        this.appointmentRepository = appointmentRepository;
        this.petRepository = petRepository;
        this.ownerRepository = ownerRepository;
    }

    @GetMapping("/stats")
    public DashboardStatsResponse getStats() {
        return new DashboardStatsResponse(
                ownerRepository.count(),
                employeeRepository.count(),
                appointmentRepository.count(),
                petRepository.count()
        );
    }

    @GetMapping("/recent")
    public List<RecentAppointmentResponse> getRecentAppointments() {
        return appointmentRepository.findRecentAppointments().stream().limit(5).toList();
    }

    @GetMapping("/recent-pets")
    public List<RecentPetResponse> getRecentPets() {
        return petRepository.findRecentPets().stream().limit(5).toList();
    }
}