package com.animaland.web.repository;

import com.animaland.web.DTO.dashboard.RecentAppointmentResponse;
import com.animaland.web.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

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
        JOIN a.service s
        ORDER BY a.appointmentDatetime DESC
    """)
    List<RecentAppointmentResponse> findRecentAppointments();
}
