package com.animaland.web.controller.api;

import com.animaland.web.DTO.PetDTO;
import com.animaland.web.models.Pet;
import com.animaland.web.service.PetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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

    @GetMapping
    public List<Pet> getAllPets() {
        return petService.findAll();
    }

    @PostMapping
    public Pet createPet(@Valid @RequestBody PetDTO petDTO) {
        return petService.save(petDTO);
    }

    @PutMapping("/{id}")
    public Pet updatePet(@PathVariable Long id, @Valid @RequestBody PetDTO petDTO) {
        Pet pet = petService.findById(id);
        if (pet == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found");
        return petService.updatePet(pet, petDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePet(@PathVariable Long id) {
        Pet pet = petService.findById(id);
        if (pet == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found");
        petService.deletePet(id);
    }
}
