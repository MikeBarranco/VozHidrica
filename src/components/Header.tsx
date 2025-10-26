import { useNavigate } from 'react-router-dom';
import { LogOut, Trophy, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Para signOut (bypass)

// Datos falsos consistentes
const displayName = 'Miguel B.';
const ecoPoints = 1250;
const moneyValue = 12.50;

export default function Header() {
  const navigate = useNavigate(); // Hook para navegación
  const { signOut } = useAuth(); // Hook para signOut (bypass)

  const handleSignOut = async () => {
    await signOut();
    // En demo, no redirigimos para poder seguir navegando
    console.log("BYPASS: Cerrar Sesión clickeado, no redirige.");
    // Para la versión final, añadirías: navigate('/auth');
    navigate('/auth');
  };

  return (
    <header className="bg-[#EB0029] shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logos */}
          <div className="flex items-center gap-4">
            {/* Logo Banorte clickeable */}
            <img
              src="/images/banorte-logo-white.png"
              alt="Logo Banorte"
              className="h-8 w-auto cursor-pointer transition-opacity hover:opacity-90" // Añadido hover
              onClick={() => navigate('/home')} // Clic para ir a home
            />
            {/* Logo Voz Hídrica */}
            <div className="hidden sm:block">
              <img
                src="/images/voz-hidrica-white2.png"
                alt="Logo Voz Hídrica"
                className="h-9 w-auto"
              />
            </div>
          </div>

          {/* Botones de Usuario y Puntos */}
          <div className="flex items-center gap-4">
            {/* Botón Cerrar Sesión */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#EB0029] rounded-lg hover:bg-opacity-90 transition-all duration-300 font-gotham font-bold text-14 shadow-md"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
            {/* Puntos */}
            <div className="hidden md:flex items-center gap-3 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg shadow-md backdrop-blur-sm">
              <Trophy className="w-5 h-5" />
              <div className="text-left">
                <div className="font-gotham font-bold text-14">{ecoPoints.toLocaleString()} pts</div>
                <div className="font-gotham font-book text-10 opacity-90">${moneyValue.toFixed(2)} MXN</div>
              </div>
            </div>

            {/* --- INICIO DEL CAMBIO --- */}
            {/* Botón Nombre de Usuario (ahora clickeable) */}
            <button // Cambiado a button para mejor semántica y accesibilidad
              onClick={() => navigate('/settings')} // Navega a /settings
              className="flex items-center gap-2 bg-white bg-opacity-20 text-white px-3 py-2 rounded-lg shadow-md backdrop-blur-sm cursor-pointer transition-all duration-300 hover:bg-opacity-30 hover:scale-105" // Añadido cursor y hover
            >
              <div className="bg-white bg-opacity-30 rounded-full p-1.5">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline text-sm font-gotham font-medium">{displayName}</span>
            </button>
            {/* --- FIN DEL CAMBIO --- */}
          </div>
        </div>
      </div>
    </header>
  );
}