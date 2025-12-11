package com.App.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.App.model.Admin;
import com.App.repository.AdminRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    /**
     * Validate admin credentials (for login)
     */
    public Admin validateAdmin(String user, String password) {
        Optional<Admin> admin = adminRepository.findByUserAndPassword(user, password);
        return admin.orElse(null);
    }

    /**
     * Register a new admin
     */
    public Admin registerAdmin(Admin admin) {
        // Check if username already exists
        if (adminRepository.existsByUser(admin.getUser())) {
            throw new RuntimeException("Username already exists");
        }
        return adminRepository.save(admin);
    }

    /**
     * Get all admins
     */
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    /**
     * Get admin by username
     */
    public Admin getAdminByUsername(String user) {
        return adminRepository.findByUser(user).orElse(null);
    }

    /**
     * Check if admin username exists
     */
    public boolean adminExists(String user) {
        return adminRepository.existsByUser(user);
    }

    /**
     * Update admin password
     */
    public Admin updateAdminPassword(String user, String newPassword) {
        Optional<Admin> adminOpt = adminRepository.findByUser(user);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            admin.setPassword(newPassword);
            return adminRepository.save(admin);
        }
        return null;
    }

    /**
     * Delete admin
     */
    public void deleteAdmin(String user) {
        adminRepository.deleteById(user);
    }
}
