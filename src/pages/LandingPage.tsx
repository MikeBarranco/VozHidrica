import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [curp, setCurp] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ general?: string; username?: string; email?: string; password?: string; confirmPassword?: string; fullName?: string; curp?: string; address?: string; }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (username: string) => /^[a-zA-Z0-9_]{3,20}$/.test(username);
  const validateCURP = (curp: string) => /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/.test(curp.toUpperCase());

  const validateForm = () => { /* Misma validación */ const newErrors: typeof errors = {}; if (!username) { newErrors.username = 'El campo es obligatorio'; } if (!isLogin) { if (!fullName) { newErrors.fullName = 'El nombre completo es obligatorio'; } if (!email || !validateEmail(email)) { newErrors.email = 'Ingresa un correo válido'; } if (!curp || !validateCURP(curp)) { newErrors.curp = 'Ingresa un CURP válido'; } if (!address) { newErrors.address = 'La dirección es obligatoria'; } if (!password || password.length < 6) { newErrors.password = 'Mínimo 6 caracteres'; } if (password !== confirmPassword) { newErrors.confirmPassword = 'Las contraseñas no coinciden'; } } else { if (!password) { newErrors.password = 'El campo es obligatorio'; } } setErrors(newErrors); return Object.keys(newErrors).length === 0; };
  const handleSubmit = async (e: React.FormEvent) => { /* Misma simulación */ e.preventDefault(); setErrors({}); if (!validateForm()) { return; } setIsLoading(true); await new Promise(resolve => setTimeout(resolve, 1000)); navigate('/home'); };
  const toggleMode = () => { /* Misma función */ setIsLogin(!isLogin); setUsername(''); setEmail(''); setPassword(''); setConfirmPassword(''); setFullName(''); setCurp(''); setAddress(''); setErrors({}); };

  return (
     <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Video de fondo */}
      {!videoError ? ( <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover" onError={() => setVideoError(true)} poster="data:image/svg+xml,..."> <source src="/images/backgrounds/hero-video.mp4" type="video/mp4"/> </video> ) : ( <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-black" /> )}
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-md lg:max-w-lg">
        {/* Logos */}
        <div className="mb-6 lg:mb-10">
          <div className="rounded-2xl p-6 lg:p-8">
            <div className="flex items-center justify-center gap-4 lg:gap-6">
              {/* Caja Logo Voz Hídrica */}
              <div className="flex-1 flex justify-end">
                {/* --- CAMBIO DE IMAGEN Y CLASES --- */}
                {/* Ahora usamos voz-hidrica-white.png y bg-transparent */}
                <div className="h-16 sm:h-20 lg:h-24 w-auto bg-transparent rounded-lg flex items-center justify-center shadow-lg p-2">
                  <img src="/images/voz-hidrica-white4.png" alt="Logo Voz Hídrica" className="h-full w-auto object-contain"/> {/* w-auto para respetar proporción */}
                </div>
              </div>
              {/* Separador */}
              <div className="w-px h-16 sm:h-20 lg:h-24 bg-white/30"></div>
              {/* Caja Logo Banorte */}
              <div className="flex-1 flex justify-start">
                <div className="h-16 sm:h-20 lg:h-24 w-auto bg-[#EB0029] rounded-lg flex items-center justify-center shadow-lg p-2">
                  <img src="/images/banorte-logo-white.png" alt="Logo Banorte" className="h-full w-full object-contain"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Formulario */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex border-b border-gray-200"> <button onClick={() => !isLogin && toggleMode()} className={`flex-1 py-4 lg:py-5 text-center font-gotham font-medium text-14 lg:text-15 transition-all duration-300 ${isLogin ? 'bg-banorte-red text-white' : 'bg-white text-text-secondary hover:bg-gray-50'}`}> Iniciar Sesión </button> <button onClick={() => isLogin && toggleMode()} className={`flex-1 py-4 lg:py-5 text-center font-gotham font-medium text-14 lg:text-15 transition-all duration-300 ${!isLogin ? 'bg-banorte-red text-white' : 'bg-white text-text-secondary hover:bg-gray-50'}`}> Registrarse </button> </div>
          <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-5 lg:space-y-6 max-h-[60vh] lg:max-h-[65vh] overflow-y-auto">
             {!isLogin && ( <InputField label="Nombre Completo" type="text" value={fullName} onChange={setFullName} placeholder="Juan Pérez García" error={errors.fullName} /> )}
             <InputField label="Nombre de usuario" type="text" value={username} onChange={setUsername} placeholder="usuario123" error={errors.username} />
             {!isLogin && ( <> <InputField label="Correo electrónico" type="email" value={email} onChange={setEmail} placeholder="ejemplo@correo.com" error={errors.email} /> <InputField label="CURP" type="text" value={curp} onChange={(value) => setCurp(value.toUpperCase())} placeholder="HEGJ880101HDFRRL09" error={errors.curp} maxLength={18} /> <InputField label="Dirección" type="text" value={address} onChange={setAddress} placeholder="Calle 123, Colonia, Ciudad, CP" error={errors.address} /> </> )}
             <InputField label="Contraseña" type="password" value={password} onChange={setPassword} placeholder="Ingresa tu contraseña" error={errors.password} />
             {!isLogin && ( <InputField label="Confirmar contraseña" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Confirma tu contraseña" error={errors.confirmPassword} /> )}
             {isLogin && ( <div className="flex justify-end"> <button type="button" onClick={() => navigate('/forgot-password')} className="font-gotham font-medium text-13 lg:text-14 text-[#EB0029] hover:underline"> ¿Olvidaste tu contraseña? </button> </div> )}
             {errors.general && ( <div className="p-4 bg-red-50 border border-red-200 rounded-lg"> <p className="font-gotham font-book text-12 lg:text-14 text-banorte-red text-center">{errors.general}</p> </div> )}
             <div className="pt-4"> <Button type="submit" variant="primary" disabled={isLoading} className="w-full"> {isLoading ? 'Cargando...' : 'Continuar'} </Button> </div>
          </form>
        </div>
      </div>
     </div>
  );
}