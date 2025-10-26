import { useState } from 'react';
import { ArrowLeft, BookOpen, Award, Clock, CheckCircle, Lock, Trophy, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFinancialEducation } from '../hooks/useFinancialEducation';
import { useEcoPoints } from '../hooks/useEcoPoints';

export default function FinancialEducationPage() {
  const navigate = useNavigate();
  const { modules, startModule, completeModule, getModuleProgress, getCompletedModules, getTotalPointsEarned, getModulesByCategory, loading } = useFinancialEducation();
  const { addEcoPoints } = useEcoPoints();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos', icon: '📚' },
    { id: 'savings', name: 'Ahorro', icon: '💰' },
    { id: 'investment', name: 'Inversión', icon: '📈' },
    { id: 'budget', name: 'Presupuesto', icon: '📊' },
    { id: 'credit', name: 'Crédito', icon: '💳' },
    { id: 'water', name: 'Agua', icon: '💧' },
  ];

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return level;
    }
  };

  const handleStartModule = async (moduleId: string) => {
    const progress = getModuleProgress(moduleId);
    if (!progress) {
      await startModule(moduleId);
    }
    setSelectedModule(moduleId);
  };

  const handleCompleteModule = async (moduleId: string, pointsReward: number) => {
    await completeModule(moduleId);
    await addEcoPoints(pointsReward, 'education_completed', `Módulo educativo completado`);
    setSelectedModule(null);
  };

  const filteredModules = selectedCategory === 'all'
    ? modules
    : getModulesByCategory(selectedCategory);

  const completedCount = getCompletedModules().length;
  const totalPoints = getTotalPointsEarned();
  const completionPercentage = modules.length > 0 ? (completedCount / modules.length) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="font-gotham font-medium text-16 text-gray-700">Cargando...</div>
      </div>
    );
  }

  const currentModule = modules.find(m => m.id === selectedModule);

  if (currentModule) {
    const progress = getModuleProgress(currentModule.id);
    const isCompleted = progress?.is_completed || false;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedModule(null)}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 font-gotham font-medium text-14"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a módulos
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-12 font-gotham font-bold ${getDifficultyColor(currentModule.difficulty_level)}`}>
                    {getDifficultyLabel(currentModule.difficulty_level)}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-12 font-gotham font-bold">
                    {currentModule.category}
                  </span>
                </div>
                <h1 className="font-gotham font-bold text-32 md:text-40 text-gray-900 mb-4">
                  {currentModule.title}
                </h1>
                <p className="font-gotham font-medium text-16 text-gray-600 mb-6">
                  {currentModule.description}
                </p>
                <div className="flex items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-gotham font-book text-14">{currentModule.estimated_minutes} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-gotham font-bold text-14">{currentModule.points_reward} puntos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <div className="prose max-w-none">
                <div className="font-gotham font-book text-16 text-gray-700 leading-relaxed whitespace-pre-line">
                  {currentModule.content}
                </div>
              </div>
            </div>

            {!isCompleted ? (
              <button
                onClick={() => handleCompleteModule(currentModule.id, currentModule.points_reward)}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all font-gotham font-bold text-18 flex items-center justify-center gap-2 shadow-lg"
              >
                <CheckCircle className="w-6 h-6" />
                Completar y Ganar {currentModule.points_reward} Puntos
              </button>
            ) : (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="font-gotham font-bold text-18 text-green-900 mb-2">
                  ¡Módulo Completado!
                </p>
                <p className="font-gotham font-book text-14 text-green-700">
                  Ya ganaste {currentModule.points_reward} eco-puntos por este módulo
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors mb-6 font-gotham font-medium text-14"
          aria-label="Volver al inicio"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
          <span className="text-gray-700">Volver</span>
        </button>

        <div className="mb-8">
          <h1 className="font-gotham font-bold text-36 md:text-44 text-gray-900 mb-3">
            Educación Financiera
          </h1>
          <p className="font-gotham font-book text-16 md:text-18 text-gray-600 max-w-3xl">
            Aprende sobre finanzas personales y hábitos sostenibles mientras ganas eco-puntos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 text-gray-600">Módulos Completados</h3>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="font-gotham font-bold text-32 text-gray-900">{completedCount}/{modules.length}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${completionPercentage}%` }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 opacity-90">Puntos Ganados</h3>
              <Trophy className="w-5 h-5" />
            </div>
            <p className="font-gotham font-bold text-32">{totalPoints}</p>
            <p className="font-gotham font-book text-12 opacity-75 mt-2">
              Por educación financiera
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-gotham font-medium text-14 opacity-90">Progreso Total</h3>
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="font-gotham font-bold text-32">{completionPercentage.toFixed(0)}%</p>
            <p className="font-gotham font-book text-12 opacity-75 mt-2">
              De todos los módulos
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-gotham font-bold text-14 whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const progress = getModuleProgress(module.id);
            const isCompleted = progress?.is_completed || false;
            const isStarted = !!progress && !isCompleted;

            return (
              <div
                key={module.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
                onClick={() => handleStartModule(module.id)}
              >
                <div className={`h-2 ${isCompleted ? 'bg-green-500' : isStarted ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-11 font-gotham font-bold ${getDifficultyColor(module.difficulty_level)}`}>
                          {getDifficultyLabel(module.difficulty_level)}
                        </span>
                      </div>
                      <h3 className="font-gotham font-bold text-18 text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                        {module.title}
                      </h3>
                    </div>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : isStarted ? (
                      <BookOpen className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                  </div>

                  <p className="font-gotham font-book text-14 text-gray-600 mb-4 line-clamp-3">
                    {module.description}
                  </p>

                  <div className="flex items-center justify-between text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-gotham font-book text-13">{module.estimated_minutes} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span className="font-gotham font-bold text-13 text-orange-600">{module.points_reward} pts</span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-2 rounded-lg font-gotham font-bold text-14 transition-colors ${
                      isCompleted
                        ? 'bg-green-100 text-green-700'
                        : isStarted
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-cyan-600 text-white hover:bg-cyan-700'
                    }`}
                  >
                    {isCompleted ? '✓ Completado' : isStarted ? 'Continuar' : 'Comenzar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredModules.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="font-gotham font-medium text-18 text-gray-600">
              No hay módulos disponibles en esta categoría
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
