package com.animaland.web.service;

import com.animaland.web.DTO.ServiceEntityDTO;
import com.animaland.web.models.ServiceEntity;
import com.animaland.web.repository.ServiceEntityRepository;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceEntityService {

    private final ServiceEntityRepository serviceEntityRepository;

    public ServiceEntityService(ServiceEntityRepository serviceEntityRepository) {
        this.serviceEntityRepository = serviceEntityRepository;
    }

    // ----------------------------------------------------
    // CRUD
    // ----------------------------------------------------

    public List<ServiceEntity> findAll() {
        return serviceEntityRepository.findAll();
    }

    public ServiceEntity findById(Long id) {
        return serviceEntityRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));
    }

    public ServiceEntity save(ServiceEntityDTO dto) {
        ServiceEntity serviceEntity = new ServiceEntity();
        applyDtoToService(serviceEntity, dto);
        return serviceEntityRepository.save(serviceEntity);
    }

    public ServiceEntity updateService(ServiceEntity serviceEntity, ServiceEntityDTO dto) {
        applyDtoToService(serviceEntity, dto);
        return serviceEntityRepository.save(serviceEntity);
    }

    public void deleteService(Long id) {
        serviceEntityRepository.deleteById(id);
    }

    // ----------------------------------------------------
    // DTO → ENTITY MAPPING
    // ----------------------------------------------------

    private void applyDtoToService(ServiceEntity serviceEntity, ServiceEntityDTO dto) {
        serviceEntity.setServiceName(dto.getServiceName());
        serviceEntity.setServiceType(dto.getServiceType());
        serviceEntity.setPrice(dto.getPrice());
        serviceEntity.setDuration(dto.getDuration());
    }
}
