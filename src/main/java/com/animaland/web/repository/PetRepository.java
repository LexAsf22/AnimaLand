package com.animaland.web.repository;

import com.animaland.web.models.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByOwner_UserId(Long userId);
}
