package com.animaland.web.controller.api;

import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.DTO.response.TreatmentRecordResponseDTO;
import com.animaland.web.models.TreatmentRecord;
import com.animaland.web.service.TreatmentRecordService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/treatment-records")
public class TreatmentRecordController {

    private final TreatmentRecordService service;

    public TreatmentRecordController(TreatmentRecordService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TreatmentRecordResponseDTO>> getAllTreatmentRecords() {
        List<TreatmentRecord> records = service.findAll();
        List<TreatmentRecordResponseDTO> response = records.stream()
                .map(service::mapToResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TreatmentRecordResponseDTO> getTreatmentRecordById(@PathVariable Long id) {
        TreatmentRecord record = service.findById(id);
        if (record == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(service.mapToResponseDTO(record));
    }

    @PostMapping
    public ResponseEntity<TreatmentRecordResponseDTO> createTreatmentRecord(
            @Valid @RequestBody TreatmentRecordDTO dto) {

        // ✅ LOG for debugging
        System.out.println("Creating TreatmentRecord with DTO: " + dto);

        TreatmentRecord tr = service.save(dto);
        return ResponseEntity.ok(service.mapToResponseDTO(tr));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TreatmentRecordResponseDTO> updateTreatmentRecord(
            @PathVariable Long id,
            @Valid @RequestBody TreatmentRecordDTO dto) {

        TreatmentRecord existing = service.findById(id);
        if (existing == null) return ResponseEntity.notFound().build();

        TreatmentRecord updated = service.updateTreatment(existing, dto);
        return ResponseEntity.ok(service.mapToResponseDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTreatmentRecord(@PathVariable Long id) {
        TreatmentRecord existing = service.findById(id);
        if (existing == null) return ResponseEntity.notFound().build();

        service.deleteTreatment(id);
        return ResponseEntity.noContent().build();
    }
}
