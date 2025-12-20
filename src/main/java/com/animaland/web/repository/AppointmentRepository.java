package com.animaland.web.repository;

import com.animaland.web.DTO.dashboard.RecentAppointmentResponse;
import com.animaland.web.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Fetch appointment with pet, owner, and services to prevent N+1 problem
    @Query("""
        SELECT a FROM Appointment a
        JOIN FETCH a.pet p
        JOIN FETCH p.owner o
        LEFT JOIN FETCH a.services s
        WHERE a.appointmentId = :id
    """)
    Optional<Appointment> findByIdWithServices(@Param("id") Long id);

    // Recent appointments for dashboard
    @Query("""
        SELECT new com.animaland.web.DTO.dashboard.RecentAppointmentResponse(
            a.appointmentId,
            p.name,
            CONCAT(o.firstName, ' ', o.lastName),
            s.serviceName,
            a.appointmentDatetime
        )
        FROM Appointment a
        JOIN a.pet p
        JOIN p.owner o  
        JOIN a.services s
        ORDER BY a.appointmentDatetime DESC
    """)
    List<RecentAppointmentResponse> findRecentAppointments();
}
