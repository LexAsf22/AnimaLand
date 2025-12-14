package com.animaland.web.controller.api;

import com.animaland.web.DTO.AuthRequest;
import com.animaland.web.DTO.AuthResponse;
import com.animaland.web.DTO.EmployeeDTO;
import com.animaland.web.DTO.RegisterRequest;
import com.animaland.web.models.Employee;
import com.animaland.web.service.EmployeeService;
import com.animaland.web.service.JwtTokenService;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class ApiAuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final EmployeeService employeeService;

    public ApiAuthController(AuthenticationManager authenticationManager,
                             JwtTokenService jwtTokenService,
                             EmployeeService employeeService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.employeeService = employeeService;
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        String token = jwtTokenService.generateToken(authentication);
        Long expiresAt = jwtTokenService.extractExpirationTime(token);
        Employee employee = employeeService.findByUsername(authentication.getName());

        return new AuthResponse(token, employee.getUsername(), employee.getRole(), expiresAt);
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        // Convert RegisterRequest to EmployeeDTO
        EmployeeDTO dto = new EmployeeDTO();
        dto.setUsername(request.username());
        dto.setPassword(request.password());
        dto.setRole(request.role());
        dto.setFirstName(request.firstName());
        dto.setLastName(request.lastName());
        dto.setContactNumber(request.contactNumber());

        // Save the new employee
        employeeService.save(dto);

        // Automatically log in the newly registered employee
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        String token = jwtTokenService.generateToken(authentication);
        Long expiresAt = jwtTokenService.extractExpirationTime(token);

        return new AuthResponse(token, request.username(), request.role(), expiresAt);
    }

    @GetMapping("/validate")
    public String validateToken() {
        return "Token is valid";
    }
}
