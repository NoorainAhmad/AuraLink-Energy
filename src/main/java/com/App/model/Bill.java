package com.App.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "bills")
public class Bill {

    @Column(name = "consumer_number", nullable = false)
    private Long consumerNumber;

    @Id
    @Column(name = "bill_number", length = 255, nullable = false)
    private String billNumber;

    @Temporal(TemporalType.DATE)
    @Column(name = "bill_date")
    private Date billDate;

    @Column(name = "billing_period", length = 255)
    private String billingPeriod;

    @Column(name = "bill_amount")
    private Double billAmount;

    @Temporal(TemporalType.DATE)
    @Column(name = "due_date")
    private Date dueDate;

    @Column(name = "bill_status", length = 50)
    private String billStatus;

    // Constructors
    public Bill(Long consumerNumber, String billNumber, Date billDate, String billingPeriod, Double billAmount,
            Date dueDate) {
        super();
        this.consumerNumber = consumerNumber;
        this.billNumber = billNumber;
        this.billDate = billDate;
        this.billingPeriod = billingPeriod;
        this.billAmount = billAmount;
        this.dueDate = dueDate;
        this.billStatus = "Unpaid";
    }

    public Bill() {
        super();
    }

    public Bill(Long consumerNumber, String billNumber, Date billDate, String billingPeriod, Double billAmount,
            Date dueDate, String billStatus) {
        super();
        this.consumerNumber = consumerNumber;
        this.billNumber = billNumber;
        this.billDate = billDate;
        this.billingPeriod = billingPeriod;
        this.billAmount = billAmount;
        this.dueDate = dueDate;
        this.billStatus = billStatus;
    }

    // Getters and Setters
    public Long getConsumerNumber() {
        return consumerNumber;
    }

    public void setConsumerNumber(Long consumerNumber) {
        this.consumerNumber = consumerNumber;
    }

    public Date getBillDate() {
        return billDate;
    }

    public void setBillDate(Date billDate) {
        this.billDate = billDate;
    }

    public String getBillingPeriod() {
        return billingPeriod;
    }

    public void setBillingPeriod(String billingPeriod) {
        this.billingPeriod = billingPeriod;
    }

    public Double getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(Double billAmount) {
        this.billAmount = billAmount;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getBillNumber() {
        return billNumber;
    }

    public void setBillNumber(String billNumber) {
        this.billNumber = billNumber;
    }

    public String getBillStatus() {
        return billStatus;
    }

    public void setBillStatus(String billStatus) {
        this.billStatus = billStatus;
    }
}
