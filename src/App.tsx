import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { VoiceProvider, useVoice } from './contexts/VoiceContext';
import VoiceAssistant from './components/VoiceAssistant';
import VoiceControlButton from './components/VoiceControlButton';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import RewardsPage from './pages/RewardsPage';
import GreenCreditPage from './pages/GreenCreditPage';
import SavingsPage from './pages/SavingsPage';
import SettingsPage from './pages/SettingsPage';
import WaterCampaignPage from './pages/WaterCampaignPage';
import WaterDashboardPage from './pages/WaterDashboardPage';
import FinancialEducationPage from './pages/FinancialEducationPage';
import ChallengesPage from './pages/ChallengesPage';

function VoiceNavigationHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { geminiResponse, setCurrentPage } = useVoice();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  useEffect(() => {
    if (geminiResponse?.intent === 'navigate' && geminiResponse.route) {
      navigate(geminiResponse.route);
    }
  }, [geminiResponse, navigate]);

  return null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="font-gotham font-medium text-15 text-text-primary">
          Cargando...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  return (
    <>
      <VoiceAssistant />
      <VoiceNavigationHandler />
      <VoiceControlButton />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rewards"
          element={
            <ProtectedRoute>
              <RewardsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/green-credit"
          element={
            <ProtectedRoute>
              <GreenCreditPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/savings"
          element={
            <ProtectedRoute>
              <SavingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/water-campaign"
          element={
            <ProtectedRoute>
              <WaterCampaignPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/water-dashboard"
          element={
            <ProtectedRoute>
              <WaterDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/education"
          element={
            <ProtectedRoute>
              <FinancialEducationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenges"
          element={
            <ProtectedRoute>
              <ChallengesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VoiceProvider>
          <AppContent />
        </VoiceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
