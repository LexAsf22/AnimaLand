package com.animaland.web.controller.api;

import com.animaland.web.DTO.AuthRequest;
import com.animaland.web.DTO.AuthResponse;
import com.animaland.web.DTO.RegisterRequest;
import com.animaland.web.models.User;
import com.animaland.web.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class ApiAuthController {

    private final UserService userService;

    public ApiAuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request, HttpSession session) {
        User user = userService.authenticate(request.username(), request.password());

        if (user == null) {
            return new AuthResponse(null, null, "Invalid username or password");
        }

        // store user in session
        session.setAttribute("USER_SESSION", user);

        return new AuthResponse(
                user.getUserId(),
                user.getFirstName(),
                "Login successful"
        );
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request, HttpSession session) {
        User newUser = userService.registerUser(request.username(), request.password());

        // auto-login
        session.setAttribute("USER_SESSION", newUser);

        return new AuthResponse(
                newUser.getUserId(),
                newUser.getFirstName(),
                "Registration successful"
        );
    }

    @GetMapping("/validate")
    public AuthResponse validate(HttpSession session) {
        User user = (User) session.getAttribute("USER_SESSION");

        if (user == null) {
            return new AuthResponse(null, null, "No active session");
        }

        return new AuthResponse(
                user.getUserId(),
                user.getFirstName(),
                "Session is valid"
        );
    }

    @PostMapping("/logout")
    public AuthResponse logout(HttpSession session) {
        session.invalidate();
        return new AuthResponse(null, null, "Logged out successfully");
    }
}
