package com.animaland.web.DTO;

public record AuthResponse(
        String token,
        String username,
        String message
) {}
