import { useState } from 'react';
import { Droplet, History, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateSampleWaterData } from '../utils/sampleDataGenerator';

export default function WaterCampaignPage() {
  const navigate = useNavigate();
  const [showProblem, setShowProblem] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMeterPopup, setShowMeterPopup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors mb-6 font-gotham font-medium text-14"
          aria-label="Volver al inicio"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
          <span className="text-gray-700">Volver</span>
        </button>

        <div className="text-center mb-12">
          <div className="inline-block bg-white rounded-full p-6 shadow-xl mb-6">
            <Droplet className="w-20 h-20 text-cyan-500" />
          </div>
          <h1 className="font-gotham font-bold text-40 md:text-52 text-gray-900 mb-4">
            Voz Hídrica
          </h1>
          <p className="font-gotham font-medium text-20 md:text-24 text-gray-700 mb-8">
            Juntos por un Futuro Sostenible
          </p>
          <p className="font-gotham font-book text-16 md:text-18 text-gray-600 max-w-3xl mx-auto">
            Únete a nuestro movimiento para reducir el consumo de agua y crear hábitos sostenibles.
            Cada gota cuenta, y con Banorte, cada acción es recompensada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => setShowProblem(!showProblem)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-100 rounded-full p-3">
                  <Droplet className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="font-gotham font-bold text-20 text-gray-900">
                  La Problemática del Agua
                </h2>
              </div>
              {showProblem ? (
                <ChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </button>
            {showProblem && (
              <div className="p-6 pt-0 border-t border-gray-100 animate-fadeIn">
                <div className="space-y-4 font-gotham font-book text-15 text-gray-700">
                  <p>
                    <strong className="font-bold text-red-600">El agua es un recurso limitado.</strong> Según la ONU,
                    para 2025, dos tercios de la población mundial podría enfrentar escasez de agua.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-bold text-16 text-red-800 mb-2">Datos Alarmantes:</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>México es uno de los países con mayor estrés hídrico</li>
                      <li>El 70% del agua se usa en agricultura</li>
                      <li>Más de 10 millones de mexicanos carecen de acceso a agua potable</li>
                      <li>Las ciudades pierden hasta 40% del agua por fugas</li>
                    </ul>
                  </div>
                  <p>
                    <strong>Cada persona puede marcar la diferencia.</strong> Pequeños cambios en nuestros hábitos
                    diarios pueden generar un impacto significativo en la conservación del agua.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-[#EB0029] bg-opacity-10 rounded-full p-3">
                  <History className="w-8 h-8 text-[#EB0029]" />
                </div>
                <h2 className="font-gotham font-bold text-20 text-gray-900">
                  Banorte y la Sustentabilidad
                </h2>
              </div>
              {showHistory ? (
                <ChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </button>
            {showHistory && (
              <div className="p-6 pt-0 border-t border-gray-100 animate-fadeIn">
                <div className="space-y-4 font-gotham font-book text-15 text-gray-700">
                  <p>
                    <strong className="font-bold text-[#EB0029]">Banorte</strong>, como líder en la industria bancaria
                    mexicana, ha demostrado un compromiso inquebrantable con la sustentabilidad y el cuidado del medio ambiente.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-16 text-green-800 mb-2">Nuestro Compromiso:</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Primera institución financiera carbono neutral en México</li>
                      <li>Financiamiento de $50 mil millones para proyectos sostenibles</li>
                      <li>Reducción del 30% en consumo de agua en nuestras oficinas</li>
                      <li>Educación ambiental a más de 100,000 personas</li>
                    </ul>
                  </div>
                  <p>
                    Con <strong>Voz Hídrica</strong>, llevamos nuestro compromiso directamente a tu hogar,
                    ayudándote a crear hábitos sostenibles mientras te recompensamos por tu esfuerzo.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h2 className="font-gotham font-bold text-32 md:text-40 mb-4">
            ¡Gana Salvando al Mundo!
          </h2>
          <p className="font-gotham font-medium text-18 md:text-20 mb-8 max-w-2xl mx-auto">
            Registra tu medidor de agua, reduce tu consumo, forma buenos hábitos y gana puntos Banorte.
            ¡Convierte tu compromiso con el planeta en recompensas!
          </p>
          <button
            onClick={() => setShowMeterPopup(true)}
            className="bg-white text-cyan-600 font-gotham font-bold text-18 px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Comenzar Ahora
          </button>
          <p className="font-gotham font-book text-14 mt-4 opacity-90">
            Solo te tomará 1 minuto registrarte
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-5xl mb-4">💧</div>
            <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2">
              Monitorea tu Consumo
            </h3>
            <p className="font-gotham font-book text-14 text-gray-600">
              Visualiza tus estadísticas de consumo de agua en tiempo real
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2">
              Forma Hábitos Sostenibles
            </h3>
            <p className="font-gotham font-book text-14 text-gray-600">
              Recibe sugerencias personalizadas para reducir tu consumo
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2">
              Gana Recompensas
            </h3>
            <p className="font-gotham font-book text-14 text-gray-600">
              Acumula puntos Banorte por mantener buenos hábitos
            </p>
          </div>
        </div>
      </div>

      {showMeterPopup && (
        <WaterMeterPopup onClose={() => setShowMeterPopup(false)} />
      )}
    </div>
  );
}

function WaterMeterPopup({ onClose }: { onClose: () => void }) {
  const [meterNumber, setMeterNumber] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!meterNumber || meterNumber.length < 6) {
      setError('Por favor ingresa un número de medidor válido (mínimo 6 dígitos)');
      return;
    }

    setIsSubmitting(true);

    if (user) {
      await generateSampleWaterData(user.id);
    }

    navigate('/water-dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleIn">
        <div className="text-center mb-6">
          <div className="inline-block bg-cyan-100 rounded-full p-4 mb-4">
            <Droplet className="w-12 h-12 text-cyan-600" />
          </div>
          <h2 className="font-gotham font-bold text-24 text-gray-900 mb-2">
            Registra tu Medidor
          </h2>
          <p className="font-gotham font-book text-14 text-gray-600">
            Ingresa el número de tu medidor de agua para comenzar a rastrear tu consumo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-gotham font-medium text-14 text-gray-700 mb-2">
              Número de Medidor
            </label>
            <input
              type="text"
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="123456789"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-gotham font-book text-16 focus:outline-none focus:border-cyan-500 transition-colors"
              maxLength={15}
            />
            {error && (
              <p className="mt-2 font-gotham font-book text-12 text-red-600">{error}</p>
            )}
            <p className="mt-2 font-gotham font-book text-12 text-gray-500">
              Puedes encontrar este número en tu recibo de agua
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-gotham font-bold text-16 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-cyan-600 text-white font-gotham font-bold text-16 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Continuar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
