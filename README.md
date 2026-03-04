# ⚡ AuraLink-Energy: Modern Electricity Management System

AuraLink-Energy is a comprehensive solution designed to streamline electricity management for both customers and utility providers. This application allows customers to track their billing history, view current bill details, make secure payments, and file formal complaints directly through an intuitive digital interface.

---

## 🚀 Key Features

- **Bill Management**: Access the latest bill details and historical records.
- **Payment Tracking**: View and track your bill payment history.
- **Complaint System**: Formally submit and track the status of complaints.
- **Real-time Updates**: Get the latest information on electricity usage and billing.
- **Secure Access**: Reliable data handling for customer records and billing information.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.3.5
- **Language**: Java 17
- **Database**: MySQL
- **ORM**: Spring Data JPA (Hibernate)
- **Email Integration**: JavaMail API
- **JSON Handling**: Google Gson

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM 6
- **API Client**: Axios
- **Styling**: Vanilla CSS

---

## 📥 Installation & Setup

### Prerequisites
- **JDK 17** or higher
- **Node.js** (v18+)
- **MySQL** Server
- **Maven** 3.x

### 1. Database Setup
1. Create a MySQL database named `electricity_management`.
   ```sql
   CREATE DATABASE electricity_management;
   ```
2. Update the credentials in `src/main/resources/application.properties` if necessary:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### 2. Backend Setup
1. Clone the repository.
2. Navigate to the root directory.
3. Run the Spring Boot application using Maven:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### 3. Frontend Setup
1. Navigate to the `auralink-energy-frontend` directory:
   ```bash
   cd auralink-energy-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📋 API Overview

The backend exposes several REST endpoints for the frontend to interact with:
- `GET /api/bills`: Retrieve bill history.
- `POST /api/complaints`: Submit a new complaint.
- `GET /api/customer/{id}`: Fetch customer profile details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git checkout origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

**Project Link**: [https://github.com/NoorainAhmad/AuraLink-Energy](https://github.com/NoorainAhmad/AuraLink-Energy)
