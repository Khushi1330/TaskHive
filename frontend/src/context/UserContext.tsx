import React, { createContext, useContext, useState, useEffect } from 'react';

// User type matching what your backend returns from /login
interface User {
  id: string;
  fullName: string;
  email: string;
}

// Profile type matching what your backend might return
interface UserProfile {
  id: string;
  name: string;
  avatar_url: string | null;
  badge_level: number;
  task_points: number;
  merit_points: number;
  selected_template: string | null;
  selected_subfield: string | null;
}

interface UserContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (userData: User) => void;
  signOut: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to sign in user (called after successful authentication)
  const signIn = (userData: User) => {
    setUser(userData);
    // You might want to fetch the profile here as well
    fetchUserProfile(userData.id);
  };

  // Function to sign out user
  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setProfile(null);
  };

  // Function to update profile
  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => (prev ? { ...prev, ...updates } : null));
    
    // You might want to save these changes to the backend
    if (user && updates) {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:5000/api/auth/update-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updates)
        })
        .then(response => {
          if (!response.ok) throw new Error('Failed to update profile');
          return response.json();
        })
        .catch(err => {
          console.error('Error updating profile:', err);
          setError('Failed to update profile');
        });
      }
    }
  };

  // Function to fetch user profile from backend
  const fetchUserProfile = async (userId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/profile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const profileData = await response.json();
      setProfile(profileData);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch profile');
    }
  };

  // Function to refresh user data from token
  const refreshUser = async () => {
    setLoading(true);
    setError(null);
    
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const userData = await response.json();
      setUser(userData);
      
      // After setting the user, fetch their profile
      if (userData.id) {
        await fetchUserProfile(userData.id);
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Authentication failed');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    refreshUser();
  }, []);

  const value = {
    user,
    profile,
    loading,
    error,
    signIn,
    signOut,
    updateProfile,
    refreshUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};