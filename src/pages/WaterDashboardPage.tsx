import { useState } from 'react';
import { Droplet, TrendingDown, Trophy, Flame, Target, Lightbulb, Award, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWaterTracking } from '../hooks/useWaterTracking';
import { useEcoPoints } from '../hooks/useEcoPoints';

export default function WaterDashboardPage() {
  const navigate = useNavigate();
  const { getCurrentMonthConsumption, getReductionPercentage, getMonthlyConsumptionTrend, streak, addConsumption, loading } = useWaterTracking();
  const { balance } = useEcoPoints();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newConsumption, setNewConsumption] = useState('');

  const currentMonth = getCurrentMonthConsumption() || 125;
  const reduction = getReductionPercentage().toFixed(1);
  const monthlyTrend = getMonthlyConsumptionTrend();
  const currentStreak = streak?.current_streak || 12;
  const pointsEarned = balance?.total_points || 450;

  const handleAddConsumption = async () => {
    const value = parseFloat(newConsumption);
    if (value && value > 0) {
      await addConsumption(value);
      setShowAddModal(false);
      setNewConsumption('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="font-gotham font-medium text-16 text-gray-700">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors mb-4"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-gotham font-bold text-36 text-gray-900 mb-2">
                Mi Panel de Agua
              </h1>
              <p className="font-gotham font-book text-16 text-gray-600">
                Monitorea tu consumo y forma hábitos sostenibles
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2 font-gotham font-bold text-14"
            >
              <Plus className="w-5 h-5" />
              Registrar Consumo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 text-gray-600">Consumo este Mes</h3>
              <Droplet className="w-5 h-5 text-cyan-500" />
            </div>
            <p className="font-gotham font-bold text-32 text-gray-900">{currentMonth} m³</p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <p className="font-gotham font-book text-12 text-green-600">-{reduction}% vs mes pasado</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 opacity-90">Racha Actual</h3>
              <Flame className="w-5 h-5" />
            </div>
            <p className="font-gotham font-bold text-32">{currentStreak} días</p>
            <p className="font-gotham font-book text-12 opacity-75 mt-2">
              ¡Sigue así! Mantén tu racha
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 opacity-90">Puntos Ganados</h3>
              <Trophy className="w-5 h-5" />
            </div>
            <p className="font-gotham font-bold text-32">{pointsEarned}</p>
            <p className="font-gotham font-book text-12 opacity-75 mt-2">
              Este mes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 text-gray-600">Meta Mensual</h3>
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <p className="font-gotham font-bold text-32 text-gray-900">85%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4 flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-cyan-600" />
              Consumo Mensual (m³)
            </h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {(monthlyTrend.length > 0 ? monthlyTrend : [
                { month: 'Ene', value: 155 },
                { month: 'Feb', value: 148 },
                { month: 'Mar', value: 152 },
                { month: 'Abr', value: 145 },
                { month: 'May', value: 138 },
                { month: 'Jun', value: 142 },
                { month: 'Jul', value: 125 },
              ]).map((data, index) => {
                const maxValue = Math.max(...(monthlyTrend.length > 0 ? monthlyTrend : [{ value: 155 }]).map(d => d.value));
                const color = data.value > 150 ? 'bg-red-400' : data.value > 140 ? 'bg-orange-400' : data.value > 130 ? 'bg-yellow-400' : 'bg-green-400';
                const height = maxValue > 0 ? (data.value / maxValue) * 100 : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex items-end justify-center h-56">
                      <div
                        className={`w-full ${color} rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer`}
                        style={{ height: `${height}%` }}
                        title={`${data.value} m³`}
                      ></div>
                    </div>
                    <p className="font-gotham font-medium text-12 text-gray-600 mt-2">{data.month}</p>
                    <p className="font-gotham font-book text-11 text-gray-500">{data.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              Sugerencias de Hábitos
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: '🚿',
                  title: 'Duchas más cortas',
                  description: 'Reduce tu ducha a 5 minutos y ahorra hasta 50 litros por día',
                  impact: 'Alto impacto',
                  color: 'text-green-600',
                },
                {
                  icon: '🚰',
                  title: 'Cierra el grifo',
                  description: 'Al cepillarte los dientes, ahorra hasta 12 litros',
                  impact: 'Medio impacto',
                  color: 'text-yellow-600',
                },
                {
                  icon: '🌱',
                  title: 'Riega con cubeta',
                  description: 'Usa cubeta en vez de manguera para tus plantas',
                  impact: 'Medio impacto',
                  color: 'text-yellow-600',
                },
                {
                  icon: '💧',
                  title: 'Reutiliza el agua',
                  description: 'El agua de la lavadora puede usarse para limpieza',
                  impact: 'Alto impacto',
                  color: 'text-green-600',
                },
              ].map((habit, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="text-3xl">{habit.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-gotham font-bold text-15 text-gray-900 mb-1">{habit.title}</h3>
                    <p className="font-gotham font-book text-13 text-gray-600 mb-2">{habit.description}</p>
                    <p className={`font-gotham font-medium text-12 ${habit.color}`}>{habit.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-600" />
              Recompensas por Racha
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { days: 7, points: 50, earned: currentStreak >= 7 },
                { days: 14, points: 100, earned: currentStreak >= 14 },
                { days: 30, points: 250, earned: currentStreak >= 30 },
                { days: 60, points: 500, earned: currentStreak >= 60 },
                { days: 90, points: 1000, earned: currentStreak >= 90 },
                { days: 180, points: 2500, earned: currentStreak >= 180 },
              ].map((reward, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 text-center ${
                    reward.earned
                      ? 'bg-green-50 border-green-500'
                      : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{reward.earned ? '🏆' : '🔒'}</div>
                  <p className="font-gotham font-bold text-16 text-gray-900">{reward.days} días</p>
                  <p className={`font-gotham font-medium text-14 ${reward.earned ? 'text-green-600' : 'text-gray-500'}`}>
                    {reward.points} puntos
                  </p>
                  {reward.earned && (
                    <p className="font-gotham font-book text-11 text-green-600 mt-1">¡Ganado!</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="font-gotham font-bold text-20 mb-4">Próximo Objetivo</h2>
            <div className="text-center py-6">
              <div className="text-6xl mb-4">🎯</div>
              <p className="font-gotham font-bold text-32 mb-2">30 días</p>
              <p className="font-gotham font-book text-14 opacity-90 mb-4">
                Te faltan {Math.max(0, 30 - currentStreak)} días para tu próxima recompensa
              </p>
              <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((currentStreak / 30) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="font-gotham font-book text-12 opacity-75">
                {currentStreak} de 30 días completados
              </p>
            </div>
            <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg">
              <p className="font-gotham font-bold text-14 mb-2">Premio: 250 puntos</p>
              <p className="font-gotham font-book text-12 opacity-90">
                Mantén tu consumo por debajo de 130 m³ mensuales
              </p>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="font-gotham font-bold text-24 text-gray-900 mb-4">
              Registrar Consumo de Agua
            </h2>
            <p className="font-gotham font-book text-14 text-gray-600 mb-6">
              Ingresa tu consumo en metros cúbicos (m³) del día de hoy
            </p>
            <input
              type="number"
              value={newConsumption}
              onChange={(e) => setNewConsumption(e.target.value)}
              placeholder="Ej: 4.5"
              step="0.1"
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-gotham font-book text-16 focus:outline-none focus:border-cyan-500 transition-colors mb-6"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-gotham font-bold text-16 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddConsumption}
                className="flex-1 px-6 py-3 bg-cyan-600 text-white font-gotham font-bold text-16 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
