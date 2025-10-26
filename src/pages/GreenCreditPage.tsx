import { Leaf, CheckCircle, Info, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Asegúrate que la ruta sea correcta

export default function GreenCreditPage() {
  const navigate = useNavigate();

  const creditLimit = 20000;
  const interestRate = 12.5;
  const maxTerm = 48;

  const eligibleProjects = [
    { title: 'Paneles Solares', description: 'Instalación de sistemas fotovoltaicos residenciales', icon: '/images/green-credit/solar-panels.png', amount: 'Hasta $150,000' },
    { title: 'Sistemas de Agua', description: 'Captación pluvial y tratamiento de aguas grises', icon: '/images/green-credit/water-system.png', amount: 'Hasta $45,000' },
    { title: 'Eficiencia Energética', description: 'Aislamiento térmico, ventanas, calentadores solares', icon: '/images/green-credit/energy-efficiency.png', amount: 'Hasta $75,000' },
    { title: 'Movilidad Eléctrica', description: 'Bicicletas eléctricas, scooters, cargadores domésticos', icon: '/images/green-credit/electric-car.png', amount: 'Hasta $60,000' },
  ];
  const benefits = [ `Tasa de interés preferencial (${interestRate}% anual)`, 'Sin comisión por apertura', `Plazo de hasta ${maxTerm} meses para pagar`, 'Bonificación en eco-puntos al liquidar', 'Asesoría para proyectos ecológicos', 'Proceso de aprobación ágil (sujeto a evaluación)', ];

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto p-6 min-h-screen">
        <div className="flex justify-start mb-4"> <button onClick={() => navigate('/home')} className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors font-gotham font-medium text-14" aria-label="Volver al inicio"> <ArrowLeft className="w-6 h-6 text-gray-700" /> <span className="text-gray-700">Volver</span> </button> </div>
        <h1 className="font-gotham font-bold text-32 text-gray-900 mb-4"> Crédito Verde Banorte </h1>
        <p className="font-gotham font-book text-16 text-gray-600 mb-8"> Financia tus proyectos sostenibles con condiciones preferenciales y ayuda al planeta. </p>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-xl p-8 mb-8 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"> <div className="flex items-center gap-4 mb-6"> <div className="bg-white bg-opacity-20 rounded-full p-4"> <Leaf className="w-12 h-12" /> </div> <div> <p className="font-gotham font-medium text-16 opacity-90">Tu Línea de Crédito Verde Disponible</p> <p className="font-gotham font-bold text-40">${creditLimit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p> </div> </div> <div className="grid grid-cols-2 gap-4"> <div> <p className="font-gotham font-book text-14 opacity-75">Tasa Preferencial Anual</p> <p className="font-gotham font-bold text-20">{interestRate}%</p> </div> <div> <p className="font-gotham font-book text-14 opacity-75">Plazo Máximo</p> <p className="font-gotham font-bold text-20">{maxTerm} meses</p> </div> </div> </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-lg shadow-sm"> <div className="flex gap-3"> <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" /> <div> <h3 className="font-gotham font-bold text-16 text-blue-900 mb-2"> ¿Qué puedes financiar con el Crédito Verde? </h3> <p className="font-gotham font-book text-14 text-blue-800"> Utilízalo para adquirir e instalar tecnologías limpias en tu hogar que te ayuden a ahorrar recursos y reducir tu impacto ambiental, como paneles solares, sistemas de captación de agua, calentadores solares, o incluso para adquirir movilidad sostenible. </p> </div> </div> </div>

        {/* --- INICIO DE CAMBIOS EN IMÁGENES --- */}
        <div className="mb-8">
           <h2 className="font-gotham font-bold text-24 text-gray-900 mb-6"> Ejemplos de Proyectos Elegibles </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {eligibleProjects.map((project, index) => (
               <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col overflow-hidden"> {/* Added overflow-hidden */}
                 {/* Contenedor de la imagen con altura fija */}
                 <div className="h-48 w-full overflow-hidden"> {/* Aumentamos altura a h-48 */}
                   <img
                     src={project.icon}
                     alt={project.title}
                     // object-cover: Escala la imagen para llenar el contenedor manteniendo la proporción (recorta si es necesario)
                     // w-full h-full: Asegura que la imagen intente llenar el div contenedor
                     className="w-full h-full object-cover"
                   />
                 </div>
                 {/* Contenido de texto */}
                 <div className="p-6 flex flex-col flex-grow"> {/* Added flex flex-col flex-grow */}
                     <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2">{project.title}</h3>
                     <p className="font-gotham font-book text-14 text-gray-600 mb-4 flex-grow">{project.description}</p>
                     <p className="font-gotham font-bold text-16 text-green-600 mt-auto">{project.amount}</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
         {/* --- FIN DE CAMBIOS EN IMÁGENES --- */}

        <div className="bg-white rounded-xl shadow-lg p-8">
           <h2 className="font-gotham font-bold text-24 text-gray-900 mb-6"> Beneficios Adicionales </h2>
           <div className="space-y-4"> {benefits.map((benefit, index) => ( <div key={index} className="flex items-start gap-3 p-2 rounded transition-all duration-300 hover:bg-green-50 hover:-translate-x-1"> <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" /> <p className="font-gotham font-medium text-15 text-gray-700">{benefit}</p> </div> ))} </div>
           <div className="mt-8 pt-6 border-t border-gray-200"> <a href="https://www.banorte.com/wps/portal/banorte/Home/creditos/credito-de-nomina/" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#EB0029] hover:bg-[#c9022f] text-white font-gotham font-bold text-16 py-4 rounded-lg transition-all duration-300 text-center shadow-md hover:shadow-lg hover:scale-105"> Solicitar Crédito Verde </a> <p className="font-gotham font-book text-12 text-gray-500 text-center mt-4"> La aprobación está sujeta a evaluación crediticia. Consulta términos y condiciones. </p> </div>
         </div>
      </div>
    </div>
  );
}