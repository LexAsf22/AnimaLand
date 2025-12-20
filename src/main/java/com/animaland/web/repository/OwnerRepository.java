package com.animaland.web.repository;

import com.animaland.web.models.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerRepository extends JpaRepository<Owner, Long> {

    Optional<Owner> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email); // ✅ REQUIRED
}