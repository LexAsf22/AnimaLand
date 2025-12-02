package com.animaland.web.repository;

import com.animaland.web.models.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TreatmentRepository extends JpaRepository<Treatment, Long> {

    List<Treatment> findByAppointment_AppointmentId(Long appointmentId);
}