package com.animaland.web.service;

import com.animaland.web.models.User;
import com.animaland.web.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // -----------------------------
    // REGISTER NEW USER
    // -----------------------------
    public User registerUser(String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already taken");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        // Optional default values
        user.setFirstName(email);

        return userRepository.save(user);
    }

    // -----------------------------
    // AUTHENTICATE USER
    // -----------------------------
    public User authenticate(String email, String rawPassword) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return null; // user not found
        }

        User user = optionalUser.get();

        // Verify password
        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        }

        return null; // invalid password
    }

    // -----------------------------
    // FIND USER BY ID
    // -----------------------------
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
