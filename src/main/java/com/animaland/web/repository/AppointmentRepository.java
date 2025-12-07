package com.animaland.web.repository;

import com.animaland.web.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPet_PetId(Long petId);
    List<Appointment> findByEmployee_StaffId(Long staffId);
    List<Appointment> findByService_ServiceId(Long serviceId);
}
