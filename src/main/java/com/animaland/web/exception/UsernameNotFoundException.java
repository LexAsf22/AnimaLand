package com.animaland.web.exception;

public class UsernameNotFoundException extends RuntimeException{
    UsernameNotFoundException(String message){
        super(message);
    }
}