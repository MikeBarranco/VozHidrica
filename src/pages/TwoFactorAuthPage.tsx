import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';

export default function TwoFactorAuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate('/auth');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setError('Ingresa el código completo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: userError } = await supabase.auth.signInWithPassword({
        email: email,
        password: 'temporary',
      });

      if (userError) {
        const { data, error: codeError } = await supabase
          .from('verification_codes')
          .select('*')
          .eq('code', verificationCode)
          .eq('verified', false)
          .single();

        if (codeError || !data) {
          setError('Código inválido o expirado');
          return;
        }

        if (new Date(data.expires_at) < new Date()) {
          setError('El código ha expirado');
          return;
        }

        await supabase
          .from('verification_codes')
          .update({ verified: true })
          .eq('id', data.id);

        navigate('/home');
      }
    } catch (err: any) {
      setError('Error al verificar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setResendLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-verification-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email, purpose: 'login' }),
        }
      );

      if (!response.ok) throw new Error('Error al enviar código');

      setCountdown(60);
    } catch (err: any) {
      setError('Error al reenviar el código');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <button
          onClick={() => navigate('/auth')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-gotham font-medium text-14"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="font-gotham font-bold text-28 text-gray-900 mb-2">
            Verificación de Seguridad
          </h1>
          <p className="font-gotham font-book text-15 text-gray-600">
            Hemos enviado un código de 6 dígitos a <strong>{email}</strong>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="font-gotham font-medium text-14 text-red-800">{error}</p>
          </div>
        )}

        <div className="flex gap-2 justify-center mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl font-gotham font-bold border-2 border-gray-300 rounded-lg focus:border-[#EB0029] focus:outline-none transition-colors"
            />
          ))}
        </div>

        <Button
          onClick={handleVerify}
          disabled={loading || code.some(d => !d)}
          className="w-full mb-4"
        >
          {loading ? 'Verificando...' : 'Verificar Código'}
        </Button>

        <div className="text-center">
          <p className="font-gotham font-book text-14 text-gray-600 mb-2">
            ¿No recibiste el código?
          </p>
          <button
            onClick={handleResend}
            disabled={countdown > 0 || resendLoading}
            className={`font-gotham font-bold text-14 ${
              countdown > 0 || resendLoading
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#EB0029] hover:underline'
            }`}
          >
            {resendLoading
              ? 'Reenviando...'
              : countdown > 0
              ? `Reenviar en ${countdown}s`
              : 'Reenviar código'}
          </button>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <p className="font-gotham font-book text-13 text-gray-700">
            <strong>Nota de desarrollo:</strong> El código se muestra en los logs de Supabase.
            En producción, esto se enviaría por correo electrónico.
          </p>
        </div>
      </div>
    </div>
  );
}
