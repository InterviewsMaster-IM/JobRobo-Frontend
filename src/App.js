import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/common/ProtectRoute';
import { AuthProvider } from './utils/authContext';
import TokenHandler from './pages/TokenHandler';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import PastJobRoboPage from './pages/PastJobRoboPage';
import AppliedJobDetails from './components/PastJobRobos/AppliedJobDetails';
import ProfilePage from './pages/ProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import ResumeQuestionsTests from './pages/resumeQuestionsTest';
import PricingPage from './pages/PricingPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route path="/token-handler" element={<TokenHandler></TokenHandler>} />
                    <Route path="/dashboard" element={<ProtectedRoute component={DashboardPage}></ProtectedRoute>} />
                    <Route path="/onboarding" element={<ProtectedRoute component={OnboardingPage}></ProtectedRoute>} />
                    <Route path="/home" element={<ProtectedRoute component={HomePage}></ProtectedRoute>} />
                    <Route path="/pastjobrobo" element={<ProtectedRoute component={PastJobRoboPage}></ProtectedRoute>} />
                    <Route path="/pastjobrobo/:id" element={<ProtectedRoute component={AppliedJobDetails}></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute component={ProfilePage}></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute component={AccountSettingsPage}></ProtectedRoute>} />
                    <Route path="/pricing" element={<ProtectedRoute component={PricingPage}></ProtectedRoute>} />
                    <Route path="/test" element={<ProtectedRoute component={ResumeQuestionsTests}></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
