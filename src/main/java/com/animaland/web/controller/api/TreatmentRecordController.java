package com.animaland.web.controller.api;

import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.models.TreatmentRecord;
import com.animaland.web.service.TreatmentRecordService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/treatments")
public class TreatmentRecordController {

    private final TreatmentRecordService treatmentRecordService;

    public TreatmentRecordController(TreatmentRecordService treatmentRecordService) {
        this.treatmentRecordService = treatmentRecordService;
    }

    // --------------------------
    // GET ALL TREATMENTS
    // --------------------------
    @GetMapping
    public ResponseEntity<List<TreatmentRecord>> getAllTreatments() {
        List<TreatmentRecord> treatments = treatmentRecordService.findAll();
        return ResponseEntity.ok(treatments);
    }

    // --------------------------
    // CREATE TREATMENT
    // --------------------------
    @PostMapping
    public ResponseEntity<TreatmentRecord> createTreatment(
            @Valid @RequestBody TreatmentRecordDTO treatmentRecordDTO
    ) {
        TreatmentRecord created = treatmentRecordService.save(treatmentRecordDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // --------------------------
    // UPDATE TREATMENT
    // --------------------------
    @PutMapping("/{id}")
    public ResponseEntity<TreatmentRecord> updateTreatment(
            @PathVariable Long id,
            @Valid @RequestBody TreatmentRecordDTO treatmentRecordDTO
    ) {
        TreatmentRecord existing = treatmentRecordService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Treatment not found");
        }

        TreatmentRecord updated = treatmentRecordService.updateTreatment(existing, treatmentRecordDTO);
        return ResponseEntity.ok(updated);
    }

    // --------------------------
    // DELETE TREATMENT
    // --------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTreatment(@PathVariable Long id) {
        TreatmentRecord existing = treatmentRecordService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Treatment not found");
        }

        treatmentRecordService.deleteTreatment(id);
        return ResponseEntity.noContent().build();
    }

    // --------------------------
    // GET TREATMENTS BY APPOINTMENT
    // --------------------------
    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<List<TreatmentRecord>> getTreatmentsByAppointment(@PathVariable Long appointmentId) {
        List<TreatmentRecord> treatments = treatmentRecordService.findByAppointmentId(appointmentId);
        return ResponseEntity.ok(treatments);
    }
}
