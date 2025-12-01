package com.animaland.web.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    private LocalDateTime appointmentDatetime;
    private String remarks;

    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private Employee employee;

    @OneToMany(mappedBy = "appointment")
    private List<Treatment> treatments;

    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public LocalDateTime getAppointmentDatetime() { return appointmentDatetime; }
    public void setAppointmentDatetime(LocalDateTime appointmentDatetime) { this.appointmentDatetime = appointmentDatetime; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public Pet getPet() { return pet; }
    public void setPet(Pet pet) { this.pet = pet; }

    public Service getService() { return service; }
    public void setService(Service service) { this.service = service; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public List<Treatment> getTreatments() { return treatments; }
    public void setTreatments(List<Treatment> treatments) { this.treatments = treatments; }
}
