package com.animaland.web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

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
        return "error/error";  // Renders error.html
    }

    // -----------------------------
    // Handle validation errors (@Valid)
    // -----------------------------
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Object handleValidationException(MethodArgumentNotValidException ex, WebRequest request, Model model) {
        if (isApiRequest(request)) {
            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getFieldErrors().forEach(error -> {
                errors.put(error.getField(), error.getDefaultMessage());
            });
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        // Web page: collect errors as HTML string
        StringBuilder errorsHtml = new StringBuilder();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorsHtml.append(error.getField())
                    .append(": ")
                    .append(error.getDefaultMessage())
                    .append("<br>");
        });
        model.addAttribute("message", errorsHtml.toString());
        return "error/error";  // Renders error.html
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
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        }

        model.addAttribute("message", ex.getMessage());
        return "error/error";  // Renders error.html
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
            return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        model.addAttribute("message", "Oops! Something went wrong. Please try again later.");
        return "error/error";  // Renders error.html
    }

    // -----------------------------
    // Helper: detect if request is an API request
    // -----------------------------
    private boolean isApiRequest(WebRequest request) {
        String acceptHeader = request.getHeader("Accept");
        return acceptHeader != null && acceptHeader.contains(MediaType.APPLICATION_JSON_VALUE);
    }
}
