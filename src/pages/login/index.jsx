import React from 'react';
import { Link } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import Icon from '../../components/AppIcon';


const Login = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <LoginHeader />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;