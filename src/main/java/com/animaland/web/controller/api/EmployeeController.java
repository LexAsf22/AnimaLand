package com.animaland.web.controller.api;

import com.animaland.web.DTO.EmployeeDTO;
import com.animaland.web.models.Employee;
import com.animaland.web.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.findAll();
    }

    @PostMapping
    public Employee createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        return employeeService.save(employeeDTO);
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDTO employeeDTO) {
        Employee employee = employeeService.findById(id);
        if (employee == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        return employeeService.updateEmployee(employee, employeeDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeService.findById(id);
        if (employee == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        employeeService.deleteEmployee(id);
    }
}
