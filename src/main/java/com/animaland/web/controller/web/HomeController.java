package com.animaland.web.controller.web;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.exception.ResourceNotFoundException;
import com.animaland.web.models.Appointment;
import com.animaland.web.models.Employee;
import com.animaland.web.models.Pet;
import com.animaland.web.models.Service;
import com.animaland.web.repository.AppointmentRepository;
import com.animaland.web.repository.EmployeeRepository;
import com.animaland.web.repository.PetRepository;
import com.animaland.web.repository.ServiceRepository;
import com.animaland.web.service.AppointmentService;

import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class HomeController {

    private final AppointmentService appointmentService;
    private final AppointmentRepository appointmentRepository;
    private final PetRepository petRepository;
    private final ServiceRepository serviceRepository;
    private final EmployeeRepository employeeRepository;

    public HomeController(AppointmentService appointmentService,
                          AppointmentRepository appointmentRepository,
                          PetRepository petRepository,
                          ServiceRepository serviceRepository,
                          EmployeeRepository employeeRepository) {
        this.appointmentService = appointmentService;
        this.appointmentRepository = appointmentRepository;
        this.petRepository = petRepository;
        this.serviceRepository = serviceRepository;
        this.employeeRepository = employeeRepository;
    }

    //-------------------------------------------
    // HOME: List all appointments
    //-------------------------------------------
    @GetMapping("/")
    public String index(Model model) {
        List<Appointment> appointments = appointmentRepository.findAll();
        model.addAttribute("appointments", appointments);
        return "index"; // index.html
    }

    //-------------------------------------------
    // CREATE FORM
    //-------------------------------------------
    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("appointment", new AppointmentDTO());

        // Dropdown lists
        model.addAttribute("pets", petRepository.findAll());
        model.addAttribute("services", serviceRepository.findAll());
        model.addAttribute("employees", employeeRepository.findAll());

        return "create"; // create.html
    }

    //-------------------------------------------
    // SAVE NEW APPOINTMENT
    //-------------------------------------------
    @PostMapping("/save")
    public String save(@ModelAttribute("appointment") @Valid AppointmentDTO dto,
                       BindingResult result,
                       Model model) {

        if (result.hasErrors()) {

            // Reload dropdowns
            model.addAttribute("pets", petRepository.findAll());
            model.addAttribute("services", serviceRepository.findAll());
            model.addAttribute("employees", employeeRepository.findAll());

            return "create";
        }

        Appointment appointment = new Appointment();
        appointment.setAppointmentDatetime(dto.getAppointmentDatetime());
        appointment.setRemarks(dto.getRemarks());

        // Set referenced objects
        Pet pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new ResourceNotFoundException("Pet", dto.getPetId()));
        appointment.setPet(pet);

        Service service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Service", dto.getServiceId()));
        appointment.setService(service);

        Employee employee = employeeRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee", dto.getStaffId()));
        appointment.setEmployee(employee);

        appointmentRepository.save(appointment);

        return "redirect:/";
    }

    //-------------------------------------------
    // SHOW DETAILS
    //-------------------------------------------
    @GetMapping("/show")
    public String show(@RequestParam Long id, Model model) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", id));

        model.addAttribute("appointment", appointment);
        return "show"; // show.html
    }

    //-------------------------------------------
    // EDIT FORM
    //-------------------------------------------
    @GetMapping("/edit")
    public String edit(@RequestParam Long id, Model model) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", id));

        AppointmentDTO dto = new AppointmentDTO();
        dto.setAppointmentId(appointment.getAppointmentId());
        dto.setAppointmentDatetime(appointment.getAppointmentDatetime());
        dto.setRemarks(appointment.getRemarks());
        dto.setPetId(appointment.getPet().getPetId());
        dto.setServiceId(appointment.getService().getServiceId());
        dto.setStaffId(appointment.getEmployee().getStaffId());

        // Add to model
        model.addAttribute("appointment", dto);

        // Dropdown lists
        model.addAttribute("pets", petRepository.findAll());
        model.addAttribute("services", serviceRepository.findAll());
        model.addAttribute("employees", employeeRepository.findAll());

        return "edit";
    }

    //-------------------------------------------
    // UPDATE APPOINTMENT
    //-------------------------------------------
    @PostMapping("/update")
    public String update(@ModelAttribute("appointment") @Valid AppointmentDTO dto,
                         BindingResult result,
                         Model model) {

        if (result.hasErrors()) {

            model.addAttribute("pets", petRepository.findAll());
            model.addAttribute("services", serviceRepository.findAll());
            model.addAttribute("employees", employeeRepository.findAll());

            return "edit";
        }

        Appointment appointment = appointmentRepository.findById(dto.getAppointmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", dto.getAppointmentId()));

        appointment.setAppointmentDatetime(dto.getAppointmentDatetime());
        appointment.setRemarks(dto.getRemarks());

        appointment.setPet(
                petRepository.findById(dto.getPetId())
                        .orElseThrow(() -> new ResourceNotFoundException("Pet", dto.getPetId()))
        );

        appointment.setService(
                serviceRepository.findById(dto.getServiceId())
                        .orElseThrow(() -> new ResourceNotFoundException("Service", dto.getServiceId()))
        );

        appointment.setEmployee(
                employeeRepository.findById(dto.getStaffId())
                        .orElseThrow(() -> new ResourceNotFoundException("Employee", dto.getStaffId()))
        );

        appointmentRepository.save(appointment);

        return "redirect:/";
    }

    //-------------------------------------------
    // DELETE
    //-------------------------------------------
    @GetMapping("/delete")
    public String delete(@RequestParam Long id) {
        appointmentRepository.deleteById(id);
        return "redirect:/";
    }

    //-------------------------------------------
    // VIEW (similar to SHOW)
    //-------------------------------------------
    @GetMapping("/view")
    public String view(@RequestParam Long id, Model model) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", id));

        model.addAttribute("appointment", appointment);
        return "view";
    }
}
