package com.animaland.web.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

    @GetMapping("/auth/web-login")
    public String loginPage() {
        return "login"; // Thymeleaf login.html
    }
}
