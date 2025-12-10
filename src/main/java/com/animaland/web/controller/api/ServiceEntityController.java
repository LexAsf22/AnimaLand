package com.animaland.web.controller.api;

import com.animaland.web.DTO.ServiceEntityDTO;
import com.animaland.web.models.ServiceEntity;
import com.animaland.web.service.ServiceEntityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/services")
public class ServiceEntityController {

    private final ServiceEntityService serviceEntityService;

    public ServiceEntityController(ServiceEntityService serviceEntityService) {
        this.serviceEntityService = serviceEntityService;
    }

    // --------------------------
    // GET ALL SERVICES
    // --------------------------
    @GetMapping
    public ResponseEntity<List<ServiceEntity>> getAllServices() {
        List<ServiceEntity> serviceEntities = serviceEntityService.findAll();
        return ResponseEntity.ok(serviceEntities);
    }

    // --------------------------
    // CREATE SERVICE
    // --------------------------
    @PostMapping
    public ResponseEntity<ServiceEntity> createService(@Valid @RequestBody ServiceEntityDTO serviceEntityDTO) {
        ServiceEntity created = serviceEntityService.save(serviceEntityDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // --------------------------
    // UPDATE SERVICE
    // --------------------------
    @PutMapping("/{id}")
    public ResponseEntity<ServiceEntity> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceEntityDTO serviceEntityDTO
    ) {
        ServiceEntity existing = serviceEntityService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        }

        ServiceEntity updated = serviceEntityService.updateService(existing, serviceEntityDTO);
        return ResponseEntity.ok(updated);
    }

    // --------------------------
    // DELETE SERVICE
    // --------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        ServiceEntity existing = serviceEntityService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        }

        serviceEntityService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
