package com.animaland.web.service;

import com.animaland.web.DTO.TreatmentDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.Treatment;
import com.animaland.web.repository.AppointmentRepository;
import com.animaland.web.repository.TreatmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreatmentService {

    private final TreatmentRepository treatmentRepository;
    private final AppointmentRepository appointmentRepository;

    public TreatmentService(TreatmentRepository treatmentRepository,
                            AppointmentRepository appointmentRepository) {
        this.treatmentRepository = treatmentRepository;
        this.appointmentRepository = appointmentRepository;
    }

    /**
     * Fetch all treatments
     */
    public List<Treatment> findAll() {
        return treatmentRepository.findAll();
    }

    /**
     * Find a treatment by ID
     */
    public Treatment findById(Long id) {
        return treatmentRepository.findById(id).orElse(null);
    }

    /**
     * Save a new treatment
     */
    public Treatment save(TreatmentDTO dto) {
        Treatment treatment = new Treatment();

        treatment.setFindings(dto.getFindings());
        treatment.setServiceGiven(dto.getServiceGiven());
        treatment.setMedicinePrescribed(dto.getMedicinePrescribed());
        treatment.setServiceDate(dto.getServiceDate());

        Appointment appointment = appointmentRepository
                .findById(dto.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        treatment.setAppointment(appointment);

        return treatmentRepository.save(treatment);
    }

    /**
     * Update an existing treatment
     */
    public Treatment updateTreatment(Treatment treatment, TreatmentDTO dto) {

        treatment.setFindings(dto.getFindings());
        treatment.setServiceGiven(dto.getServiceGiven());
        treatment.setMedicinePrescribed(dto.getMedicinePrescribed());
        treatment.setServiceDate(dto.getServiceDate());

        Appointment appointment = appointmentRepository
                .findById(dto.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        treatment.setAppointment(appointment);

        return treatmentRepository.save(treatment);
    }

    /**
     * Delete a treatment by ID
     */
    public void deleteTreatment(Long id) {
        treatmentRepository.deleteById(id);
    }

    /**
     * Get all treatments for a specific appointment
     */
    public List<Treatment> findByAppointmentId(Long appointmentId) {
        return treatmentRepository.findByAppointment_AppointmentId(appointmentId);
    }
}
