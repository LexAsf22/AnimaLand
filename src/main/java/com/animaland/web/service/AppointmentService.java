package com.animaland.web.service;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.DTO.response.AppointmentResponseDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.Employee;
import com.animaland.web.models.Pet;
import com.animaland.web.models.ServiceEntity;
import com.animaland.web.models.TreatmentRecord;
import com.animaland.web.repository.AppointmentRepository;
import com.animaland.web.repository.EmployeeRepository;
import com.animaland.web.repository.PetRepository;
import com.animaland.web.repository.ServiceEntityRepository;
import com.animaland.web.repository.TreatmentRecordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PetRepository petRepository;
    private final ServiceEntityRepository serviceRepository;
    private final EmployeeRepository employeeRepository;
    private final TreatmentRecordRepository treatmentRecordRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PetRepository petRepository,
                              ServiceEntityRepository serviceRepository,
                              EmployeeRepository employeeRepository,
                              TreatmentRecordRepository treatmentRecordRepository) {
        this.appointmentRepository = appointmentRepository;
        this.petRepository = petRepository;
        this.serviceRepository = serviceRepository;
        this.employeeRepository = employeeRepository;
        this.treatmentRecordRepository = treatmentRecordRepository;
    }

    public List<Appointment> findAllWithRelations() {
        return appointmentRepository.findAllWithRelations();
    }

    public Appointment findById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found"));
    }

    public AppointmentResponseDTO save(AppointmentDTO dto) {
        Appointment appt = new Appointment();
        applyDto(appt, dto);
        Appointment saved = appointmentRepository.save(appt);
        return mapToResponseDTO(saved);
    }

    public AppointmentResponseDTO updateAppointment(Appointment existing, AppointmentDTO dto) {
        applyDto(existing, dto);
        Appointment updated = appointmentRepository.save(existing);
        return mapToResponseDTO(updated);
    }

    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found");
        }
        appointmentRepository.deleteById(id);
    }

    public AppointmentResponseDTO completeAppointment(Long id) {
        Appointment appt = findById(id);
        appt.setStatus("Completed");

        // Create TreatmentRecord if none exists
        if (appt.getTreatments() == null || appt.getTreatments().isEmpty()) {
            TreatmentRecord tr = new TreatmentRecord();
            tr.setAppointment(appt);
            tr.setServiceGiven(appt.getService().getServiceName());
            tr.setFindings("-");
            tr.setMedicinePrescribed("-");
            tr.setServiceDate(java.time.LocalDate.now());
            tr.setTotalBill(0.0);
            treatmentRecordRepository.save(tr);
        }

        Appointment saved = appointmentRepository.save(appt);
        return mapToResponseDTO(saved);
    }

    private void applyDto(Appointment appt, AppointmentDTO dto) {
        if (dto.getPetId() == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pet required");
        Pet pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pet not found"));
        if (pet.getOwner() == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pet has no owner");

        ServiceEntity service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Service not found"));

        Employee staff = employeeRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Staff not found"));

        appt.setPet(pet);
        appt.setService(service);
        appt.setStaff(staff);
        appt.setAppointmentDatetime(dto.getAppointmentDatetime());
        appt.setStatus(dto.getStatus());
        appt.setRemarks(dto.getRemarks());
    }

    public AppointmentResponseDTO mapToResponseDTO(Appointment appt) {
        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setAppointmentId(appt.getAppointmentId());
        dto.setPetId(appt.getPet().getPetId());
        dto.setPetName(appt.getPet().getName());
        dto.setPetSpecies(appt.getPet().getSpecies());
        dto.setOwnerName(appt.getPet().getOwner() != null
                ? appt.getPet().getOwner().getFirstName() + " " + appt.getPet().getOwner().getLastName()
                : null);
        dto.setServiceId(appt.getService().getServiceId());
        dto.setServiceName(appt.getService().getServiceName());
        dto.setStaffId(appt.getStaff().getEmployeeId());
        dto.setStaffName(appt.getStaff().getFirstName() + " " + appt.getStaff().getLastName());
        dto.setAppointmentDatetime(appt.getAppointmentDatetime());
        dto.setStatus(appt.getStatus());
        dto.setRemarks(appt.getRemarks());
        return dto;
    }
}
