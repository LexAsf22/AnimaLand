package com.animaland.web.service;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;

@Service
public class JwtTokenService {

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;

    public JwtTokenService(@Value("${jwt.secret-key}") String secretKey) {

        // Convert secret key to bytes
        SecretKeySpec secretKeySpec =
                new SecretKeySpec(secretKey.getBytes(), "HmacSHA256");

        // ✅ ENCODER (sign tokens)
        this.jwtEncoder = new NimbusJwtEncoder(new ImmutableSecret<>(secretKeySpec));

        // ✅ DECODER (verify tokens)
        this.jwtDecoder = NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

    // -----------------------------------------------------
    // CREATE JWT TOKEN
    // -----------------------------------------------------
    public String generateToken(Authentication authentication) {

        Instant now = Instant.now();
        long expirationSeconds = 60 * 60 * 24; // 24 hours

        String username = authentication.getName(); // employee's username (used for login)

        // ROLE (fetch from authorities)
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(a -> a.getAuthority())
                .orElse("USER");  // default to "USER" if no role is present

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(username)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expirationSeconds))
                .claim("role", role)  // storing role as a claim
                .issuer("animaland-api")
                .build();

        var header = JwsHeader.with(MacAlgorithm.HS256).build();

        return jwtEncoder.encode(
                JwtEncoderParameters.from(header, claims)
        ).getTokenValue();
    }

    // -----------------------------------------------------
    // CHECK EXPIRATION TIME
    // -----------------------------------------------------
    public Long extractExpirationTime(String token) {
        Jwt jwt = jwtDecoder.decode(token);
        return jwt.getExpiresAt().getEpochSecond();
    }

    // -----------------------------------------------------
    // GET USERNAME (EMPLOYEE'S USERNAME)
    // -----------------------------------------------------
    public String extractUsername(String token) {
        Jwt jwt = jwtDecoder.decode(token);
        return jwt.getSubject();  // returns the employee's username (not email)
    }

    // -----------------------------------------------------
    // VALIDATE TOKEN
    // -----------------------------------------------------
    public boolean isTokenValid(String token) {
        try {
            jwtDecoder.decode(token);  // throws error if invalid
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
