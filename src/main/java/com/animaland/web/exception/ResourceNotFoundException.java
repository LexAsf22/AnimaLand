package com.animaland.web.exception;

public class ResourceNotFoundException extends RuntimeException {

    // Constructor accepting resource name and ID
    public ResourceNotFoundException(String resource, Long resourceId) {
        super("Resource not found: " + resource + " with ID " + resourceId);
    }

    // Constructor for message only
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
