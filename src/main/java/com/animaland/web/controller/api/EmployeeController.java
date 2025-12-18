package com.animaland.web.controller.api;

import com.animaland.web.DTO.EmployeeDTO;
import com.animaland.web.DTO.response.EmployeeResponseDTO;
import com.animaland.web.models.Employee;
import com.animaland.web.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    /* ==========================
       GET ALL EMPLOYEES
       ========================== */
    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {
        List<EmployeeResponseDTO> list = employeeService.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(@PathVariable Long id) {
        Employee e = employeeService.findById(id);
        if (e == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        return ResponseEntity.ok(toResponseDTO(e));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeDTO dto) {

        Employee existing = employeeService.findById(id);
        if (existing == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");

        Employee updated = employeeService.updateEmployee(existing, dto);
        return ResponseEntity.ok(toResponseDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        Employee existing = employeeService.findById(id);
        if (existing == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");

        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    /* ==========================
       EMPLOYEE STATS
       ========================== */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Integer>> getStats() {
        List<Employee> all = employeeService.findAll();
        int total = all.size();
        int managers = (int) all.stream().filter(e -> "MANAGER".equalsIgnoreCase(e.getRole())).count();
        int staff = (int) all.stream().filter(e -> "STAFF".equalsIgnoreCase(e.getRole())).count();

        Map<String, Integer> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("managers", managers);
        stats.put("staff", staff);

        return ResponseEntity.ok(stats);
    }

    /* ==========================
       EMPLOYEE ROLES
       ========================== */
    @GetMapping("/roles")
    public ResponseEntity<List<String>> getRoles() {
        return ResponseEntity.ok(List.of("Manager", "Staff"));
    }

    /* ==========================
       EMPLOYEE CONTACTS
       ========================== */
    @GetMapping("/contacts")
    public ResponseEntity<List<EmployeeResponseDTO>> getContacts() {
        List<EmployeeResponseDTO> contacts = employeeService.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(contacts);
    }

    /* ==========================
       HELPER
       ========================== */
    private EmployeeResponseDTO toResponseDTO(Employee e) {
        return new EmployeeResponseDTO(
                e.getEmployeeId(),
                e.getFirstName(),
                e.getLastName(),
                e.getUsername(),
                e.getRole(),
                e.getContactNumber()
        );
    }
}
