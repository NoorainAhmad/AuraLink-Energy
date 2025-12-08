package com.App.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.App.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

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
    List<Customer> findByStatus(String status);

    /**
     * Find customers by customer type (Residential/Commercial)
     */
    List<Customer> findByCustomerType(String customerType);

    /**
     * Check if userId already exists
     */
    boolean existsByUserId(String userId);

    /**
     * Check if email already exists
     */
    boolean existsByEmail(String email);
}
