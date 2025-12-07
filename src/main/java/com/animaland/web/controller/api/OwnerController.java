package com.animaland.web.controller.api;

import com.animaland.web.DTO.OwnerDTO;
import com.animaland.web.models.Owner;
import com.animaland.web.service.OwnerService;
import jakarta.validation.Valid;
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

    // --------------------------
    // GET ALL OWNERS
    // --------------------------
    @GetMapping
    public ResponseEntity<List<Owner>> getAllOwners() {
        List<Owner> owners = ownerService.findAll();
        return ResponseEntity.ok(owners);
    }

    // --------------------------
    // CREATE OWNER
    // --------------------------
    @PostMapping
    public ResponseEntity<Owner> createOwner(@Valid @RequestBody OwnerDTO ownerDTO) {
        Owner created = ownerService.save(ownerDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // --------------------------
    // UPDATE OWNER
    // --------------------------
    @PutMapping("/{id}")
    public ResponseEntity<Owner> updateOwner(
            @PathVariable Long id,
            @Valid @RequestBody OwnerDTO ownerDTO
    ) {
        Owner existing = ownerService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner not found");
        }

        Owner updated = ownerService.updateOwner(existing, ownerDTO);
        return ResponseEntity.ok(updated);
    }

    // --------------------------
    // DELETE OWNER
    // --------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOwner(@PathVariable Long id) {
        Owner existing = ownerService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner not found");
        }

        ownerService.deleteOwner(id);
        return ResponseEntity.noContent().build();
    }

    // --------------------------
    // FIND OWNER BY EMAIL
    // --------------------------
    @GetMapping("/email/{email}")
    public ResponseEntity<Owner> findOwnerByEmail(@PathVariable String email) {
        Owner owner = ownerService.findByEmail(email);
        if (owner == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner not found");
        }
        return ResponseEntity.ok(owner);
    }
}
