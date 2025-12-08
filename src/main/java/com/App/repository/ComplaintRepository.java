package com.App.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.App.model.Complaint;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, String> {

    /**
     * Find complaints by customer number
     */
    List<Complaint> findByCustomerNumber(String customerNumber);

    /**
     * Find complaints by status
     */
    List<Complaint> findByComplaintStatus(String complaintStatus);

    /**
     * Find complaints by assigned staff
     */
    List<Complaint> findByAssignedStaff(String assignedStaff);

    /**
     * Find complaints by category
     */
    List<Complaint> findByCategory(String category);

    /**
     * Find complaints by type
     */
    List<Complaint> findByComplaintType(String complaintType);

    /**
     * Find complaints by customer number and status
     */
    List<Complaint> findByCustomerNumberAndComplaintStatus(String customerNumber, String complaintStatus);

    /**
     * Find a complaint by complaint ID
     */
    Optional<Complaint> findByComplaintId(String complaintId);
}
