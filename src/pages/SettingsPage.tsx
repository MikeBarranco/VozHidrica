import { User, Bell, Shield, Globe, Mic, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Mantenemos para signOut (bypass)
import { useVoice } from '../contexts/VoiceContext'; // Mantenemos para idioma/estado (bypass)
// Importamos el Header reutilizable
import Header from '../components/Header';

export default function SettingsPage() {
  const navigate = useNavigate();
  // Usamos el signOut del bypass (no hará nada visualmente)
  const { signOut } = useAuth();
  // Usamos los valores falsos del bypass de useVoice
  const { language, setLanguage, isActive } = useVoice();

  // --- INICIO DATOS FALSOS ---
  const fakeUserEmail = "miguel.b@ejemplo.com"; // Email de ejemplo
  const fakeUserName = "Miguel Barranco"; // Nombre de ejemplo
  const fakeUserPhone = "+52 55 1234 5678"; // Teléfono de ejemplo
  // --- FIN DATOS FALSOS ---

  // --- BYPASS DE FUNCIONES ---
  const handleSaveChanges = () => {
      alert("Cambios guardados (Modo Demo)");
      console.log("BYPASS: Guardar cambios de perfil");
  };
   const handleChangePassword = () => {
      alert("Funcionalidad Cambiar Contraseña (Modo Demo)");
      console.log("BYPASS: Clic en Cambiar Contraseña");
  };
   const handle2FA = () => {
      alert("Funcionalidad Autenticación 2 Factores (Modo Demo)");
      console.log("BYPASS: Clic en 2FA");
  };
  // --- FIN BYPASS ---


  return (
    <div className="bg-gray-50"> {/* Quitado min-h-screen */}
        {/* Usamos el Header */}
        <Header />

        <div className="max-w-4xl mx-auto p-6 min-h-screen"> {/* Añadido min-h-screen */}
            {/* Botón Volver */}
            <div className="flex justify-start mb-4">
                <button onClick={() => navigate('/home')} className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors font-gotham font-medium text-14" aria-label="Volver al inicio"> <ArrowLeft className="w-6 h-6 text-gray-700" /> <span className="text-gray-700">Volver</span> </button>
            </div>

            <h1 className="font-gotham font-bold text-32 text-gray-900 mb-8"> Configuración </h1>

            <div className="space-y-6">
            {/* Sección Perfil con animación y datos falsos */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6"> <div className="bg-blue-100 rounded-full p-3"> <User className="w-6 h-6 text-blue-600" /> </div> <h2 className="font-gotham font-bold text-20 text-gray-900">Perfil</h2> </div>
                <div className="space-y-4">
                    <div> <label className="font-gotham font-medium text-14 text-gray-700 block mb-2"> Correo Electrónico </label> <input type="email" value={fakeUserEmail} disabled className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-gotham font-book text-15 text-gray-600 cursor-not-allowed"/> </div>
                    <div> <label className="font-gotham font-medium text-14 text-gray-700 block mb-2"> Nombre Completo </label> <input type="text" defaultValue={fakeUserName} placeholder="Tu nombre completo" className="w-full px-4 py-3 border border-gray-300 rounded-lg font-gotham font-book text-15 focus:outline-none focus:ring-2 focus:ring-blue-500"/> </div>
                    <div> <label className="font-gotham font-medium text-14 text-gray-700 block mb-2"> Teléfono </label> <input type="tel" defaultValue={fakeUserPhone} placeholder="+52 123 456 7890" className="w-full px-4 py-3 border border-gray-300 rounded-lg font-gotham font-book text-15 focus:outline-none focus:ring-2 focus:ring-blue-500"/> </div>
                    {/* Botón Guardar (simulado) */}
                    <div className="pt-4">
                        <button onClick={handleSaveChanges} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-gotham font-bold text-15 rounded-lg transition-colors shadow hover:shadow-md"> Guardar Cambios </button>
                    </div>
                </div>
            </div>

            {/* Sección Asistente de Voz con animación */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6"> <div className="bg-blue-100 rounded-full p-3"> <Mic className="w-6 h-6 text-blue-600" /> </div> <h2 className="font-gotham font-bold text-20 text-gray-900">Asistente de Voz</h2> </div>
                <div className="space-y-4">
                    {/* Estado (usa el 'isActive' del bypass) */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100"> <div> <p className="font-gotham font-medium text-15 text-gray-900">Estado del Asistente</p> <p className="font-gotham font-book text-13 text-gray-600">Hidri está {isActive ? 'activo' : 'inactivo'}</p> </div> <div className={`w-12 h-6 rounded-full flex items-center ${isActive ? 'bg-green-500' : 'bg-gray-300'} p-1 transition-colors cursor-pointer`} /* onClick={toggleActive} <- Podrías añadir toggle aquí si quieres */ > <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : ''}`}></div> </div> </div>
                    {/* Idioma (usa language/setLanguage del bypass) */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100"> <div> <p className="font-gotham font-medium text-15 text-gray-900">Idioma del Asistente</p> <p className="font-gotham font-book text-13 text-gray-600"> {language === 'es' ? 'Español' : 'English'} </p> </div> <select value={language} onChange={(e) => setLanguage(e.target.value as 'es' | 'en')} className="px-4 py-2 border border-gray-300 rounded-lg font-gotham font-book text-14 focus:outline-none focus:ring-2 focus:ring-blue-500"> <option value="es">Español</option> <option value="en">English</option> </select> </div>
                    {/* Velocidad (control visual, no funcional sin la voz real) */}
                    <div className="flex items-center justify-between py-3"> <div> <p className="font-gotham font-medium text-15 text-gray-900">Velocidad de Voz</p> <p className="font-gotham font-book text-13 text-gray-600">Ajusta la velocidad de lectura</p> </div> <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-32 accent-blue-600 cursor-pointer"/> {/* Added accent color */} </div>
                </div>
            </div>

            {/* Sección Preferencias con animación */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6"> <div className="bg-green-100 rounded-full p-3"> <Globe className="w-6 h-6 text-green-600" /> </div> <h2 className="font-gotham font-bold text-20 text-gray-900">Preferencias</h2> </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100"> <div> <p className="font-gotham font-medium text-15 text-gray-900">Idioma de la Aplicación</p> <p className="font-gotham font-book text-13 text-gray-600">Español (México)</p> </div> <select className="px-4 py-2 border border-gray-300 rounded-lg font-gotham font-book text-14 focus:outline-none focus:ring-2 focus:ring-blue-500"> <option>Español (México)</option> <option>English (US)</option> </select> </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100"> <div> <p className="font-gotham font-medium text-15 text-gray-900">Moneda Principal</p> <p className="font-gotham font-book text-13 text-gray-600">Peso Mexicano (MXN)</p> </div> <select className="px-4 py-2 border border-gray-300 rounded-lg font-gotham font-book text-14 focus:outline-none focus:ring-2 focus:ring-blue-500"> <option>MXN - Peso Mexicano</option> <option>USD - Dólar Americano</option> </select> </div>
                </div>
            </div>

            {/* Sección Notificaciones con animación */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                 <div className="flex items-center gap-3 mb-6"> <div className="bg-yellow-100 rounded-full p-3"> <Bell className="w-6 h-6 text-yellow-600" /> </div> <h2 className="font-gotham font-bold text-20 text-gray-900">Notificaciones</h2> </div>
                 <div className="space-y-4">
                   {[ { title: 'Transacciones', description: 'Alertas de movimientos en tu cuenta' }, { title: 'Recompensas', description: 'Nuevos puntos y beneficios disponibles' }, { title: 'Metas de Ahorro', description: 'Progreso y recordatorios de metas' }, { title: 'Promociones', description: 'Ofertas especiales y descuentos' }, ].map((item, index) => ( <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"> <div> <p className="font-gotham font-medium text-15 text-gray-900">{item.title}</p> <p className="font-gotham font-book text-13 text-gray-600">{item.description}</p> </div> <label className="relative inline-flex items-center cursor-pointer"> <input type="checkbox" defaultChecked className="sr-only peer" /> <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div> </label> </div> ))}
                 </div>
             </div>

            {/* Sección Seguridad con animación */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6"> <div className="bg-red-100 rounded-full p-3"> <Shield className="w-6 h-6 text-red-600" /> </div> <h2 className="font-gotham font-bold text-20 text-gray-900">Seguridad</h2> </div>
                <div className="space-y-3">
                    <button onClick={handleChangePassword} className="w-full px-4 py-3 border border-gray-300 rounded-lg font-gotham font-medium text-15 text-gray-900 hover:bg-gray-50 transition-colors text-left"> Cambiar Contraseña </button>
                    <button onClick={handle2FA} className="w-full px-4 py-3 border border-gray-300 rounded-lg font-gotham font-medium text-15 text-gray-900 hover:bg-gray-50 transition-colors text-left"> Autenticación de Dos Factores </button>
                    {/* Usamos el signOut del bypass */}
                    <button onClick={signOut} className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-gotham font-bold text-15 text-white transition-colors"> Cerrar Sesión </button>
                </div>
            </div>

            </div>
        </div>
    </div>
  );
}