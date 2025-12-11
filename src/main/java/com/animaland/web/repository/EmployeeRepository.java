package com.animaland.web.repository;

import com.animaland.web.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByUsername(String username);
    boolean existsByUsername(String username);

    // Count employees by role
    long countByRole(String role);

    // Count employees whose role is NOT the given value
    long countByRoleNot(String role);
}
