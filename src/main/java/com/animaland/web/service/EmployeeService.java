package com.animaland.web.service;

import com.animaland.web.DTO.EmployeeDTO;
import com.animaland.web.models.Employee;
import com.animaland.web.repository.EmployeeRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public EmployeeService(EmployeeRepository employeeRepository,
                           PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ---------------- CRUD ----------------
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public Employee findById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee findByUsername(String username) {
        return employeeRepository.findByUsername(username).orElse(null);
    }

    public Employee save(EmployeeDTO dto) {
        if (employeeRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username already exists.");
        }

        Employee employee = new Employee();
        applyDtoToEmployee(employee, dto);
        employee.setPassword(passwordEncoder.encode(dto.getPassword()));

        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Employee existing, EmployeeDTO dto) {
        applyDtoToEmployee(existing, dto);

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            existing.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        return employeeRepository.save(existing);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public boolean authenticate(String username, String rawPassword) {
        Employee employee = findByUsername(username);
        if (employee == null) return false;
        return passwordEncoder.matches(rawPassword, employee.getPassword());
    }

    private void applyDtoToEmployee(Employee employee, EmployeeDTO dto) {
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setUsername(dto.getUsername());
        employee.setRole(dto.getRole());
        employee.setContactNumber(dto.getContactNumber());
    }

    // ---------------- Additional Stats ----------------
    public long count() {
        // Total number of employees
        return employeeRepository.count();
    }

    public long countActive() {
        // Count all employees whose role is NOT "Inactive"
        return employeeRepository.countByRoleNot("Inactive");
    }

    // ---------------- Password Migration ----------------
    @Transactional
    public void migratePasswordsToBCrypt() {
        List<Employee> all = employeeRepository.findAll();
        for (Employee emp : all) {
            String password = emp.getPassword();
            if (!password.startsWith("$2a$")) {
                emp.setPassword(passwordEncoder.encode(password));
                employeeRepository.save(emp);
            }
        }
    }
}
