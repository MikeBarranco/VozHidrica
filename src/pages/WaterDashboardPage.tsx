import { useState } from 'react';
import { Droplet, TrendingDown, TrendingUp, Trophy, Flame, Target, Lightbulb, Award, Plus, ArrowLeft, CheckCircle, Lock } from 'lucide-react'; // Añadidos más iconos
import { useNavigate } from 'react-router-dom';
// --- BYPASS ---
// Eliminamos los hooks
// import { useWaterTracking } from '../hooks/useWaterTracking';
// import { useEcoPoints } from '../hooks/useEcoPoints';
// Importamos Header y Toast
import Header from '../components/Header'; // Asegúrate que la ruta sea correcta
import { useToast } from '../contexts/ToastContext'; // Para notificaciones

export default function WaterDashboardPage() {
  const navigate = useNavigate();
  const toast = useToast(); // Hook para notificaciones
  const [showAddModal, setShowAddModal] = useState(false);
  const [newConsumption, setNewConsumption] = useState('');

  // --- INICIO DATOS FALSOS (HACKATHON) ---
  const loading = false;
  const currentMonthConsumption = 15; // Consistente
  const lastMonthConsumption = 18; // Consistente
  const reductionPercentage = ((lastMonthConsumption - currentMonthConsumption) / lastMonthConsumption) * 100;
  const currentStreak = 7; // Consistente
  const pointsEarnedThisMonth = 30; // Consistente con Dashboard
  const monthlyGoalProgress = 85; // Consistente

  const fakeMonthlyTrend = [ // Consistente con Dashboard (datos de ejemplo)
      { month: 'Abr', value: 20 }, { month: 'May', value: 19 }, { month: 'Jun', value: 18 }, { month: 'Jul', value: 17 }, { month: 'Ago', value: 16 }, { month: 'Sep', value: lastMonthConsumption }, { month: 'Oct', value: currentMonthConsumption },
  ];

  const habitSuggestions = [ // Usando iconos Lucide
      { icon: <Droplet className="w-6 h-6 text-blue-500" />, title: 'Duchas más cortas', description: 'Reduce tu ducha a 5 minutos y ahorra significativamente', impact: 'Alto impacto', color: 'text-green-600' },
      { icon: <Droplet className="w-6 h-6 text-blue-500" />, title: 'Cierra el grifo', description: 'Al cepillarte o lavar platos, no dejes correr el agua', impact: 'Medio impacto', color: 'text-yellow-600' },
      { icon: <Droplet className="w-6 h-6 text-blue-500" />, title: 'Carga completa', description: 'Usa lavadora y lavavajillas solo cuando estén llenos', impact: 'Medio impacto', color: 'text-yellow-600' },
      { icon: <CheckCircle className="w-6 h-6 text-blue-500" />, title: 'Revisa fugas', description: 'Una pequeña fuga puede desperdiciar cientos de litros', impact: 'Alto impacto', color: 'text-green-600' },
  ];

  const streakRewards = [ // Usando iconos Lucide
      { days: 7, points: 50, earned: currentStreak >= 7 },
      { days: 14, points: 100, earned: currentStreak >= 14 },
      { days: 30, points: 250, earned: currentStreak >= 30 },
      { days: 60, points: 500, earned: currentStreak >= 60 },
      { days: 90, points: 1000, earned: currentStreak >= 90 },
      { days: 180, points: 2500, earned: currentStreak >= 180 },
  ];
  // --- FIN DATOS FALSOS ---

  // --- BYPASS DE FUNCIÓN ---
  const handleAddConsumption = async () => {
    const value = parseFloat(newConsumption);
    if (!value || value <= 0) {
        toast.error("Ingresa un valor de consumo válido."); // Usamos toast
        return;
    }
    console.log(`BYPASS: Registrando consumo de ${value} m³`);
    toast.success(`Consumo de ${value} m³ registrado (Modo Demo)`); // Usamos toast
    setShowAddModal(false);
    setNewConsumption('');
  };
  // --- FIN BYPASS ---

  return (
    <div className="bg-gradient-to-b from-cyan-50 to-blue-50 min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
                 <div className="flex items-center justify-between mb-4">
                     <button onClick={() => navigate('/home')} className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors font-gotham font-medium text-14" aria-label="Volver al inicio"> <ArrowLeft className="w-6 h-6 text-gray-700" /> <span className="text-gray-700">Volver</span> </button>
                     <button onClick={() => setShowAddModal(true)} className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2 font-gotham font-bold text-14 shadow hover:shadow-md"> <Plus className="w-5 h-5" /> Registrar Consumo </button>
                 </div>
                 <div>
                     <h1 className="font-gotham font-bold text-36 text-gray-900 mb-2"> Mi Panel de Agua </h1>
                     <p className="font-gotham font-book text-16 text-gray-600"> Monitorea tu consumo y forma hábitos sostenibles </p>
                 </div>
             </div>

            {/* Tarjetas de Resumen con animación */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 text-gray-600">Consumo este Mes</h3> <Droplet className="w-5 h-5 text-cyan-500" /> </div> <p className="font-gotham font-bold text-32 text-gray-900">{currentMonthConsumption} m³</p> <div className={`flex items-center gap-2 mt-2 ${reductionPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}> {reductionPercentage >= 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />} <p className="font-gotham font-book text-12"> {reductionPercentage >= 0 ? `-${reductionPercentage.toFixed(1)}%` : `+${Math.abs(reductionPercentage).toFixed(1)}%`} vs mes pasado </p> </div> </div>
                 <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 opacity-90">Racha Actual</h3> <Flame className="w-5 h-5" /> </div> <p className="font-gotham font-bold text-32">{currentStreak} días</p> <p className="font-gotham font-book text-12 opacity-75 mt-2"> ¡Sigue así! Mantén tu racha </p> </div>
                 <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg p-6 text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 opacity-90">Puntos Ganados (Agua)</h3> <Trophy className="w-5 h-5" /> </div> <p className="font-gotham font-bold text-32">{pointsEarnedThisMonth}</p> <p className="font-gotham font-book text-12 opacity-75 mt-2"> Por ahorro este mes </p> </div>
                 <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 text-gray-600">Meta Mensual</h3> <Target className="w-5 h-5 text-green-500" /> </div> <p className="font-gotham font-bold text-32 text-gray-900">{monthlyGoalProgress}%</p> <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden"> <div className="bg-green-500 h-2 rounded-full" style={{ width: `${monthlyGoalProgress}%` }}></div> </div> </div>
             </div>

            {/* Gráfica y Sugerencias */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                 {/* Gráfica con datos falsos */}
                 <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4 flex items-center gap-2"> <TrendingDown className="w-6 h-6 text-cyan-600" /> Consumo Mensual (m³) </h2> <div className="h-64 flex items-end justify-around gap-2 px-2"> {fakeMonthlyTrend.map((data, index) => { const maxValue = Math.max(...fakeMonthlyTrend.map(d => d.value), 0); const colorClass = data.value > (lastMonthConsumption * 1.05) ? 'bg-red-400 hover:bg-red-500' : data.value < (lastMonthConsumption * 0.9) ? 'bg-green-400 hover:bg-green-500' : 'bg-blue-400 hover:bg-blue-500'; const heightPercentage = maxValue > 0 ? (data.value / maxValue) * 90 : 0; return ( <div key={index} className="flex-1 flex flex-col items-center group relative pt-2"> <div className="absolute bottom-full mb-1 w-max px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"> {data.value} m³ </div> <div className="w-full flex items-end justify-center h-56"> <div className={`w-[70%] ${colorClass} rounded-t-lg transition-all duration-300 cursor-pointer shadow-sm group-hover:shadow-md`} style={{ height: `${heightPercentage}%` }} title={`${data.value} m³`} ></div> </div> <p className="font-gotham font-medium text-12 text-gray-600 mt-2">{data.month}</p> </div> ); })} </div> </div>
                 {/* Sugerencias con iconos Lucide */}
                 <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4 flex items-center gap-2"> <Lightbulb className="w-6 h-6 text-yellow-500" /> Sugerencias de Hábitos </h2> <div className="space-y-4"> {habitSuggestions.map((habit, index) => ( <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200"> <div className="pt-1">{habit.icon}</div> {/* Icono Lucide */} <div className="flex-1"> <h3 className="font-gotham font-bold text-15 text-gray-900 mb-1">{habit.title}</h3> <p className="font-gotham font-book text-13 text-gray-600 mb-2">{habit.description}</p> <p className={`font-gotham font-medium text-12 ${habit.color}`}>{habit.impact}</p> </div> </div> ))} </div> </div>
             </div>

             {/* Recompensas por Racha con iconos Lucide */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4 flex items-center gap-2"> <Award className="w-6 h-6 text-orange-600" /> Recompensas por Racha </h2> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> {streakRewards.map((reward, index) => ( <div key={index} className={`p-4 rounded-lg border-2 text-center transition-all duration-300 ${ reward.earned ? 'bg-green-50 border-green-500 scale-105 shadow-inner' : 'bg-gray-50 border-gray-300 hover:border-gray-400' }`}> {/* Usamos icono Lucide */} <div className={`mb-2 transition-transform duration-300 ${reward.earned ? 'transform scale-125' : ''}`}>{reward.earned ? <Trophy className="w-8 h-8 mx-auto text-yellow-500"/> : <Lock className="w-8 h-8 mx-auto text-gray-400"/>}</div> <p className="font-gotham font-bold text-16 text-gray-900">{reward.days} días</p> <p className={`font-gotham font-medium text-14 ${reward.earned ? 'text-green-600' : 'text-gray-500'}`}> {reward.points} puntos </p> {reward.earned && ( <p className="font-gotham font-book text-11 text-green-700 mt-1">¡Ganado!</p> )} </div> ))} </div> </div>
                 <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"> <div> <h2 className="font-gotham font-bold text-20 mb-4">Próximo Objetivo de Racha</h2> <div className="text-center py-6"> {(() => { const nextGoal = streakRewards.find(r => !r.earned); if (nextGoal) { const daysNeeded = nextGoal.days - currentStreak; const progress = Math.min((currentStreak / nextGoal.days) * 100, 100); return ( <> <Target className="w-16 h-16 mx-auto mb-4 opacity-80"/> <p className="font-gotham font-bold text-32 mb-2">{nextGoal.days} días</p> <p className="font-gotham font-book text-14 opacity-90 mb-4"> Te faltan {daysNeeded} {daysNeeded === 1 ? 'día' : 'días'} para tu próxima recompensa </p> <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2 overflow-hidden"> <div className="bg-white h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div> </div> <p className="font-gotham font-book text-12 opacity-75"> {currentStreak} de {nextGoal.days} días completados </p> <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg"> <p className="font-gotham font-bold text-14 mb-1">Premio: {nextGoal.points} puntos</p> </div> </> ); } else { return ( <> <CheckCircle className="w-16 h-16 mx-auto mb-4 text-white"/> <p className="font-gotham font-bold text-32 mb-2">¡Felicidades!</p> <p className="font-gotham font-book text-14 opacity-90 mb-4"> Has alcanzado todas las metas de racha. </p> <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2 overflow-hidden"> <div className="bg-white h-3 rounded-full" style={{ width: `100%` }}></div> </div> </> ); } })()} </div> </div> </div>
             </div>
        </div>

        {/* Modal Registrar Consumo (usa el bypass) */}
        {showAddModal && (
             <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"> <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleIn"> <h2 className="font-gotham font-bold text-24 text-gray-900 mb-4"> Registrar Consumo de Agua </h2> <p className="font-gotham font-book text-14 text-gray-600 mb-6"> Ingresa tu consumo en metros cúbicos (m³) registrado hoy en tu medidor </p> <input type="number" value={newConsumption} onChange={(e) => setNewConsumption(e.target.value)} placeholder="Ej: 4.5" step="0.1" min="0" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-gotham font-book text-16 focus:outline-none focus:border-cyan-500 transition-colors mb-6"/> <div className="flex gap-3"> <button onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-gotham font-bold text-16 rounded-lg hover:bg-gray-50 transition-colors"> Cancelar </button> <button onClick={handleAddConsumption} className="flex-1 px-6 py-3 bg-cyan-600 text-white font-gotham font-bold text-16 rounded-lg hover:bg-cyan-700 transition-colors"> Guardar </button> </div> </div> </div>
        )}
    </div>
  );
}