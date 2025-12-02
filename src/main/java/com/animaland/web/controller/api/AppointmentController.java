package com.animaland.web.controller.api;

import com.animaland.web.DTO.AppointmentDTO;
import com.animaland.web.models.Appointment;
import com.animaland.web.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.findAll();
    }

    @PostMapping
    public Appointment createAppointment(@Valid @RequestBody AppointmentDTO appointmentDTO) {
        return appointmentService.save(appointmentDTO);
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @Valid @RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = appointmentService.findById(id);
        if (appointment == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found");
        return appointmentService.updateAppointment(appointment, appointmentDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentService.findById(id);
        if (appointment == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found");
        appointmentService.deleteAppointment(id);
    }
}
