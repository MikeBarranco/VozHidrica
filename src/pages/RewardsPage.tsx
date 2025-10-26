import { Gift, Star, Trophy, Award, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Asegúrate que la ruta sea correcta

export default function RewardsPage() {
  const navigate = useNavigate();

  const ecoPoints = 1250;
  const pointsThisMonth = 250;

  const fakeRewards = [
    { name: 'Descuento 10% Servicios de Agua', points: 500, image: '/images/rewards/water-savings.png', available: true },
    { name: 'Cashback $100 MXN', points: 1000, image: '/images/rewards/cashback.png', available: true },
    { name: 'Tarjeta de Regalo Amazon $200', points: 2000, image: '/images/rewards/gift-card.png', available: true },
    { name: 'Descuento 20% en Paneles Solares', points: 1500, image: '/images/rewards/solar-discount.png', available: true },
    { name: 'Bono de Ahorro $500 MXN', points: 3000, image: '/images/rewards/cashback.png', available: false },
    { name: 'Donación a Causa Ecológica', points: 250, image: '/images/rewards/water-savings.png', available: false },
  ];

  const handleRedeem = (rewardName: string, points: number) => {
      alert(`¡Has canjeado "${rewardName}" por ${points} puntos! (Modo Demo)`);
      console.log(`BYPASS: Canjeando ${rewardName}`);
  };

  return (
    <div className="bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <div className="flex justify-start mb-4">
                <button onClick={() => navigate('/home')} className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors font-gotham font-medium text-14" aria-label="Volver al inicio"> <ArrowLeft className="w-6 h-6 text-gray-700" /> <span className="text-gray-700">Volver</span> </button>
            </div>
            <h1 className="font-gotham font-bold text-32 text-gray-900 mb-4"> Recompensas Eco-Puntos </h1>
            <p className="font-gotham font-book text-16 text-gray-600 mb-8"> Gana puntos por tus acciones sostenibles y canjéalos por beneficios exclusivos. </p>
            <div className="bg-gradient-to-r from-[#EB0029] to-[#c9022f] rounded-xl shadow-xl p-8 mb-8 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="flex items-center justify-between">
                <div>
                    <p className="font-gotham font-medium text-16 opacity-90 mb-2">Tus Puntos Disponibles</p>
                    <p className="font-gotham font-bold text-48">{ecoPoints.toLocaleString()}</p>
                    <p className="font-gotham font-book text-14 opacity-75 mt-2">+{pointsThisMonth} puntos este mes</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-6"> <Trophy className="w-16 h-16" /> </div>
                </div>
            </div>
            <div className="mb-8">
                <h2 className="font-gotham font-bold text-24 text-gray-900 mb-4"> Cómo Ganar Puntos </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> <Star className="w-8 h-8 text-blue-600" /> </div> <h3 className="font-gotham font-bold text-16 text-gray-900 mb-2">Ahorro de Agua</h3> <p className="font-gotham font-book text-13 text-gray-600 mb-3"> Reduce tu consumo mensual </p> <p className="font-gotham font-bold text-20 text-blue-600">+50 pts</p> </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> <Award className="w-8 h-8 text-green-600" /> </div> <h3 className="font-gotham font-bold text-16 text-gray-900 mb-2">Crédito Verde</h3> <p className="font-gotham font-book text-13 text-gray-600 mb-3"> Liquida tu crédito </p> <p className="font-gotham font-bold text-20 text-green-600">+10% Bonificación</p> </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> <Gift className="w-8 h-8 text-cyan-600" /> </div> <h3 className="font-gotham font-bold text-16 text-gray-900 mb-2">Retos Completados</h3> <p className="font-gotham font-book text-13 text-gray-600 mb-3"> Supera desafíos </p> <p className="font-gotham font-bold text-20 text-cyan-600">Varía</p> </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> <Trophy className="w-8 h-8 text-orange-600" /> </div> <h3 className="font-gotham font-bold text-16 text-gray-900 mb-2">Educación Financiera</h3> <p className="font-gotham font-book text-13 text-gray-600 mb-3"> Completa módulos </p> <p className="font-gotham font-bold text-20 text-orange-600">Varía</p> </div>
                </div>
            </div>
            <div>
                <h2 className="font-gotham font-bold text-24 text-gray-900 mb-4"> Catálogo de Recompensas </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fakeRewards.map((reward, index) => (
                    <div key={index} className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${!reward.available ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'}`}>
                        {/* --- CAMBIO EN IMAGEN --- */}
                        {/* Cambiado object-contain a object-cover y quitado padding */}
                        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img src={reward.image} alt={reward.name} className="w-full h-full object-cover"/>
                        </div>
                        {/* --- FIN CAMBIO --- */}
                        <div className="p-6">
                            <h3 className="font-gotham font-bold text-16 text-gray-900 mb-2 min-h-[3em]">
                                {reward.name}
                            </h3>
                            <div className="flex items-center justify-between mt-4">
                                <p className="font-gotham font-bold text-18 text-[#EB0029]">
                                {reward.points.toLocaleString()} puntos
                                </p>
                                <button onClick={() => reward.available && handleRedeem(reward.name, reward.points)} disabled={!reward.available} className={`px-4 py-2 rounded-lg font-gotham font-medium text-14 transition-colors ${ reward.available ? 'bg-[#EB0029] text-white hover:bg-[#c9022f]' : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}>
                                    {reward.available ? 'Canjear' : 'Agotado'}
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