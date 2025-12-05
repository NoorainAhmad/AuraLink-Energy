# JPA/Hibernate Usage Guide

## Overview

Your Electricity Management System now uses **Spring Data JPA** with **Hibernate** as the ORM provider. This means you **no longer need to write SQL queries** - Spring Data JPA auto-generates them for you!

## What Changed?

### Before (Raw JDBC):
- ❌ Manual SQL queries
- ❌ Connection management
- ❌ ResultSet mapping
- ❌ 211 lines of code in BillDao

### After (JPA/Hibernate):
- ✅ No SQL queries needed
- ✅ Automatic connection management
- ✅ Automatic object mapping
- ✅ ~40 lines of code in BillRepository + BillService

---

## Project Structure

```
src/main/java/com/App/
├── model/              # JPA Entities (with @Entity annotation)
│   ├── Bill.java
│   ├── Customer.java
│   ├── Complaint.java
│   └── Admin.java
├── repository/         # Spring Data JPA Repositories (NEW!)
│   ├── BillRepository.java
│   ├── CustomerRepository.java
│   ├── ComplaintRepository.java
│   └── AdminRepository.java
├── service/            # Service Layer (Updated to use Repositories)
│   ├── BillService.java
│   ├── CustomerService.java
│   └── ComplaintService.java
└── controller/         # REST Controllers
    └── ...
```

---

## How to Use JPA Repositories

### 1. Basic CRUD Operations (FREE!)

Every repository extends `JpaRepository` which gives you these methods for **FREE**:

```java
// In your service class
@Autowired
private BillRepository billRepository;

// CREATE - Save a new bill
Bill bill = new Bill(...);
billRepository.save(bill);

// READ - Get all bills
List<Bill> allBills = billRepository.findAll();

// READ - Get bill by ID (primary key)
Optional<Bill> bill = billRepository.findById("BILL1001");
Bill bill = billRepository.findById("BILL1001").orElse(null);

// UPDATE - Same as create (save updates if ID exists)
bill.setBillStatus("Paid");
billRepository.save(bill);

// DELETE - Delete by ID
billRepository.deleteById("BILL1001");

// COUNT - Count all records
long count = billRepository.count();

// EXISTS - Check if exists
boolean exists = billRepository.existsById("BILL1001");
```

### 2. Custom Query Methods (Auto-Generated!)

Spring Data JPA generates SQL from method names. Just follow the naming convention:

#### Pattern: `findBy + FieldName + Condition`

```java
// In BillRepository.java
public interface BillRepository extends JpaRepository<Bill, String> {
    
    // Find by single field
    List<Bill> findByConsumerNumber(Long consumerNumber);
    // SQL: SELECT * FROM bills WHERE consumer_number = ?
    
    // Find by status
    List<Bill> findByBillStatus(String billStatus);
    // SQL: SELECT * FROM bills WHERE bill_status = ?
    
    // Find by multiple fields (AND condition)
    List<Bill> findByConsumerNumberAndBillStatus(Long consumerNumber, String status);
    // SQL: SELECT * FROM bills WHERE consumer_number = ? AND bill_status = ?
    
    // Find with OR condition
    List<Bill> findByBillStatusOrBillAmount(String status, Double amount);
    // SQL: SELECT * FROM bills WHERE bill_status = ? OR bill_amount = ?
}
```

#### More Query Method Keywords:

```java
// Greater than / Less than
List<Bill> findByBillAmountGreaterThan(Double amount);
List<Bill> findByBillAmountLessThan(Double amount);

// Between
List<Bill> findByBillAmountBetween(Double min, Double max);

// Like (for pattern matching)
List<Customer> findByFullNameContaining(String name);
List<Customer> findByFullNameStartingWith(String prefix);
List<Customer> findByEmailEndingWith(String domain);

// In (match any value in list)
List<Bill> findByBillStatusIn(List<String> statuses);

// Null checks
List<Bill> findByBillStatusIsNull();
List<Bill> findByBillStatusIsNotNull();

// Ordering
List<Bill> findByConsumerNumberOrderByBillDateDesc(Long consumerNumber);

// Limit results
List<Bill> findTop10ByBillStatusOrderByBillAmountDesc(String status);
Bill findFirstByConsumerNumberOrderByBillDateDesc(Long consumerNumber);
```

### 3. Using Repositories in Services

