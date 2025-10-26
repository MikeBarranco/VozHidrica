import { PiggyBank, TrendingUp, Plus, Target, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SavingsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors mb-4"
          aria-label="Volver al inicio"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <h1 className="font-gotham font-bold text-32 text-gray-900 mb-4">
          Cuenta de Ahorro
        </h1>
        <p className="font-gotham font-book text-16 text-gray-600 mb-8">
          Haz crecer tu dinero con nuestra cuenta de ahorro de alto rendimiento
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-gotham font-medium text-14 opacity-90 mb-2">Saldo Total</p>
                <p className="font-gotham font-bold text-44">$45,230.00</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <PiggyBank className="w-12 h-12" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-14">
              <TrendingUp className="w-5 h-5" />
              <span className="font-gotham font-medium">+$1,250 este mes</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border-2 border-green-500">
            <h2 className="font-gotham font-bold text-20 text-gray-900 mb-6">
              Tasa de Interés
            </h2>
            <div className="flex items-baseline gap-2 mb-4">
              <p className="font-gotham font-bold text-48 text-green-600">4.5%</p>
              <p className="font-gotham font-medium text-16 text-gray-600">anual</p>
            </div>
            <p className="font-gotham font-book text-14 text-gray-600">
              Sin comisiones por manejo de cuenta. Rendimientos calculados diariamente.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-gotham font-bold text-24 text-gray-900">
              Metas de Ahorro
            </h2>
            <button className="flex items-center gap-2 bg-[#EB0029] hover:bg-[#c9022f] text-white px-4 py-2 rounded-lg font-gotham font-medium text-14 transition-colors">
              <Plus className="w-5 h-5" />
              Nueva Meta
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Vacaciones',
                current: 7500,
                target: 10000,
                icon: '🏖️',
                color: 'blue',
                monthlyContribution: 500,
              },
              {
                name: 'Fondo de Emergencia',
                current: 9000,
                target: 20000,
                icon: '🛡️',
                color: 'green',
                monthlyContribution: 1000,
              },
              {
                name: 'Auto Nuevo',
                current: 10000,
                target: 50000,
                icon: '🚗',
                color: 'red',
                monthlyContribution: 2000,
              },
            ].map((goal, index) => {
              const percentage = (goal.current / goal.target) * 100;
              const remaining = goal.target - goal.current;
              const monthsRemaining = Math.ceil(remaining / goal.monthlyContribution);

              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{goal.icon}</div>
                    <Target className={`w-6 h-6 text-${goal.color}-500`} />
                  </div>
                  <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2">
                    {goal.name}
                  </h3>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-gotham font-medium text-14 text-gray-600">
                        ${goal.current.toLocaleString()} de ${goal.target.toLocaleString()}
                      </p>
                      <p className="font-gotham font-bold text-14 text-gray-900">
                        {percentage.toFixed(0)}%
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-${goal.color}-500 h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-gotham font-book text-13 text-gray-600">
                      Aporte mensual: <span className="font-medium text-gray-900">${goal.monthlyContribution}</span>
                    </p>
                    <p className="font-gotham font-book text-13 text-gray-600 mt-1">
                      Tiempo estimado: <span className="font-medium text-gray-900">{monthsRemaining} meses</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="font-gotham font-bold text-24 text-gray-900 mb-6">
            Historial de Movimientos
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="font-gotham font-bold text-13 text-gray-700 text-left pb-4">Fecha</th>
                  <th className="font-gotham font-bold text-13 text-gray-700 text-left pb-4">Descripción</th>
                  <th className="font-gotham font-bold text-13 text-gray-700 text-left pb-4">Meta</th>
                  <th className="font-gotham font-bold text-13 text-gray-700 text-right pb-4">Monto</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '25 Oct 2025', description: 'Depósito Automático', goal: 'Vacaciones', amount: '+$500.00', type: 'deposit' },
                  { date: '25 Oct 2025', description: 'Depósito Automático', goal: 'Fondo de Emergencia', amount: '+$1,000.00', type: 'deposit' },
                  { date: '24 Oct 2025', description: 'Intereses', goal: 'General', amount: '+$12.50', type: 'interest' },
                  { date: '20 Oct 2025', description: 'Depósito Manual', goal: 'Auto Nuevo', amount: '+$2,000.00', type: 'deposit' },
                  { date: '18 Oct 2025', description: 'Depósito Automático', goal: 'Vacaciones', amount: '+$500.00', type: 'deposit' },
                ].map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="font-gotham font-book text-14 text-gray-600 py-4">{transaction.date}</td>
                    <td className="font-gotham font-medium text-14 text-gray-900 py-4">{transaction.description}</td>
                    <td className="font-gotham font-book text-14 text-gray-600 py-4">{transaction.goal}</td>
                    <td className={`font-gotham font-bold text-15 py-4 text-right ${
                      transaction.type === 'interest' ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
