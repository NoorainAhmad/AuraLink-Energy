package com.App.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.App.model.Customer;
import com.App.repository.CustomerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    /**
     * Validate customer credentials (for login)
     */
    public Customer isValidCustomer(String userId, String password) {
        Optional<Customer> customer = customerRepository.findByUserIdAndPassword(userId, password);
        return customer.orElse(null);
    }

    /**
     * Add a new customer
     */
    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    /**
     * Get all customers
     */
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    /**
     * Get customer by consumer number (ID)
     */
    public Customer getCustomerById(Long consumerNumber) {
        return customerRepository.findById(consumerNumber).orElse(null);
    }

    /**
     * Get customer by userId
     */
    public Customer getCustomerByUserId(String userId) {
        return customerRepository.findByUserId(userId).orElse(null);
    }

    /**
     * Get customer by email
     */
    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email).orElse(null);
    }

    /**
     * Get customers by status
     */
    public List<Customer> getCustomersByStatus(String status) {
        return customerRepository.findByStatus(status);
    }

    /**
     * Get customers by type (Residential/Commercial)
     */
    public List<Customer> getCustomersByType(String customerType) {
        return customerRepository.findByCustomerType(customerType);
    }

    /**
     * Update an existing customer
     */
    public Customer updateCustomer(Long consumerNumber, Customer updatedCustomer) {
        // Set the consumer number to ensure we update the existing record
        updatedCustomer.setConsumerNumber(consumerNumber);
        return customerRepository.save(updatedCustomer);
    }

    /**
     * Delete a customer by consumer number
     */
    public int deleteCustomer(Long consumerNumber) {
        customerRepository.deleteById(consumerNumber);
        return 1; // Return 1 to indicate successful deletion
    }

    /**
     * Check if userId already exists
     */
    public boolean userIdExists(String userId) {
        return customerRepository.existsByUserId(userId);
    }

    /**
     * Check if email already exists
     */
    public boolean emailExists(String email) {
        return customerRepository.existsByEmail(email);
    }

    /**
     * Check if customer exists
     */
    public boolean customerExists(Long consumerNumber) {
        return customerRepository.existsById(consumerNumber);
    }
}
