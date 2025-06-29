import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';


const PaymentMethodForm = ({ onPaymentInfoChange, paymentInfo }) => {
  const [errors, setErrors] = useState({});
  const [selectedMethod, setSelectedMethod] = useState(paymentInfo.method || 'card');

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'cardNumber':
        const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
        if (!value.trim()) {
          newErrors[name] = 'Card number is required';
        } else if (!cardRegex.test(value.replace(/\s/g, ''))) {
          newErrors[name] = 'Invalid card number';
        } else {
          delete newErrors[name];
        }
        break;
      case 'expiryDate':
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!value.trim()) {
          newErrors[name] = 'Expiry date is required';
        } else if (!expiryRegex.test(value)) {
          newErrors[name] = 'Format: MM/YY';
        } else {
          delete newErrors[name];
        }
        break;
      case 'cvv':
        const cvvRegex = /^\d{3,4}$/;
        if (!value.trim()) {
          newErrors[name] = 'CVV is required';
        } else if (!cvvRegex.test(value)) {
          newErrors[name] = 'Invalid CVV';
        } else {
          delete newErrors[name];
        }
        break;
      case 'cardholderName':
        if (!value.trim()) {
          newErrors[name] = 'Cardholder name is required';
        } else if (value.trim().length < 2) {
          newErrors[name] = 'Minimum 2 characters';
        } else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;

    // Format card number
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    }

    // Format CVV
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    onPaymentInfoChange(field, formattedValue);
    validateField(field, formattedValue);
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    onPaymentInfoChange('method', method);
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay securely through PayPal'
    },
    {
      id: 'blik',
      name: 'BLIK',
      icon: 'Smartphone',
      description: 'Fast mobile payment'
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      icon: 'Building',
      description: 'Traditional bank transfer'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-4">
          Choose payment method
        </h3>
        
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedMethod === method.id
                  ? 'border-primary bg-surface' :'border-border hover:border-primary hover:bg-surface'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => handleMethodChange(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === method.id ? 'border-primary' : 'border-border'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                  )}
                </div>
                <Icon name={method.icon} size={20} className="text-text-secondary" />
                <div className="flex-1">
                  <p className="text-sm font-inter font-medium text-text-primary">
                    {method.name}
                  </p>
                  <p className="text-xs font-inter text-text-secondary">
                    {method.description}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Card Details Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-4">
          <h4 className="text-md font-inter font-medium text-text-primary">
            Card details
          </h4>
          
          <div>
            <label className="block text-sm font-inter font-medium text-text-primary mb-2">
              Card number *
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentInfo.cardNumber || ''}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                className={`pr-12 ${errors.cardNumber ? 'border-error' : ''}`}
                maxLength="19"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Icon name="CreditCard" size={20} className="text-text-secondary" />
              </div>
            </div>
            {errors.cardNumber && (
              <p className="mt-1 text-xs font-inter text-error flex items-center">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {errors.cardNumber}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                Expiry date *
              </label>
              <Input
                type="text"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate || ''}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                className={errors.expiryDate ? 'border-error' : ''}
                maxLength="5"
              />
              {errors.expiryDate && (
                <p className="mt-1 text-xs font-inter text-error flex items-center">
                  <Icon name="AlertCircle" size={12} className="mr-1" />
                  {errors.expiryDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                CVV *
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="123"
                  value={paymentInfo.cvv || ''}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className={`pr-8 ${errors.cvv ? 'border-error' : ''}`}
                  maxLength="4"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Icon name="HelpCircle" size={16} className="text-text-secondary" />
                </div>
              </div>
              {errors.cvv && (
                <p className="mt-1 text-xs font-inter text-error flex items-center">
                  <Icon name="AlertCircle" size={12} className="mr-1" />
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-text-primary mb-2">
              Cardholder name *
            </label>
            <Input
              type="text"
              placeholder="John Smith"
              value={paymentInfo.cardholderName || ''}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              className={errors.cardholderName ? 'border-error' : ''}
            />
            {errors.cardholderName && (
              <p className="mt-1 text-xs font-inter text-error flex items-center">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {errors.cardholderName}
              </p>
            )}
          </div>

          {/* Billing Address */}
          <div className="pt-4 border-t border-border">
            <h4 className="text-md font-inter font-medium text-text-primary mb-4">
              Billing address
            </h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                    Country/Region
                  </label>
                  <select
                    value={paymentInfo.country || 'PL'}
                    onChange={(e) => onPaymentInfoChange('country', e.target.value)}
                    className="w-full px-3 py-2 border border-border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="PL">Poland</option>
                    <option value="DE">Germany</option>
                    <option value="UK">United Kingdom</option>
                    <option value="US">United States</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                    Postal code
                  </label>
                  <Input
                    type="text"
                    placeholder="00-000"
                    value={paymentInfo.postalCode || ''}
                    onChange={(e) => onPaymentInfoChange('postalCode', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alternative Payment Methods Info */}
      {selectedMethod === 'paypal' && (
        <div className="p-4 bg-surface rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-text-secondary mt-0.5" />
            <div>
              <p className="text-sm font-inter font-medium text-text-primary mb-1">
                PayPal payment
              </p>
              <p className="text-xs font-inter text-text-secondary">
                After clicking "Confirm and pay" you will be redirected to PayPal 
                to complete the payment securely.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'blik' && (
        <div className="p-4 bg-surface rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-text-secondary mt-0.5" />
            <div>
              <p className="text-sm font-inter font-medium text-text-primary mb-1">
                BLIK payment
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Prepare your banking app with an active BLIK code. 
                After confirming the reservation, you will receive a 6-digit code to enter in the app.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'transfer' && (
        <div className="p-4 bg-surface rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-text-secondary mt-0.5" />
            <div>
              <p className="text-sm font-inter font-medium text-text-primary mb-1">
                Bank transfer
              </p>
              <p className="text-xs font-inter text-text-secondary">
                After confirming the reservation, you will receive transfer details. 
                The reservation will be confirmed after receiving payment (1-3 business days).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs font-inter text-text-secondary">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs font-inter text-text-secondary">256-bit Encryption</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-xs font-inter text-text-secondary">PCI Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodForm;