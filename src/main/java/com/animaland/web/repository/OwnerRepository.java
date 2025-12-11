package com.animaland.web.repository;

import com.animaland.web.models.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
    Optional<Owner> findByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCase(String email);
}
