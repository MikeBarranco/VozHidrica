import { useState, useEffect } from 'react'; // useEffect añadido si quieres usar animaciones con retraso
import { useNavigate } from 'react-router-dom';
import { Droplet, History, ChevronDown, ChevronUp, ArrowLeft, Info, CheckCircle, Target, Trophy } from 'lucide-react'; // Añadidos iconos
// --- BYPASS ---
// Usamos el useAuth del bypass (solo para simular que existe un user)
import { useAuth } from '../contexts/AuthContext';
// Importamos Header
import Header from '../components/Header';
// --- BYPASS ---
// Eliminamos la importación de generateSampleWaterData
// import { generateSampleWaterData } from '../utils/sampleDataGenerator';

export default function WaterCampaignPage() {
  const navigate = useNavigate();
  const [showProblem, setShowProblem] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMeterPopup, setShowMeterPopup] = useState(false);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-cyan-50"> {/* Quitado min-h-screen */}
        {/* Usamos el Header */}
        <Header />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen"> {/* Añadido min-h-screen */}
            {/* Botón Volver */}
            <div className="flex justify-start mb-6">
                 <button onClick={() => navigate('/home')} className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors font-gotham font-medium text-14" aria-label="Volver al inicio"> <ArrowLeft className="w-6 h-6 text-gray-700" /> <span className="text-gray-700">Volver</span> </button>
             </div>

            {/* Encabezado Principal */}
            <div className="text-center mb-12">
             <div className="inline-block bg-white rounded-full p-6 shadow-xl mb-6 transform transition hover:scale-110 duration-300"> {/* Animación */}
                 <Droplet className="w-20 h-20 text-cyan-500" />
             </div>
             <h1 className="font-gotham font-bold text-40 md:text-52 text-gray-900 mb-4 animate-slideInUp">
                 Voz Hídrica
             </h1>
             <p className="font-gotham font-medium text-20 md:text-24 text-gray-700 mb-8 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                 Juntos por un Futuro Sostenible
             </p>
             <p className="font-gotham font-book text-16 md:text-18 text-gray-600 max-w-3xl mx-auto animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                 Únete a nuestro movimiento para reducir el consumo de agua y crear hábitos sostenibles. Cada gota cuenta, y con Banorte, cada acción es recompensada.
             </p>
            </div>

            {/* Secciones Desplegables con animación */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Problemática */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <button onClick={() => setShowProblem(!showProblem)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4"> <div className="bg-red-100 rounded-full p-3"> <Info className="w-8 h-8 text-red-600" /> </div> <h2 className="font-gotham font-bold text-20 text-gray-900"> La Problemática del Agua </h2> </div> {showProblem ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}
                    </button>
                    {showProblem && ( <div className="p-6 pt-0 border-t border-gray-100 animate-fadeIn"> <div className="space-y-4 font-gotham font-book text-15 text-gray-700"> <p> <strong className="font-bold text-red-600">El agua es un recurso limitado y esencial.</strong> La creciente demanda y el cambio climático amenazan su disponibilidad. </p> <div className="bg-red-50 p-4 rounded-lg border border-red-100"> <h3 className="font-bold text-16 text-red-800 mb-2">Datos Clave en México:</h3> <ul className="list-disc list-inside space-y-2 text-14"> <li>Gran parte del país experimenta estrés hídrico alto.</li> <li>La agricultura consume la mayor parte del agua dulce.</li> <li>Millones carecen de acceso seguro a agua potable.</li> <li>Infraestructura obsoleta causa grandes pérdidas por fugas.</li> </ul> </div> <p> <strong>Tu participación es crucial.</strong> Adoptar hábitos de consumo responsable contribuye significativamente a la conservación de este recurso vital. </p> </div> </div> )}
                </div>

                 {/* Banorte y Sustentabilidad */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <button onClick={() => setShowHistory(!showHistory)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4"> <div className="bg-[#EB0029] bg-opacity-10 rounded-full p-3"> <History className="w-8 h-8 text-[#EB0029]" /> </div> <h2 className="font-gotham font-bold text-20 text-gray-900"> Banorte y la Sustentabilidad </h2> </div> {showHistory ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}
                    </button>
                    {showHistory && ( <div className="p-6 pt-0 border-t border-gray-100 animate-fadeIn"> <div className="space-y-4 font-gotham font-book text-15 text-gray-700"> <p> <strong className="font-bold text-[#EB0029]">Banorte</strong> integra la sustentabilidad en su estrategia de negocio, impulsando un futuro más verde y equitativo. </p> <div className="bg-green-50 p-4 rounded-lg border border-green-100"> <h3 className="font-bold text-16 text-green-800 mb-2">Acciones Destacadas:</h3> <ul className="list-disc list-inside space-y-2 text-14"> <li>Pioneros en ser carbono neutral en la banca mexicana.</li> <li>Fuerte inversión en financiamiento de proyectos sostenibles.</li> <li>Reducción significativa del consumo de recursos en operaciones.</li> <li>Programas de educación financiera y ambiental.</li> </ul> </div> <p> <strong>Voz Hídrica</strong> es una extensión de este compromiso, empoderando a nuestros clientes para ser agentes de cambio positivo a través de la tecnología y la gamificación. </p> </div> </div> )}
                </div>
            </div>

            {/* Llamada a la acción con animación */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center transition-all duration-300 hover:shadow-inner hover:scale-[1.02]">
                <h2 className="font-gotham font-bold text-32 md:text-40 mb-4 animate-pulse-glow"> ¡Gana Salvando al Planeta! </h2>
                <p className="font-gotham font-medium text-18 md:text-20 mb-8 max-w-2xl mx-auto"> Registra tu medidor de agua, reduce tu consumo, forma buenos hábitos y gana eco-puntos Banorte. ¡Convierte tu compromiso en recompensas! </p>
                <button onClick={() => setShowMeterPopup(true)} className="bg-white text-cyan-600 font-gotham font-bold text-18 px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"> Comenzar Ahora </button>
                <p className="font-gotham font-book text-14 mt-4 opacity-90"> Solo te tomará 1 minuto registrarte </p>
            </div>

            {/* Sección Cómo Funciona con animación */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="text-5xl mb-4">💧</div> <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2"> Monitorea tu Consumo </h3> <p className="font-gotham font-book text-14 text-gray-600"> Visualiza tus estadísticas de consumo de agua en tiempo real </p> </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="text-5xl mb-4">🎯</div> <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2"> Forma Hábitos Sostenibles </h3> <p className="font-gotham font-book text-14 text-gray-600"> Recibe sugerencias personalizadas para reducir tu consumo </p> </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"> <div className="text-5xl mb-4">🏆</div> <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2"> Gana Recompensas </h3> <p className="font-gotham font-book text-14 text-gray-600"> Acumula eco-puntos Banorte por mantener buenos hábitos </p> </div>
            </div>
        </div>

        {/* El Popup ahora usa el bypass */}
        {showMeterPopup && (
            <WaterMeterPopup onClose={() => setShowMeterPopup(false)} />
        )}
    </div>
  );
}

// --- *** COMPONENTE POPUP MODIFICADO (BYPASS) *** ---
function WaterMeterPopup({ onClose }: { onClose: () => void }) {
  const [meterNumber, setMeterNumber] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  // Usamos useAuth solo para simular que existe 'user'
  const { user } = useAuth();
  // Definimos un ID falso si 'user' es null (por el bypass)
  const fakeUserId = user?.id || 'fake-user-123';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!meterNumber || meterNumber.length < 6) {
      setError('Por favor ingresa un número de medidor válido (mínimo 6 dígitos)');
      return;
    }

    setIsSubmitting(true);

    // 1. Simula espera
    console.log(`BYPASS: Registrando medidor ${meterNumber} para usuario ${fakeUserId}`);
    // Ya no llamamos a generateSampleWaterData
    // if (user) { await generateSampleWaterData(user.id); }
    await new Promise(resolve => setTimeout(resolve, 1500)); // Espera 1.5 seg

    // 2. Navega al dashboard de agua
    navigate('/water-dashboard');

    // No necesitamos setIsSubmitting(false)
  };

  return (
    // El JSX del popup sigue igual, solo cambia la lógica de handleSubmit
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"> {/* Added backdrop-blur */}
       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleIn">
         <div className="text-center mb-6"> <div className="inline-block bg-cyan-100 rounded-full p-4 mb-4"> <Droplet className="w-12 h-12 text-cyan-600" /> </div> <h2 className="font-gotham font-bold text-24 text-gray-900 mb-2"> Registra tu Medidor </h2> <p className="font-gotham font-book text-14 text-gray-600"> Ingresa el número de tu medidor de agua para comenzar a rastrear tu consumo </p> </div>
         <form onSubmit={handleSubmit} className="space-y-6">
           <div> <label className="block font-gotham font-medium text-14 text-gray-700 mb-2"> Número de Medidor </label> <input type="text" value={meterNumber} onChange={(e) => setMeterNumber(e.target.value.replace(/\D/g, ''))} placeholder="123456789" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-gotham font-book text-16 focus:outline-none focus:border-cyan-500 transition-colors" maxLength={15} /> {error && ( <p className="mt-2 font-gotham font-book text-12 text-red-600">{error}</p> )} <p className="mt-2 font-gotham font-book text-12 text-gray-500"> Puedes encontrar este número en tu recibo de agua o en el propio medidor. </p> </div>
           <div className="flex gap-3 pt-2"> {/* Added pt-2 */} <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-gotham font-bold text-16 rounded-lg hover:bg-gray-50 transition-colors" disabled={isSubmitting}> Cancelar </button> <button type="submit" className="flex-1 px-6 py-3 bg-cyan-600 text-white font-gotham font-bold text-16 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50" disabled={isSubmitting}> {isSubmitting ? 'Guardando...' : 'Continuar'} </button> </div>
         </form>
       </div>
     </div>
  );
}
// --- *** FIN COMPONENTE POPUP MODIFICADO *** ---