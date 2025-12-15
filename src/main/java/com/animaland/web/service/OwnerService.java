package com.animaland.web.service;

import com.animaland.web.DTO.OwnerDTO;
import com.animaland.web.DTO.response.OwnerResponseDTO;
import com.animaland.web.DTO.response.PetResponseDTO;
import com.animaland.web.models.Owner;
import com.animaland.web.repository.OwnerRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OwnerService {

    private final OwnerRepository ownerRepository;

    public OwnerService(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    public Owner findById(Long id) {
        return ownerRepository.findById(id).orElse(null);
    }

    @Transactional
    public Owner save(OwnerDTO dto) {

        String email = dto.email().toLowerCase();

        if (ownerRepository.existsByEmailIgnoreCase(email)) {
            throw new DataIntegrityViolationException("Owner with this email already exists");
        }

        Owner owner = new Owner();
        owner.setFirstName(dto.firstName());
        owner.setLastName(dto.lastName());
        owner.setEmail(email);
        owner.setPhoneNumber(dto.phoneNumber());
        owner.setAddress(dto.address());

        return ownerRepository.save(owner);
    }

    @Transactional
    public Owner updateOwner(Long id, OwnerDTO dto) {

        Owner existing = findById(id);
        if (existing == null) return null;

        String email = dto.email().toLowerCase();

        if (!existing.getEmail().equalsIgnoreCase(email)
                && ownerRepository.existsByEmailIgnoreCase(email)) {
            throw new DataIntegrityViolationException("Owner with this email already exists");
        }

        existing.setFirstName(dto.firstName());
        existing.setLastName(dto.lastName());
        existing.setEmail(email);
        existing.setPhoneNumber(dto.phoneNumber());
        existing.setAddress(dto.address());

        return ownerRepository.save(existing);
    }

    public void deleteOwner(Long id) {
        ownerRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<OwnerResponseDTO> findAllDTO() {
        return ownerRepository.findAll().stream().map(this::toResponseDTO).toList();
    }

    public OwnerResponseDTO toResponseDTO(Owner owner) {

        OwnerResponseDTO dto = new OwnerResponseDTO();
        dto.setOwnerId(owner.getOwnerId());
        dto.setFirstName(owner.getFirstName());
        dto.setLastName(owner.getLastName());
        dto.setEmail(owner.getEmail());
        dto.setPhoneNumber(owner.getPhoneNumber());
        dto.setAddress(owner.getAddress());

        dto.setPets(
                owner.getPets() == null ? List.of() :
                        owner.getPets().stream().map(pet -> {
                            PetResponseDTO p = new PetResponseDTO();
                            p.setPetId(pet.getPetId());
                            p.setName(pet.getName());
                            p.setSpecies(pet.getSpecies());
                            p.setBreed(pet.getBreed());
                            p.setAge(pet.getAge());
                            p.setGender(pet.getGender());
                            return p;
                        }).toList()
        );

        return dto;
    }
}
