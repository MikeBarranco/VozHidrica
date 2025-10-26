import { DollarSign, TrendingUp, CreditCard, Droplet, Trophy, Flame, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// --- BYPASS ---
// Eliminamos los hooks de Supabase
// import { useEcoPoints } from '../hooks/useEcoPoints';
// import { useWaterTracking } from '../hooks/useWaterTracking';
// Importamos el Header reutilizable
import Header from '../components/Header';

export default function DashboardPage() {
  const navigate = useNavigate();

  // --- INICIO DE DATOS FALSOS (HACKATHON) ---
  // Mismos datos que en HomePage y Header
  const ecoPoints = 1250;
  const level = 'Plata';
  const moneyValue = 12.50;
  const currentStreak = 7;
  const waterThisMonth = 15; // m³
  const waterLastMonth = 18; // m³ (Inventamos un valor para calcular reducción)
  // Calculamos la reducción (o aumento)
  const reductionPercentage = ((waterLastMonth - waterThisMonth) / waterLastMonth) * 100;

  // Datos falsos para transacciones de puntos
  const fakeEcoTransactions = [
      { id: 't1', description: 'Reto Semanal Completado', created_at: '2025-10-25T10:00:00Z', points: 150 },
      { id: 't2', description: 'Canje Recompensa Cine', created_at: '2025-10-23T15:30:00Z', points: -500 },
      { id: 't3', description: 'Bono Racha 7 Días', created_at: '2025-10-22T08:00:00Z', points: 50 },
      { id: 't4', description: 'Ahorro Agua Octubre', created_at: '2025-10-20T12:00:00Z', points: 30 },
      { id: 't5', description: 'Registro Inicial', created_at: '2025-10-15T09:00:00Z', points: 1000 }, // Para que el total sea 1250-500+50+30+1000=1830 (Ajustar si es necesario) -> Ajustado a 1250 total
  ];
   // Ajustamos puntos iniciales para que el total sea 1250
   fakeEcoTransactions[4].points = 1250 - 150 + 500 - 50 - 30; // 1520


  // Datos falsos para transacciones recientes (financieras)
  const fakeRecentTransactions = [
       { name: 'Pago Servicios Agua', amount: '-$450.00', date: '24 Oct 2025', type: 'water' },
       { name: 'Recompensa Ecológica (Cashback)', amount: '+$100.00', date: '22 Oct 2025', type: 'reward' },
       { name: 'Ahorro Automático Meta Vacaciones', amount: '-$1,000.00', date: '20 Oct 2025', type: 'savings' },
       { name: 'Pago Mínimo Crédito Verde', amount: '-$500.00', date: '18 Oct 2025', type: 'credit' },
       { name: 'Transferencia Recibida', amount: '+$2,500.00', date: '15 Oct 2025', type: 'transfer' },
   ];

   // Datos falsos para metas de ahorro
   const fakeSavingsGoals = [
       { name: 'Vacaciones Diciembre', current: 7500, target: 10000, color: 'bg-blue-500' },
       { name: 'Fondo de Emergencia', current: 9000, target: 20000, color: 'bg-green-500' },
       { name: 'Enganche Auto', current: 10000, target: 50000, color: 'bg-[#EB0029]' },
   ];
  // --- FIN DE DATOS FALSOS (HACKATHON) ---


  return (
    <div className="bg-gray-50"> {/* Quitado min-h-screen */}
      {/* Añadimos el Header reutilizable */}
      <Header />

      <div className="max-w-7xl mx-auto p-6 min-h-screen"> {/* Añadido min-h-screen */}
        {/* --- CAMBIO: Botón volver movido y ajustado --- */}
        <div className="flex justify-start mb-6">
            <button
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors font-gotham font-medium text-14"
              aria-label="Volver al inicio"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
              <span className="text-gray-700">Volver</span>
            </button>
        </div>

        <h1 className="font-gotham font-bold text-32 text-gray-900 mb-8">
          Panel de Control
        </h1>

        {/* Las tarjetas ahora usan los datos falsos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
           <div className="bg-gradient-to-br from-[#EB0029] to-orange-500 rounded-xl shadow-lg p-6 text-white card-hover animate-slideInUp">
             <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 opacity-90">Eco-Puntos</h3> <Trophy className="w-5 h-5" /> </div>
             <p className="font-gotham font-bold text-28">{ecoPoints.toLocaleString()}</p>
             <p className="font-gotham font-book text-12 opacity-75 mt-2"> {level} • ${moneyValue.toFixed(2)} MXN </p>
           </div>
           {/* Ejemplo de tarjeta con datos falsos adicionales */}
           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover-lift animate-slideInUp" style={{ animationDelay: '0.1s' }}>
             <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 text-gray-600">Saldo Total</h3> <DollarSign className="w-5 h-5 text-blue-500" /> </div>
             <p className="font-gotham font-bold text-28 text-gray-900">$125,450.00</p>
             <p className="font-gotham font-book text-12 text-green-600 mt-2">+5.2% este mes</p>
           </div>
           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover-lift animate-slideInUp" style={{ animationDelay: '0.2s' }}>
             <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 text-gray-600">Ahorros</h3> <TrendingUp className="w-5 h-5 text-green-500" /> </div>
             <p className="font-gotham font-bold text-28 text-gray-900">$45,230.00</p>
             <p className="font-gotham font-book text-12 text-green-600 mt-2">+2.8% este mes</p>
           </div>
           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#EB0029] hover-lift animate-slideInUp" style={{ animationDelay: '0.3s' }}>
             <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 text-gray-600">Crédito Verde</h3> <CreditCard className="w-5 h-5 text-[#EB0029]" /> </div>
             <p className="font-gotham font-bold text-28 text-gray-900">$20,000.00</p>
             <p className="font-gotham font-book text-12 text-gray-600 mt-2">Disponible</p>
           </div>
           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-500 hover-lift animate-slideInUp" style={{ animationDelay: '0.4s' }}>
             <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 text-gray-600">Agua Este Mes</h3> <Droplet className="w-5 h-5 text-cyan-500" /> </div>
             <p className="font-gotham font-bold text-28 text-gray-900">{waterThisMonth.toFixed(0)} m³</p>
             {/* Usamos el porcentaje calculado */}
             <p className={`font-gotham font-book text-12 mt-2 ${reductionPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {reductionPercentage >= 0 ? `-${reductionPercentage.toFixed(1)}%` : `+${Math.abs(reductionPercentage).toFixed(1)}%`} vs mes pasado
             </p>
           </div>
           {/* La tarjeta de Racha estaba duplicada, la quito */}
        </div>

        {/* Las listas ahora usan los datos falsos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
           <div className="bg-white rounded-xl shadow-md p-6">
             <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4"> Transacciones de Eco-Puntos </h2>
             <div className="space-y-4">
               {/* Usamos fakeEcoTransactions */}
               {fakeEcoTransactions.slice(0, 5).length > 0 ? (
                 fakeEcoTransactions.slice(0, 5).map((transaction) => (
                   <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                     <div>
                       <p className="font-gotham font-medium text-15 text-gray-900">{transaction.description}</p>
                       <p className="font-gotham font-book text-12 text-gray-500">
                         {new Date(transaction.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                       </p>
                     </div>
                     <p className={`font-gotham font-bold text-16 ${transaction.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                       {transaction.points > 0 ? '+' : ''}{transaction.points} pts
                     </p>
                   </div>
                 ))
               ) : (
                 <div className="text-center py-8 text-gray-500">
                   <p className="font-gotham font-book text-14">Aún no tienes transacciones de puntos</p>
                 </div>
               )}
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-md p-6">
             <div className="flex items-center justify-between mb-4">
               <h2 className="font-gotham font-bold text-20 text-gray-900"> Impacto Ambiental </h2>
               <button onClick={() => navigate('/water-dashboard')} className="text-cyan-600 hover:text-cyan-700 font-gotham font-medium text-14"> Ver detalle </button>
             </div>
             <div className="space-y-6">
               <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
                 <p className="font-gotham font-medium text-14 text-gray-700 mb-2">Agua Ahorrada este Mes</p>
                 <p className="font-gotham font-bold text-32 text-cyan-600"> {Math.max(0, waterLastMonth - waterThisMonth).toFixed(1)} m³ </p>
                 <p className="font-gotham font-book text-12 text-gray-600 mt-1"> Equivale a {Math.floor(Math.max(0, waterLastMonth - waterThisMonth) * 5)} duchas </p>
               </div>
               <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                 <p className="font-gotham font-medium text-14 text-gray-700 mb-2">Ahorro Financiero</p>
                 <p className="font-gotham font-bold text-32 text-green-600"> ${(Math.max(0, waterLastMonth - waterThisMonth) * 20).toFixed(2)} </p>
                 <p className="font-gotham font-book text-12 text-gray-600 mt-1"> Aproximado según tarifas locales </p>
               </div>
               <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                 <p className="font-gotham font-medium text-14 text-gray-700 mb-2">Eco-Puntos Ganados</p>
                 <p className="font-gotham font-bold text-32 text-orange-600"> +{Math.floor(Math.max(0, waterLastMonth - waterThisMonth) * 10)} pts </p>
                 <p className="font-gotham font-book text-12 text-gray-600 mt-1"> Por ahorro de agua este mes </p>
               </div>
             </div>
           </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-white rounded-xl shadow-md p-6">
             <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4"> Transacciones Recientes </h2>
             <div className="space-y-4">
               {/* Usamos fakeRecentTransactions */}
               {fakeRecentTransactions.map((transaction, index) => (
                 <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                   <div>
                     <p className="font-gotham font-medium text-15 text-gray-900">{transaction.name}</p>
                     <p className="font-gotham font-book text-12 text-gray-500">{transaction.date}</p>
                   </div>
                   <p className={`font-gotham font-bold text-16 ${ transaction.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900' }`}>
                     {transaction.amount}
                   </p>
                 </div>
               ))}
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-md p-6">
             <h2 className="font-gotham font-bold text-20 text-gray-900 mb-4"> Metas de Ahorro </h2>
             <div className="space-y-6">
               {/* Usamos fakeSavingsGoals */}
               {fakeSavingsGoals.map((goal, index) => {
                 const percentage = Math.min((goal.current / goal.target) * 100, 100);
                 return (
                   <div key={index}>
                     <div className="flex items-center justify-between mb-2">
                       <p className="font-gotham font-medium text-15 text-gray-900">{goal.name}</p>
                       <p className="font-gotham font-book text-13 text-gray-600">{percentage.toFixed(0)}%</p>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"> {/* Asegurar overflow hidden */}
                       <div className={`${goal.color} h-3 rounded-full`} style={{ width: `${percentage}%` }}></div>
                     </div>
                     <p className="font-gotham font-book text-12 text-gray-500 mt-1">
                       ${goal.current.toLocaleString()} de ${goal.target.toLocaleString()}
                     </p>
                   </div>
                 );
               })}
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}