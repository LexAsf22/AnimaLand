package com.animaland.web.controller.api;

import com.animaland.web.DTO.TreatmentDTO;
import com.animaland.web.models.Treatment;
import com.animaland.web.service.TreatmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/treatments")
public class TreatmentController {

    private final TreatmentService treatmentService;

    public TreatmentController(TreatmentService treatmentService) {
        this.treatmentService = treatmentService;
    }

    @GetMapping
    public List<Treatment> getAllTreatments() {
        return treatmentService.findAll();
    }

    @PostMapping
    public Treatment createTreatment(@Valid @RequestBody TreatmentDTO treatmentDTO) {
        return treatmentService.save(treatmentDTO);
    }

    @PutMapping("/{id}")
    public Treatment updateTreatment(@PathVariable Long id, @Valid @RequestBody TreatmentDTO treatmentDTO) {
        Treatment treatment = treatmentService.findById(id);
        if (treatment == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Treatment not found");
        return treatmentService.updateTreatment(treatment, treatmentDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteTreatment(@PathVariable Long id) {
        Treatment treatment = treatmentService.findById(id);
        if (treatment == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Treatment not found");
        treatmentService.deleteTreatment(id);
    }
}
