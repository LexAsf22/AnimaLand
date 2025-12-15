package com.animaland.web.controller.api;

import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.DTO.response.TreatmentResponseDTO;
import com.animaland.web.models.TreatmentRecord;
import com.animaland.web.service.TreatmentRecordService;
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
    public ResponseEntity<List<TreatmentResponseDTO>> getAll() {
        List<TreatmentResponseDTO> list = service.findAll()
                .stream()
                .map(service::mapToResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TreatmentResponseDTO> getById(@PathVariable Long id) {
        TreatmentRecord tr = service.findById(id);
        if (tr == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(service.mapToResponseDTO(tr));
    }

    @PostMapping
    public ResponseEntity<TreatmentResponseDTO> create(@RequestBody TreatmentRecordDTO dto) {
        TreatmentRecord tr = service.save(dto);
        return ResponseEntity.ok(service.mapToResponseDTO(tr));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TreatmentResponseDTO> update(@PathVariable Long id, @RequestBody TreatmentRecordDTO dto) {
        TreatmentRecord existing = service.findById(id);
        if (existing == null) return ResponseEntity.notFound().build();
        TreatmentRecord updated = service.updateTreatment(existing, dto);
        return ResponseEntity.ok(service.mapToResponseDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteTreatment(id);
        return ResponseEntity.noContent().build();
    }
}
