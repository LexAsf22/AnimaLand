package com.animaland.web.controller.api;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.DTO.response.AppointmentResponseDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponseDTO>> getAllAppointments() {
        List<AppointmentResponseDTO> list = appointmentService.findAllWithRelations()
                .stream()
                .map(appointmentService::mapToResponseDTO)
                .toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponseDTO> getAppointment(@PathVariable Long id) {
        Appointment appt = appointmentService.findById(id);
        return ResponseEntity.ok(appointmentService.mapToResponseDTO(appt));
    }

    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> createAppointment(@RequestBody AppointmentDTO dto) {
        return ResponseEntity.ok(appointmentService.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponseDTO> updateAppointment(@PathVariable Long id,
                                                                    @RequestBody AppointmentDTO dto) {
        Appointment existing = appointmentService.findById(id);
        return ResponseEntity.ok(appointmentService.updateAppointment(existing, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<AppointmentResponseDTO> completeAppointment(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.completeAppointment(id));
    }
}
