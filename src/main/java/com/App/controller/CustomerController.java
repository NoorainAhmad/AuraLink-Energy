package com.App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.App.model.Customer;
import com.App.service.CustomerService;

import java.sql.SQLException;

import java.util.List;

//@CrossOrigin(origins="*")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:5173" })
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/login/{user}/{password}")
    public ResponseEntity<Customer> isValidCustomer(@PathVariable String user, @PathVariable String password)
            throws SQLException {
        Customer isValid = customerService.isValidCustomer(user, password);
        // System.out.println(isValid.getUserId());
        // return new ResponseEntity<>(isValid, isValid != null ? HttpStatus.OK :
        // HttpStatus.UNAUTHORIZED);

        if (isValid != null) {
            System.out.println("Login successful for user: " + isValid.getUserId());
            return new ResponseEntity<>(isValid, HttpStatus.OK);
        } else {
            System.out.println("Login failed for user: " + user);
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        // customers.sort(Comparator.comparingLong(Customer->Customer.getConsumerNumber()));
        for (int i = 0; i < customers.size(); i++)
            System.out.println("Controller" + customers.get(i));
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/customers/{consumerNumber}")
    public Customer getCustomers(@PathVariable Long consumerNumber) {
        System.out.println("This is inside consumer by ID ");
        Customer customers = customerService.getCustomerById(consumerNumber);
        return customers;
    }

    @PostMapping("/customers")
    public Customer addCustomer(@RequestBody Customer customer) {

        customerService.addCustomer(customer);
        // EmailService.sendEmail(customer.getEmail());

        return customer;
    }

    @PutMapping("/customers/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        System.out.println("THis is method put");

        customerService.updateCustomer(id, customer);
        return customer;
    }

    // @DeleteMapping("/customers/{id}")
    // public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
    // customerService.deleteCustomer(id);
    // return new ResponseEntity<>("Customer deleted successfully!", HttpStatus.OK);
    // }

    @PostMapping("/deleteCustomer")
    public int deleteCustomerAdmin(@RequestBody Long id) throws SQLException {
        System.out.println("THis is method put");

        return customerService.deleteCustomer(id);
    }

}
