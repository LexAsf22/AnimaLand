package com.animaland.web.controller.api;

import com.animaland.web.DTO.PetDTO;
import com.animaland.web.DTO.response.PetResponseDTO;
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

    // ===========================
    // GET ALL PETS
    // ===========================
    @GetMapping
    public ResponseEntity<List<PetResponseDTO>> getAllPets() {
        List<PetResponseDTO> pets = petService.findAllDTO();
        return ResponseEntity.ok(pets);
    }

    // ===========================
    // GET PET BY ID
    // ===========================
    @GetMapping("/{id}")
    public ResponseEntity<PetResponseDTO> getPetById(@PathVariable Long id) {
        try {
            PetResponseDTO dto = petService.findDTOById(id);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // ===========================
    // CREATE PET
    // ===========================
    @PostMapping
    public ResponseEntity<PetResponseDTO> createPet(@Valid @RequestBody PetDTO petDTO) {
        try {
            PetResponseDTO dto = petService.saveDTO(petDTO);
            return new ResponseEntity<>(dto, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // ===========================
    // UPDATE PET
    // ===========================
    @PutMapping("/{id}")
    public ResponseEntity<PetResponseDTO> updatePet(@PathVariable Long id, @Valid @RequestBody PetDTO petDTO) {
        try {
            PetResponseDTO dto = petService.updateDTO(id, petDTO);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // ===========================
    // DELETE PET
    // ===========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        try {
            petService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
