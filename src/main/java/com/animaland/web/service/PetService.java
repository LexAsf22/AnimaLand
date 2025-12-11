    package com.animaland.web.service;

    import com.animaland.web.DTO.PetDTO;
    import com.animaland.web.models.Pet;
    import com.animaland.web.models.Owner;
    import com.animaland.web.repository.PetRepository;
    import com.animaland.web.repository.OwnerRepository;
    import org.springframework.http.HttpStatus;
    import org.springframework.stereotype.Service;
    import org.springframework.web.server.ResponseStatusException;

    import java.util.List;

    @Service
    public class PetService {

        private final PetRepository petRepository;
        private final OwnerRepository ownerRepository;

        public PetService(PetRepository petRepository, OwnerRepository ownerRepository) {
            this.petRepository = petRepository;
            this.ownerRepository = ownerRepository;
        }

        public List<Pet> findAll() {
            return petRepository.findAll();
        }

        public Pet findById(Long id) {
            return petRepository.findById(id).orElse(null);
        }

        public Pet save(PetDTO dto) {
            Pet pet = new Pet();
            applyDtoToPet(pet, dto);
            return petRepository.save(pet);
        }

        public Pet updatePet(Pet pet, PetDTO dto) {
            applyDtoToPet(pet, dto);
            return petRepository.save(pet);
        }

        public void deletePet(Long id) {
            petRepository.deleteById(id);
        }

        private void applyDtoToPet(Pet pet, PetDTO dto) {
            pet.setName(dto.getName());
            pet.setSpecies(dto.getSpecies());
            pet.setBreed(dto.getBreed());
            pet.setAge(dto.getAge());
            pet.setGender(dto.getGender());

            Owner owner = ownerRepository.findById(dto.getOwnerId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner not found"));
            pet.setOwner(owner);
        }
    }
