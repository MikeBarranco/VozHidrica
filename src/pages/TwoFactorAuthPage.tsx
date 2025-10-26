import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
// --- BYPASS ---
// Eliminamos la importación de Supabase
// import { supabase } from '../lib/supabase';
import Button from '../components/Button';
// Importamos el Header reutilizable
import Header from '../components/Header'; // Asegúrate que la ruta sea correcta


export default function TwoFactorAuthPage() {
  const navigate = useNavigate();
  // --- BYPASS ---
  // Ya no usamos location.state.email
  // const location = useLocation();
  // const email = location.state?.email;
  const fakeEmail = "usuario@ejemplo.com"; // Email falso para la demo

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false); // Mantenemos para UI
  const [countdown, setCountdown] = useState(60);

  // El timer para el contador sigue igual
  useEffect(() => {
    // Ya no necesitamos verificar el email
    // if (!email) { navigate('/auth'); return; }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Quitamos dependencias

  // Las funciones de manejo de input siguen igual
  const handleCodeChange = (index: number, value: string) => { if (value.length > 1) return; const newCode = [...code]; newCode[index] = value; setCode(newCode); if (value && index < 5) { document.getElementById(`code-${index + 1}`)?.focus(); } };
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => { if (e.key === 'Backspace' && !code[index] && index > 0) { document.getElementById(`code-${index - 1}`)?.focus(); } };


  // --- *** BYPASS DE VERIFICACIÓN *** ---
  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setError('Ingresa el código completo de 6 dígitos');
      return;
    }

    setLoading(true);
    setError('');

    // 1. Simula espera
    await new Promise(resolve => setTimeout(resolve, 1500)); // Espera 1.5 segundos

    // 2. ¡Navega directamente a /home!
    // No importa qué código se ingresó, para la demo siempre es "correcto".
    navigate('/home');

    // No necesitamos setLoading(false) porque navegamos
  };
  // --- *** FIN BYPASS *** ---


  // --- *** BYPASS DE REENVÍO *** ---
  const handleResend = async () => {
    if (countdown > 0 || resendLoading) return; // No hacer nada si está contando o cargando

    setResendLoading(true);
    setError('');

    // 1. Simula espera
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo

    // 2. Reinicia el contador
    setCountdown(60);
    alert("Se ha reenviado un nuevo código (Modo Demo)"); // Mensaje para la demo

    setResendLoading(false);
    // No llamamos a la función de Supabase
  };
  // --- *** FIN BYPASS *** ---

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen"> {/* Asegura fondo completo */}
      {/* Añadimos Header (opcional aquí, usualmente 2FA no lo tiene) */}
      {/* <Header /> */}

       {/* Centramos el contenido */}
      <div className="flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            {/* Botón Volver */}
            <button onClick={() => navigate('/auth')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-gotham font-medium text-14"> <ArrowLeft className="w-5 h-5" /> Volver </button>

            <div className="text-center mb-8">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> <Shield className="w-8 h-8 text-blue-600" /> </div>
                <h1 className="font-gotham font-bold text-28 text-gray-900 mb-2"> Verificación de Seguridad </h1>
                <p className="font-gotham font-book text-15 text-gray-600"> Hemos enviado un código de 6 dígitos a <strong className="text-gray-800">{fakeEmail}</strong> </p> {/* Usamos email falso */}
            </div>

            {error && ( <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"> <p className="font-gotham font-medium text-14 text-red-800">{error}</p> </div> )}

            {/* Inputs del código */}
            <div className="flex gap-2 justify-center mb-6">
                {code.map((digit, index) => ( <input key={index} id={`code-${index}`} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleCodeChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} className="w-12 h-14 text-center text-2xl font-gotham font-bold border-2 border-gray-300 rounded-lg focus:border-[#EB0029] focus:outline-none transition-colors"/> ))}
            </div>

            {/* Botón Verificar (usa el bypass) */}
            <Button onClick={handleVerify} disabled={loading || code.some(d => !d)} className="w-full mb-4" variant="primary">
                {loading ? 'Verificando...' : 'Verificar Código'}
            </Button>

             {/* Botón Reenviar (usa el bypass) */}
            <div className="text-center">
                <p className="font-gotham font-book text-14 text-gray-600 mb-2"> ¿No recibiste el código? </p>
                <button onClick={handleResend} disabled={countdown > 0 || resendLoading} className={`font-gotham font-bold text-14 ${countdown > 0 || resendLoading ? 'text-gray-400 cursor-not-allowed' : 'text-[#EB0029] hover:underline'}`}>
                {resendLoading ? 'Reenviando...' : countdown > 0 ? `Reenviar en ${countdown}s` : 'Reenviar código'}
                </button>
            </div>

            {/* Nota de desarrollo (opcional quitarla para la demo final) */}
            {/*
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <p className="font-gotham font-book text-13 text-gray-700"> <strong>Nota de desarrollo:</strong> En Modo Demo, cualquier código de 6 dígitos es válido. </p>
            </div>
            */}
        </div>
      </div>
    </div>
  );
}