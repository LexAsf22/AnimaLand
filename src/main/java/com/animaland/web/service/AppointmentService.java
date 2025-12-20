package com.animaland.web.service;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.DTO.TreatmentRecordDTO;
import com.animaland.web.DTO.response.AppointmentResponseDTO;
import com.animaland.web.models.*;
import com.animaland.web.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PetRepository petRepository;
    private final EmployeeRepository employeeRepository;
    private final ServiceEntityRepository serviceRepository;
    private final TreatmentRecordRepository treatmentRecordRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PetRepository petRepository,
            EmployeeRepository employeeRepository,
            ServiceEntityRepository serviceRepository,
            TreatmentRecordRepository treatmentRecordRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.petRepository = petRepository;
        this.employeeRepository = employeeRepository;
        this.serviceRepository = serviceRepository;
        this.treatmentRecordRepository = treatmentRecordRepository;
    }

    // =====================================================
    // CREATE APPOINTMENT
    // =====================================================
    public AppointmentResponseDTO createAppointment(AppointmentDTO dto) {

        Appointment appt = new Appointment();

        appt.setPet(petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet not found")));

        appt.setStaff(employeeRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found")));

        appt.setServices(serviceRepository.findAllById(dto.getServiceIds()));
        appt.setAppointmentDatetime(dto.getAppointmentDatetime());
        appt.setRemarks(dto.getRemarks());
        appt.setStatus(dto.getStatus());

        return mapToDTO(appointmentRepository.save(appt));
    }

    // =====================================================
    // READ APPOINTMENTS
    // =====================================================
    public List<AppointmentResponseDTO> getAllAppointments() {
        return appointmentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AppointmentResponseDTO getAppointmentById(Long id) {
        return mapToDTO(findAppointmentById(id));
    }

    public Appointment findAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    // =====================================================
    // UPDATE APPOINTMENT
    // =====================================================
    public AppointmentResponseDTO updateAppointment(Long id, AppointmentDTO dto) {

        Appointment appt = findAppointmentById(id);

        appt.setPet(petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet not found")));

        appt.setStaff(employeeRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found")));

        appt.setServices(serviceRepository.findAllById(dto.getServiceIds()));
        appt.setAppointmentDatetime(dto.getAppointmentDatetime());
        appt.setRemarks(dto.getRemarks());
        appt.setStatus(dto.getStatus());

        return mapToDTO(appointmentRepository.save(appt));
    }

    // =====================================================
    // DELETE APPOINTMENT
    // =====================================================
    public void deleteAppointment(Long id) {
        appointmentRepository.delete(findAppointmentById(id));
    }

    // =====================================================
    // COMPLETE APPOINTMENT
    // =====================================================
    public AppointmentResponseDTO completeAppointment(Long appointmentId, List<TreatmentRecordDTO> records) {

        Appointment appt = findAppointmentById(appointmentId);
        List<TreatmentRecord> treatments = new ArrayList<>();

        for (TreatmentRecordDTO dto : records) {
            TreatmentRecord tr = new TreatmentRecord();
            tr.setAppointment(appt);

            // Set service details
            ServiceEntity service = serviceRepository.findById(dto.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service not found"));

            tr.setServiceGiven(dto.getServiceGiven() != null ? dto.getServiceGiven() : service.getServiceName());
            tr.setFindings(dto.getFindings());
            tr.setMedicinePrescribed(dto.getMedicinePrescribed());
            tr.setServiceDate(dto.getServiceDate() != null ? LocalDate.parse(dto.getServiceDate()) : LocalDate.now());

            // Total bill can be provided or fallback to service price
            tr.setTotalBill(dto.getTotalBill() != null ? dto.getTotalBill() : service.getPrice());

            treatments.add(tr);
        }

        treatmentRecordRepository.saveAll(treatments);

        appt.setStatus("Completed");
        appt.setTreatments(treatments);

        return mapToDTO(appointmentRepository.save(appt));
    }

    // =====================================================
    // MAPPER: Appointment -> DTO
    // =====================================================
    private AppointmentResponseDTO mapToDTO(Appointment appt) {

        Pet pet = appt.getPet();
        Employee staff = appt.getStaff();

        return new AppointmentResponseDTO(
                appt.getAppointmentId(),
                pet.getPetId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getOwner() != null
                        ? pet.getOwner().getFirstName() + " " + pet.getOwner().getLastName()
                        : null,
                appt.getServices().stream()
                        .map(ServiceEntity::getServiceId)
                        .collect(Collectors.toList()),
                appt.getServices().stream()
                        .map(ServiceEntity::getServiceName)
                        .collect(Collectors.toList()),
                staff.getEmployeeId(),
                staff.getFirstName() + " " + staff.getLastName(),
                appt.getAppointmentDatetime(),
                appt.getStatus(),
                appt.getRemarks()
        );
    }

    @Transactional
    public void updateAppointmentStatus(Long appointmentId, String status) {
        Appointment appt = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appt.setStatus(status);
        appointmentRepository.save(appt);
    }
}
