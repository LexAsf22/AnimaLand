package com.animaland.web.service;

import com.animaland.web.DTO.UserDTO;
import com.animaland.web.models.User;
import com.animaland.web.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ============================
    // API REGISTER USER
    // ============================
    public User registerUser(String email, String rawPassword) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists.");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));

        // Default values (optional)
        user.setFirstName("User");
        user.setLastName("");
        user.setPhoneNumber("");
        user.setAddress("");

        return userRepository.save(user);
    }

    // ============================
    // CREATE USER (WEB FORM)
    // ============================
    public User save(UserDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setAddress(dto.getAddress());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        return userRepository.save(user);
    }

    // ============================
    // UPDATE USER
    // ============================
    public User updateUser(User user, UserDTO dto) {

        if (!user.getEmail().equals(dto.getEmail()) &&
                userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setAddress(dto.getAddress());

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        return userRepository.save(user);
    }

    // ============================
    // LOGIN / AUTHENTICATE
    // ============================
    public User authenticate(String email, String rawPassword) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return null;

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            return null;
        }

        return user;
    }

    // ============================
    // CRUD
    // ============================
    public List<User> findAll() { return userRepository.findAll(); }

    public User findById(Long id) { return userRepository.findById(id).orElse(null); }

    public void deleteUser(Long id) { userRepository.deleteById(id); }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
