package com.animaland.web.service;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.DTO.dashboard.RecentAppointmentResponse;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.Employee;
import com.animaland.web.models.Pet;
import com.animaland.web.models.ServiceEntity;
import com.animaland.web.repository.AppointmentRepository;
import com.animaland.web.repository.EmployeeRepository;
import com.animaland.web.repository.PetRepository;
import com.animaland.web.repository.ServiceEntityRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public List<Appointment> findAllWithRelations() {
        return appointmentRepository.findAllWithRelations();
    }

    public Appointment findById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found"));
    }

    public Appointment save(AppointmentDTO dto) {
        Appointment appointment = new Appointment();
        applyDto(appointment, dto);
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Appointment existing, AppointmentDTO dto) {
        applyDto(existing, dto);
        return appointmentRepository.save(existing);
    }

    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found");
        }
        appointmentRepository.deleteById(id);
    }

    public List<RecentAppointmentResponse> getRecentAppointments() {
        return appointmentRepository.findRecentAppointments();
    }

    // ---------------- PRIVATE ----------------

    private void applyDto(Appointment appt, AppointmentDTO dto) {

        if (dto.getPetId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Pet is required when creating an appointment."
            );
        }

        Pet pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Selected pet does not exist."
                ));

        if (pet.getOwner() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Selected pet does not have an owner assigned."
            );
        }

        ServiceEntity service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Service not found."
                ));

        Employee staff = employeeRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Staff not found."
                ));

        appt.setPet(pet);
        appt.setService(service);
        appt.setStaff(staff);
        appt.setAppointmentDatetime(dto.getAppointmentDatetime());
        appt.setStatus(dto.getStatus());
        appt.setRemarks(dto.getRemarks());
    }
}
