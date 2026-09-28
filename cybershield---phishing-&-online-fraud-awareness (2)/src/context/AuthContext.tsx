import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserAccount {
  id: string;
  name: string;
  username?: string;
  email: string;
  role?: string;
  registeredAt: string;
}

interface AuthContextType {
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  login: (username: string, email: string, password: string) => { success: boolean; message: string };
  register: (name: string, email: string, password: string, username?: string) => { success: boolean; message: string };
  logout: () => void;
  guestLogin: () => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'cybershield_users_db_v1';
const CURRENT_USER_KEY = 'cybershield_current_user_v1';
const REMEMBER_ME_KEY = 'cybershield_remember_me_v1';

// Seed initial demo account if none exists
const DEFAULT_USERS = [
  {
    id: 'user-demo-1',
    name: 'Cyber Guardian',
    username: 'cyberguardian',
    email: 'admin@cybershield.org',
    password: 'Password@123',
    role: 'Security Analyst',
    registeredAt: '2026-01-15'
  },
  {
    id: 'user-demo-2',
    name: 'Alex Johnson',
    username: 'alexjohnson',
    email: 'user@example.com',
    password: 'Password@123',
    role: 'Trainee',
    registeredAt: '2026-02-10'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rememberMe, setRememberMeState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
    } catch {
      return true;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      // Check session or local storage
      const saved = localStorage.getItem(CURRENT_USER_KEY) || sessionStorage.getItem(CURRENT_USER_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading current user', e);
    }
    return null;
  });

  // Ensure default users are seeded in localStorage
  useEffect(() => {
    try {
      const existing = localStorage.getItem(USERS_STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      }
    } catch (e) {
      console.error('Error seeding default users', e);
    }
  }, []);

  const setRememberMe = (val: boolean) => {
    setRememberMeState(val);
    try {
      localStorage.setItem(REMEMBER_ME_KEY, String(val));
    } catch (e) {
      console.error(e);
    }
  };

  const login = (username: string, email: string, password: string): { success: boolean; message: string } => {
    const cleanUser = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanUser) {
      return { success: false, message: 'Please enter your username.' };
    }
    if (!cleanEmail) {
      return { success: false, message: 'Please enter your email address.' };
    }
    if (!password) {
      return { success: false, message: 'Please enter your password.' };
    }

    try {
      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : DEFAULT_USERS;

      const found = users.find(
        (u: any) => 
          (u.email.toLowerCase() === cleanEmail || (u.username && u.username.toLowerCase() === cleanUser.toLowerCase()) || (u.name && u.name.toLowerCase() === cleanUser.toLowerCase())) &&
          u.password === password
      );

      if (!found) {
        // Check if email exists with wrong password
        const emailExists = users.some((u: any) => u.email.toLowerCase() === cleanEmail);
        if (emailExists) {
          return { success: false, message: 'Incorrect password. Try "Password@123" for demo accounts.' };
        }
        return { 
          success: false, 
          message: 'Account not found with this username and email. Please check your credentials or register.' 
        };
      }

      const userSession: UserAccount = {
        id: found.id,
        name: found.name || cleanUser,
        username: found.username || cleanUser.toLowerCase().replace(/\s+/g, ''),
        email: found.email,
        role: found.role || 'Member',
        registeredAt: found.registeredAt || new Date().toISOString().split('T')[0]
      };

      setCurrentUser(userSession);
      const serialized = JSON.stringify(userSession);
      if (rememberMe) {
        localStorage.setItem(CURRENT_USER_KEY, serialized);
        sessionStorage.removeItem(CURRENT_USER_KEY);
      } else {
        sessionStorage.setItem(CURRENT_USER_KEY, serialized);
        localStorage.removeItem(CURRENT_USER_KEY);
      }

      return { success: true, message: `Welcome back, ${userSession.name}!` };
    } catch (e) {
      return { success: false, message: 'An error occurred during authentication.' };
    }
  };

  const register = (name: string, email: string, password: string, username?: string): { success: boolean; message: string } => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = (username || cleanName).trim().toLowerCase().replace(/\s+/g, '');

    if (!cleanName) {
      return { success: false, message: 'Please enter your username / full name.' };
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    try {
      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [...DEFAULT_USERS];

      if (users.some((u: any) => u.email.toLowerCase() === cleanEmail)) {
        return { 
          success: false, 
          message: 'An account with this email address already exists. Please log in.' 
        };
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name: cleanName,
        username: cleanUsername,
        email: cleanEmail,
        password: password,
        role: 'Trainee',
        registeredAt: new Date().toISOString().split('T')[0]
      };

      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      // Auto sign in newly registered user
      const userSession: UserAccount = {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        registeredAt: newUser.registeredAt
      };

      setCurrentUser(userSession);
      const serialized = JSON.stringify(userSession);
      if (rememberMe) {
        localStorage.setItem(CURRENT_USER_KEY, serialized);
      } else {
        sessionStorage.setItem(CURRENT_USER_KEY, serialized);
      }

      return { success: true, message: 'Registration successful! Welcome to CyberShield.' };
    } catch (e) {
      return { success: false, message: 'Could not complete registration. Try again.' };
    }
  };

  const guestLogin = () => {
    const guestUser: UserAccount = {
      id: `guest-${Date.now()}`,
      name: 'Guest Learner',
      email: 'guest@cybershield.local',
      role: 'Guest',
      registeredAt: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(guestUser);
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(guestUser));
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
      sessionStorage.removeItem(CURRENT_USER_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        guestLogin,
        rememberMe,
        setRememberMe
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
