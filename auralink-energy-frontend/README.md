# AuraLink Energy - Frontend

Modern React 19 frontend application for the Electricity Management System.

## Features

- ⚡ **Customer Management**: View, add, edit, and delete customers
- 💳 **Bill Management**: View bills, pay bills, and manage billing
- 📝 **Complaint Management**: Register and track complaints
- 📊 **Dashboard**: Overview of bills, complaints, and quick actions
- 🔐 **Authentication**: Secure login system
- 🎨 **Modern UI**: Premium electric energy-themed design

## Tech Stack

- React 19
- React Router v6
- Axios
- Vite
- CSS3 with CSS Variables

## Getting Started

### Prerequisites

- Node.js (v20.9.0 or higher recommended)
- Backend API running on `http://localhost:8080`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will run on `http://localhost:5173`

## Default Login

Use any customer credentials from your database:
- User ID: (from database)
- Password: (from database)

## API Endpoints

The frontend connects to the following backend endpoints:

### Customer APIs
- `GET /api/v1/login/{userId}/{password}` - Login
- `GET /api/v1/customers` - Get all customers
- `GET /api/v1/customers/{id}` - Get customer by ID
- `POST /api/v1/customers` - Add customer
- `PUT /api/v1/customers/{id}` - Update customer
- `POST /api/v1/deleteCustomer` - Delete customer

### Bill APIs
- `GET /api/v1/bills` - Get all bills
- `GET /api/v1/bills/{consumerNumber}` - Get bills by consumer number
- `POST /api/v1/bills` - Add bill
- `PUT /api/v1/bills/{consumerNumber}` - Update bill
- `DELETE /api/v1/bills/{consumerNumber}` - Delete bill

### Complaint APIs
- `GET /api/v1/complaints` - Get all complaints
- `GET /api/v1/complaints/{id}` - Get complaint by ID
- `GET /api/v1/complaintsById/{id}` - Get complaints by customer ID
- `POST /api/v1/complaints` - Register complaint
- `PUT /api/v1/complaints/{id}` - Update complaint
- `DELETE /api/v1/complaints/{id}` - Delete complaint

## Project Structure

```
src/
├── components/
│   ├── Auth/           # Login, ProtectedRoute
│   ├── Layout/         # Header, navigation
│   ├── Customer/       # Customer management
│   ├── Bill/           # Bill management
│   ├── Complaint/      # Complaint management
│   └── Dashboard/      # Dashboard
├── services/           # API service layer
├── styles/             # Global styles
├── App.jsx            # Main app with routing
└── main.jsx           # Entry point
```

## Features by Screen

### Dashboard
- Overview statistics
- Recent unpaid bills
- Recent complaints
- Quick action cards

### Customer Management
- List all customers with search
- Add new customer
- Edit customer details
- Delete customer

### Bill Management
- View all bills
- Search by consumer number or bill number
- Pay bills (updates status to "Paid")
- Delete bills

### Complaint Management
- View all complaints
- Register new complaint
- Update complaint status (Pending → In Progress → Resolved)
- Delete complaint

## License

Private - AuraLink Energy