```java
@Service
public class BillService {
    
    @Autowired
    private BillRepository billRepository;
    
    // Simple CRUD
    public Bill createBill(Bill bill) {
        return billRepository.save(bill);
    }
    
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }
    
    public Bill getBillById(String billNumber) {
        return billRepository.findById(billNumber).orElse(null);
    }
    
    // Custom queries
    public List<Bill> getUnpaidBills() {
        return billRepository.findByBillStatus("Unpaid");
    }
    
    public List<Bill> getCustomerBills(Long consumerNumber) {
        return billRepository.findByConsumerNumber(consumerNumber);
    }
}
```

### 4. Using Services in Controllers

```java
@RestController
@RequestMapping("/api/bills")
public class BillController {
    
    @Autowired
    private BillService billService;
    
    @PostMapping
    public Bill createBill(@RequestBody Bill bill) {
        return billService.createBill(bill);
    }
    
    @GetMapping
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }
    
    @GetMapping("/{billNumber}")
    public Bill getBill(@PathVariable String billNumber) {
        return billService.getBillById(billNumber);
    }
    
    @GetMapping("/customer/{consumerNumber}")
    public List<Bill> getCustomerBills(@PathVariable Long consumerNumber) {
        return billService.getCustomerBills(consumerNumber);
    }
}
```

---

## Common JPA Annotations

### Entity Annotations

```java
@Entity                          // Marks class as JPA entity
@Table(name = "bills")          // Specifies table name
public class Bill {
    
    @Id                         // Primary key
    @Column(name = "bill_number")
    private String billNumber;
    
    @Column(name = "bill_amount", nullable = false)
    private Double billAmount;
    
    @Temporal(TemporalType.DATE)  // For Date fields
    private Date billDate;
    
    @Column(columnDefinition = "TEXT")  // For large text
    private String description;
}
```

### Common Column Attributes

```java
@Column(
    name = "column_name",        // Database column name
    nullable = false,            // NOT NULL constraint
    unique = true,               // UNIQUE constraint
    length = 50,                 // VARCHAR(50)
    columnDefinition = "TEXT"    // Custom SQL type
)
```

---

## Advanced Features

### 1. Custom JPQL Queries

For complex queries, use `@Query`:

```java
@Repository
public interface BillRepository extends JpaRepository<Bill, String> {
    
    @Query("SELECT b FROM Bill b WHERE b.billAmount > :amount AND b.billStatus = :status")
    List<Bill> findHighValueBillsByStatus(@Param("amount") Double amount, 
                                          @Param("status") String status);
    
    // Native SQL query
    @Query(value = "SELECT * FROM bills WHERE bill_date BETWEEN ?1 AND ?2", 
           nativeQuery = true)
    List<Bill> findBillsBetweenDates(Date startDate, Date endDate);
}
```

### 2. Pagination and Sorting

```java
@Repository
public interface BillRepository extends JpaRepository<Bill, String> {
    
    // Returns Page object with pagination info
    Page<Bill> findByBillStatus(String status, Pageable pageable);
}

// In service
public Page<Bill> getUnpaidBills(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("billDate").descending());
    return billRepository.findByBillStatus("Unpaid", pageable);
}
```

### 3. Transactional Operations

```java
@Service
public class BillService {
    
    @Transactional  // Ensures all operations succeed or rollback
    public void payBill(String billNumber) {
        Bill bill = billRepository.findById(billNumber)
            .orElseThrow(() -> new RuntimeException("Bill not found"));
        bill.setBillStatus("Paid");
        billRepository.save(bill);
        // If any exception occurs, changes are rolled back
    }
}
```

---

## Database Schema Auto-Creation

Hibernate automatically creates tables based on your entities!

### application.properties Settings:

```properties
# Create/update tables automatically
spring.jpa.hibernate.ddl-auto=update

# Show SQL queries in console (for debugging)
spring.jpa.show-sql=true

# Format SQL for readability
spring.jpa.properties.hibernate.format_sql=true
```

### ddl-auto Options:

- `none` - No automatic schema management
- `validate` - Validate schema, make no changes
- `update` - Update schema (safe for development)
- `create` - Create schema, destroy previous data
- `create-drop` - Create schema, drop on shutdown

**Recommendation:** Use `update` for development, `validate` for production.

---

## Examples from Your Project

### Example 1: Customer Login

