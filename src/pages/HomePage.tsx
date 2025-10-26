import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Gift, Leaf, PiggyBank, Settings, Trophy, Target, BookOpen, Droplet, User, Twitter, Facebook, Instagram } from 'lucide-react';
// Importamos el nuevo componente Header
import Header from '../components/Header';

export default function HomePage() {
  const navigate = useNavigate();

  // Ya no necesitamos los datos falsos aquí, están en Header.tsx

  return (
    // Quitamos min-h-screen de aquí para ponerlo en el div principal
    <div className="bg-gray-50">
      {/* Usamos el nuevo componente Header */}
      <Header />

      {/* El resto del contenido de la página */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen"> {/* Añadido min-h-screen */}
        <div className="space-y-8">
          {/* --- Tarjetas de datos (CON animación) --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#EB0029] to-orange-500 rounded-xl shadow-lg p-6 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-gotham font-medium text-14 opacity-90">Eco-Puntos</h3>
                <Trophy className="w-5 h-5" />
              </div>
              {/* Usamos los mismos datos falsos que Header */}
              <p className="font-gotham font-bold text-32">1,250</p>
              <p className="font-gotham font-book text-12 opacity-75 mt-1">
                Nivel: Plata • $12.50 MXN
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-gotham font-medium text-14 text-gray-600">Agua este Mes</h3>
                <Droplet className="w-5 h-5 text-cyan-500" />
              </div>
              <p className="font-gotham font-bold text-32 text-gray-900">15 m³</p>
              <p className="font-gotham font-book text-12 text-gray-500 mt-1">
                Consumo actual
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-gotham font-medium text-14 opacity-90">Racha</h3>
                <Target className="w-5 h-5" />
              </div>
              <p className="font-gotham font-bold text-32">7</p>
              <p className="font-gotham font-book text-12 opacity-75 mt-1">
                Días consecutivos
              </p>
            </div>
            <button
              onClick={() => navigate('/challenges')}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
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

          {/* --- Banner principal (ya funciona) --- */}
          <div
            onClick={() => navigate('/water-campaign')}
            className="w-full h-64 md:h-80 bg-cover bg-center rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden relative group"
            style={{ backgroundImage: "url('/images/backgrounds/water-hero.png')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300"></div>
          </div>


          {/* --- Botones de navegación (CON animación) --- */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
             <button onClick={() => navigate('/dashboard')} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-blue-500 hover:-translate-y-1"> <LayoutDashboard className="w-8 h-8 text-blue-600" /> <span className="font-gotham font-bold text-14 text-gray-900">Panel</span> </button>
             <button onClick={() => navigate('/rewards')} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-orange-500 hover:-translate-y-1"> <Gift className="w-8 h-8 text-orange-600" /> <span className="font-gotham font-bold text-14 text-gray-900">Recompensas</span> </button>
             <button onClick={() => navigate('/green-credit')} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-green-500 hover:-translate-y-1"> <Leaf className="w-8 h-8 text-green-600" /> <span className="font-gotham font-bold text-14 text-gray-900">Crédito Verde</span> </button>
             <button onClick={() => navigate('/savings')} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-[#EB0029] hover:-translate-y-1"> <PiggyBank className="w-8 h-8 text-[#EB0029]" /> <span className="font-gotham font-bold text-14 text-gray-900">Ahorros</span> </button>
             <button onClick={() => navigate('/challenges')} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-blue-600 hover:-translate-y-1"> <Target className="w-8 h-8 text-blue-600" /> <span className="font-gotham font-bold text-14 text-gray-900">Retos</span> </button>
             <button onClick={() => navigate('/education')} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-cyan-600 hover:-translate-y-1"> <BookOpen className="w-8 h-8 text-cyan-600" /> <span className="font-gotham font-bold text-14 text-gray-900">Educación</span> </button>
             <button onClick={() => navigate('/settings')} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 border-2 border-transparent hover:border-gray-500 hover:-translate-y-1"> <Settings className="w-8 h-8 text-gray-600" /> <span className="font-gotham font-bold text-14 text-gray-900">Ajustes</span> </button>
          </div>

          {/* --- Carrusel automático (ya funciona) --- */}
          <div>
            <h3 className="font-gotham font-bold text-18 text-gray-900 mb-4">
              Avisos y Promociones
            </h3>
            <div className="w-full overflow-hidden">
              <div className="flex w-max animate-scroll pause-animation">
                {/* SET 1 */} <a href="https://www.banorte.com/wps/portal/empresas/Home/circulo-pyme" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-1.png" alt="Banner 1" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/aprende-mas-con-banorte/soluciones-para-ti/tu-nomina-es-mas-fuerte-con-banorte" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-2.png" alt="Banner 2" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/servicios-en-linea/banca-digital/banorte-movil/abre-tu-cuenta-desde-tu-celular" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-3.png" alt="Banner 3" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/empresas/Home/nearshoring" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-4.png" alt="Banner 4" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/125-aniversario-seguros" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-5.png" alt="Banner 5" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/aprende-mas-con-banorte/experiencia-banorte/4-destinos-cerca-de-la-cdmx" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-6.png" alt="Banner 6" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/aprende-mas-con-banorte/experiencia-banorte/fuerza-muscular" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-7.png" alt="Banner 7" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/aprende-mas-con-banorte/soluciones-para-ti/apoyando-fuerte-a-guerrero" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-8.png" alt="Banner 8" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/aprende-mas-con-banorte/educacion-financiera/evita-ser-victima-fraude" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-9.png" alt="Banner 9" className="h-full w-full object-cover rounded-xl"/></a>
                {/* SET 2 */} <a href="https://www.banorte.com/wps/portal/empresas/Home/circulo-pyme" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-1.png" alt="Banner 1" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/aprende-mas-con-banorte/soluciones-para-ti/tu-nomina-es-mas-fuerte-con-banorte" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-2.png" alt="Banner 2" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/servicios-en-linea/banca-digital/banorte-movil/abre-tu-cuenta-desde-tu-celular" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-3.png" alt="Banner 3" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/empresas/Home/nearshoring" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-4.png" alt="Banner 4" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/125-aniversario-seguros" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-5.png" alt="Banner 5" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/aprende-mas-con-banorte/experiencia-banorte/4-destinos-cerca-de-la-cdmx" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-6.png" alt="Banner 6" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/aprende-mas-con-banorte/experiencia-banorte/fuerza-muscular" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-7.png" alt="Banner 7" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/aprende-mas-con-banorte/soluciones-para-ti/apoyando-fuerte-a-guerrero" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-8.png" alt="Banner 8" className="h-full w-full object-cover rounded-xl"/></a> <a href="https://www.banorte.com/wps/portal/banorte/Home/aprende-mas-con-banorte/educacion-financiera/evita-ser-victima-fraude" target="_blank" rel="noopener noreferrer" className="h-64 w-auto rounded-xl shadow-lg flex-none mx-2"><img src="/images/banners/banner-9.png" alt="Banner 9" className="h-full w-full object-cover rounded-xl"/></a>
              </div>
            </div>
          </div>

          {/* --- Redes Sociales (ya funcionan) --- */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-gotham font-bold text-18 text-gray-900 text-center mb-4">
              Síguenos en Redes Sociales
            </h3>
            <div className="flex justify-center gap-6">
              <a href="https://www.facebook.com/banorte" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors"><Facebook className="w-8 h-8" /></a>
              <a href="https://x.com/Banorte_mx" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-500 transition-colors"><Twitter className="w-8 h-8" /></a>
              <a href="https://www.instagram.com/banorte_mx/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors"><Instagram className="w-8 h-8" /></a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}