package com.animaland.web.controller.api;

import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.DTO.response.TreatmentResponseDTO;
import com.animaland.web.models.TreatmentRecord;
import com.animaland.web.service.TreatmentRecordService;
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

    private TreatmentResponseDTO mapToDTO(TreatmentRecord tr) {
        var appt = tr.getAppointment();
        var pet = appt.getPet();
        var owner = pet.getOwner();

        return new TreatmentResponseDTO(
                tr.getTreatmentId(),
                appt.getAppointmentId(),
                tr.getServiceGiven(),
                tr.getFindings(),
                tr.getMedicinePrescribed(),
                tr.getServiceDate() != null ? tr.getServiceDate().toString() : null,
                pet.getPetId(),
                pet.getName(),
                pet.getSpecies(),
                owner != null ? owner.getOwnerId() : null,
                owner != null ? owner.getFirstName() : null,
                owner != null ? owner.getLastName() : null,
                appt.getStaff() != null ? appt.getStaff().getEmployeeId() : null,
                appt.getStaff() != null ? appt.getStaff().getFirstName() + " " + appt.getStaff().getLastName() : null,
                tr.getTotalBill()
        );
    }

    @GetMapping
    public ResponseEntity<List<TreatmentResponseDTO>> getAllTreatments() {
        List<TreatmentResponseDTO> list = treatmentRecordService.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<TreatmentResponseDTO> createTreatment(@RequestBody TreatmentRecordDTO dto) {
        try {
            TreatmentRecord created = treatmentRecordService.save(dto);
            return new ResponseEntity<>(mapToDTO(created), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TreatmentResponseDTO> updateTreatment(@PathVariable Long id, @RequestBody TreatmentRecordDTO dto) {
        TreatmentRecord existing = treatmentRecordService.findById(id);
        if (existing == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Treatment not found");
        TreatmentRecord updated = treatmentRecordService.updateTreatment(existing, dto);
        return ResponseEntity.ok(mapToDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTreatment(@PathVariable Long id) {
        treatmentRecordService.deleteTreatment(id);
        return ResponseEntity.noContent().build();
    }
}
