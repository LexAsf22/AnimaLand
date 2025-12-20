package com.animaland.web.repository;

import com.animaland.web.models.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceEntityRepository extends JpaRepository<ServiceEntity, Long> {
}