```java
// Old way (JDBC):
public Customer isValidCustomer(String userId, String password) {
    String sql = "SELECT * FROM customers WHERE user_id = ? AND password = ?";
    // ... 20+ lines of JDBC code
}

// New way (JPA):
public Customer isValidCustomer(String userId, String password) {
    return customerRepository.findByUserIdAndPassword(userId, password).orElse(null);
}
```

### Example 2: Get Customer Bills

```java
// Old way (JDBC):
public List<Bill> getBillByConsumerNumber(Long consumerNumber) {
    String sql = "SELECT * FROM billss WHERE consumer_number = ?";
    // ... 30+ lines of JDBC code with ResultSet mapping
}

// New way (JPA):
public List<Bill> getBillByConsumerNumber(Long consumerNumber) {
    return billRepository.findByConsumerNumber(consumerNumber);
}
```

### Example 3: Register Complaint

```java
// Old way (JDBC):
public void registerComplaint(Complaint complaint) {
    String sql = "INSERT INTO complaints (complaint_id, ...) VALUES (?, ...)";
    // ... PreparedStatement, setString, executeUpdate, etc.
}

// New way (JPA):
public Complaint registerComplaint(Complaint complaint) {
    if (complaint.getComplaintStatus() == null) {
        complaint.setComplaintStatus("Pending");
    }
    return complaintRepository.save(complaint);
}
```

---

## Testing Your JPA Setup

### 1. Start the Application

```bash
mvn spring-boot:run
```

### 2. Check Console Logs

You should see:
```
Hibernate: create table bills (...)
Hibernate: create table customers (...)
Hibernate: create table complaints (...)
Hibernate: create table admins (...)
```

### 3. Verify in MySQL

```sql
USE electricity_management;
SHOW TABLES;
DESCRIBE bills;
```

### 4. Test API Endpoints

```bash
# Create a bill
curl -X POST http://localhost:8080/api/bills \
  -H "Content-Type: application/json" \
  -d '{
    "billNumber": "BILL1001",
    "consumerNumber": 1234567890123,
    "billAmount": 1500.00,
    "billStatus": "Unpaid"
  }'

# Get all bills
curl http://localhost:8080/api/bills

# Get bills by consumer number
curl http://localhost:8080/api/bills/customer/1234567890123
```

---

## Troubleshooting

### Issue: Tables not created
**Solution:** Check `spring.jpa.hibernate.ddl-auto=update` in application.properties

### Issue: "No property found for type"
**Solution:** Ensure field names in repository methods match entity field names exactly (case-sensitive)

### Issue: "Could not determine type for: Date"
**Solution:** Add `@Temporal(TemporalType.DATE)` annotation to Date fields

### Issue: SQL errors in logs
**Solution:** Enable SQL logging to see generated queries:
```properties
spring.jpa.show-sql=true
logging.level.org.hibernate.SQL=DEBUG
```

---

## Best Practices

1. **Use Optional for single results:**
   ```java
   Optional<Customer> customer = customerRepository.findByUserId(userId);
   if (customer.isPresent()) {
       // Use customer.get()
   }
   ```

2. **Use @Transactional for write operations:**
   ```java
   @Transactional
   public void updateBillStatus(String billNumber, String status) {
       // Multiple database operations
   }
   ```

3. **Keep entities simple:**
   - Only JPA annotations and basic getters/setters
   - Business logic belongs in services

4. **Use DTOs for API responses:**
   - Don't expose entities directly in REST APIs
   - Create Data Transfer Objects (DTOs) for API contracts

5. **Index frequently queried fields:**
   ```java
   @Column(name = "user_id")
   @Index(name = "idx_user_id")
   private String userId;
   ```

---

## Summary

✅ **What you get with JPA:**
- No SQL queries to write
- Automatic table creation
- Type-safe database operations
- Built-in CRUD operations
- Automatic connection management
- Transaction support
- Database independence

✅ **Your repositories:**
- `BillRepository` - Bill management
- `CustomerRepository` - Customer management with authentication
- `ComplaintRepository` - Complaint tracking
- `AdminRepository` - Admin authentication

✅ **Next steps:**
1. Test the application with MySQL
2. Update controllers if needed
3. Remove old DAO classes (optional, after testing)
4. Add more custom query methods as needed

**You're now using modern JPA/Hibernate! No more SQL queries needed! 🎉**
