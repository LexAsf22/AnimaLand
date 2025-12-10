package com.animaland.web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // -----------------------------
    // Handle ResourceNotFoundException (custom)
    // -----------------------------
    @ExceptionHandler(ResourceNotFoundException.class)
    public String handleResourceNotFound(ResourceNotFoundException ex, Model model) {
        model.addAttribute("message", ex.getMessage());
        return "error/error";  // Thymeleaf error page
    }

    // -----------------------------
    // Handle ResponseStatusException (404, 403, etc.)
    // -----------------------------
    @ExceptionHandler(ResponseStatusException.class)
    public Object handleResponseStatusException(ResponseStatusException ex, WebRequest request, Model model) {
        if (isApiRequest(request)) {
            Map<String, Object> body = new HashMap<>();
            body.put("timestamp", LocalDateTime.now());
            body.put("status", ex.getStatusCode().value());
            body.put("error", ex.getReason());
            return ResponseEntity.status(ex.getStatusCode()).body(body);
        }

        model.addAttribute("message", ex.getReason());
        return "error/error";
    }

    // -----------------------------
    // Handle validation errors (@Valid)
    // -----------------------------
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Object handleValidationException(MethodArgumentNotValidException ex, WebRequest request, Model model) {
        if (isApiRequest(request)) {
            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            Map<String, Object> body = new HashMap<>();
            body.put("timestamp", LocalDateTime.now());
            body.put("status", HttpStatus.BAD_REQUEST.value());
            body.put("errors", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
        }

        StringBuilder errorsHtml = new StringBuilder();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorsHtml.append(error.getField())
                    .append(": ")
                    .append(error.getDefaultMessage())
                    .append("<br>");
        });
        model.addAttribute("message", errorsHtml.toString());
        return "error/error";
    }

    // -----------------------------
    // Handle IllegalArgumentException
    // -----------------------------
    @ExceptionHandler(IllegalArgumentException.class)
    public Object handleIllegalArgument(IllegalArgumentException ex, WebRequest request, Model model) {
        if (isApiRequest(request)) {
            Map<String, Object> body = new HashMap<>();
            body.put("timestamp", LocalDateTime.now());
            body.put("status", HttpStatus.BAD_REQUEST.value());
            body.put("error", ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
        }

        model.addAttribute("message", ex.getMessage());
        return "error/error";
    }

    // -----------------------------
    // Handle all other exceptions
    // -----------------------------
    @ExceptionHandler(Exception.class)
    public Object handleGenericException(Exception ex, WebRequest request, Model model) {
        if (isApiRequest(request)) {
            Map<String, Object> body = new HashMap<>();
            body.put("timestamp", LocalDateTime.now());
            body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            body.put("error", ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
        }

        model.addAttribute("message", "Oops! Something went wrong. Please try again later.");
        return "error/error";
    }

    // -----------------------------
    // Helper: detect if request is an API request
    // -----------------------------
    private boolean isApiRequest(WebRequest request) {
        String acceptHeader = request.getHeader("Accept");
        return acceptHeader != null && acceptHeader.contains(MediaType.APPLICATION_JSON_VALUE);
    }
}
