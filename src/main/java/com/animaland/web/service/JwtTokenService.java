package com.animaland.web.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
public class JwtTokenService {

    private final JwtEncoder encoder;
    private final JwtDecoder decoder;

    public JwtTokenService(JwtEncoder encoder, JwtDecoder decoder) {
        this.encoder = encoder;
        this.decoder = decoder;
    }

    // -----------------------------
    // Generate JWT token
    // -----------------------------
    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();

        // Concatenate roles/authorities into a single string
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.DAYS)) // Token valid for 1 day
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();

        var encoderParameters = JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS256).build(),
                claims
        );

        return this.encoder.encode(encoderParameters).getTokenValue();
    }

    // -----------------------------
    // Extract expiration time in milliseconds
    // -----------------------------
    public Long extractExpirationTime(String token) {
        Jwt jwt = decoder.decode(token);
        Instant exp = jwt.getExpiresAt();
        return exp != null ? exp.toEpochMilli() : null;
    }

    // -----------------------------
    // Extract username from token
    // -----------------------------
    public String extractUsername(String token) {
        Jwt jwt = decoder.decode(token);
        return jwt.getSubject();
    }

    // -----------------------------
    // Validate token
    // -----------------------------
    public boolean isTokenValid(String token) {
        try {
            Jwt jwt = decoder.decode(token);
            Instant now = Instant.now();
            return jwt.getExpiresAt() != null && jwt.getExpiresAt().isAfter(now);
        } catch (JwtException e) {
            return false;
        }
    }
}