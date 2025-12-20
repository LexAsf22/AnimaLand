package com.animaland.web.controller.api;

import com.animaland.web.DTO.EmployeeDTO;
import com.animaland.web.models.Employee;
import com.animaland.web.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final EmployeeService employeeService;

    public StaffController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // GET all staff (veterinarians)
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllStaff() {
        List<EmployeeDTO> staff = employeeService.findAll().stream()
                .map(e -> {
                    EmployeeDTO dto = new EmployeeDTO();
                    dto.setFirstName(e.getFirstName());
                    dto.setLastName(e.getLastName());
                    dto.setUsername(e.getUsername());
                    dto.setPassword(e.getPassword());
                    dto.setRole(e.getRole());
                    dto.setContactNumber(e.getContactNumber());
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(staff);
    }
}
