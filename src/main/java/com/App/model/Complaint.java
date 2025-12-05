package com.App.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @Column(name = "complaint_id", length = 50, nullable = false)
    private String complaintId;

    @Column(name = "complaint_type", length = 100)
    private String complaintType;

    @Column(name = "category", length = 100)
    private String category;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "preferred_contact_method", length = 50)
    private String preferredContactMethod;

    @Column(name = "contact_details", length = 100)
    private String contactDetails;

    @Column(name = "resolution_time", length = 50)
    private String resolutionTime;

    @Column(name = "customer_number", length = 50)
    private String customerNumber;

    @Column(name = "complaint_status", length = 50)
    private String complaintStatus;

    @Column(name = "assigned_staff", length = 100)
    private String assignedStaff;

    // Constructors
    public Complaint() {
        super();
    }

    public Complaint(String complaintType, String category, String description,
            String preferredContactMethod, String contactDetails,
            String complaintId, String resolutionTime,
            String customerNumber, String complaintStatus, String assignedStaff) {
        this.complaintType = complaintType;
        this.category = category;
        this.description = description;
        this.preferredContactMethod = preferredContactMethod;
        this.contactDetails = contactDetails;
        this.complaintId = complaintId;
        this.resolutionTime = resolutionTime;
        this.customerNumber = customerNumber;
        this.complaintStatus = complaintStatus != null ? complaintStatus : "Pending";
        this.assignedStaff = assignedStaff != null ? assignedStaff : "Not Assigned";
    }

    // Getters and Setters
    public String getAssignedStaff() {
        return assignedStaff;
    }

    public void setAssignedStaff(String assignedStaff) {
        this.assignedStaff = assignedStaff;
    }

    public String getComplaintType() {
        return complaintType;
    }

    public void setComplaintType(String complaintType) {
        this.complaintType = complaintType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPreferredContactMethod() {
        return preferredContactMethod;
    }

    public void setPreferredContactMethod(String preferredContactMethod) {
        this.preferredContactMethod = preferredContactMethod;
    }

    public String getContactDetails() {
        return contactDetails;
    }

    public void setContactDetails(String contactDetails) {
        this.contactDetails = contactDetails;
    }

    public String getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(String complaintId) {
        this.complaintId = complaintId;
    }

    public String getResolutionTime() {
        return resolutionTime;
    }

    public void setResolutionTime(String resolutionTime) {
        this.resolutionTime = resolutionTime;
    }

    public String getCustomerNumber() {
        return customerNumber;
    }

    public void setCustomerNumber(String customerNumber) {
        this.customerNumber = customerNumber;
    }

    public String getComplaintStatus() {
        return complaintStatus;
    }

    public void setComplaintStatus(String complaintStatus) {
        this.complaintStatus = complaintStatus;
    }
}
