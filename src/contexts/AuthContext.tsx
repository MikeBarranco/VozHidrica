import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

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

  const signIn = async (username: string, password: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('username', username)
        .maybeSingle();

      if (profileError || !profileData) {
        return { error: 'Nombre de usuario o contraseña incorrectos' };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: profileData.email,
        password,
      });

      if (error) {
        return { error: 'Nombre de usuario o contraseña incorrectos' };
      }

      if (data.user) {
        setUser(data.user);
      }

      return { error: null };
    } catch (error) {
      return { error: 'Error al iniciar sesión. Inténtalo de nuevo.' };
    }
  };

  const signUp = async (password: string, profile: UserProfile) => {
    try {
      const { data: existingUsername } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', profile.username)
        .maybeSingle();

      if (existingUsername) {
        return { error: 'Este nombre de usuario ya está en uso' };
      }

      const { data, error } = await supabase.auth.signUp({
        email: profile.email,
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
          username: profile.username,
          email: profile.email,
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
