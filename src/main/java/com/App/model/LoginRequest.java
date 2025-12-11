package com.App.model;

public class LoginRequest {
    private String userId;
    private String password;
    private String role; // "admin" or "customer"

    // Constructors
    public LoginRequest() {
    }

    public LoginRequest(String userId, String password, String role) {
        this.userId = userId;
        this.password = password;
        this.role = role;
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
