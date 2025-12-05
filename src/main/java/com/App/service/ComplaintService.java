package com.App.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.App.model.Complaint;
import com.App.repository.ComplaintRepository;

/**
 * Service layer for Complaint operations.
 * Now uses Spring Data JPA Repository instead of DAO with raw JDBC.
 */
@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    /**
     * Register a new complaint
     */
    public Complaint registerComplaint(Complaint complaint) {
        if (complaint.getComplaintStatus() == null) {
            complaint.setComplaintStatus("Pending"); // Default status
        }
        if (complaint.getAssignedStaff() == null) {
            complaint.setAssignedStaff("Not Assigned"); // Default value
        }
        return complaintRepository.save(complaint);
    }

    /**
     * Get complaint by ID
     */
    public Complaint getComplaint(String complaintId) {
        return complaintRepository.findById(complaintId).orElse(null);
    }

    /**
     * Get complaints by customer number
     */
    public List<Complaint> getComplaintByCustomerId(String customerNumber) {
        return complaintRepository.findByCustomerNumber(customerNumber);
    }

    /**
     * Get all complaints
     */
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    /**
     * Get complaints by status
     */
    public List<Complaint> getComplaintsByStatus(String status) {
        return complaintRepository.findByComplaintStatus(status);
    }

    /**
     * Get complaints by assigned staff
     */
    public List<Complaint> getComplaintsByAssignedStaff(String assignedStaff) {
        return complaintRepository.findByAssignedStaff(assignedStaff);
    }

    /**
     * Get complaints by category
     */
    public List<Complaint> getComplaintsByCategory(String category) {
        return complaintRepository.findByCategory(category);
    }

    /**
     * Update complaint
     */
    public Complaint updateComplaintById(String id, Complaint complaint) {
        complaint.setComplaintId(id); // Ensure ID is set
        return complaintRepository.save(complaint);
    }

    /**
     * Delete complaint by ID
     */
    public void deleteComplaint(String complaintId) {
        complaintRepository.deleteById(complaintId);
    }

    /**
     * Check if complaint exists
     */
    public boolean complaintExists(String complaintId) {
        return complaintRepository.existsById(complaintId);
    }
}
