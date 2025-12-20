package com.animaland.web.service;

import com.animaland.web.DTO.PetDTO;
import com.animaland.web.DTO.response.PetResponseDTO;
import com.animaland.web.models.Owner;
import com.animaland.web.models.Pet;
import com.animaland.web.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;
    private final OwnerService ownerService;

    public PetService(PetRepository petRepository, OwnerService ownerService) {
        this.petRepository = petRepository;
        this.ownerService = ownerService;
    }

    // ===========================
    // CREATE PET
    // ===========================
    public PetResponseDTO saveDTO(PetDTO dto) {
        Owner owner = ownerService.findById(dto.getOwnerId());
        if (owner == null) {
            throw new RuntimeException("Owner not found");
        }

        Pet pet = new Pet();
        pet.setName(dto.getName());
        pet.setSpecies(dto.getSpecies());
        pet.setBreed(dto.getBreed());
        pet.setAge(dto.getAge());
        pet.setGender(dto.getGender());
        pet.setOwner(owner);

        Pet saved = petRepository.save(pet);
        return mapToDTO(saved);
    }

    // ===========================
    // GET ALL PETS
    // ===========================
    public List<PetResponseDTO> findAllDTO() {
        return petRepository.findAll().stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ===========================
    // GET PET BY ID
    // ===========================
    public PetResponseDTO findDTOById(Long id) {
        Pet pet = findById(id);
        return mapToDTO(pet);
    }

    // ===========================
    // UPDATE PET
    // ===========================
    public PetResponseDTO updateDTO(Long id, PetDTO dto) {
        Pet existing = findById(id);

        Owner owner = ownerService.findById(dto.getOwnerId());
        if (owner == null) {
            throw new RuntimeException("Owner not found");
        }

        existing.setName(dto.getName());
        existing.setSpecies(dto.getSpecies());
        existing.setBreed(dto.getBreed());
        existing.setAge(dto.getAge());
        existing.setGender(dto.getGender());
        existing.setOwner(owner);

        Pet updated = petRepository.save(existing);
        return mapToDTO(updated);
    }

    // ===========================
    // DELETE PET
    // ===========================
    public void delete(Long id) {
        Pet pet = findById(id);
        petRepository.delete(pet);
    }

    // ===========================
    // INTERNAL METHODS
    // ===========================
    private Pet findById(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
    }

    private PetResponseDTO mapToDTO(Pet pet) {
        Long ownerId = null;
        String ownerName = "Unknown Owner";

        if (pet.getOwner() != null) {
            ownerId = pet.getOwner().getOwnerId();
            ownerName = pet.getOwner().getFirstName() + " " + pet.getOwner().getLastName();
        }

        return new PetResponseDTO(
                pet.getPetId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getBreed(),
                pet.getAge(),
                pet.getGender(),
                ownerId,
                ownerName
        );
    }
}
