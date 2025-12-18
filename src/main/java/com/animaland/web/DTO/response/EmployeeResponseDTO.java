package com.animaland.web.DTO.response;

public class EmployeeResponseDTO {
    private Long employeeId;
    private String firstName;
    private String lastName;
    private String username;
    private String role;
    private String contactNumber;

    // Constructors
    public EmployeeResponseDTO() {}
    public EmployeeResponseDTO(Long employeeId, String firstName, String lastName, String username, String role, String contactNumber) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.role = role;
        this.contactNumber = contactNumber;
    }

    // Getters & Setters
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
}
