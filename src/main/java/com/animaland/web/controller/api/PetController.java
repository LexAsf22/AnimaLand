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
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public ResponseEntity<List<PetResponseDTO>> getAllPets() {
        List<PetResponseDTO> pets = petService.findAll().stream()
                .map(p -> new PetResponseDTO(
                        p.getPetId(),
                        p.getName(),
                        p.getSpecies(),
                        p.getBreed(),
                        p.getAge(),
                        p.getGender(),
                        p.getOwner().getOwnerId(),
                        p.getOwner().getFirstName() + " " + p.getOwner().getLastName()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetResponseDTO> getPetById(@PathVariable Long id) {
        Pet pet = petService.findById(id);
        if (pet == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found");
        PetResponseDTO dto = new PetResponseDTO(
                pet.getPetId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getBreed(),
                pet.getAge(),
                pet.getGender(),
                pet.getOwner().getOwnerId(),
                pet.getOwner().getFirstName() + " " + pet.getOwner().getLastName()
        );
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<PetResponseDTO> createPet(@Valid @RequestBody PetDTO petDTO) {
        Pet created = petService.save(petDTO);
        PetResponseDTO dto = new PetResponseDTO(
                created.getPetId(),
                created.getName(),
                created.getSpecies(),
                created.getBreed(),
                created.getAge(),
                created.getGender(),
                created.getOwner().getOwnerId(),
                created.getOwner().getFirstName() + " " + created.getOwner().getLastName()
        );
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetResponseDTO> updatePet(@PathVariable Long id, @Valid @RequestBody PetDTO petDTO) {
        Pet existing = petService.findById(id);
        if (existing == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found");
        Pet updated = petService.updatePet(existing, petDTO);
        PetResponseDTO dto = new PetResponseDTO(
                updated.getPetId(),
                updated.getName(),
                updated.getSpecies(),
                updated.getBreed(),
                updated.getAge(),
                updated.getGender(),
                updated.getOwner().getOwnerId(),
                updated.getOwner().getFirstName() + " " + updated.getOwner().getLastName()
        );
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        Pet existing = petService.findById(id);
        if (existing == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found");
        petService.deletePet(id);
        return ResponseEntity.noContent().build();
    }
}
