package com.animaland.web.service;

import com.animaland.web.DTO.EmployeeDTO;
import com.animaland.web.models.Employee;
import com.animaland.web.repository.EmployeeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@org.springframework.stereotype.Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // --------------------------------------------
    // CRUD METHODS
    // --------------------------------------------

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public Employee findById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee save(EmployeeDTO dto) {

        // Prevent duplicate email
        if (employeeRepository.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use");
        }

        Employee employee = new Employee();
        applyDtoToEmployee(employee, dto);

        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Employee employee, EmployeeDTO dto) {

        // Check if updating email to an existing user
        if (!employee.getEmail().equals(dto.getEmail()) &&
                employeeRepository.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use");
        }

        applyDtoToEmployee(employee, dto);
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    // --------------------------------------------
    // DTO → ENTITY MAPPING
    // --------------------------------------------

    private void applyDtoToEmployee(Employee employee, EmployeeDTO dto) {
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setRole(dto.getRole());
        employee.setContactNumber(dto.getContactNumber());
    }
}
