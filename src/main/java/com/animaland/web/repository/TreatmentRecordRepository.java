package com.animaland.web.repository;

import com.animaland.web.models.TreatmentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TreatmentRecordRepository extends JpaRepository<TreatmentRecord, Long> {
    List<TreatmentRecord> findByAppointment_AppointmentId(Long appointmentId);
}
