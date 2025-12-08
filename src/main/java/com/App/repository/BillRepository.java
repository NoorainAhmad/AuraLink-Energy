package com.App.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.App.model.Bill;

@Repository
public interface BillRepository extends JpaRepository<Bill, String> {

    /**
     * Find all bills for a specific consumer number.
     * Method name follows Spring Data JPA naming convention:
     * findBy + FieldName
     */
    List<Bill> findByConsumerNumber(Long consumerNumber);

    /**
     * Find bills by status (e.g., "Paid", "Unpaid")
     */
    List<Bill> findByBillStatus(String billStatus);

    /**
     * Find bills by consumer number and status
     */
    List<Bill> findByConsumerNumberAndBillStatus(Long consumerNumber, String billStatus);

    /**
     * Find a bill by bill number (alternative to findById)
     */
    Optional<Bill> findByBillNumber(String billNumber);

    /**
     * Delete bills by consumer number
     */
    void deleteByConsumerNumber(Long consumerNumber);
}
