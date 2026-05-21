import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';

const validateRegister = (email, password) => {
  if (!email.trim() || !password.trim()) {
    return 'Email and password are required.';
  }

  if (!email.includes('@')) {
    return 'Please enter a valid email address.';
  }

  if (password.length < 8) {
    return 'Password should be at least 8 characters long.';
  }

  return '';
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    const validationMessage = validateRegister(email, password);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || 'Registration failed. Please try again.');
      }

      localStorage.setItem('dhaaga_token', payload.token);
      navigate('/onboarding');
    } catch (registrationError) {
      setError(registrationError.message || 'Unable to create account right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dhaaga-bg flex flex-col">
      <nav className="border-b border-dhaaga-border sticky top-0 bg-dhaaga-bg/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-dhaaga-accent flex items-center justify-center">
              <span className="text-dhaaga-cards font-heading text-lg italic">D</span>
            </div>
            <span className="font-heading text-2xl font-semibold tracking-wide text-dhaaga-primary">Dhaaga</span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-full max-w-md bg-dhaaga-cards p-10 rounded-2xl border border-dhaaga-border shadow-sm">
          <h1 className="font-heading text-4xl text-dhaaga-primary mb-2 text-center">Join Dhaaga</h1>
          <p className="text-dhaaga-muted text-center mb-8">Start your journey as a premium Indian brand.</p>

          {error && (
            <div className="p-4 mb-6 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <Input
              label="Email Address"
              type="email"
              id="register-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="brand@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-4 bg-dhaaga-primary text-dhaaga-cards text-sm font-medium rounded-full hover:bg-dhaaga-primary/90 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-dhaaga-muted">
            Already partnered with us?{' '}
            <Link to="/login" className="text-dhaaga-accent hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
