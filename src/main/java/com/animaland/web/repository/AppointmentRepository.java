package com.animaland.web.repository;

import com.animaland.web.DTO.dashboard.RecentAppointmentResponse;
import com.animaland.web.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Fetch all appointments with related entities in one query
    @Query("SELECT a FROM Appointment a " +
            "JOIN FETCH a.pet p " +
            "JOIN FETCH p.owner o " +
            "JOIN FETCH a.staff s " +
            "JOIN FETCH a.service se")
    List<Appointment> findAllWithRelations();

    // Recent appointments DTO
    @Query("""
        SELECT new com.animaland.web.DTO.dashboard.RecentAppointmentResponse(
            a.appointmentId,
            p.name,
            CONCAT(o.firstName, ' ', o.lastName),
            se.serviceName,
            a.appointmentDatetime
        )
        FROM Appointment a
        JOIN a.pet p
        JOIN p.owner o
        JOIN a.service se
        ORDER BY a.appointmentDatetime DESC
    """)
    List<RecentAppointmentResponse> findRecentAppointments();
}
