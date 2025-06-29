import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/homepage');
      } else {
        setErrors({
          general: result.error || 'Login failed. Please try again.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    // Simulate social login
    setTimeout(() => {
      // For demo purposes, we'll use the same mock credentials
      login('user@stayease.com', 'password123').then(result => {
        if (result.success) {
          navigate('/homepage');
        }
      });
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-background rounded-lg border border-border p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-poppins font-semibold text-text-primary mb-2">
            Log in
          </h1>
          <p className="text-sm font-inter text-text-secondary">
            Welcome back! Log in to your account
          </p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm font-inter text-error">{errors.general}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-error' : ''}
              required
            />
            {errors.email && (
              <p className="text-error text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={errors.password ? 'border-error' : ''}
              required
            />
            {errors.password && (
              <p className="text-error text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm font-inter text-text-primary">
                Remember me
              </span>
            </label>
            <Link
              to="/homepage"
              className="text-sm font-inter text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-4 text-sm font-inter text-text-secondary">
            or continue with
          </span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            className="w-full py-3"
            iconName="Chrome"
            iconPosition="left"
            disabled={isLoading}
          >
            Continue with Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('facebook')}
            className="w-full py-3"
            iconName="Facebook"
            iconPosition="left"
            disabled={isLoading}
          >
            Continue with Facebook
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm font-inter text-text-secondary">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Security Info */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-center space-x-4 text-xs font-inter text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} />
              <span>Secure login</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Lock" size={14} />
              <span>SSL encryption</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <Link
              to="/homepage"
              className="text-xs font-inter text-text-secondary hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="mx-2 text-text-secondary">•</span>
            <Link
              to="/homepage"
              className="text-xs font-inter text-text-secondary hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Mock Credentials Helper */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-inter font-medium text-accent mb-1">
              Test credentials
            </p>
            <p className="text-xs font-inter text-text-secondary">
              Email: user@stayease.com<br />
              Password: password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;