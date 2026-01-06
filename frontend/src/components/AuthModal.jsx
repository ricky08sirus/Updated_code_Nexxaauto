import React, { useState } from 'react';
import { X } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isLogin) {
      // Registration validation
      if (!formData.firstName || !formData.lastName) {
        setError('Please enter your full name');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    // Simulate API call
    const userData = {
      email: formData.email,
      firstName: isLogin ? 'User' : formData.firstName,
      lastName: isLogin ? '' : formData.lastName,
      token: 'dummy-token-' + Date.now()
    };

    // Save to localStorage (in real app, this would be handled by your auth system)
    localStorage.setItem('nexxaUser', JSON.stringify(userData));
    localStorage.setItem('nexxaToken', userData.token);

    // Call success callback
    onSuccess(userData);
    
    // Reset form
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="auth-modal-header">
          <h2 className="auth-modal-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="auth-modal-subtitle">
            {isLogin ? 'Sign in to continue' : 'Sign up to place your order'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-form-row">
              <div className="auth-form-group">
                <label className="auth-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="auth-input"
                  placeholder="John"
                  required={!isLogin}
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="auth-input"
                  placeholder="Doe"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="auth-form-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="auth-input"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="auth-input"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div className="auth-form-group">
              <label className="auth-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="auth-input"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button type="button" onClick={toggleMode} className="auth-toggle-btn">
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;