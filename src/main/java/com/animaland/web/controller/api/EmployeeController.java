package com.animaland.web.controller.api;

import com.animaland.web.DTO.EmployeeDTO;
import com.animaland.web.DTO.EmployeeResponseDTO;
import com.animaland.web.models.Employee;
import com.animaland.web.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {
        List<EmployeeResponseDTO> list = employeeService.findAll().stream()
                .map(e -> new EmployeeResponseDTO(
                        e.getEmployeeId(),
                        e.getFirstName(),
                        e.getLastName(),
                        e.getUsername(),
                        e.getRole(),
                        e.getContactNumber()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(@PathVariable Long id) {
        Employee e = employeeService.findById(id);
        if (e == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        EmployeeResponseDTO dto = new EmployeeResponseDTO(
                e.getEmployeeId(),
                e.getFirstName(),
                e.getLastName(),
                e.getUsername(),
                e.getRole(),
                e.getContactNumber()
        );
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> createEmployee(@Valid @RequestBody EmployeeDTO dto) {
        Employee e = employeeService.save(dto);
        EmployeeResponseDTO response = new EmployeeResponseDTO(
                e.getEmployeeId(),
                e.getFirstName(),
                e.getLastName(),
                e.getUsername(),
                e.getRole(),
                e.getContactNumber()
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDTO dto) {
        Employee existing = employeeService.findById(id);
        if (existing == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        Employee updated = employeeService.updateEmployee(existing, dto);
        EmployeeResponseDTO response = new EmployeeResponseDTO(
                updated.getEmployeeId(),
                updated.getFirstName(),
                updated.getLastName(),
                updated.getUsername(),
                updated.getRole(),
                updated.getContactNumber()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        Employee existing = employeeService.findById(id);
        if (existing == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
