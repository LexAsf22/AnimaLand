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

    private final TreatmentRecordRepository treatmentRepo;
    private final AppointmentRepository appointmentRepo;

    public TreatmentRecordService(TreatmentRecordRepository treatmentRepo, AppointmentRepository appointmentRepo) {
        this.treatmentRepo = treatmentRepo;
        this.appointmentRepo = appointmentRepo;
    }

    public List<TreatmentRecord> findAll() {
        return treatmentRepo.findAll();
    }

    public TreatmentRecord findById(Long id) {
        return treatmentRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Treatment not found"));
    }

    public TreatmentRecord save(TreatmentRecordDTO dto) {
        Appointment appt = appointmentRepo.findById(dto.getAppointmentId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found"));

        TreatmentRecord tr = new TreatmentRecord();
        tr.setAppointment(appt);
        tr.setServiceGiven(dto.getServiceGiven());
        tr.setFindings(dto.getFindings());
        tr.setMedicinePrescribed(dto.getMedicinePrescribed());
        tr.setServiceDate(dto.getServiceDate());

        // Mark appointment as completed
        appt.setStatus("Completed");
        appointmentRepo.save(appt);

        return treatmentRepo.save(tr);
    }

    public TreatmentRecord updateTreatment(TreatmentRecord existing, TreatmentRecordDTO dto) {
        existing.setServiceGiven(dto.getServiceGiven());
        existing.setFindings(dto.getFindings());
        existing.setMedicinePrescribed(dto.getMedicinePrescribed());
        existing.setServiceDate(dto.getServiceDate());
        return treatmentRepo.save(existing);
    }

    public void deleteTreatment(Long id) {
        TreatmentRecord tr = findById(id);
        treatmentRepo.delete(tr);
    }

    public List<TreatmentRecord> findByAppointmentId(Long appointmentId) {
        Appointment appt = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found"));
        return treatmentRepo.findByAppointment(appt);
    }
}
