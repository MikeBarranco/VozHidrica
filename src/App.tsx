import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { VoiceProvider, useVoice } from './contexts/VoiceContext';
import { ToastProvider } from './contexts/ToastContext';
import VoiceAssistant from './components/VoiceAssistant';
import VoiceControlButton from './components/VoiceControlButton';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const TwoFactorAuthPage = lazy(() => import('./pages/TwoFactorAuthPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const RewardsPage = lazy(() => import('./pages/RewardsPage'));
const GreenCreditPage = lazy(() => import('./pages/GreenCreditPage'));
const SavingsPage = lazy(() => import('./pages/SavingsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const WaterCampaignPage = lazy(() => import('./pages/WaterCampaignPage'));
const WaterDashboardPage = lazy(() => import('./pages/WaterDashboardPage'));
const FinancialEducationPage = lazy(() => import('./pages/FinancialEducationPage'));
const ChallengesPage = lazy(() => import('./pages/ChallengesPage'));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#EB0029] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-gotham font-medium text-15 text-gray-700">Cargando...</p>
      </div>
    </div>
  );
}

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

// --- INICIO DEL CAMBIO (BYPASS) ---
// Modifiqué esta función para que nos deje pasar
// a cualquier ruta sin iniciar sesión.
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); // Sigue leyendo esto

  /*
  // He comentado esta lógica de protección:
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
  */

  // Ahora simplemente dejamos pasar
  return <>{children}</>;
}
// --- FIN DEL CAMBIO (BYPASS) ---


function AppContent() {
  return (
    <>
      <VoiceAssistant />
      <VoiceNavigationHandler />
      <VoiceControlButton />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/2fa" element={<TwoFactorAuthPage />} />
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
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <VoiceProvider>
            <AppContent />
          </VoiceProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
