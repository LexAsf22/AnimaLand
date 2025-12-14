package com.animaland.web.repository;

import com.animaland.web.models.TreatmentRecord;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TreatmentRecordRepository extends JpaRepository<TreatmentRecord, Long> {

    // Fetch appointment → pet → owner eagerly
    @Override
    @EntityGraph(attributePaths = {"appointment", "appointment.pet", "appointment.pet.owner"})
    List<TreatmentRecord> findAll();
}
