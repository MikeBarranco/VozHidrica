import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error al enviar el correo de recuperación');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-gotham font-bold text-24 text-gray-900 mb-4">
              Correo Enviado
            </h2>
            <p className="font-gotham font-book text-15 text-gray-600 mb-6">
              Hemos enviado un enlace de recuperación a <strong>{email}</strong>.
              Por favor revisa tu bandeja de entrada y sigue las instrucciones.
            </p>
            <p className="font-gotham font-book text-13 text-gray-500 mb-6">
              Si no recibes el correo en los próximos minutos, revisa tu carpeta de spam.
            </p>
            <Button
              onClick={() => navigate('/auth')}
              className="w-full"
            >
              Volver al Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="font-gotham font-bold text-28 text-gray-900 mb-2">
            Recuperar Contraseña
          </h1>
          <p className="font-gotham font-book text-15 text-gray-600">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-gotham font-medium text-14 text-red-800">{error}</p>
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EB0029] focus:border-transparent font-gotham font-book text-15"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-gotham font-book text-14 text-gray-600">
            ¿Recordaste tu contraseña?{' '}
            <button
              onClick={() => navigate('/auth')}
              className="text-[#EB0029] hover:underline font-gotham font-bold"
            >
              Inicia Sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
