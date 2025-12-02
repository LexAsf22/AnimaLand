package com.animaland.web.DTO;

public record AuthResponse(Long token, String username, String message) {
}
