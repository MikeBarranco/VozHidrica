import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Gift, Leaf, PiggyBank, Settings, Trophy, Target, BookOpen, Droplet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCarouselBanners, useSocialLinks } from '../hooks/useSocialData';
import { useEcoPoints } from '../hooks/useEcoPoints';
import { useWaterTracking } from '../hooks/useWaterTracking';
import Carousel from '../components/Carousel';
import SocialLinksBar from '../components/SocialLinksBar';
import { SkeletonBanner, SkeletonCard } from '../components/SkeletonLoader';

export default function HomePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { banners, loading: bannersLoading } = useCarouselBanners();
  const { links, loading: linksLoading } = useSocialLinks();
  const { balance, convertPointsToMoney } = useEcoPoints();
  const { getCurrentMonthConsumption, streak } = useWaterTracking();

  const ecoPoints = balance?.total_points || 0;
  const level = balance?.level || 'Bronce';
  const moneyValue = convertPointsToMoney(ecoPoints);
  const currentStreak = streak?.current_streak || 0;
  const waterThisMonth = getCurrentMonthConsumption() || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#EB0029] shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <svg
                width="120"
                height="32"
                viewBox="0 0 150 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="75"
                  y="25"
                  textAnchor="middle"
                  fill="white"
                  fontSize="20"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  BANORTE
                </text>
              </svg>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">Voz Hídrica</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg shadow-md backdrop-blur-sm">
                <Trophy className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-gotham font-bold text-14">{ecoPoints.toLocaleString()} pts</div>
                  <div className="font-gotham font-book text-10 opacity-90">${moneyValue.toFixed(2)} MXN</div>
                </div>
              </div>
              <span className="hidden sm:inline text-sm text-white opacity-90">{user?.email}</span>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 bg-white text-[#EB0029] rounded-lg hover:bg-opacity-90 transition-all duration-300 font-gotham font-bold text-14 shadow-md"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#EB0029] to-orange-500 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-gotham font-medium text-14 opacity-90">Eco-Puntos</h3>
                <Trophy className="w-5 h-5" />
              </div>
              <p className="font-gotham font-bold text-32">{ecoPoints.toLocaleString()}</p>
              <p className="font-gotham font-book text-12 opacity-75 mt-1">
                Nivel: {level} • ${moneyValue.toFixed(2)} MXN
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-500">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-gotham font-medium text-14 text-gray-600">Agua este Mes</h3>
                <Droplet className="w-5 h-5 text-cyan-500" />
              </div>
              <p className="font-gotham font-bold text-32 text-gray-900">{waterThisMonth.toFixed(0)} m³</p>
              <p className="font-gotham font-book text-12 text-gray-500 mt-1">
                Consumo actual
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-gotham font-medium text-14 opacity-90">Racha</h3>
                <Target className="w-5 h-5" />
              </div>
              <p className="font-gotham font-bold text-32">{currentStreak}</p>
              <p className="font-gotham font-book text-12 opacity-75 mt-1">
                Días consecutivos
              </p>
            </div>

            <button
              onClick={() => navigate('/challenges')}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white hover:shadow-2xl transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-gotham font-medium text-14 opacity-90">Retos</h3>
                <Target className="w-5 h-5" />
              </div>
              <p className="font-gotham font-bold text-32">Ver</p>
              <p className="font-gotham font-book text-12 opacity-75 mt-1">
                Desafíos activos
              </p>
            </button>
          </div>
          <div
            onClick={() => navigate('/water-campaign')}
            className="w-full h-64 md:h-80 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
            <div className="relative z-10 text-center text-white p-8">
              <h2 className="font-gotham font-bold text-32 md:text-44 mb-4">Voz Hídrica</h2>
              <p className="font-gotham font-medium text-18 md:text-20">Juntos por un futuro sostenible</p>
              <p className="font-gotham font-book text-14 md:text-16 mt-4 opacity-90">Haz clic para saber más</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-blue-500"
            >
              <LayoutDashboard className="w-8 h-8 text-blue-600" />
              <span className="font-gotham font-bold text-14 text-gray-900">Panel</span>
            </button>
            <button
              onClick={() => navigate('/rewards')}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-orange-500"
            >
              <Gift className="w-8 h-8 text-orange-600" />
              <span className="font-gotham font-bold text-14 text-gray-900">Recompensas</span>
            </button>
            <button
              onClick={() => navigate('/green-credit')}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-green-500"
            >
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="font-gotham font-bold text-14 text-gray-900">Crédito Verde</span>
            </button>
            <button
              onClick={() => navigate('/savings')}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-[#EB0029]"
            >
              <PiggyBank className="w-8 h-8 text-[#EB0029]" />
              <span className="font-gotham font-bold text-14 text-gray-900">Ahorros</span>
            </button>
            <button
              onClick={() => navigate('/challenges')}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-blue-600"
            >
              <Target className="w-8 h-8 text-blue-600" />
              <span className="font-gotham font-bold text-14 text-gray-900">Retos</span>
            </button>
            <button
              onClick={() => navigate('/education')}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-cyan-600"
            >
              <BookOpen className="w-8 h-8 text-cyan-600" />
              <span className="font-gotham font-bold text-14 text-gray-900">Educación</span>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-gray-500"
            >
              <Settings className="w-8 h-8 text-gray-600" />
              <span className="font-gotham font-bold text-14 text-gray-900">Ajustes</span>
            </button>
          </div>

          {bannersLoading ? (
            <SkeletonBanner />
          ) : (
            <Carousel banners={banners} />
          )}

          {linksLoading ? (
            <SkeletonCard />
          ) : (
            <SocialLinksBar links={links} />
          )}
        </div>
      </main>
    </div>
  );
}
