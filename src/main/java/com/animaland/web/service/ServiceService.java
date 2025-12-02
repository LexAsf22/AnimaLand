package com.animaland.web.service;

import com.animaland.web.DTO.ServiceDTO;
import com.animaland.web.models.Service;
import com.animaland.web.repository.ServiceRepository;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    // ----------------------------------------------------
    // CRUD
    // ----------------------------------------------------

    public List<Service> findAll() {
        return serviceRepository.findAll();
    }

    public Service findById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));
    }

    public Service save(ServiceDTO dto) {
        Service service = new Service();
        applyDtoToService(service, dto);
        return serviceRepository.save(service);
    }

    public Service updateService(Service service, ServiceDTO dto) {
        applyDtoToService(service, dto);
        return serviceRepository.save(service);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    // ----------------------------------------------------
    // DTO → ENTITY MAPPING
    // ----------------------------------------------------

    private void applyDtoToService(Service service, ServiceDTO dto) {
        service.setServiceName(dto.getServiceName());
        service.setServiceType(dto.getServiceType());
        service.setPrice(dto.getPrice());
        service.setDuration(dto.getDuration());
    }
}
