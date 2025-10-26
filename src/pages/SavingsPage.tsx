import { useState } from 'react';
import { PiggyBank, TrendingUp, Plus, Target, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Asegúrate que la ruta sea correcta
import { useToast } from '../contexts/ToastContext'; // Para notificaciones

export default function SavingsPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const totalSavings = 45230.00;
  const savingsThisMonth = 1250.00;
  const interestRate = 4.5;

  const fakeSavingsGoals = [
    { name: 'Vacaciones Diciembre', current: 7500, target: 10000, icon: '/images/savings/vacation.png', color: 'blue', monthlyContribution: 500 },
    { name: 'Fondo de Emergencia', current: 9000, target: 20000, icon: '/images/savings/emergency.png', color: 'green', monthlyContribution: 1000 },
    { name: 'Enganche Auto', current: 10000, target: 50000, icon: '/images/savings/car.png', color: 'red', monthlyContribution: 2000 },
  ];
  const fakeSavingsHistory = [ /* Mismo historial */ { date: '25 Oct 2025', description: 'Depósito Automático', goal: 'Vacaciones', amount: '+$500.00', type: 'deposit' }, { date: '25 Oct 2025', description: 'Depósito Automático', goal: 'Fondo de Emergencia', amount: '+$1,000.00', type: 'deposit' }, { date: '24 Oct 2025', description: 'Rendimientos Generados', goal: 'General', amount: '+$12.50', type: 'interest' }, { date: '20 Oct 2025', description: 'Depósito Manual', goal: 'Enganche Auto', amount: '+$2,000.00', type: 'deposit' }, { date: '18 Oct 2025', description: 'Depósito Automático', goal: 'Vacaciones', amount: '+$500.00', type: 'deposit' }, { date: '15 Oct 2025', description: 'Depósito Automático', goal: 'Fondo de Emergencia', amount: '+$1,000.00', type: 'deposit' }, ];
  const handleNewGoal = () => { toast.info('Funcionalidad "Nueva Meta" no implementada en demo.'); console.log("BYPASS: Clic en Nueva Meta"); };
  const getTailwindColor = (colorName: string): string => { switch (colorName) { case 'blue': return 'bg-blue-500'; case 'green': return 'bg-green-500'; case 'red': return 'bg-[#EB0029]'; default: return 'bg-gray-500'; } };


  return (
    <div className="bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
             <div className="flex justify-start mb-4"> <button onClick={() => navigate('/home')} className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors font-gotham font-medium text-14" aria-label="Volver al inicio"> <ArrowLeft className="w-6 h-6 text-gray-700" /> <span className="text-gray-700">Volver</span> </button> </div>
            <h1 className="font-gotham font-bold text-32 text-gray-900 mb-4"> Mi Cuenta de Ahorro </h1>
            <p className="font-gotham font-book text-16 text-gray-600 mb-8"> Administra tus metas y observa cómo crece tu dinero con nuestra tasa preferencial. </p>
            {/* Tarjetas Superiores */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-xl p-8 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-6"> <div> <p className="font-gotham font-medium text-14 opacity-90 mb-2">Saldo Total Ahorrado</p> <p className="font-gotham font-bold text-44">${totalSavings.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p> </div> <div className="bg-white bg-opacity-20 rounded-full p-4"> <PiggyBank className="w-12 h-12" /> </div> </div> <div className="flex items-center gap-2 text-14"> <TrendingUp className="w-5 h-5" /> <span className="font-gotham font-medium">+${savingsThisMonth.toLocaleString('es-MX', { minimumFractionDigits: 2 })} este mes</span> </div> </div>
                <div className="bg-white rounded-xl shadow-md p-8 border-2 border-green-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <h2 className="font-gotham font-bold text-20 text-gray-900 mb-6"> Tasa de Rendimiento Anual </h2> <div className="flex items-baseline gap-2 mb-4"> <p className="font-gotham font-bold text-48 text-green-600">{interestRate}%</p> <p className="font-gotham font-medium text-16 text-gray-600">anual</p> </div> <p className="font-gotham font-book text-14 text-gray-600"> Sin comisiones por manejo de cuenta. Rendimientos calculados diariamente y depositados mensualmente. </p> </div>
            </div>
            {/* Sección Metas de Ahorro */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4"> <h2 className="font-gotham font-bold text-24 text-gray-900"> Mis Metas de Ahorro </h2> <button onClick={handleNewGoal} className="flex items-center gap-2 bg-[#EB0029] hover:bg-[#c9022f] text-white px-4 py-2 rounded-lg font-gotham font-medium text-14 transition-colors shadow-md hover:shadow-lg"> <Plus className="w-5 h-5" /> Nueva Meta </button> </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fakeSavingsGoals.map((goal, index) => {
                     const percentage = Math.min((goal.current / goal.target) * 100, 100);
                     const remaining = Math.max(0, goal.target - goal.current);
                     const monthsRemaining = (goal.monthlyContribution > 0 && remaining > 0) ? Math.ceil(remaining / goal.monthlyContribution) : 0;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                {/* --- CAMBIO: Aumentado tamaño de imagen h-16 w-16 --- */}
                                <img src={goal.icon} alt={goal.name} className="h-16 w-16 object-contain" />
                                <Target className={`w-6 h-6 text-${goal.color}-500`} />
                            </div>
                            <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2">{goal.name}</h3>
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2"> <p className="font-gotham font-medium text-14 text-gray-600"> ${goal.current.toLocaleString()} de ${goal.target.toLocaleString()} </p> <p className="font-gotham font-bold text-14 text-gray-900"> {percentage.toFixed(0)}% </p> </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"> <div className={`${getTailwindColor(goal.color)} h-3 rounded-full transition-all duration-300`} style={{ width: `${percentage}%` }}></div> </div>
                            </div>
                            <div className="pt-4 border-t border-gray-100"> <p className="font-gotham font-book text-13 text-gray-600"> Aporte mensual: <span className="font-medium text-gray-900">${goal.monthlyContribution.toLocaleString()}</span> </p> {monthsRemaining > 0 && ( <p className="font-gotham font-book text-13 text-gray-600 mt-1"> Tiempo estimado: <span className="font-medium text-gray-900">{monthsRemaining} meses</span> </p> )} </div>
                        </div>
                    );
                    })}
                </div>
            </div>
            {/* Historial */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="font-gotham font-bold text-24 text-gray-900 mb-6"> Historial de Movimientos de Ahorro </h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                    <thead> <tr className="border-b border-gray-200"> <th className="font-gotham font-bold text-13 text-gray-700 text-left pb-4 px-2">Fecha</th> <th className="font-gotham font-bold text-13 text-gray-700 text-left pb-4 px-2">Descripción</th> <th className="font-gotham font-bold text-13 text-gray-700 text-left pb-4 px-2">Meta Asociada</th> <th className="font-gotham font-bold text-13 text-gray-700 text-right pb-4 px-2">Monto</th> </tr> </thead>
                    <tbody> {fakeSavingsHistory.map((transaction, index) => ( <tr key={index} className="border-b border-gray-100 hover:bg-gray-50"> <td className="font-gotham font-book text-14 text-gray-600 py-4 px-2">{transaction.date}</td> <td className="font-gotham font-medium text-14 text-gray-900 py-4 px-2">{transaction.description}</td> <td className="font-gotham font-book text-14 text-gray-600 py-4 px-2">{transaction.goal}</td> <td className={`font-gotham font-bold text-15 py-4 px-2 text-right ${transaction.type === 'interest' ? 'text-blue-600' : 'text-green-600'}`}> {transaction.amount} </td> </tr> ))} </tbody>
                    </table>
                </div>
                {fakeSavingsHistory.length === 0 && ( <div className="text-center py-8 text-gray-500"> <p className="font-gotham font-book text-14">No hay movimientos registrados.</p> </div> )}
            </div>
        </div>
    </div>
  );
}