package com.App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.App.model.Admin;
import com.App.service.AdminService;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:5173" })
@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    /**
     * Admin login endpoint
     */
    @GetMapping("/login/{user}/{password}")
    public ResponseEntity<Admin> loginAdmin(@PathVariable String user, @PathVariable String password) {
        Admin admin = adminService.validateAdmin(user, password);

        if (admin != null) {
            System.out.println("Admin login successful for user: " + admin.getUser());
            return new ResponseEntity<>(admin, HttpStatus.OK);
        } else {
            System.out.println("Admin login failed for user: " + user);
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Register new admin
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        try {
            Admin newAdmin = adminService.registerAdmin(admin);
            System.out.println("Admin registered successfully: " + newAdmin.getUser());
            return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            System.out.println("Admin registration failed: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Get all admins (admin only)
     */
    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.getAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    /**
     * Get admin by username
     */
    @GetMapping("/{user}")
    public ResponseEntity<Admin> getAdminByUsername(@PathVariable String user) {
        Admin admin = adminService.getAdminByUsername(user);
        if (admin != null) {
            return new ResponseEntity<>(admin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Update admin password
     */
    @PutMapping("/{user}/password")
    public ResponseEntity<?> updatePassword(@PathVariable String user, @RequestBody String newPassword) {
        Admin updatedAdmin = adminService.updateAdminPassword(user, newPassword);
        if (updatedAdmin != null) {
            return new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Admin not found", HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Delete admin
     */
    @DeleteMapping("/{user}")
    public ResponseEntity<String> deleteAdmin(@PathVariable String user) {
        adminService.deleteAdmin(user);
        return new ResponseEntity<>("Admin deleted successfully", HttpStatus.OK);
    }
}
