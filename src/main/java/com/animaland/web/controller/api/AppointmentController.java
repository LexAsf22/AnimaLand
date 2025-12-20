package com.animaland.web.controller.api;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.DTO.response.AppointmentResponseDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.service.AppointmentService;
import com.animaland.web.service.TreatmentRecordService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final TreatmentRecordService treatmentRecordService;

    public AppointmentController(AppointmentService appointmentService,
                                 TreatmentRecordService treatmentRecordService) {
        this.appointmentService = appointmentService;
        this.treatmentRecordService = treatmentRecordService;
    }

    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> createAppointment(@Valid @RequestBody AppointmentDTO dto) {
        return ResponseEntity.ok(appointmentService.createAppointment(dto));
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponseDTO>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponseDTO> getAppointmentById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponseDTO> updateAppointment(@PathVariable Long id,
                                                                    @Valid @RequestBody AppointmentDTO dto) {
        return ResponseEntity.ok(appointmentService.updateAppointment(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<?> completeAppointment(
            @PathVariable Long id,
            @RequestBody List<TreatmentRecordDTO> recordsDto
    ) {
        Appointment appt = appointmentService.findAppointmentById(id);
        if (appt == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
        }

        for (TreatmentRecordDTO dto : recordsDto) {
            // Link to appointment and pet
            dto.setAppointmentId(id);
            dto.setPetId(appt.getPet().getPetId());  // <-- Make sure petId exists in DTO
            treatmentRecordService.save(dto);
        }

        // Update appointment status to Completed
        appt.setStatus("Completed");
        appointmentService.save(appt);

        return ResponseEntity.ok("Appointment completed and treatment records saved.");
    }

}
