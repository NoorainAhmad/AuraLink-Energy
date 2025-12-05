package com.App.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @Column(name = "consumer_number", nullable = false, unique = true)
    private Long consumerNumber; // 13-digit unique number

    @Column(name = "full_name", length = 50, nullable = false)
    private String fullName; // Customer's full name (max 50 chars)

    @Column(name = "address", columnDefinition = "TEXT")
    private String address; // Customer's address

    @Column(name = "email", length = 100)
    private String email; // Email address

    @Column(name = "mobile_number", length = 10)
    private String mobileNumber; // Mobile number (10 digits)

    @Column(name = "customer_type", length = 20)
    private String customerType; // Residential or Commercial

    @Column(name = "user_id", length = 20, unique = true, nullable = false)
    private String userId; // Unique user ID (5-20 chars)

    @Column(name = "password", nullable = false)
    private String password; // Password

    @Column(name = "status", length = 20)
    private String status;

    // Constructors
    public Customer() {
        super();
    }

    public Customer(Long consumerNumber, String fullName, String address, String email,
            String mobileNumber, String customerType, String userId, String password, String status) {
        this.consumerNumber = consumerNumber;
        this.fullName = fullName;
        this.address = address;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.customerType = customerType;
        this.userId = userId;
        this.password = password;
        this.status = status;
    }

    // Getters and Setters
    public Long getConsumerNumber() {
        return consumerNumber;
    }

    public void setConsumerNumber(Long consumerNumber) {
        this.consumerNumber = consumerNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getCustomerType() {
        return customerType;
    }

    public void setCustomerType(String customerType) {
        this.customerType = customerType;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Customer [consumerNumber=" + consumerNumber + ", fullName=" + fullName + ", address=" + address
                + ", email=" + email + ", mobileNumber=" + mobileNumber + ", customerType=" + customerType + ", userId="
                + userId + ", password=" + password + ", status=" + status + "]";
    }
}
