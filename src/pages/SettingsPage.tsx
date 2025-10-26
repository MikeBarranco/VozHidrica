import { User, Bell, Shield, Globe, Mic } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useVoice } from '../contexts/VoiceContext';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const { language, setLanguage, isActive } = useVoice();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-gotham font-bold text-32 text-gray-900 mb-8">
          Configuración
        </h1>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="font-gotham font-bold text-20 text-gray-900">Perfil</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-gotham font-medium text-14 text-gray-700 block mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-gotham font-book text-15 text-gray-600"
                />
              </div>
              <div>
                <label className="font-gotham font-medium text-14 text-gray-700 block mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-gotham font-book text-15 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="font-gotham font-medium text-14 text-gray-700 block mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  placeholder="+52 123 456 7890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-gotham font-book text-15 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 rounded-full p-3">
                <Mic className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="font-gotham font-bold text-20 text-gray-900">Asistente de Voz</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-gotham font-medium text-15 text-gray-900">Estado del Asistente</p>
                  <p className="font-gotham font-book text-13 text-gray-600">Hidra está {isActive ? 'activo' : 'inactivo'}</p>
                </div>
                <div className={`w-12 h-6 rounded-full flex items-center ${isActive ? 'bg-green-500' : 'bg-gray-300'} p-1 transition-colors`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : ''}`}></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-gotham font-medium text-15 text-gray-900">Idioma del Asistente</p>
                  <p className="font-gotham font-book text-13 text-gray-600">
                    {language === 'es' ? 'Español' : 'English'}
                  </p>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-gotham font-book text-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-gotham font-medium text-15 text-gray-900">Velocidad de Voz</p>
                  <p className="font-gotham font-book text-13 text-gray-600">Ajusta la velocidad de lectura</p>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  defaultValue="1"
                  className="w-32"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="font-gotham font-bold text-20 text-gray-900">Preferencias</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-gotham font-medium text-15 text-gray-900">Idioma de la Aplicación</p>
                  <p className="font-gotham font-book text-13 text-gray-600">Español (México)</p>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg font-gotham font-book text-14 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Español (México)</option>
                  <option>English (US)</option>
                </select>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-gotham font-medium text-15 text-gray-900">Moneda</p>
                  <p className="font-gotham font-book text-13 text-gray-600">Peso Mexicano (MXN)</p>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg font-gotham font-book text-14 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>MXN - Peso Mexicano</option>
                  <option>USD - Dólar Americano</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-100 rounded-full p-3">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="font-gotham font-bold text-20 text-gray-900">Notificaciones</h2>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Transacciones', description: 'Alertas de movimientos en tu cuenta' },
                { title: 'Recompensas', description: 'Nuevos puntos y beneficios disponibles' },
                { title: 'Metas de Ahorro', description: 'Progreso y recordatorios de metas' },
                { title: 'Promociones', description: 'Ofertas especiales y descuentos' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-gotham font-medium text-15 text-gray-900">{item.title}</p>
                    <p className="font-gotham font-book text-13 text-gray-600">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 rounded-full p-3">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="font-gotham font-bold text-20 text-gray-900">Seguridad</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg font-gotham font-medium text-15 text-gray-900 hover:bg-gray-50 transition-colors text-left">
                Cambiar Contraseña
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg font-gotham font-medium text-15 text-gray-900 hover:bg-gray-50 transition-colors text-left">
                Autenticación de Dos Factores
              </button>
              <button
                onClick={signOut}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-gotham font-bold text-15 text-white transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
