package com.App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.App.model.*;
import com.App.service.AdminService;
import com.App.service.CustomerService;

import java.util.Random;

@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:5173" })
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private CustomerService customerService;

    /**
     * Unified login endpoint for both admin and customer
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        String userId = loginRequest.getUserId();
        String password = loginRequest.getPassword();
        String role = loginRequest.getRole();

        if (role == null || role.isEmpty()) {
            return new ResponseEntity<>(
                    AuthResponse.error("Role must be specified (admin or customer)"),
                    HttpStatus.BAD_REQUEST);
        }

        if ("admin".equalsIgnoreCase(role)) {
            Admin admin = adminService.validateAdmin(userId, password);
            if (admin != null) {
                System.out.println("Admin login successful: " + admin.getUser());
                return new ResponseEntity<>(AuthResponse.fromAdmin(admin), HttpStatus.OK);
            } else {
                System.out.println("Admin login failed for: " + userId);
                return new ResponseEntity<>(
                        AuthResponse.error("Invalid admin credentials"),
                        HttpStatus.UNAUTHORIZED);
            }
        } else if ("customer".equalsIgnoreCase(role)) {
            Customer customer = customerService.isValidCustomer(userId, password);
            if (customer != null) {
                System.out.println("Customer login successful: " + customer.getUserId());
                return new ResponseEntity<>(AuthResponse.fromCustomer(customer), HttpStatus.OK);
            } else {
                System.out.println("Customer login failed for: " + userId);
                return new ResponseEntity<>(
                        AuthResponse.error("Invalid customer credentials"),
                        HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(
                    AuthResponse.error("Invalid role. Must be 'admin' or 'customer'"),
                    HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Unified registration endpoint for both admin and customer
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        String role = registerRequest.getRole();

        if (role == null || role.isEmpty()) {
            return new ResponseEntity<>("Role must be specified (admin or customer)", HttpStatus.BAD_REQUEST);
        }

        try {
            if ("admin".equalsIgnoreCase(role)) {
                // Register admin
                Admin admin = new Admin();
                admin.setUser(registerRequest.getUserId());
                admin.setPassword(registerRequest.getPassword());

                Admin newAdmin = adminService.registerAdmin(admin);
                System.out.println("Admin registered successfully: " + newAdmin.getUser());

                return new ResponseEntity<>(AuthResponse.fromAdmin(newAdmin), HttpStatus.CREATED);

            } else if ("customer".equalsIgnoreCase(role)) {
                // Register customer
                Customer customer = new Customer();

                // Generate unique consumer number (13 digits)
                customer.setConsumerNumber(generateConsumerNumber());
                customer.setFullName(registerRequest.getFullName());
                customer.setAddress(registerRequest.getAddress());
                customer.setEmail(registerRequest.getEmail());
                customer.setMobileNumber(registerRequest.getMobileNumber());
                customer.setCustomerType(registerRequest.getCustomerType());
                customer.setUserId(registerRequest.getUserId());
                customer.setPassword(registerRequest.getPassword());
                customer.setStatus("Active");

                // Check if userId or email already exists
                if (customerService.userIdExists(customer.getUserId())) {
                    return new ResponseEntity<>("User ID already exists", HttpStatus.BAD_REQUEST);
                }
                if (customerService.emailExists(customer.getEmail())) {
                    return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
                }

                Customer newCustomer = customerService.addCustomer(customer);
                System.out.println("Customer registered successfully: " + newCustomer.getUserId());

                return new ResponseEntity<>(AuthResponse.fromCustomer(newCustomer), HttpStatus.CREATED);

            } else {
                return new ResponseEntity<>("Invalid role. Must be 'admin' or 'customer'", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            System.out.println("Registration failed: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Generate a unique 13-digit consumer number
     */
    private Long generateConsumerNumber() {
        Random random = new Random();
        // Generate a 13-digit number (between 1000000000000 and 9999999999999)
        long min = 1000000000000L;
        long max = 9999999999999L;
        long consumerNumber = min + (long) (random.nextDouble() * (max - min));

        // Check if it already exists, if so, generate a new one
        while (customerService.customerExists(consumerNumber)) {
            consumerNumber = min + (long) (random.nextDouble() * (max - min));
        }

        return consumerNumber;
    }
}
