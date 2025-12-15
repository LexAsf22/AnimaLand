package com.animaland.web.service;

import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.DTO.response.TreatmentResponseDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.TreatmentRecord;
import com.animaland.web.repository.TreatmentRecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TreatmentRecordService {

    private final TreatmentRecordRepository repository;
    private final AppointmentService appointmentService;

    public TreatmentRecordService(TreatmentRecordRepository repository, AppointmentService appointmentService) {
        this.repository = repository;
        this.appointmentService = appointmentService;
    }

    public List<TreatmentRecord> findAll() {
        return repository.findAll();
    }

    public TreatmentRecord findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public TreatmentRecord save(TreatmentRecordDTO dto) {
        Appointment appt = appointmentService.findById(dto.getAppointmentId());
        if (appt == null) throw new RuntimeException("Appointment not found");

        TreatmentRecord tr = new TreatmentRecord();
        tr.setAppointment(appt);
        tr.setServiceGiven(dto.getServiceGiven());
        tr.setMedicinePrescribed(dto.getMedicinePrescribed());
        tr.setTotalBill(dto.getTotalBill());
        tr.setServiceDate(dto.getServiceDate() != null ? LocalDate.parse(dto.getServiceDate()) : null);

        return repository.save(tr);
    }

    public TreatmentRecord updateTreatment(TreatmentRecord existing, TreatmentRecordDTO dto) {
        existing.setServiceGiven(dto.getServiceGiven());
        existing.setMedicinePrescribed(dto.getMedicinePrescribed());
        existing.setTotalBill(dto.getTotalBill());
        existing.setServiceDate(dto.getServiceDate() != null ? LocalDate.parse(dto.getServiceDate()) : null);

        return repository.save(existing);
    }

    public void deleteTreatment(Long id) {
        repository.deleteById(id);
    }

    public TreatmentResponseDTO mapToResponseDTO(TreatmentRecord tr) {
        var appt = tr.getAppointment();
        var pet = appt.getPet();
        var owner = pet.getOwner();
        var staff = appt.getStaff();

        return new TreatmentResponseDTO(
                tr.getTreatmentId(),
                pet.getName(),
                tr.getServiceGiven(),
                staff != null ? staff.getFirstName() + " " + staff.getLastName() : null,
                owner != null ? owner.getFirstName() + " " + owner.getLastName() : null,
                tr.getServiceDate() != null ? tr.getServiceDate().toString() : null,
                tr.getMedicinePrescribed(),
                tr.getTotalBill()
        );
    }

}
