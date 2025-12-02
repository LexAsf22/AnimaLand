package com.animaland.web.controller.api;

import com.animaland.web.models.Service;
import com.animaland.web.DTO.ServiceDTO;
import com.animaland.web.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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

    @GetMapping
    public List<Service> getAllServices() {
        return serviceService.findAll();
    }

    @PostMapping
    public Service createService(@Valid @RequestBody ServiceDTO serviceDTO) {
        return serviceService.save(serviceDTO);
    }

    @PutMapping("/{id}")
    public Service updateService(@PathVariable Long id, @Valid @RequestBody ServiceDTO serviceDTO) {
        Service service = serviceService.findById(id);
        if (service == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        return serviceService.updateService(service, serviceDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable Long id) {
        Service service = serviceService.findById(id);
        if (service == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        serviceService.deleteService(id);
    }
}
