package com.animaland.web.controller.web;

import com.animaland.web.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Show login page
    @GetMapping("/login")
    public String login() {
        return "login"; // Thymeleaf template: login.html
    }

    // Show registration page
    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("user", new Object()); // placeholder object for form binding
        return "register"; // Thymeleaf template: register.html
    }

    // Process registration form
    @PostMapping("/register")
    public String register(@RequestParam String username,
                           @RequestParam String password,
                           @RequestParam String fullName,
                           @RequestParam String email,
                           @RequestParam String phoneNumber,
                           @RequestParam String address) {

        // Register the user using UserService
        userService.registerUser(username, password, fullName, email, phoneNumber, address);

        return "redirect:/login"; // after successful registration
    }

    // Logout user
    @GetMapping("/logout")
    public String logout(HttpSession session){
        session.invalidate(); // clear session
        return "redirect:/login"; // redirect to login page
    }
}
