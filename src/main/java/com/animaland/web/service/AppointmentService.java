package com.animaland.web.service;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.DTO.ServiceEntityDTO;
import com.animaland.web.DTO.response.AppointmentResponseDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.Employee;
import com.animaland.web.models.Pet;
import com.animaland.web.models.ServiceEntity;
import com.animaland.web.repository.AppointmentRepository;
import com.animaland.web.repository.EmployeeRepository;
import com.animaland.web.repository.PetRepository;
import com.animaland.web.repository.ServiceEntityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PetRepository petRepository;
    private final EmployeeRepository employeeRepository;
    private final ServiceEntityRepository serviceRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PetRepository petRepository,
                              EmployeeRepository employeeRepository,
                              ServiceEntityRepository serviceRepository) {
        this.appointmentRepository = appointmentRepository;
        this.petRepository = petRepository;
        this.employeeRepository = employeeRepository;
        this.serviceRepository = serviceRepository;
    }

    // -------------------------------
    // FIND ALL
    // -------------------------------
    public List<Appointment> findAllWithRelations() {
        return appointmentRepository.findAll();
    }

    // -------------------------------
    // FIND BY ID
    // -------------------------------
    public Optional<Appointment> findOptionalById(Long id) {
        return appointmentRepository.findByIdWithServices(id);
    }

    public Appointment findById(Long id) {
        return appointmentRepository.findByIdWithServices(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }

    // -------------------------------
    // CREATE
    // -------------------------------
    public AppointmentResponseDTO save(AppointmentDTO dto) {
        Appointment appointment = new Appointment();

        Pet pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet not found"));
        Employee staff = employeeRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        List<ServiceEntity> services = serviceRepository.findAllById(dto.getServiceIds());
        if (services.size() != dto.getServiceIds().size()) {
            throw new RuntimeException("One or more services not found");
        }

        appointment.setPet(pet);
        appointment.setStaff(staff);
        appointment.setServices(services);
        appointment.setAppointmentDatetime(dto.getAppointmentDatetime());
        appointment.setRemarks(dto.getRemarks() != null ? dto.getRemarks() : "-");
        appointment.setStatus(dto.getStatus() != null ? dto.getStatus() : "Pending");

        return mapToResponseDTO(appointmentRepository.save(appointment));
    }

    // -------------------------------
    // UPDATE
    // -------------------------------
    public AppointmentResponseDTO updateAppointment(Long id, AppointmentDTO dto) {
        Appointment existing = findById(id);

        existing.setAppointmentDatetime(dto.getAppointmentDatetime());
        existing.setRemarks(dto.getRemarks() != null ? dto.getRemarks() : existing.getRemarks());
        existing.setStatus(dto.getStatus() != null ? dto.getStatus() : existing.getStatus());

        if (dto.getPetId() != null) {
            Pet pet = petRepository.findById(dto.getPetId())
                    .orElseThrow(() -> new RuntimeException("Pet not found"));
            existing.setPet(pet);
        }

        if (dto.getStaffId() != null) {
            Employee staff = employeeRepository.findById(dto.getStaffId())
                    .orElseThrow(() -> new RuntimeException("Staff not found"));
            existing.setStaff(staff);
        }

        if (dto.getServiceIds() != null && !dto.getServiceIds().isEmpty()) {
            List<ServiceEntity> services = serviceRepository.findAllById(dto.getServiceIds());
            if (services.size() != dto.getServiceIds().size()) {
                throw new RuntimeException("One or more services not found");
            }
            existing.setServices(services);
        }

        return mapToResponseDTO(appointmentRepository.save(existing));
    }

    // -------------------------------
    // DELETE
    // -------------------------------
    public void deleteAppointment(Long id) {
        Optional<Appointment> opt = appointmentRepository.findByIdWithServices(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("Appointment not found with id: " + id);
        }
        appointmentRepository.delete(opt.get());
    }

    // -------------------------------
    // COMPLETE
    // -------------------------------
    public AppointmentResponseDTO completeAppointment(Long id) {
        Appointment appointment = findById(id);
        appointment.setStatus("Completed");
        return mapToResponseDTO(appointmentRepository.save(appointment));
    }

    // -------------------------------
    // MAP TO RESPONSE DTO
    // -------------------------------
    public AppointmentResponseDTO mapToResponseDTO(Appointment appointment) {
        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setAppointmentId(appointment.getAppointmentId());
        dto.setPetName(appointment.getPet().getName());
        dto.setStaffName(appointment.getStaff().getFirstName() + " " + appointment.getStaff().getLastName());

        List<ServiceEntityDTO> serviceDTOs = appointment.getServices().stream()
                .map(s -> {
                    ServiceEntityDTO serviceDTO = new ServiceEntityDTO();
                    serviceDTO.setServiceId(s.getServiceId());
                    serviceDTO.setServiceName(s.getServiceName());
                    serviceDTO.setServiceType(s.getServiceType());
                    serviceDTO.setPrice(s.getPrice());
                    serviceDTO.setDuration(s.getDuration());
                    return serviceDTO;
                })
                .collect(Collectors.toList());
        dto.setServices(serviceDTOs);

        dto.setAppointmentDatetime(appointment.getAppointmentDatetime());
        dto.setRemarks(appointment.getRemarks());
        dto.setStatus(appointment.getStatus());
        return dto;
    }
}
