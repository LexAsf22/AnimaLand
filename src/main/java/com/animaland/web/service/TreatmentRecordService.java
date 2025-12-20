package com.animaland.web.service;

import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.DTO.response.TreatmentRecordResponseDTO;
import com.animaland.web.models.*;
import com.animaland.web.repository.ServiceEntityRepository;
import com.animaland.web.repository.TreatmentRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class TreatmentRecordService {

    private final TreatmentRecordRepository repository;
    private final AppointmentService appointmentService;
    private final ServiceEntityRepository serviceRepository;

    public TreatmentRecordService(
            TreatmentRecordRepository repository,
            AppointmentService appointmentService,
            ServiceEntityRepository serviceRepository
    ) {
        this.repository = repository;
        this.appointmentService = appointmentService;
        this.serviceRepository = serviceRepository;
    }

    // =========================
    // CRUD METHODS
    // =========================
    public List<TreatmentRecord> findAll() {
        return repository.findAll();
    }

    public TreatmentRecord findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public TreatmentRecord save(TreatmentRecordDTO dto) {
        Appointment appt = appointmentService.findAppointmentById(dto.getAppointmentId());
        if (appt == null) throw new RuntimeException("Appointment not found");

        ServiceEntity service = null;
        if (dto.getServiceId() != null) {
            service = serviceRepository.findById(dto.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service not found"));
        }

        TreatmentRecord tr = new TreatmentRecord();
        tr.setAppointment(appt);
        tr.setServiceGiven(service != null ? service.getServiceName() : dto.getServiceGiven());
        tr.setFindings(dto.getFindings());
        tr.setMedicinePrescribed(dto.getMedicinePrescribed());
        tr.setServiceDate(dto.getServiceDate() != null ? LocalDate.parse(dto.getServiceDate()) : LocalDate.now());
        tr.setTotalBill(dto.getTotalBill() != null
                ? dto.getTotalBill()
                : (service != null ? service.getPrice() : 0.0));

        return repository.save(tr);
    }

    @Transactional
    public TreatmentRecord updateTreatment(TreatmentRecord existing, TreatmentRecordDTO dto) {
        ServiceEntity service = null;
        if (dto.getServiceId() != null) {
            service = serviceRepository.findById(dto.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service not found"));
        }

        existing.setServiceGiven(service != null ? service.getServiceName() : dto.getServiceGiven());
        existing.setFindings(dto.getFindings());
        existing.setMedicinePrescribed(dto.getMedicinePrescribed());
        existing.setServiceDate(dto.getServiceDate() != null ? LocalDate.parse(dto.getServiceDate()) : LocalDate.now());
        existing.setTotalBill(dto.getTotalBill() != null
                ? dto.getTotalBill()
                : (service != null ? service.getPrice() : 0.0));

        return repository.save(existing);
    }

    public void deleteTreatment(Long id) {
        repository.deleteById(id);
    }

    // =========================
    // MAP TO RESPONSE DTO
    // =========================
    public TreatmentRecordResponseDTO mapToResponseDTO(TreatmentRecord tr) {
        Appointment appt = tr.getAppointment();
        Pet pet = appt != null ? appt.getPet() : null;
        Owner owner = pet != null ? pet.getOwner() : null;
        Employee staff = appt != null ? appt.getStaff() : null;

        Double servicePrice = tr.getTotalBill() != null ? tr.getTotalBill() : 0.0;

        return new TreatmentRecordResponseDTO(
                tr.getTreatmentId(),
                pet != null ? pet.getName() : null,
                owner != null ? owner.getFirstName() + " " + owner.getLastName() : null,
                staff != null ? staff.getFirstName() + " " + staff.getLastName() : null,
                tr.getServiceGiven(),
                servicePrice,
                tr.getFindings(),
                tr.getMedicinePrescribed(),
                tr.getServiceDate() != null ? tr.getServiceDate().toString() : null,
                tr.getTotalBill()
        );
    }
}
