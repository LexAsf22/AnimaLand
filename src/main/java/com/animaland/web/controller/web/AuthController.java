package com.animaland.web.controller.web;

import com.animaland.web.DTO.EmployeeDTO;
import com.animaland.web.models.Employee;
import com.animaland.web.service.EmployeeService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    private final EmployeeService employeeService;

    public AuthController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Show login page
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    // Handle login form submission
    @PostMapping("/login")
    public String loginUser(@RequestParam String username,
                            @RequestParam String password,
                            HttpSession session,
                            Model model) {

        // Authenticate employee
        Employee employee = employeeService.findByUsername(username);

        if (employee == null || !employee.getPassword().equals(password)) {
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }

        // Set session attribute with authenticated employee
        session.setAttribute("USER_SESSION", employee);
        return "redirect:/";  // redirect to homepage or dashboard
    }

    // Show registration page
    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("employee", new EmployeeDTO());
        return "register";
    }

    // Process registration (Employee registration)
    @PostMapping("/register")
    public String register(@RequestParam String firstName,
                           @RequestParam String lastName,
                           @RequestParam String username,
                           @RequestParam String password,
                           @RequestParam String role,
                           @RequestParam String contactNumber) {

        // Create EmployeeDTO and set properties
        EmployeeDTO dto = new EmployeeDTO();
        dto.setFirstName(firstName);
        dto.setLastName(lastName);
        dto.setUsername(username);
        dto.setPassword(password);
        dto.setRole(role);
        dto.setContactNumber(contactNumber);

        // Save the employee using EmployeeService
        employeeService.save(dto);

        return "redirect:/login";
    }

    // Logout
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
