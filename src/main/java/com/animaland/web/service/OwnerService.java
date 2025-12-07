package com.animaland.web.service;

import com.animaland.web.DTO.OwnerDTO;
import com.animaland.web.models.Owner;
import com.animaland.web.repository.OwnerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerService {

    private final OwnerRepository ownerRepository;

    public OwnerService(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    public List<Owner> findAll() {
        return ownerRepository.findAll();
    }

    public Owner findById(Long id) {
        return ownerRepository.findById(id).orElse(null);
    }

    public Owner save(OwnerDTO dto) {
        if (ownerRepository.existsByEmail(dto.email())) {
            throw new RuntimeException("Email already exists.");
        }

        Owner owner = new Owner();
        applyDtoToOwner(owner, dto);
        return ownerRepository.save(owner);
    }

    public Owner updateOwner(Owner owner, OwnerDTO dto) {
        if (!owner.getEmail().equals(dto.email()) && ownerRepository.existsByEmail(dto.email())) {
            throw new RuntimeException("Email already exists.");
        }
        applyDtoToOwner(owner, dto);
        return ownerRepository.save(owner);
    }

    public void deleteOwner(Long id) {
        ownerRepository.deleteById(id);
    }

    public Owner findByEmail(String email) {
        return ownerRepository.findByEmail(email).orElse(null);
    }

    private void applyDtoToOwner(Owner owner, OwnerDTO dto) {
        owner.setFirstName(dto.firstName());
        owner.setLastName(dto.lastName());
        owner.setEmail(dto.email());
        owner.setPhoneNumber(dto.phoneNumber());
        owner.setAddress(dto.address());
    }
}
