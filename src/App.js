import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/common/ProtectRoute';
import { AuthProvider } from './utils/authContext';
import TokenHandler from './pages/TokenHandler';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/token-handler" element={<TokenHandler></TokenHandler>} />
          <Route path="/dashboard" element={<ProtectedRoute component={DashboardPage}></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
