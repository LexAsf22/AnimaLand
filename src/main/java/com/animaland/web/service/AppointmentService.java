package com.animaland.web.service;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.DTO.dashboard.RecentAppointmentResponse;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.Pet;
import com.animaland.web.models.ServiceEntity;
import com.animaland.web.models.Employee;
import com.animaland.web.repository.AppointmentRepository;
import com.animaland.web.repository.PetRepository;
import com.animaland.web.repository.ServiceEntityRepository;
import com.animaland.web.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PetRepository petRepository;
    private final ServiceEntityRepository serviceRepository;
    private final EmployeeRepository employeeRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PetRepository petRepository,
                              ServiceEntityRepository serviceRepository,
                              EmployeeRepository employeeRepository) {
        this.appointmentRepository = appointmentRepository;
        this.petRepository = petRepository;
        this.serviceRepository = serviceRepository;
        this.employeeRepository = employeeRepository;
    }

    // Create a new appointment
    public Appointment save(AppointmentDTO dto) {
        Appointment appt = new Appointment();
        applyDto(appt, dto);
        return appointmentRepository.save(appt);
    }

    // Update an existing appointment
    public Appointment updateAppointment(Appointment existing, AppointmentDTO dto) {
        applyDto(existing, dto);
        return appointmentRepository.save(existing);
    }

    // Delete an appointment by ID
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found");
        }
        appointmentRepository.deleteById(id);
    }

    // Find all appointments
    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    // Find appointment by ID
    public Appointment findById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found"));
    }

    // Get recent appointments
    public List<RecentAppointmentResponse> getRecentAppointments() {
        return appointmentRepository.findRecentAppointments();
    }

    // -------------------- PRIVATE HELPER --------------------
    private void applyDto(Appointment appt, AppointmentDTO dto) {
        Pet pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pet not found"));

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
}
