import { useState } from 'react';
import { ArrowLeft, BookOpen, Award, Clock, CheckCircle, Lock, Trophy, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface EducationModule { id: string; title: string; description: string; category: string; difficulty_level: 'beginner' | 'intermediate' | 'advanced'; estimated_minutes: number; points_reward: number; content: string; image_url: string; }
interface ModuleProgress { moduleId: string; is_started: boolean; is_completed: boolean; }

export default function FinancialEducationPage() {
  const navigate = useNavigate();
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // category ID (e.g., 'savings')
  const loading = false;

  const fakeModules: EducationModule[] = [ /* Mismos módulos que antes */
    { id: 'mod1', title: 'Fundamentos del Ahorro', description: 'Aprende por qué ahorrar es clave para tu futuro financiero.', category: 'Ahorro', difficulty_level: 'beginner', estimated_minutes: 10, points_reward: 50, content: `Ahorrar significa guardar una parte de tus ingresos regularmente para usarla en el futuro. ...`, image_url: '/images/education/savings-module.png' },
    { id: 'mod2', title: 'Introducción a la Inversión', description: 'Descubre cómo hacer que tu dinero trabaje para ti.', category: 'Inversión', difficulty_level: 'intermediate', estimated_minutes: 15, points_reward: 75, content: `Invertir es poner tu dinero en activos con la expectativa de que generen un rendimiento...`, image_url: '/images/education/investment-module.png' },
    { id: 'mod3', title: 'Creando tu Presupuesto Mensual', description: 'Controla tus gastos y maximiza tus ahorros con un presupuesto efectivo.', category: 'Presupuesto', difficulty_level: 'beginner', estimated_minutes: 12, points_reward: 60, content: `Un presupuesto es un plan que te ayuda a administrar tu dinero...`, image_url: '/images/education/budget-module.png' },
    { id: 'mod4', title: 'Manejo Responsable del Crédito', description: 'Entiende cómo funciona el crédito y cómo usarlo a tu favor.', category: 'Crédito', difficulty_level: 'intermediate', estimated_minutes: 18, points_reward: 80, content: `El crédito te permite obtener bienes o servicios ahora y pagarlos más tarde...`, image_url: '/images/education/credit-module.png' },
    { id: 'mod5', title: 'Ahorro de Agua en Casa', description: 'Pequeños cambios, gran impacto. Aprende a reducir tu consumo.', category: 'Agua', difficulty_level: 'beginner', estimated_minutes: 8, points_reward: 40, content: `El agua es un recurso vital y limitado. Ahorrarla beneficia al planeta...`, image_url: '/images/education/water-module.png' },
  ];
  const [fakeProgress, setFakeProgress] = useState<ModuleProgress[]>([ { moduleId: 'mod1', is_started: true, is_completed: true }, { moduleId: 'mod3', is_started: true, is_completed: false }, ]);
  const getModuleProgress = (moduleId: string): ModuleProgress | undefined => fakeProgress.find(p => p.moduleId === moduleId);
  const getCompletedModules = (): ModuleProgress[] => fakeProgress.filter(p => p.is_completed);
  const getTotalPointsEarned = (): number => getCompletedModules().reduce((total, progress) => total + (fakeModules.find(m => m.id === progress.moduleId)?.points_reward || 0), 0);
  
  // Mantenemos las categorías con ID y Nombre
  const categories = [ { id: 'all', name: 'Todos', icon: '📚' }, { id: 'savings', name: 'Ahorro', icon: '💰' }, { id: 'investment', name: 'Inversión', icon: '📈' }, { id: 'budget', name: 'Presupuesto', icon: '📊' }, { id: 'credit', name: 'Crédito', icon: '💳' }, { id: 'water', name: 'Agua', icon: '💧' }, ];
  
  // --- CORRECCIÓN EN EL FILTRADO ---
  const getModulesByCategory = (categoryId: string): EducationModule[] => {
      // Busca el NOMBRE de la categoría basado en la ID seleccionada
      const categoryName = categories.find(c => c.id === categoryId)?.name;
      if (!categoryName) return []; // Si no encuentra la categoría, devuelve vacío
      // Filtra los módulos comparando su categoría (en español) con el NOMBRE encontrado
      return fakeModules.filter(m => m.category === categoryName);
  };
  // --- FIN DE CORRECCIÓN ---

  const handleStartModule = (moduleId: string) => { /* Misma función bypass */ const progress = getModuleProgress(moduleId); if (!progress) { setFakeProgress([...fakeProgress, { moduleId, is_started: true, is_completed: false }]); } setSelectedModuleId(moduleId); console.log(`BYPASS: Abriendo módulo ${moduleId}`); };
  const handleCompleteModule = (moduleId: string, pointsReward: number) => { /* Misma función bypass */ setFakeProgress(prev => { const existing = prev.find(p => p.moduleId === moduleId); if (existing) { return prev.map(p => p.moduleId === moduleId ? { ...p, is_completed: true } : p); } return [...prev, { moduleId, is_started: true, is_completed: true }]; }); alert(`¡Módulo completado! Has ganado ${pointsReward} puntos. (Modo Demo)`); setSelectedModuleId(null); console.log(`BYPASS: Completando módulo ${moduleId}, Puntos: ${pointsReward}`); };
  const getDifficultyColor = (level: string) => { /* Misma función */ switch (level) { case 'beginner': return 'bg-green-100 text-green-800'; case 'intermediate': return 'bg-yellow-100 text-yellow-800'; case 'advanced': return 'bg-red-100 text-red-800'; default: return 'bg-gray-100 text-gray-800'; } };
  const getDifficultyLabel = (level: string) => { /* Misma función */ switch (level) { case 'beginner': return 'Principiante'; case 'intermediate': return 'Intermedio'; case 'advanced': return 'Avanzado'; default: return level; } };
  
  // Ahora filteredModules usa la función corregida getModulesByCategory
  const filteredModules = selectedCategory === 'all' ? fakeModules : getModulesByCategory(selectedCategory);
  const completedCount = getCompletedModules().length;
  const totalPoints = getTotalPointsEarned();
  const completionPercentage = fakeModules.length > 0 ? (completedCount / fakeModules.length) * 100 : 0;
  const currentModule = fakeModules.find(m => m.id === selectedModuleId);

  // --- El resto del código (JSX) es EXACTAMENTE el mismo que antes ---
  // ... (Pega aquí todo el JSX desde 'if (currentModule) {' hasta el final del archivo anterior)
  // --- Solo pego el JSX necesario para ahorrar espacio, asegúrate de tenerlo completo ---
  if (currentModule) {
    const progress = getModuleProgress(currentModule.id);
    const isCompleted = progress?.is_completed || false;
    return (
      <div className="bg-gradient-to-b from-blue-50 to-cyan-50">
        <Header />
        <div className="max-w-4xl mx-auto p-6 min-h-screen">
          <button onClick={() => setSelectedModuleId(null)} className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 font-gotham font-medium text-14"> <ArrowLeft className="w-4 h-4" /> Volver a módulos </button>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <img src={currentModule.image_url} alt={currentModule.title} className="w-full h-48 md:h-64 object-cover rounded-lg mb-8 shadow-md" />
            {/* ... resto del JSX del detalle del módulo ... */}
             <div className="border-t border-gray-200 pt-8 mb-8">
               <div className="prose max-w-none">
                 <div
                   className="font-gotham font-book text-16 text-gray-700 leading-relaxed whitespace-pre-line"
                   dangerouslySetInnerHTML={{ __html: currentModule.content }} // Para mostrar HTML
                 />
               </div>
             </div>
             {/* ... botón completar o mensaje completado ... */}
              {!isCompleted ? ( <button onClick={() => handleCompleteModule(currentModule.id, currentModule.points_reward)} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all font-gotham font-bold text-18 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"> <CheckCircle className="w-6 h-6" /> Completar y Ganar {currentModule.points_reward} Puntos </button> ) : ( <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center"> <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" /> <p className="font-gotham font-bold text-18 text-green-900 mb-2"> ¡Módulo Completado! </p> <p className="font-gotham font-book text-14 text-green-700"> Ya ganaste {currentModule.points_reward} eco-puntos por este módulo </p> </div> )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-cyan-50">
      <Header />
      <div className="max-w-7xl mx-auto p-6 min-h-screen">
         <div className="flex justify-start mb-6"> <button onClick={() => navigate('/home')} className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors font-gotham font-medium text-14" aria-label="Volver al inicio"> <ArrowLeft className="w-6 h-6 text-gray-700" /> <span className="text-gray-700">Volver</span> </button> </div>
         <div className="mb-8"> <h1 className="font-gotham font-bold text-36 md:text-44 text-gray-900 mb-3">Educación Financiera</h1> <p className="font-gotham font-book text-16 md:text-18 text-gray-600 max-w-3xl">Aprende sobre finanzas personales y hábitos sostenibles mientras ganas eco-puntos</p> </div>
         {/* ... resto del JSX de la vista principal (tarjetas de progreso, filtros, lista de módulos) ... */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 text-gray-600">Módulos Completados</h3> <CheckCircle className="w-5 h-5 text-green-500" /> </div> <p className="font-gotham font-bold text-32 text-gray-900">{completedCount}/{fakeModules.length}</p> <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden"> <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${completionPercentage}%` }}></div> </div> </div> <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 opacity-90">Puntos Ganados</h3> <Trophy className="w-5 h-5" /> </div> <p className="font-gotham font-bold text-32">{totalPoints}</p> <p className="font-gotham font-book text-12 opacity-75 mt-2"> Por educación financiera </p> </div> <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"> <div className="flex items-center justify-between mb-2"> <h3 className="font-gotham font-medium text-14 opacity-90">Progreso Total</h3> <TrendingUp className="w-5 h-5" /> </div> <p className="font-gotham font-bold text-32">{completionPercentage.toFixed(0)}%</p> <p className="font-gotham font-book text-12 opacity-75 mt-2"> De todos los módulos </p> </div> </div>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2"> {categories.map((category) => ( <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-gotham font-bold text-14 whitespace-nowrap transition-all ${selectedCategory === category.id ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}> <span>{category.icon}</span> {category.name} </button> ))} </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredModules.map((module) => { const progress = getModuleProgress(module.id); const isCompleted = progress?.is_completed || false; const isStarted = progress?.is_started || false; return ( <div key={module.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-1" onClick={() => handleStartModule(module.id)}> <div className={`h-2 ${isCompleted ? 'bg-green-500' : isStarted ? 'bg-yellow-500' : 'bg-gray-200'}`}></div> <img src={module.image_url} alt={module.title} className="w-full h-36 object-cover"/> <div className="p-6"> <div className="flex items-start justify-between mb-3"> <div className="flex-1"> <div className="flex items-center gap-2 mb-2"> <span className={`px-2 py-1 rounded text-11 font-gotham font-bold ${getDifficultyColor(module.difficulty_level)}`}>{getDifficultyLabel(module.difficulty_level)}</span> </div> <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">{module.title}</h3> </div> {isCompleted ? <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" /> : isStarted ? <BookOpen className="w-6 h-6 text-yellow-500 flex-shrink-0" /> : <Lock className="w-6 h-6 text-gray-400 flex-shrink-0" />} </div> <p className="font-gotham font-book text-14 text-gray-600 mb-4 line-clamp-3">{module.description}</p> <div className="flex items-center justify-between text-gray-500 mb-4"> <div className="flex items-center gap-2"> <Clock className="w-4 h-4" /> <span className="font-gotham font-book text-13">{module.estimated_minutes} min</span> </div> <div className="flex items-center gap-2"> <Award className="w-4 h-4 text-orange-500" /> <span className="font-gotham font-bold text-13 text-orange-600">{module.points_reward} pts</span> </div> </div> <div className={`w-full py-2 rounded-lg font-gotham font-bold text-14 text-center ${isCompleted ? 'bg-green-100 text-green-700' : isStarted ? 'bg-yellow-100 text-yellow-700' : 'bg-cyan-600 text-white'}`}> {isCompleted ? '✓ Completado' : isStarted ? 'Continuar Aprendiendo' : 'Comenzar Módulo'} </div> </div> </div> ); })}
         </div>
         {filteredModules.length === 0 && ( <div className="bg-white rounded-xl shadow-lg p-12 text-center"> <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" /> <p className="font-gotham font-medium text-18 text-gray-600"> No hay módulos disponibles en esta categoría </p> </div> )}
      </div>
    </div>
  );
}