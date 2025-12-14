package com.animaland.web.controller.api;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.DTO.dashboard.RecentAppointmentResponse;
import com.animaland.web.DTO.response.AppointmentResponseDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponseDTO>> getAllAppointments() {
        List<AppointmentResponseDTO> list = appointmentService.findAllWithRelations().stream()
                .map(a -> new AppointmentResponseDTO(
                        a.getAppointmentId(),
                        a.getAppointmentDatetime(),
                        a.getStatus(),
                        a.getRemarks(),
                        a.getStaff().getEmployeeId(),
                        a.getStaff().getFirstName() + " " + a.getStaff().getLastName(),
                        a.getPet().getPetId(),
                        a.getPet().getName(),
                        a.getPet().getOwner().getOwnerId(),
                        a.getPet().getOwner().getFirstName() + " " + a.getPet().getOwner().getLastName(),
                        a.getService().getServiceId(),
                        a.getService().getServiceName()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<RecentAppointmentResponse>> getRecentAppointments() {
        return ResponseEntity.ok(appointmentService.getRecentAppointments());
    }

    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> createAppointment(@Valid @RequestBody AppointmentDTO dto) {
        Appointment created = appointmentService.save(dto);
        AppointmentResponseDTO response = new AppointmentResponseDTO(
                created.getAppointmentId(),
                created.getAppointmentDatetime(),
                created.getStatus(),
                created.getRemarks(),
                created.getStaff().getEmployeeId(),
                created.getStaff().getFirstName() + " " + created.getStaff().getLastName(),
                created.getPet().getPetId(),
                created.getPet().getName(),
                created.getPet().getOwner().getOwnerId(),
                created.getPet().getOwner().getFirstName() + " " + created.getPet().getOwner().getLastName(),
                created.getService().getServiceId(),
                created.getService().getServiceName()
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponseDTO> updateAppointment(@PathVariable Long id,
                                                                    @Valid @RequestBody AppointmentDTO dto) {
        Appointment existing = appointmentService.findById(id);
        Appointment updated = appointmentService.updateAppointment(existing, dto);
        AppointmentResponseDTO response = new AppointmentResponseDTO(
                updated.getAppointmentId(),
                updated.getAppointmentDatetime(),
                updated.getStatus(),
                updated.getRemarks(),
                updated.getStaff().getEmployeeId(),
                updated.getStaff().getFirstName() + " " + updated.getStaff().getLastName(),
                updated.getPet().getPetId(),
                updated.getPet().getName(),
                updated.getPet().getOwner().getOwnerId(),
                updated.getPet().getOwner().getFirstName() + " " + updated.getPet().getOwner().getLastName(),
                updated.getService().getServiceId(),
                updated.getService().getServiceName()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}
