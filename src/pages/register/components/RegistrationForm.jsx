import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useAuth } from '../../../contexts/AuthContext';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    avatar: '',
    acceptTerms: false,
    acceptMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const passwordRequirements = [
    { id: 'length', text: 'At least 8 characters', regex: /.{8,}/ },
    { id: 'uppercase', text: 'One uppercase letter', regex: /[A-Z]/ },
    { id: 'lowercase', text: 'One lowercase letter', regex: /[a-z]/ },
    { id: 'number', text: 'One number', regex: /\d/ },
    { id: 'special', text: 'One special character', regex: /[!@#$%^&*(),.?":{}|<>]/ }
  ];

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
        setImageLoading(false);
      };
      reader.onerror = () => {
        setImageLoading(false);
        setErrors(prev => ({ ...prev, avatar: 'Failed to load image. Please try again.' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.avatar) {
      newErrors.avatar = 'Profile image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const failedRequirements = passwordRequirements.filter(req => !req.regex.test(formData.password));
      if (failedRequirements.length > 0) {
        newErrors.password = 'Password does not meet all requirements';
      }
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Password confirmation is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{8,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        navigate('/homepage');
      } else {
        setErrors({ submit: result.error || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const metRequirements = passwordRequirements.filter(req => req.regex.test(formData.password));
    const strength = metRequirements.length;
    
    if (strength <= 2) return { level: 'weak', color: 'bg-error', text: 'Weak' };
    if (strength <= 3) return { level: 'medium', color: 'bg-warning', text: 'Medium' };
    if (strength <= 4) return { level: 'good', color: 'bg-accent', text: 'Good' };
    return { level: 'strong', color: 'bg-success', text: 'Strong' };
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-inter text-text-secondary">
            Step {currentStep} of 2
          </span>
          <span className="text-sm font-inter text-text-secondary">
            {currentStep === 1 ? 'Basic information' : 'Security'}
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 2) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            {/* Avatar Upload */}
            <div>
              <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                PROFILE IMAGE
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-surface border-2 border-border flex items-center justify-center relative">
                  {imageLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  ) : formData.avatar ? (
                    <img src={formData.avatar} alt="Avatar preview" className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="User" size={32} className="text-text-secondary" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-accent"
                  />
                  <p className="text-xs font-inter text-text-secondary mt-1">
                    Upload a profile picture (JPG, PNG, GIF)
                  </p>
                </div>
              </div>
              {errors.avatar && <p className="text-error text-xs mt-1">{errors.avatar}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'border-error' : ''}
                />
                {errors.firstName && (
                  <p className="text-error text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'border-error' : ''}
                />
                {errors.lastName && (
                  <p className="text-error text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-error' : ''}
              />
              {errors.email && (
                <p className="text-error text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="primary"
                onClick={handleNextStep}
                className="px-8"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Security */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-error' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
              {errors.password && (
                <p className="text-error text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-surface rounded-lg p-4">
              <h4 className="text-sm font-inter font-medium text-text-primary mb-3">
                Password requirements:
              </h4>
              <div className="space-y-2">
                {passwordRequirements.map((req) => {
                  const isMet = req.regex.test(formData.password);
                  return (
                    <div key={req.id} className="flex items-center space-x-2">
                      <Icon 
                        name={isMet ? 'Check' : 'X'} 
                        size={16} 
                        className={isMet ? 'text-success' : 'text-error'} 
                      />
                      <span className={`text-xs font-inter ${isMet ? 'text-success' : 'text-text-secondary'}`}>
                        {req.text}
                      </span>
                    </div>
                  );
                })}
              </div>
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-inter text-text-secondary">Password strength:</span>
                    <span className={`text-xs font-inter font-medium ${getPasswordStrength().color.replace('bg-', 'text-')}`}>
                      {getPasswordStrength().text}
                    </span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-1">
                    <div 
                      className={`${getPasswordStrength().color} h-1 rounded-full transition-all duration-300`}
                      style={{ width: `${(passwordRequirements.filter(req => req.regex.test(formData.password)).length / passwordRequirements.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={errors.confirmPassword ? 'border-error' : ''}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
              {errors.confirmPassword && (
                <p className="text-error text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-error' : ''}
              />
              {errors.phone && (
                <p className="text-error text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Terms and Marketing */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-inter text-text-primary">
                    I accept the terms and conditions *
                  </span>
                  <p className="text-xs font-inter text-text-secondary mt-1">
                    Read our{' '}
                    <Link to="/homepage" className="text-primary hover:underline">
                      terms of service
                    </Link>
                    {' '}and{' '}
                    <Link to="/homepage" className="text-primary hover:underline">
                      privacy policy
                    </Link>
                  </p>
                </div>
              </label>
              {errors.acceptTerms && (
                <p className="text-error text-xs ml-7">{errors.acceptTerms}</p>
              )}

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptMarketing}
                  onChange={(e) => handleInputChange('acceptMarketing', e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-inter text-text-primary">
                    I want to receive marketing communications
                  </span>
                  <p className="text-xs font-inter text-text-secondary mt-1">
                    Receive special offers, travel tips, and updates. You can unsubscribe at any time.
                  </p>
                </div>
              </label>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error" />
                  <p className="text-sm font-inter text-error">{errors.submit}</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                className="px-8"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                disabled={isLoading}
                className="px-8"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </div>
          </div>
        )}
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-sm font-inter text-text-secondary">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;