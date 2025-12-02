package com.animaland.web.controller.web;

import com.animaland.web.DTO.UserDTO;
import com.animaland.web.models.User;
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
    public String loginPage() {
        return "login";
    }

    // Handle login form submission
    @PostMapping("/login")
    public String loginUser(@RequestParam String email,
                            @RequestParam String password,
                            HttpSession session,
                            Model model) {

        User user = userService.authenticate(email, password);

        if (user == null) {
            model.addAttribute("error", "Invalid email or password");
            return "login";
        }

        session.setAttribute("USER_SESSION", user);
        return "redirect:/";  // redirect to homepage or dashboard
    }

    // Show registration page
    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("user", new UserDTO());
        return "register";
    }

    // Process registration
    @PostMapping("/register")
    public String register(@RequestParam String fullName,
                           @RequestParam String email,
                           @RequestParam String phoneNumber,
                           @RequestParam String address,
                           @RequestParam String password) {

        // Convert fullName → firstName + lastName
        String[] parts = fullName.split(" ", 2);
        String first = parts[0];
        String last = parts.length > 1 ? parts[1] : "";

        UserDTO dto = new UserDTO();
        dto.setFirstName(first);
        dto.setLastName(last);
        dto.setEmail(email);
        dto.setPhoneNumber(phoneNumber);
        dto.setAddress(address);
        dto.setPassword(password);

        userService.save(dto);

        return "redirect:/login";
    }

    // Logout
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
