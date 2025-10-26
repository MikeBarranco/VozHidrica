// --- INICIO BYPASS HACKATHON ---
import { createContext, useContext, useState } from 'react';
import { User } from '@supabase/supabase-js';
// import { supabase } from '../lib/supabase'; // No lo necesitamos para el bypass

// --- Las interfaces no cambian ---
interface UserProfile {
  username: string;
  fullName: string;
  curp: string;
  address: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: string | null }>;
  signUp: (password: string, profile: UserProfile) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 1. Decimos que no hay usuario
  const [user, setUser] = useState<User | null>(null);
  
  // 2. ¡IMPORTANTE! Decimos que YA TERMINÓ de cargar
  const [loading, setLoading] = useState(false);

  // 3. Comentamos TODO el useEffect que usaba supabase.auth y causaba el error
  /*
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  */

  // 4. Desactivamos las funciones de login/registro para que no crasheen
  const signIn = async () => {
    console.warn('BYPASS: signIn desactivado');
    return { error: 'Bypass: Función desactivada' };
  };

  const signUp = async () => {
    console.warn('BYPASS: signUp desactivado');
    return { error: 'Bypass: Función desactivada' };
  };

  const signOut = async () => {
    console.warn('BYPASS: signOut desactivado');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
// --- FIN BYPASS HACKATHON ---