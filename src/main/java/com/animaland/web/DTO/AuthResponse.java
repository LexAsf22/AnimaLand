package com.animaland.web.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthResponse {

    private final String token;
    private final String username;
    private final String role;
    private final Long expiresAt;

    public AuthResponse(
            @JsonProperty("token") String token,
            @JsonProperty("username") String username,
            @JsonProperty("role") String role,
            @JsonProperty("expiresAt") Long expiresAt) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.expiresAt = expiresAt;
    }

    // ---------------- Getters ----------------
    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public Long getExpiresAt() {
        return expiresAt;
    }
}
