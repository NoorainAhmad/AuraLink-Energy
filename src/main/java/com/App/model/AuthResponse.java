package com.App.model;

public class AuthResponse {
    private String userId;
    private String role; // "admin" or "customer"
    private String fullName; // For customers
    private Long consumerNumber; // For customers
    private String email;
    private String message;
    private boolean success;

    // Constructors
    public AuthResponse() {
    }

    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // Static factory methods
    public static AuthResponse fromAdmin(Admin admin) {
        AuthResponse response = new AuthResponse();
        response.setSuccess(true);
        response.setUserId(admin.getUser());
        response.setRole("admin");
        response.setMessage("Admin login successful");
        return response;
    }

    public static AuthResponse fromCustomer(Customer customer) {
        AuthResponse response = new AuthResponse();
        response.setSuccess(true);
        response.setUserId(customer.getUserId());
        response.setRole("customer");
        response.setFullName(customer.getFullName());
        response.setConsumerNumber(customer.getConsumerNumber());
        response.setEmail(customer.getEmail());
        response.setMessage("Customer login successful");
        return response;
    }

    public static AuthResponse error(String message) {
        return new AuthResponse(false, message);
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Long getConsumerNumber() {
        return consumerNumber;
    }

    public void setConsumerNumber(Long consumerNumber) {
        this.consumerNumber = consumerNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
