package com.animaland.web.controller.api;

import com.animaland.web.DTO.AuthRequest;
import com.animaland.web.DTO.AuthResponse;
import com.animaland.web.DTO.RegisterRequest;
import com.animaland.web.models.User;
import com.animaland.web.service.JwtTokenService;
import com.animaland.web.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class ApiAuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final UserService userService;

    public ApiAuthController(AuthenticationManager authenticationManager,
                             JwtTokenService jwtTokenService,
                             UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.userService = userService;
    }

    // =========================================
    // LOGIN
    // =========================================
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request) {

        // Authenticate user
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),    // username = email
                        request.password()
                )
        );

        // Generate JWT token
        String token = jwtTokenService.generateToken(authentication);

        User user = userService.findByEmail(request.username());

        return new AuthResponse(
                token,
                user.getEmail(),
                "Login successful"
        );
    }

    // =========================================
    // REGISTER + AUTO LOGIN
    // =========================================
    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {

        // Create account
        User newUser = userService.registerUser(
                request.username(),    // again username = email
                request.password()
        );

        // Auto login
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        newUser.getEmail(),
                        request.password()
                )
        );

        String token = jwtTokenService.generateToken(authentication);

        return new AuthResponse(
                token,
                newUser.getEmail(),
                "Registration successful"
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

        String email = jwtTokenService.extractUsername(token);
        User user = userService.findByEmail(email);

        if (user == null) {
            return new AuthResponse(null, null, "User not found");
        }

        return new AuthResponse(
                token,
                user.getEmail(),
                "Token valid"
        );
    }
}
