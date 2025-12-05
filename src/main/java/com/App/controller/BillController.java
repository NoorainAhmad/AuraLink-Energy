package com.App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.App.model.Bill;
import com.App.service.BillService;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:5173" })
@RestController
@RequestMapping("/api/v1")
public class BillController {

    @Autowired
    private BillService billService;

    // Add a new bill
    @PostMapping("/bills")
    public Bill addBill(@RequestBody Bill bill) {

        billService.addBill(bill);
        System.out.println("Bill Addedd");
        return bill;
    }

    // Get all bills
    @GetMapping("/bills")
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    // Get bill by Consumer Number
    @GetMapping("/bills/{consumerNumber}")
    public List<Bill> getBillByConsumerNumber(@PathVariable Long consumerNumber) {
        System.out.println("inside the getBillByConsumerNumber");
        return billService.getBillByConsumerNumber(consumerNumber);
    }

    // Update an existing bill
    @PutMapping("/bills/{consumerNumber}")
    public String updateBill(@PathVariable Long consumerNumber, @RequestBody Bill bill) {
        bill.setConsumerNumber(consumerNumber);
        billService.updateBill(bill);
        return "Bill updated successfully!";
    }

    // Delete a bill
    @DeleteMapping("/bills/{consumerNumber}")
    public String deleteBill(@PathVariable Long consumerNumber) {
        billService.deleteBillsByConsumerNumber(consumerNumber);
        return "Bill deleted successfully!";
    }
}
