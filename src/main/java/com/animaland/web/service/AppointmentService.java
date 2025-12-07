package com.animaland.web.service;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.models.*;
import com.animaland.web.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PetRepository petRepository;
    private final com.animaland.web.repository.ServiceRepository serviceRepository;
    private final EmployeeRepository employeeRepository;
    private final TreatmentRecordRepository treatmentRecordRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PetRepository petRepository,
            com.animaland.web.repository.ServiceRepository serviceRepository,
            EmployeeRepository employeeRepository,
            TreatmentRecordRepository treatmentRecordRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.petRepository = petRepository;
        this.serviceRepository = serviceRepository;
        this.employeeRepository = employeeRepository;
        this.treatmentRecordRepository = treatmentRecordRepository;
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public Appointment findById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    public Appointment save(AppointmentDTO dto) {
        Appointment appointment = new Appointment();
        applyDtoToAppointment(appointment, dto);
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Appointment appointment, AppointmentDTO dto) {
        applyDtoToAppointment(appointment, dto);
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    private void applyDtoToAppointment(Appointment appointment, AppointmentDTO dto) {

        appointment.setAppointmentDatetime(dto.getAppointmentDatetime());
        appointment.setRemarks(dto.getRemarks());

        // Pet
        Pet pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found"));
        appointment.setPet(pet);

        // Service
        com.animaland.web.models.Service service =
                serviceRepository.findById(dto.getServiceId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));
        appointment.setService(service);

        // Employee
        Employee staff = employeeRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found"));
        appointment.setEmployee(staff);

        // Treatments (optional)
        if (dto.getTreatmentIds() != null && !dto.getTreatmentIds().isEmpty()) {
            List<TreatmentRecord> treatments = treatmentRecordRepository.findAllById(dto.getTreatmentIds());
            appointment.setTreatments(treatments);
        }
    }
}
