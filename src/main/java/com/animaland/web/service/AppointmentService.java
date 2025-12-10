package com.animaland.web.service;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.ServiceEntity;
import com.animaland.web.models.Pet;
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
    private final ServiceEntityRepository serviceEntityRepository;
    private final EmployeeRepository employeeRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PetRepository petRepository,
                              ServiceEntityRepository serviceEntityRepository,
                              EmployeeRepository employeeRepository) {
        this.appointmentRepository = appointmentRepository;
        this.petRepository = petRepository;
        this.serviceEntityRepository = serviceEntityRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public Appointment findById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    public Appointment save(AppointmentDTO dto) {
        Appointment appointment = new Appointment();
        applyDtoToAppointment(appointment, dto);
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Appointment existing, AppointmentDTO dto) {
        applyDtoToAppointment(existing, dto);
        return appointmentRepository.save(existing);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    private void applyDtoToAppointment(Appointment appointment, AppointmentDTO dto) {
        // Fetch related entities
        Pet pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found"));

        ServiceEntity serviceEntity = serviceEntityRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));

        Employee staff = employeeRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found"));

        appointment.setPet(pet);
        appointment.setService(serviceEntity);
        appointment.setStaff(staff);
        appointment.setAppointmentDatetime(dto.getAppointmentDatetime());
        appointment.setStatus(dto.getStatus());
        appointment.setRemarks(dto.getRemarks());
    }
}
