import { DollarSign, TrendingUp, CreditCard, Droplet, Trophy, Flame, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEcoPoints } from '../hooks/useEcoPoints';
import { useWaterTracking } from '../hooks/useWaterTracking';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { balance, transactions, convertPointsToMoney } = useEcoPoints();
  const { getCurrentMonthConsumption, getLastMonthConsumption, getReductionPercentage, streak } = useWaterTracking();

  const ecoPoints = balance?.total_points || 0;
  const level = balance?.level || 'Bronce';
  const moneyValue = convertPointsToMoney(ecoPoints);
  const currentStreak = streak?.current_streak || 0;
  const waterThisMonth = getCurrentMonthConsumption() || 125;
  const waterLastMonth = getLastMonthConsumption() || 142;
  const reductionPercentage = getReductionPercentage();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 font-gotham font-medium text-14"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>
        <h1 className="font-gotham font-bold text-32 text-gray-900 mb-8">
          Panel de Control
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white card-hover animate-slideInUp">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 opacity-90">Eco-Puntos</h3>
              <Trophy className="w-5 h-5" />
            </div>
            <p className="font-gotham font-bold text-28">{ecoPoints.toLocaleString()}</p>
            <p className="font-gotham font-book text-12 opacity-75 mt-2">
              {level} • ${moneyValue.toFixed(2)} MXN
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover-lift animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 text-gray-600">Saldo Total</h3>
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <p className="font-gotham font-bold text-28 text-gray-900">$125,450.00</p>
            <p className="font-gotham font-book text-12 text-green-600 mt-2">+5.2% este mes</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover-lift animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 text-gray-600">Ahorros</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="font-gotham font-bold text-28 text-gray-900">$45,230.00</p>
            <p className="font-gotham font-book text-12 text-green-600 mt-2">+2.8% este mes</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#EB0029] hover-lift animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 text-gray-600">Crédito Verde</h3>
              <CreditCard className="w-5 h-5 text-[#EB0029]" />
            </div>
            <p className="font-gotham font-bold text-28 text-gray-900">$20,000.00</p>
            <p className="font-gotham font-book text-12 text-gray-600 mt-2">Disponible</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-500 hover-lift animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 text-gray-600">Agua Este Mes</h3>
              <Droplet className="w-5 h-5 text-cyan-500" />
            </div>
            <p className="font-gotham font-bold text-28 text-gray-900">{waterThisMonth.toFixed(0)} m³</p>
            <p className="font-gotham font-book text-12 text-green-600 mt-2">
              {reductionPercentage > 0 ? `-${reductionPercentage.toFixed(1)}%` : `+${Math.abs(reductionPercentage).toFixed(1)}%`} vs mes pasado
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white card-hover animate-slideInUp" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 opacity-90">Racha Actual</h3>
              <Flame className="w-5 h-5" />
            </div>
            <p className="font-gotham font-bold text-28">{currentStreak}</p>
            <p className="font-gotham font-book text-12 opacity-75 mt-2">
              Días consecutivos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4">
              Transacciones de Eco-Puntos
            </h2>
            <div className="space-y-4">
              {transactions.slice(0, 5).length > 0 ? (
                transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-gotham font-medium text-15 text-gray-900">{transaction.description}</p>
                      <p className="font-gotham font-book text-12 text-gray-500">
                        {new Date(transaction.created_at).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <p className={`font-gotham font-bold text-16 ${
                      transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.points > 0 ? '+' : ''}{transaction.points} pts
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="font-gotham font-book text-14">Aún no tienes transacciones</p>
                  <p className="font-gotham font-book text-12 mt-2">Comienza a ahorrar agua para ganar puntos</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-gotham font-bold text-20 text-gray-900">
                Impacto Ambiental
              </h2>
              <button
                onClick={() => navigate('/water-dashboard')}
                className="text-cyan-600 hover:text-cyan-700 font-gotham font-medium text-14"
              >
                Ver detalle
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
                <p className="font-gotham font-medium text-14 text-gray-700 mb-2">Agua Ahorrada este Mes</p>
                <p className="font-gotham font-bold text-32 text-cyan-600">
                  {Math.max(0, waterLastMonth - waterThisMonth).toFixed(1)} m³
                </p>
                <p className="font-gotham font-book text-12 text-gray-600 mt-1">
                  Equivale a {Math.floor(Math.max(0, waterLastMonth - waterThisMonth) * 5)} duchas
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                <p className="font-gotham font-medium text-14 text-gray-700 mb-2">Ahorro Financiero</p>
                <p className="font-gotham font-bold text-32 text-green-600">
                  ${(Math.max(0, waterLastMonth - waterThisMonth) * 20).toFixed(2)}
                </p>
                <p className="font-gotham font-book text-12 text-gray-600 mt-1">
                  Aproximado según tarifas locales
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                <p className="font-gotham font-medium text-14 text-gray-700 mb-2">Eco-Puntos Ganados</p>
                <p className="font-gotham font-bold text-32 text-purple-600">
                  +{Math.floor(Math.max(0, waterLastMonth - waterThisMonth) * 10)} pts
                </p>
                <p className="font-gotham font-book text-12 text-gray-600 mt-1">
                  Por ahorro de agua este mes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4">
              Transacciones Recientes
            </h2>
            <div className="space-y-4">
              {[
                { name: 'Pago Servicios Agua', amount: '-$450.00', date: '24 Oct 2025', type: 'water' },
                { name: 'Recompensa Ecológica', amount: '+$100.00', date: '22 Oct 2025', type: 'reward' },
                { name: 'Ahorro Automático', amount: '-$1,000.00', date: '20 Oct 2025', type: 'savings' },
                { name: 'Pago Crédito Verde', amount: '-$500.00', date: '18 Oct 2025', type: 'credit' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-gotham font-medium text-15 text-gray-900">{transaction.name}</p>
                    <p className="font-gotham font-book text-12 text-gray-500">{transaction.date}</p>
                  </div>
                  <p className={`font-gotham font-bold text-16 ${
                    transaction.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4">
              Metas de Ahorro
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-gotham font-medium text-15 text-gray-900">Vacaciones</p>
                  <p className="font-gotham font-book text-13 text-gray-600">75%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="font-gotham font-book text-12 text-gray-500 mt-1">$7,500 de $10,000</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-gotham font-medium text-15 text-gray-900">Fondo de Emergencia</p>
                  <p className="font-gotham font-book text-13 text-gray-600">45%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="font-gotham font-book text-12 text-gray-500 mt-1">$9,000 de $20,000</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-gotham font-medium text-15 text-gray-900">Auto Nuevo</p>
                  <p className="font-gotham font-book text-13 text-gray-600">20%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-[#EB0029] h-3 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <p className="font-gotham font-book text-12 text-gray-500 mt-1">$10,000 de $50,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
