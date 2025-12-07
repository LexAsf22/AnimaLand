package com.animaland.web.repository;

import com.animaland.web.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Custom query to find employee by username (authentication)
    Optional<Employee> findByUsername(String username);
}
