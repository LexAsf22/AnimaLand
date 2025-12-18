package com.animaland.web.repository;

import com.animaland.web.models.TreatmentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreatmentRecordRepository extends JpaRepository<TreatmentRecord, Long> {
}
