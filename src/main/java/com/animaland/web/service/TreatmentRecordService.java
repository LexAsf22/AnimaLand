package com.animaland.web.service;

import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.TreatmentRecord;
import com.animaland.web.repository.AppointmentRepository;
import com.animaland.web.repository.TreatmentRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class TreatmentRecordService {

    private final TreatmentRecordRepository treatmentRecordRepository;
    private final AppointmentRepository appointmentRepository;

    public TreatmentRecordService(TreatmentRecordRepository treatmentRecordRepository,
                                  AppointmentRepository appointmentRepository) {
        this.treatmentRecordRepository = treatmentRecordRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public List<TreatmentRecord> findAll() {
        return treatmentRecordRepository.findAll();
    }

    public TreatmentRecord save(TreatmentRecordDTO dto) {
        Appointment appointment = appointmentRepository.findById(dto.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // Ensure appointment is completed
        if (!"COMPLETED".equalsIgnoreCase(appointment.getStatus())) {
            throw new RuntimeException("Appointment must be completed before adding a treatment record");
        }

        TreatmentRecord tr = new TreatmentRecord();
        tr.setAppointment(appointment);
        tr.setServiceGiven(dto.getServiceGiven());
        tr.setFindings(dto.getFindings());
        tr.setMedicinePrescribed(dto.getMedicinePrescribed());
        tr.setServiceDate(dto.getServiceDate() != null && !dto.getServiceDate().isEmpty() ?
                LocalDate.parse(dto.getServiceDate()) : LocalDate.now());
        tr.setTotalBill(dto.getTotalBill() != null ? dto.getTotalBill() : 0.0);

        return treatmentRecordRepository.save(tr);
    }

    public TreatmentRecord findById(Long id) {
        return treatmentRecordRepository.findById(id).orElse(null);
    }

    public TreatmentRecord updateTreatment(TreatmentRecord existing, TreatmentRecordDTO dto) {
        if (dto.getAppointmentId() != null) {
            Appointment appointment = appointmentRepository.findById(dto.getAppointmentId())
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));
            existing.setAppointment(appointment);
        }

        existing.setServiceGiven(dto.getServiceGiven());
        existing.setFindings(dto.getFindings());
        existing.setMedicinePrescribed(dto.getMedicinePrescribed());
        if (dto.getServiceDate() != null && !dto.getServiceDate().isEmpty()) {
            existing.setServiceDate(LocalDate.parse(dto.getServiceDate()));
        }
        existing.setTotalBill(dto.getTotalBill() != null ? dto.getTotalBill() : 0.0);

        return treatmentRecordRepository.save(existing);
    }

    public void deleteTreatment(Long id) {
        treatmentRecordRepository.deleteById(id);
    }
}
