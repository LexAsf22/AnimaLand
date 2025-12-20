package com.animaland.web.controller.api;

import com.animaland.web.DTO.OwnerDTO;
import com.animaland.web.DTO.response.OwnerResponseDTO;
import com.animaland.web.models.Owner;
import com.animaland.web.service.OwnerService;
import jakarta.validation.Valid;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/owners")
public class OwnerController {

    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @GetMapping
    public ResponseEntity<List<OwnerResponseDTO>> getAllOwners() {
        return ResponseEntity.ok(ownerService.findAllDTO());
    }

    @PostMapping
    public ResponseEntity<?> createOwner(@Valid @RequestBody OwnerDTO ownerDTO) {
        try {
            Owner created = ownerService.save(ownerDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ownerService.toResponseDTO(created));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(e.getMessage()); // ✅ STRING
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOwner(@PathVariable Long id, @Valid @RequestBody OwnerDTO ownerDTO) {
        try {
            Owner updated = ownerService.updateOwner(id, ownerDTO);
            if (updated == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner not found");
            }
            return ResponseEntity.ok(ownerService.toResponseDTO(updated));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(e.getMessage()); // ✅ STRING
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOwner(@PathVariable Long id) {
        Owner existing = ownerService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner not found");
        }
        ownerService.deleteOwner(id);
        return ResponseEntity.noContent().build();
    }
}