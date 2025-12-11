package com.animaland.web.controller.api;

import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.DTO.response.TreatmentResponseDTO;
import com.animaland.web.models.TreatmentRecord;
import com.animaland.web.service.TreatmentRecordService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/treatments")
public class TreatmentRecordController {

    private final TreatmentRecordService treatmentRecordService;

    public TreatmentRecordController(TreatmentRecordService treatmentRecordService) {
        this.treatmentRecordService = treatmentRecordService;
    }

    @GetMapping
    public ResponseEntity<List<TreatmentResponseDTO>> getAllTreatments() {
        List<TreatmentResponseDTO> list = treatmentRecordService.findAll().stream()
                .map(t -> new TreatmentResponseDTO(
                        t.getTreatmentId(),
                        t.getAppointment().getAppointmentId(),
                        t.getFindings(),
                        t.getServiceGiven(),
                        t.getMedicinePrescribed(),
                        t.getServiceDate()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<TreatmentResponseDTO> createTreatment(@Valid @RequestBody TreatmentRecordDTO dto) {
        TreatmentRecord created = treatmentRecordService.save(dto);
        TreatmentResponseDTO response = new TreatmentResponseDTO(
                created.getTreatmentId(),
                created.getAppointment().getAppointmentId(),
                created.getFindings(),
                created.getServiceGiven(),
                created.getMedicinePrescribed(),
                created.getServiceDate()
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TreatmentResponseDTO> updateTreatment(@PathVariable Long id, @Valid @RequestBody TreatmentRecordDTO dto) {
        TreatmentRecord existing = treatmentRecordService.findById(id);
        if (existing == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Treatment not found");
        TreatmentRecord updated = treatmentRecordService.updateTreatment(existing, dto);
        TreatmentResponseDTO response = new TreatmentResponseDTO(
                updated.getTreatmentId(),
                updated.getAppointment().getAppointmentId(),
                updated.getFindings(),
                updated.getServiceGiven(),
                updated.getMedicinePrescribed(),
                updated.getServiceDate()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTreatment(@PathVariable Long id) {
        TreatmentRecord existing = treatmentRecordService.findById(id);
        if (existing == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Treatment not found");
        treatmentRecordService.deleteTreatment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<List<TreatmentResponseDTO>> getTreatmentsByAppointment(@PathVariable Long appointmentId) {
        List<TreatmentResponseDTO> list = treatmentRecordService.findByAppointmentId(appointmentId).stream()
                .map(t -> new TreatmentResponseDTO(
                        t.getTreatmentId(),
                        t.getAppointment().getAppointmentId(),
                        t.getFindings(),
                        t.getServiceGiven(),
                        t.getMedicinePrescribed(),
                        t.getServiceDate()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}
