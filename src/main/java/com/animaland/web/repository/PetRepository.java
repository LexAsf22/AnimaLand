package com.animaland.web.repository;

import com.animaland.web.DTO.dashboard.RecentPetResponse;
import com.animaland.web.models.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    @Query("""
        SELECT new com.animaland.web.DTO.dashboard.RecentPetResponse(
            p.petId,
            p.name,
            p.species,
            CONCAT(o.firstName, ' ', o.lastName)
        )
        FROM Pet p
        JOIN p.owner o
        ORDER BY p.petId DESC
    """)
    List<RecentPetResponse> findRecentPets();
}
