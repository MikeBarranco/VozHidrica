import { Gift, Star, Trophy, Award, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RewardsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors mb-4 font-gotham font-medium text-14"
          aria-label="Volver al inicio"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
          <span className="text-gray-700">Volver</span>
        </button>

        <h1 className="font-gotham font-bold text-32 text-gray-900 mb-4">
          Recompensas
        </h1>
        <p className="font-gotham font-book text-16 text-gray-600 mb-8">
          Gana puntos por usar servicios ecológicos y canjéalos por beneficios
        </p>

        <div className="bg-gradient-to-r from-[#EB0029] to-[#c9022f] rounded-xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-gotham font-medium text-16 opacity-90 mb-2">Tus Puntos Disponibles</p>
              <p className="font-gotham font-bold text-48">2,450</p>
              <p className="font-gotham font-book text-14 opacity-75 mt-2">+250 puntos este mes</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-6">
              <Trophy className="w-16 h-16" />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-gotham font-bold text-24 text-gray-900 mb-4">
            Cómo Ganar Puntos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-gotham font-bold text-16 text-gray-900 mb-2">Ahorro de Agua</h3>
              <p className="font-gotham font-book text-13 text-gray-600 mb-3">
                Reduce tu consumo mensual
              </p>
              <p className="font-gotham font-bold text-20 text-blue-600">50 pts</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-gotham font-bold text-16 text-gray-900 mb-2">Crédito Verde</h3>
              <p className="font-gotham font-book text-13 text-gray-600 mb-3">
                Usa tu crédito ecológico
              </p>
              <p className="font-gotham font-bold text-20 text-green-600">100 pts</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="font-gotham font-bold text-16 text-gray-900 mb-2">Referidos</h3>
              <p className="font-gotham font-book text-13 text-gray-600 mb-3">
                Invita a amigos
              </p>
              <p className="font-gotham font-bold text-20 text-cyan-600">200 pts</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-gotham font-bold text-16 text-gray-900 mb-2">Metas Cumplidas</h3>
              <p className="font-gotham font-book text-13 text-gray-600 mb-3">
                Alcanza tus objetivos
              </p>
              <p className="font-gotham font-bold text-20 text-orange-600">150 pts</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-gotham font-bold text-24 text-gray-900 mb-4">
            Catálogo de Recompensas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Descuento 10% Servicios de Agua', points: 500, image: '💧', available: true },
              { name: 'Cashback $100 MXN', points: 1000, image: '💵', available: true },
              { name: 'Tarjeta de Regalo Amazon', points: 2000, image: '🎁', available: true },
              { name: 'Descuento 20% en Paneles Solares', points: 1500, image: '☀️', available: true },
              { name: 'Bono de Ahorro $500 MXN', points: 3000, image: '💰', available: false },
              { name: 'Experiencia Eco-Turismo', points: 5000, image: '🌿', available: false },
            ].map((reward, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-md overflow-hidden ${
                !reward.available ? 'opacity-60' : ''
              }`}>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 flex items-center justify-center text-6xl">
                  {reward.image}
                </div>
                <div className="p-6">
                  <h3 className="font-gotham font-bold text-16 text-gray-900 mb-2">
                    {reward.name}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <p className="font-gotham font-bold text-18 text-[#EB0029]">
                      {reward.points} puntos
                    </p>
                    <button
                      disabled={!reward.available}
                      className={`px-4 py-2 rounded-lg font-gotham font-medium text-14 transition-colors ${
                        reward.available
                          ? 'bg-[#EB0029] text-white hover:bg-[#c9022f]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {reward.available ? 'Canjear' : 'No disponible'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
