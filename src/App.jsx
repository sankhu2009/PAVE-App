import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import EnrollmentWizard from './pages/provider/EnrollmentWizard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminReview from './pages/admin/AdminReview';

// Protected Route Component
const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on their actual role
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/provider" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Provider Routes */}
          <Route element={<ProtectedRoute allowedRoles={['provider']} />}>
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/provider/enrollment/*" element={<EnrollmentWizard />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/review/:npi" element={<AdminReview />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
