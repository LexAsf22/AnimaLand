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
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/services")
public class ServiceEntityController {

    private final ServiceEntityService serviceEntityService;

    public ServiceEntityController(ServiceEntityService serviceEntityService) {
        this.serviceEntityService = serviceEntityService;
    }

    // --------------------------
    // GET ALL SERVICES (as DTO)
    // --------------------------
    @GetMapping
    public ResponseEntity<List<ServiceEntityDTO>> getAllServices() {
        List<ServiceEntityDTO> services = serviceEntityService.findAll()
                .stream()
                .map(s -> {
                    ServiceEntityDTO dto = new ServiceEntityDTO();
                    dto.setServiceId(s.getServiceId());
                    dto.setServiceName(s.getServiceName());
                    dto.setServiceType(s.getServiceType());
                    dto.setPrice(s.getPrice());
                    dto.setDuration(s.getDuration());
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(services);
    }

    // --------------------------
    // CREATE SERVICE
    // --------------------------
    @PostMapping
    public ResponseEntity<ServiceEntityDTO> createService(@Valid @RequestBody ServiceEntityDTO serviceEntityDTO) {
        ServiceEntity created = serviceEntityService.save(serviceEntityDTO);

        ServiceEntityDTO dto = new ServiceEntityDTO();
        dto.setServiceId(created.getServiceId());
        dto.setServiceName(created.getServiceName());
        dto.setServiceType(created.getServiceType());
        dto.setPrice(created.getPrice());
        dto.setDuration(created.getDuration());

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    // --------------------------
    // UPDATE SERVICE
    // --------------------------
    @PutMapping("/{id}")
    public ResponseEntity<ServiceEntityDTO> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceEntityDTO serviceEntityDTO
    ) {
        ServiceEntity existing = serviceEntityService.findById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        }

        ServiceEntity updated = serviceEntityService.updateService(existing, serviceEntityDTO);

        ServiceEntityDTO dto = new ServiceEntityDTO();
        dto.setServiceId(updated.getServiceId());
        dto.setServiceName(updated.getServiceName());
        dto.setServiceType(updated.getServiceType());
        dto.setPrice(updated.getPrice());
        dto.setDuration(updated.getDuration());

        return ResponseEntity.ok(dto);
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
