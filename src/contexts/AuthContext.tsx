import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface UserProfile {
  fullName: string;
  curp: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, profile: UserProfile) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials') || error.message.includes('Email not confirmed')) {
          return { error: 'El correo electrónico no está registrado' };
        }
        return { error: 'Correo electrónico o contraseña incorrectos' };
      }

      if (data.user) {
        setUser(data.user);
      }

      return { error: null };
    } catch (error) {
      return { error: 'Error al iniciar sesión. Inténtalo de nuevo.' };
    }
  };

  const signUp = async (email: string, password: string, profile: UserProfile) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('already registered')) {
          return { error: 'Este correo electrónico ya está registrado' };
        }
        return { error: error.message };
      }

      if (data.user) {
        await supabase.from('user_profiles').insert({
          user_id: data.user.id,
          email: data.user.email,
          full_name: profile.fullName,
          curp: profile.curp,
          address: profile.address,
        });
        setUser(data.user);
      }

      return { error: null };
    } catch (error) {
      return { error: 'Error al registrar usuario. Inténtalo de nuevo.' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
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
