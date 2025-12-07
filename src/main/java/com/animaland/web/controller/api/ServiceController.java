package com.animaland.web.controller.api;

import com.animaland.web.DTO.ServiceDTO;
import com.animaland.web.models.Service;
import com.animaland.web.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    // --------------------------
    // GET ALL SERVICES
    // --------------------------
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        List<Service> services = serviceService.findAll();
        return ResponseEntity.ok(services);
    }

    // --------------------------
    // CREATE SERVICE
    // --------------------------
    @PostMapping
    public ResponseEntity<Service> createService(@Valid @RequestBody ServiceDTO serviceDTO) {
        Service created = serviceService.save(serviceDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // --------------------------
    // UPDATE SERVICE
    // --------------------------
    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceDTO serviceDTO
    ) {
        Service existing = serviceService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        }

        Service updated = serviceService.updateService(existing, serviceDTO);
        return ResponseEntity.ok(updated);
    }

    // --------------------------
    // DELETE SERVICE
    // --------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        Service existing = serviceService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        }

        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
