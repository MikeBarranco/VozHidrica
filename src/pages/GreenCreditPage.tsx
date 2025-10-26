import { Leaf, CheckCircle, Info, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GreenCreditPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors mb-4 font-gotham font-medium text-14"
          aria-label="Volver al inicio"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
          <span className="text-gray-700">Volver</span>
        </button>

        <h1 className="font-gotham font-bold text-32 text-gray-900 mb-4">
          Crédito Verde
        </h1>
        <p className="font-gotham font-book text-16 text-gray-600 mb-8">
          Financia proyectos ecológicos con tasas preferenciales
        </p>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-4">
              <Leaf className="w-12 h-12" />
            </div>
            <div>
              <p className="font-gotham font-medium text-16 opacity-90">Tu Línea de Crédito Verde</p>
              <p className="font-gotham font-bold text-40">$20,000.00</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-gotham font-book text-14 opacity-75">Tasa de Interés</p>
              <p className="font-gotham font-bold text-20">8.5% anual</p>
            </div>
            <div>
              <p className="font-gotham font-book text-14 opacity-75">Plazo Máximo</p>
              <p className="font-gotham font-bold text-20">48 meses</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-lg">
          <div className="flex gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-gotham font-bold text-16 text-blue-900 mb-2">
                ¿Qué es el Crédito Verde?
              </h3>
              <p className="font-gotham font-book text-14 text-blue-800">
                Es un préstamo con tasa preferencial diseñado para financiar proyectos que ayudan al medio ambiente,
                como paneles solares, sistemas de recolección de agua, mejoras de eficiencia energética, y más.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-gotham font-bold text-24 text-gray-900 mb-6">
            Proyectos Elegibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Paneles Solares',
                description: 'Instalación de sistemas fotovoltaicos residenciales',
                icon: '☀️',
                amount: 'Hasta $150,000',
              },
              {
                title: 'Sistemas de Agua',
                description: 'Captación pluvial y tratamiento de aguas grises',
                icon: '💧',
                amount: 'Hasta $50,000',
              },
              {
                title: 'Eficiencia Energética',
                description: 'Aislamiento térmico, ventanas, calentadores solares',
                icon: '⚡',
                amount: 'Hasta $80,000',
              },
              {
                title: 'Movilidad Eléctrica',
                description: 'Vehículos eléctricos e híbridos, estaciones de carga',
                icon: '🚗',
                amount: 'Hasta $200,000',
              },
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="text-5xl mb-4">{project.icon}</div>
                <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="font-gotham font-book text-14 text-gray-600 mb-4">
                  {project.description}
                </p>
                <p className="font-gotham font-bold text-16 text-green-600">
                  {project.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="font-gotham font-bold text-24 text-gray-900 mb-6">
            Beneficios del Crédito Verde
          </h2>
          <div className="space-y-4">
            {[
              'Tasa de interés preferencial hasta 3 puntos por debajo del crédito tradicional',
              'Sin comisión por apertura',
              'Plazo de hasta 48 meses para pagar',
              'Bonificación del 10% en puntos de recompensa',
              'Asesoría gratuita para selección de proyectos ecológicos',
              'Proceso de aprobación express en 48 horas',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="font-gotham font-medium text-15 text-gray-700">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="w-full bg-[#EB0029] hover:bg-[#c9022f] text-white font-gotham font-bold text-16 py-4 rounded-lg transition-colors">
              Solicitar Crédito Verde
            </button>
            <p className="font-gotham font-book text-12 text-gray-500 text-center mt-4">
              La aprobación está sujeta a evaluación crediticia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
