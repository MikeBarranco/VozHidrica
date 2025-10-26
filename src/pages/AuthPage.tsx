import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [curp, setCurp] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    fullName?: string;
    curp?: string;
    address?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const { signIn, signUp } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCURP = (curp: string) => {
    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
    return curpRegex.test(curp.toUpperCase());
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'El campo es obligatorio';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!password) {
      newErrors.password = 'El campo es obligatorio';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!isLogin) {
      if (!fullName) {
        newErrors.fullName = 'El nombre completo es obligatorio';
      }

      if (!curp) {
        newErrors.curp = 'El CURP es obligatorio';
      } else if (!validateCURP(curp)) {
        newErrors.curp = 'Ingresa un CURP válido (18 caracteres)';
      }

      if (!address) {
        newErrors.address = 'La dirección es obligatoria';
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = 'El campo es obligatorio';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setErrors({ general: error });
        }
      } else {
        const { error } = await signUp(email, password, {
          fullName,
          curp: curp.toUpperCase(),
          address,
        });
        if (error) {
          setErrors({ general: error });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setCurp('');
    setAddress('');
    setErrors({});
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 sm:px-20 py-10">
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%231a1a2e;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23grad)' /%3E%3C/svg%3E"
        >
          <source
            src="https://cdn.pixabay.com/video/2022/12/12/143046-779972003_large.mp4"
            type="video/mp4"
          />
          <source
            src="https://cdn.pixabay.com/video/2020/03/31/34530-404910158_large.mp4"
            type="video/mp4"
          />
        </video>
      ) : (
        <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-black" />
      )}

      <div className="fixed inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-30 text-center bg-white bg-opacity-95 rounded-xl p-6 backdrop-blur-sm">
          <h1 className="font-gotham font-bold text-32 sm:text-36 md:text-40 text-primary mb-10">
            Voz Hídrica
          </h1>
          <svg
            width="150"
            height="40"
            viewBox="0 0 150 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <text
              x="75"
              y="25"
              textAnchor="middle"
              fill="#EB0029"
              fontSize="20"
              fontWeight="bold"
              fontFamily="Arial, sans-serif"
            >
              BANORTE
            </text>
          </svg>
        </div>

        <div className="flex justify-center mb-30">
          <div className="tabs-container">
            <input
              type="radio"
              name="auth_tab"
              id="login_tab"
              checked={isLogin}
              onChange={() => !isLogin && toggleMode()}
              className="tab-input"
            />
            <label htmlFor="login_tab" className="tab-label">
              Iniciar Sesión
            </label>
            <input
              type="radio"
              name="auth_tab"
              id="register_tab"
              checked={!isLogin}
              onChange={() => isLogin && toggleMode()}
              className="tab-input"
            />
            <label htmlFor="register_tab" className="tab-label">
              Registrarse
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-20 max-h-[65vh] overflow-y-auto pr-2">
          {!isLogin && (
            <InputField
              label="Nombre Completo"
              type="text"
              value={fullName}
              onChange={setFullName}
              placeholder="Juan Pérez García"
              error={errors.fullName}
            />
          )}

          <InputField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="ejemplo@correo.com"
            error={errors.email}
          />

          {!isLogin && (
            <>
              <InputField
                label="CURP"
                type="text"
                value={curp}
                onChange={(value) => setCurp(value.toUpperCase())}
                placeholder="HEGJ880101HDFRRL09"
                error={errors.curp}
                maxLength={18}
              />

              <InputField
                label="Dirección"
                type="text"
                value={address}
                onChange={setAddress}
                placeholder="Calle 123, Colonia, Ciudad, CP"
                error={errors.address}
              />
            </>
          )}

          <InputField
            label="Contraseña"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Ingresa tu contraseña"
            error={errors.password}
          />

          {!isLogin && (
            <InputField
              label="Confirmar contraseña"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirma tu contraseña"
              error={errors.confirmPassword}
            />
          )}

          {errors.general && (
            <div className="p-15 bg-red-50 rounded">
              <p className="font-gotham font-book text-12 text-text-error text-center">
                {errors.general}
              </p>
            </div>
          )}

          <div className="pt-20">
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Cargando...' : 'Continuar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
