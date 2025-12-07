package com.animaland.web.controller.api;

import com.animaland.web.DTO.AuthRequest;
import com.animaland.web.DTO.AuthResponse;
import com.animaland.web.models.Employee;
import com.animaland.web.service.EmployeeService;
import com.animaland.web.service.JwtTokenService;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
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

    // =========================================
    // LOGIN (Employee)
    // =========================================
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request) {

        // Authenticate Employee using username
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(), // login via username
                        request.password()
                )
        );

        // Generate JWT token
        String token = jwtTokenService.generateToken(authentication);

        Employee employee = employeeService.findByUsername(request.username());

        return new AuthResponse(
                token,
                employee.getUsername(),
                "Login successful"
        );
    }

    // =========================================
    // VALIDATE TOKEN
    // =========================================
    @GetMapping("/validate")
    public AuthResponse validate(@RequestHeader("Authorization") String header) {

        if (header == null || !header.startsWith("Bearer ")) {
            return new AuthResponse(null, null, "Invalid token");
        }

        String token = header.substring(7);

        if (!jwtTokenService.isTokenValid(token)) {
            return new AuthResponse(null, null, "Token invalid");
        }

        String username = jwtTokenService.extractUsername(token);
        Employee employee = employeeService.findByUsername(username);

        if (employee == null) {
            return new AuthResponse(null, null, "Employee not found");
        }

        return new AuthResponse(
                token,
                employee.getUsername(),
                "Token valid"
        );
    }
}
