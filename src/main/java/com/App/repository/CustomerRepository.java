package com.App.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.App.model.Customer;

/**
 * Spring Data JPA Repository for Customer entity.
 * Replaces CustomerDao with auto-generated CRUD operations.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Custom query methods

    /**
     * Find customer by userId (for login)
     */
    Optional<Customer> findByUserId(String userId);

    /**
     * Find customer by email
     */
    Optional<Customer> findByEmail(String email);

    /**
     * Find customer by userId and password (for authentication)
     */
    Optional<Customer> findByUserIdAndPassword(String userId, String password);

    /**
     * Find customers by status
     */
    java.util.List<Customer> findByStatus(String status);

    /**
     * Find customers by customer type (Residential/Commercial)
     */
    java.util.List<Customer> findByCustomerType(String customerType);

    /**
     * Check if userId already exists
     */
    boolean existsByUserId(String userId);

    /**
     * Check if email already exists
     */
    boolean existsByEmail(String email);
}
