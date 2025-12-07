package com.animaland.web.controller.api;

import com.animaland.web.DTO.PetDTO;
import com.animaland.web.models.Pet;
import com.animaland.web.service.PetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    // --------------------------
    // GET ALL PETS
    // --------------------------
    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        List<Pet> pets = petService.findAll();
        return ResponseEntity.ok(pets);
    }

    // --------------------------
    // CREATE PET
    // --------------------------
    @PostMapping
    public ResponseEntity<Pet> createPet(@Valid @RequestBody PetDTO petDTO) {
        Pet created = petService.save(petDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // --------------------------
    // UPDATE PET
    // --------------------------
    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(
            @PathVariable Long id,
            @Valid @RequestBody PetDTO petDTO
    ) {
        Pet existing = petService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found");
        }

        Pet updated = petService.updatePet(existing, petDTO);
        return ResponseEntity.ok(updated);
    }

    // --------------------------
    // DELETE PET
    // --------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        Pet existing = petService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found");
        }

        petService.deletePet(id);
        return ResponseEntity.noContent().build();
    }
}
