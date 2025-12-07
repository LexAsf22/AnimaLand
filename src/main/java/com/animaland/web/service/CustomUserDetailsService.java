package com.animaland.web.service;

import com.animaland.web.models.Employee;
import com.animaland.web.repository.EmployeeRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    public CustomUserDetailsService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find employee by username (used for login)
        Employee employee = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Employee not found"));

        // Return employee details as UserDetails
        return org.springframework.security.core.userdetails.User
                .withUsername(employee.getUsername())  // Use username for authentication
                .password(employee.getPassword())      // Use password for authentication (hashed)
                .roles(employee.getRole())              // Use role ("staff" or "veterinarian")
                .build();
    }
}
