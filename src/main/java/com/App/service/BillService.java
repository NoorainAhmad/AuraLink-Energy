package com.App.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.App.model.Bill;
import com.App.repository.BillRepository;

import java.util.List;

/**
 * Service layer for Bill operations.
 * Now uses Spring Data JPA Repository instead of DAO with raw JDBC.
 */
@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    /**
     * Add a new bill (save to database)
     */
    public Bill addBill(Bill bill) {
        return billRepository.save(bill);
    }

    /**
     * Get all bills
     */
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    /**
     * Get bills by Consumer Number
     */
    public List<Bill> getBillByConsumerNumber(Long consumerNumber) {
        return billRepository.findByConsumerNumber(consumerNumber);
    }

    /**
     * Get a bill by Bill Number
     */
    public Bill getBillByBillNumber(String billNumber) {
        return billRepository.findById(billNumber).orElse(null);
    }

    /**
     * Get bills by status
     */
    public List<Bill> getBillsByStatus(String status) {
        return billRepository.findByBillStatus(status);
    }

    /**
     * Update a bill
     */
    public Bill updateBill(Bill updatedBill) {
        return billRepository.save(updatedBill);
    }

    /**
     * Delete a bill by Bill Number
     */
    public void deleteBill(String billNumber) {
        billRepository.deleteById(billNumber);
    }

    /**
     * Delete bills by Consumer Number
     */
    public void deleteBillsByConsumerNumber(Long consumerNumber) {
        billRepository.deleteByConsumerNumber(consumerNumber);
    }

    /**
     * Check if a bill exists
     */
    public boolean billExists(String billNumber) {
        return billRepository.existsById(billNumber);
    }
}
