package com.animaland.web.controller.api;

import com.animaland.web.DTO.EmployeeDTO;
import com.animaland.web.DTO.EmployeeResponseDTO;
import com.animaland.web.models.Employee;
import com.animaland.web.repository.EmployeeRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /* ==========================
       BASIC CRUD
       ========================== */

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {
        List<EmployeeResponseDTO> list = employeeRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(@PathVariable Long id) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
        return ResponseEntity.ok(toResponseDTO(e));
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> createEmployee(@Valid @RequestBody EmployeeDTO dto) {
        if (employeeRepository.existsByUsername(dto.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        Employee e = new Employee();
        e.setFirstName(dto.getFirstName());
        e.setLastName(dto.getLastName());
        e.setUsername(dto.getUsername());
        e.setPassword(dto.getPassword()); // hash later
        e.setRole(dto.getRole());
        e.setContactNumber(dto.getContactNumber());

        Employee saved = employeeRepository.save(e);
        return new ResponseEntity<>(toResponseDTO(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeDTO dto) {

        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setUsername(dto.getUsername());
        existing.setRole(dto.getRole());
        existing.setContactNumber(dto.getContactNumber());

        Employee updated = employeeRepository.save(existing);
        return ResponseEntity.ok(toResponseDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        }
        employeeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /* ==========================
       ENDPOINTS REQUIRED BY REACT
       ========================== */

    // GET /api/employee/stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getEmployeeStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", employeeRepository.count());
        stats.put("admins", employeeRepository.countByRole("ADMIN"));
        stats.put("staff", employeeRepository.countByRoleNot("ADMIN"));
        return ResponseEntity.ok(stats);
    }

    // GET /api/employee/roles
    @GetMapping("/roles")
    public ResponseEntity<List<String>> getRoles() {
        List<String> roles = employeeRepository.findAll()
                .stream()
                .map(Employee::getRole)
                .filter(Objects::nonNull)
                .distinct()
                .toList();
        return ResponseEntity.ok(roles);
    }

    // GET /api/employee/contacts
    @GetMapping("/contacts")
    public ResponseEntity<List<Map<String, String>>> getContacts() {
        List<Map<String, String>> contacts = employeeRepository.findAll()
                .stream()
                .map(e -> {
                    Map<String, String> map = new HashMap<>();
                    map.put("name", e.getFirstName() + " " + e.getLastName());
                    map.put("contactNumber", e.getContactNumber());
                    map.put("role", e.getRole());
                    return map;
                })
                .toList();

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
