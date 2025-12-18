package com.animaland.web.controller.web;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.exception.ResourceNotFoundException;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.Employee;
import com.animaland.web.models.Pet;
import com.animaland.web.models.ServiceEntity;
import com.animaland.web.repository.AppointmentRepository;
import com.animaland.web.repository.EmployeeRepository;
import com.animaland.web.repository.PetRepository;
import com.animaland.web.repository.ServiceEntityRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class HomeController {

    private final AppointmentRepository appointmentRepository;
    private final PetRepository petRepository;
    private final ServiceEntityRepository serviceEntityRepository;
    private final EmployeeRepository employeeRepository;

    public HomeController(AppointmentRepository appointmentRepository,
                          PetRepository petRepository,
                          ServiceEntityRepository serviceEntityRepository,
                          EmployeeRepository employeeRepository) {
        this.appointmentRepository = appointmentRepository;
        this.petRepository = petRepository;
        this.serviceEntityRepository = serviceEntityRepository;
        this.employeeRepository = employeeRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("appointments", appointmentRepository.findAll());
        return "index";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("appointment", new AppointmentDTO());
        model.addAttribute("pets", petRepository.findAll());
        model.addAttribute("services", serviceEntityRepository.findAll());
        model.addAttribute("employees", employeeRepository.findAll());
        return "create";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute("appointment") @Valid AppointmentDTO dto, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("pets", petRepository.findAll());
            model.addAttribute("services", serviceEntityRepository.findAll());
            model.addAttribute("employees", employeeRepository.findAll());
            return "create";
        }

        Appointment appointment = new Appointment();
        Pet pet = petRepository.findById(dto.getPetId()).orElseThrow(() -> new ResourceNotFoundException("Pet", dto.getPetId()));
        Employee staff = employeeRepository.findById(dto.getStaffId()).orElseThrow(() -> new ResourceNotFoundException("Employee", dto.getStaffId()));
        List<ServiceEntity> services = dto.getServiceIds().stream()
                .map(id -> serviceEntityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service", id)))
                .collect(Collectors.toList());

        appointment.setPet(pet);
        appointment.setStaff(staff);
        appointment.setServices(services);
        appointment.setAppointmentDatetime(dto.getAppointmentDatetime());
        appointment.setRemarks(dto.getRemarks() != null ? dto.getRemarks() : "-");
        appointment.setStatus("Pending");

        appointmentRepository.save(appointment);
        return "redirect:/";
    }
}
