package com.animaland.web.service;

import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.TreatmentRecord;
import com.animaland.web.repository.AppointmentRepository;
import com.animaland.web.repository.TreatmentRecordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TreatmentRecordService {

    private final TreatmentRecordRepository treatmentRecordRepository;
    private final AppointmentRepository appointmentRepository;

    public TreatmentRecordService(TreatmentRecordRepository treatmentRecordRepository,
                                  AppointmentRepository appointmentRepository) {
        this.treatmentRecordRepository = treatmentRecordRepository;
        this.appointmentRepository = appointmentRepository;
    }

    /**
     * Fetch all treatments
     */
    public List<TreatmentRecord> findAll() {
        return treatmentRecordRepository.findAll();
    }

    /**
     * Find a treatment by ID
     */
    public TreatmentRecord findById(Long id) {
        return treatmentRecordRepository.findById(id).orElse(null);
    }

    /**
     * Save a new treatment
     */
    public TreatmentRecord save(TreatmentRecordDTO dto) {
        TreatmentRecord treatmentRecord = new TreatmentRecord();
        applyDtoToTreatmentRecord(treatmentRecord, dto);
        return treatmentRecordRepository.save(treatmentRecord);
    }

    /**
     * Update an existing treatment
     */
    public TreatmentRecord updateTreatment(TreatmentRecord treatmentRecord, TreatmentRecordDTO dto) {
        applyDtoToTreatmentRecord(treatmentRecord, dto);
        return treatmentRecordRepository.save(treatmentRecord);
    }

    /**
     * Delete a treatment by ID
     */
    public void deleteTreatment(Long id) {
        treatmentRecordRepository.deleteById(id);
    }

    /**
     * Get all treatments for a specific appointment
     */
    public List<TreatmentRecord> findByAppointmentId(Long appointmentId) {
        return treatmentRecordRepository.findByAppointment_AppointmentId(appointmentId);
    }

    // Helper method to map DTO to entity
    private void applyDtoToTreatmentRecord(TreatmentRecord treatmentRecord, TreatmentRecordDTO dto) {
        treatmentRecord.setFindings(dto.getFindings());
        treatmentRecord.setServiceGiven(dto.getServiceGiven());
        treatmentRecord.setMedicinePrescribed(dto.getMedicinePrescribed());
        treatmentRecord.setServiceDate(dto.getServiceDate());

        Appointment appointment = appointmentRepository.findById(dto.getAppointmentId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found"));

        treatmentRecord.setAppointment(appointment);
    }
}
