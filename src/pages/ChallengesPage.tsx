import { useState } from 'react';
import { ArrowLeft, Trophy, Calendar, Target, CheckCircle, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Importamos el Header reutilizable
import Header from '../components/Header';

export default function ChallengesPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'available' | 'active' | 'completed'>('active');

  // --- DATOS FALSOS (ya los teníamos) ---
  const loading = false;
  const fakeAvailableChallenges = [ { id: 'avail1', title: 'Reto de Ahorro Semanal', description: 'Reduce tu consumo de agua en un 10% esta semana.', icon: '/images/challenges/weekly-challenge.png', challenge_type: 'weekly', start_date: '2025-10-27', end_date: '2025-11-02', target_value: 10, reward_points: 150, }, { id: 'avail2', title: 'Desafío Comunitario Verde', description: 'Participa con tu comunidad para plantar 50 árboles.', icon: '/images/challenges/community-challenge.png', challenge_type: 'community', start_date: '2025-11-01', end_date: '2025-11-30', target_value: 100, reward_points: 500, }, ];
  const fakeActiveChallenges = [ { id: 'active1', userChallengeId: 'uc1', challenge: { id: 'c1', title: 'Reto Mensual de Duchas Cortas', description: 'Limita tus duchas a 5 minutos durante todo el mes.', icon: '/images/challenges/monthly-challenge.png', challenge_type: 'monthly', target_value: 100, reward_points: 300, }, progress: 75, }, ];
  const fakeCompletedChallenges = [ { id: 'comp1', userChallengeId: 'uc2', challenge: { id: 'c2', title: 'Reto "Cero Fugas"', description: 'Revisa y repara todas las fugas de agua en casa.', icon: '/images/challenges/water-challenge.png', challenge_type: 'special', reward_points: 200, }, completed_at: '2025-10-15', progress: 100, }, ];
  const availableChallenges = fakeAvailableChallenges;
  const activeChallenges = fakeActiveChallenges;
  const completedChallenges = fakeCompletedChallenges;
  
  const handleJoinChallenge = async (challengeId: string) => { console.log(`BYPASS: Intentando unirse al reto ${challengeId}`); alert('¡Te has unido al reto! (Modo Demo)'); setSelectedTab('active'); };
  const getChallengeTypeColor = (type: string) => { switch (type) { case 'weekly': return 'bg-blue-100 text-blue-800'; case 'monthly': return 'bg-orange-100 text-orange-800'; case 'seasonal': return 'bg-purple-100 text-purple-800'; case 'community': return 'bg-green-100 text-green-800'; case 'special': return 'bg-yellow-100 text-yellow-800'; default: return 'bg-gray-100 text-gray-800'; } };
  const getChallengeTypeLabel = (type: string) => { switch (type) { case 'weekly': return 'Semanal'; case 'monthly': return 'Mensual'; case 'seasonal': return 'Temporada'; case 'community': return 'Comunitario'; case 'special': return 'Especial'; default: return type; } };
  const formatDate = (dateString: string) => { try { return new Date(dateString).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }); } catch (e) { return "Fecha inválida"; } };

  // Ya no necesitamos esto si 'loading' siempre es false
  // if (loading) { ... }

  return (
    // Quitamos min-h-screen de aquí
    <div className="bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Añadimos el Header reutilizable */}
      <Header />

      {/* Contenido principal de la página */}
      <div className="max-w-7xl mx-auto p-6 min-h-screen"> {/* Añadido min-h-screen */}

        {/* --- CAMBIO: Botón Volver ahora está aquí, a la izquierda --- */}
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

        {/* El resto del contenido de Retos */}
        <div className="mb-8">
           <h1 className="font-gotham font-bold text-36 md:text-44 text-gray-900 mb-3">
             Retos y Desafíos
           </h1>
           <p className="font-gotham font-book text-16 md:text-18 text-gray-600 max-w-3xl">
             Participa en desafíos de ahorro de agua y gana eco-puntos. ¡Compite con otros usuarios!
           </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 text-gray-600">Retos Activos</h3> <Target className="w-5 h-5 text-blue-500" /> </div> <p className="font-gotham font-bold text-32 text-gray-900">{activeChallenges.length}</p> <p className="font-gotham font-book text-12 text-gray-500 mt-1">En progreso</p> </div>
           <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 opacity-90">Completados</h3> <CheckCircle className="w-5 h-5" /> </div> <p className="font-gotham font-bold text-32">{completedChallenges.length}</p> <p className="font-gotham font-book text-12 opacity-75 mt-1">Retos logrados</p> </div>
           <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 opacity-90">Disponibles</h3> <Trophy className="w-5 h-5" /> </div> <p className="font-gotham font-bold text-32">{availableChallenges.length}</p> <p className="font-gotham font-book text-12 opacity-75 mt-1">Únete ahora</p> </div>
         </div>
         <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
           <button onClick={() => setSelectedTab('active')} className={`px-6 py-3 rounded-lg font-gotham font-bold text-14 whitespace-nowrap transition-all ${selectedTab === 'active' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}> En Progreso ({activeChallenges.length}) </button>
           <button onClick={() => setSelectedTab('available')} className={`px-6 py-3 rounded-lg font-gotham font-bold text-14 whitespace-nowrap transition-all ${selectedTab === 'available' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}> Disponibles ({availableChallenges.length}) </button>
           <button onClick={() => setSelectedTab('completed')} className={`px-6 py-3 rounded-lg font-gotham font-bold text-14 whitespace-nowrap transition-all ${selectedTab === 'completed' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}> Completados ({completedChallenges.length}) </button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {selectedTab === 'available' && availableChallenges.map((challenge) => ( <div key={challenge.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"> <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden"> <img src={challenge.icon} alt={challenge.title} className="w-full h-full object-cover" /> </div> <div className="p-6"> <span className={`inline-block px-3 py-1 rounded-full text-11 font-gotham font-bold ${getChallengeTypeColor(challenge.challenge_type)} mb-3`}>{getChallengeTypeLabel(challenge.challenge_type)}</span> <h3 className="font-gotham font-bold text-20 text-gray-900 mb-3">{challenge.title}</h3> <p className="font-gotham font-book text-14 text-gray-600 mb-4">{challenge.description}</p> <div className="flex items-center justify-between mb-4 text-gray-500"> <div className="flex items-center gap-2"> <Calendar className="w-4 h-4" /> <span className="font-gotham font-book text-12">{formatDate(challenge.start_date)} - {formatDate(challenge.end_date)}</span> </div> </div> <div className="flex items-center justify-between mb-4"> <div className="flex items-center gap-2"> <Target className="w-5 h-5 text-cyan-600" /> <span className="font-gotham font-bold text-14 text-gray-900">{challenge.target_value}% Reducción</span> </div> <div className="flex items-center gap-2"> <Award className="w-5 h-5 text-orange-500" /> <span className="font-gotham font-bold text-16 text-orange-600">{challenge.reward_points} pts</span> </div> </div> <button onClick={() => handleJoinChallenge(challenge.id)} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all font-gotham font-bold text-14 shadow-md hover:shadow-lg"> Unirse al Reto </button> </div> </div> ))}
           {selectedTab === 'active' && activeChallenges.map((userChallenge) => { const challenge = userChallenge.challenge; if (!challenge) return null; return ( <div key={userChallenge.userChallengeId} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-500 hover:-translate-y-1 transition-transform duration-300"> <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden"> <img src={challenge.icon} alt={challenge.title} className="w-full h-full object-cover" /> </div> <div className="p-6"> <span className={`inline-block px-3 py-1 rounded-full text-11 font-gotham font-bold ${getChallengeTypeColor(challenge.challenge_type)} mb-3`}>{getChallengeTypeLabel(challenge.challenge_type)}</span> <h3 className="font-gotham font-bold text-20 text-gray-900 mb-3">{challenge.title}</h3> <p className="font-gotham font-book text-14 text-gray-600 mb-4">{challenge.description}</p> <div className="mb-4"> <div className="flex items-center justify-between mb-2"> <span className="font-gotham font-medium text-14 text-gray-700">Progreso</span> <span className="font-gotham font-bold text-14 text-blue-600">{userChallenge.progress.toFixed(0)}%</span> </div> <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"> <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500" style={{ width: `${Math.min(userChallenge.progress, 100)}%` }} ></div> </div> </div> <div className="flex items-center justify-between"> <div className="flex items-center gap-2 text-gray-500"> <Target className="w-5 h-5 text-cyan-600" /> <span className="font-gotham font-bold text-14">{challenge.target_value}% Meta</span> </div> <div className="flex items-center gap-2"> <Award className="w-5 h-5 text-orange-500" /> <span className="font-gotham font-bold text-16 text-orange-600">{challenge.reward_points} pts</span> </div> </div> </div> </div> ); })}
           {selectedTab === 'completed' && completedChallenges.map((userChallenge) => { const challenge = userChallenge.challenge; if (!challenge) return null; return ( <div key={userChallenge.userChallengeId} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-500 hover:-translate-y-1 transition-transform duration-300 opacity-80 hover:opacity-100"> <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden relative"> <img src={challenge.icon} alt={challenge.title} className="w-full h-full object-cover" /> <div className="absolute top-3 right-3 bg-green-600 text-white p-2 rounded-full shadow-lg"> <CheckCircle className="w-6 h-6" /> </div> </div> <div className="p-6"> <span className={`inline-block px-3 py-1 rounded-full text-11 font-gotham font-bold ${getChallengeTypeColor(challenge.challenge_type)} mb-3`}>{getChallengeTypeLabel(challenge.challenge_type)}</span> <h3 className="font-gotham font-bold text-20 text-gray-900 mb-3">{challenge.title}</h3> <p className="font-gotham font-book text-14 text-gray-600 mb-4">{challenge.description}</p> <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4"> <p className="font-gotham font-bold text-14 text-green-900 mb-1">¡Completado!</p> <p className="font-gotham font-book text-12 text-green-700"> {userChallenge.completed_at && `Logrado el ${formatDate(userChallenge.completed_at)}`} </p> </div> <div className="flex items-center justify-center"> <div className="flex items-center gap-2"> <Award className="w-6 h-6 text-orange-500" /> <span className="font-gotham font-bold text-18 text-orange-600">+{challenge.reward_points} puntos ganados</span> </div> </div> </div> </div> ); })}
         </div>
         {((selectedTab === 'available' && availableChallenges.length === 0) || (selectedTab === 'active' && activeChallenges.length === 0) || (selectedTab === 'completed' && completedChallenges.length === 0)) && ( <div className="bg-white rounded-xl shadow-lg p-12 text-center"> <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" /> <p className="font-gotham font-medium text-18 text-gray-600"> {selectedTab === 'available' && 'No hay retos disponibles en este momento'} {selectedTab === 'active' && 'No tienes retos activos. ¡Únete a uno disponible!'} {selectedTab === 'completed' && 'Aún no has completado ningún reto. ¡Comienza ahora!'} </p> </div> )}

      </div> {/* Cierre del div principal de contenido */}
    </div> // Cierre del div raíz
  );
}