import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import CustomerList from './components/Customer/CustomerList';
import CustomerForm from './components/Customer/CustomerForm';
import BillList from './components/Bill/BillList';
import ComplaintList from './components/Complaint/ComplaintList';
import ComplaintForm from './components/Complaint/ComplaintForm';
import './styles/index.css';
import './styles/components.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-layout">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Customer Routes */}
                    <Route path="/customers" element={<CustomerList />} />
                    <Route path="/customers/add" element={<CustomerForm />} />
                    <Route path="/customers/edit/:id" element={<CustomerForm />} />

                    {/* Bill Routes */}
                    <Route path="/bills" element={<BillList />} />

                    {/* Complaint Routes */}
                    <Route path="/complaints" element={<ComplaintList />} />
                    <Route path="/complaints/add" element={<ComplaintForm />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
