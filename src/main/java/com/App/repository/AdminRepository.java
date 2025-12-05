package com.App.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.App.model.Admin;

/**
 * Spring Data JPA Repository for Admin entity.
 */
@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {

    // Custom query methods

    /**
     * Find admin by username
     */
    Optional<Admin> findByUser(String user);

    /**
     * Find admin by username and password (for authentication)
     */
    Optional<Admin> findByUserAndPassword(String user, String password);

    /**
     * Check if admin username exists
     */
    boolean existsByUser(String user);
}
