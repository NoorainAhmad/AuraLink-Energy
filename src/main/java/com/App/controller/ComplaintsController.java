package com.App.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.App.model.Complaint;
import com.App.service.ComplaintService;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:5173" })
@RestController

@RequestMapping("/api/v1")

public class ComplaintsController {

    @Autowired

    private ComplaintService complaintService;

    // Add a new complaint

    @PostMapping("/complaints")

    public Complaint registerComplaint(@RequestBody Complaint Complaint) {

        try {

            // Set default complaint status if not provided

            if (Complaint.getComplaintStatus() == null) {

                Complaint.setComplaintStatus("Pending");

            }

            complaintService.registerComplaint(Complaint);

            return Complaint;

        } catch (Exception e) {

            return null;

        }

    }

    // Get a complaint by ID

    @GetMapping("/complaints/{id}")

    public Complaint getComplaintById(@PathVariable("id") String complaintId) {

        Complaint complaint = complaintService.getComplaint(complaintId);

        if (complaint != null) {

            return complaint;

        } else {

            return null;

        }

    }

    // Get Complaints by Customer Number
    @GetMapping("/complaintsById/{id}")
    public List<Complaint> getAllComplaintsById(@PathVariable String id) {
        System.out.println("Comaplints By ID calling..");
        return complaintService.getComplaintByCustomerId(id);
    }

    // Get all complaints

    @GetMapping("/complaints")

    public List<Complaint> getAllComplaints() {

        System.out.println("This is inside Complaints getAll Method ");

        List<Complaint> complaints = complaintService.getAllComplaints();

        return complaints;

    }

    // Update a complaint status

    @PutMapping("/complaints/{id}")

    public Complaint updateComplaintStatus(@PathVariable("id") String complaintId,

            @RequestBody Complaint complat) {

        return complaintService.updateComplaintById(complaintId, complat);

    }

    // Delete a complaint by ID

    @DeleteMapping("/complaints/{id}")

    public ResponseEntity<String> deleteComplaint(@PathVariable("id") String complaintId) {

        Complaint complaint = complaintService.getComplaint(complaintId);

        if (complaint != null) {

            complaintService.deleteComplaint(complaintId);

            return new ResponseEntity<>("Complaint deleted successfully.", HttpStatus.OK);

        } else {

            return new ResponseEntity<>("Complaint not found.", HttpStatus.NOT_FOUND);

        }

    }
}
