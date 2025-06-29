import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('stayease_user');
        const storedAuth = localStorage.getItem('stayease_isAuthenticated');
        
        if (storedUser && storedAuth === 'true') {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading authentication data:', error);
        // Clear corrupted data
        localStorage.removeItem('stayease_user');
        localStorage.removeItem('stayease_isAuthenticated');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle automatic redirection when authentication state changes
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Only redirect if we're on a protected route
      const protectedRoutes = ['/user-profile', '/booking-confirmation'];
      if (protectedRoutes.includes(window.location.pathname)) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, loading, navigate]);

  const login = async (email, password) => {
    try {
      console.log('Login attempt:', { email, password });
      
      // First check hardcoded credentials (for demo purposes)
      if (email === 'user@stayease.com' && password === 'password123') {
        console.log('Using hardcoded credentials');
        const userData = {
          id: '1',
          name: 'John Smith',
          email: email,
          phone: '+1 234 567 890',
          location: 'New York, USA',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          joinDate: 'January 2023',
          isVerified: true
        };
        
        localStorage.setItem('stayease_user', JSON.stringify(userData));
        localStorage.setItem('stayease_isAuthenticated', 'true');
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Migrate old bookings to user-specific system
        migrateOldBookings(userData.id);
        
        console.log('Login successful with hardcoded credentials');
        return { success: true };
      }

      // Check registered users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('stayease_users') || '[]');
      console.log('Registered users:', existingUsers);
      
      const user = existingUsers.find(u => u.email === email);
      console.log('Found user:', user);
      
      if (user && user.password === password) {
        console.log('Password match successful');
        // Remove password from user object before storing in session
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('stayease_user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('stayease_isAuthenticated', 'true');
        
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        
        // Migrate old bookings to user-specific system
        migrateOldBookings(userWithoutPassword.id);
        
        console.log('Login successful with registered user');
        return { success: true };
      } else {
        console.log('Login failed: Invalid credentials');
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  // Function to migrate old bookings to user-specific system
  const migrateOldBookings = (userId) => {
    try {
      const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      let hasChanges = false;
      
      const migratedBookings = storedBookings.map(booking => {
        // If booking doesn't have userId, assign it to current user
        if (!booking.userId) {
          hasChanges = true;
          return { ...booking, userId: userId };
        }
        return booking;
      });
      
      if (hasChanges) {
        localStorage.setItem('userBookings', JSON.stringify(migratedBookings));
        console.log('Migrated old bookings to user-specific system');
      }
    } catch (error) {
      console.error('Error migrating bookings:', error);
    }
  };

  const register = async (userData) => {
    try {
      console.log('Registration attempt:', { email: userData.email, name: `${userData.firstName} ${userData.lastName}` });
      
      // Mock registration - in real app this would be an API call
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('stayease_users') || '[]');
      const userExists = existingUsers.find(u => u.email === userData.email);
      
      if (userExists) {
        console.log('Registration failed: User already exists');
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password, // Store password for demo purposes
        phone: userData.phone,
        location: '',
        avatar: userData.avatar || '',
        joinDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        }),
        isVerified: false
      };

      console.log('Created new user:', { ...newUser, password: '[HIDDEN]' });

      // Save to users list
      existingUsers.push(newUser);
      localStorage.setItem('stayease_users', JSON.stringify(existingUsers));

      // Auto-login after registration
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('stayease_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('stayease_isAuthenticated', 'true');
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      console.log('Registration successful and auto-login completed');
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('stayease_user');
    localStorage.removeItem('stayease_isAuthenticated');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    localStorage.setItem('stayease_user', JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 