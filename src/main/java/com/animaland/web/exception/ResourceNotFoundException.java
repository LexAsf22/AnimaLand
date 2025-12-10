package com.animaland.web.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " with the id " + id + " does not exist");
    }
}
