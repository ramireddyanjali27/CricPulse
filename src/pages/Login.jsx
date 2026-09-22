import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }
    localStorage.setItem('cricpulse_user', JSON.stringify({ email, name: 'CricPulse User' }));
    setMessage('Login successful! Redirecting...');
    setTimeout(() => window.location.href = '/', 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left__content">
          <div className="auth-left__logo">🏏</div>
          <h1>CricPulse</h1>
          <p>Your Cricket. Your Score. Your Game.</p>
          <div className="auth-left__balls">
            <div className="auth-ball auth-ball--1" />
            <div className="auth-ball auth-ball--2" />
            <div className="auth-ball auth-ball--3" />
          </div>
        </div>
      </div>

      <div className="auth-right">
        <motion.div
          className="auth-form-wrapper"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Welcome Back</h2>
          <p className="auth-form-subtitle">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="auth-input">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="auth-input">
                <Lock size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label className="auth-checkbox">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <a href="#" className="auth-forgot">Forgot password?</a>
            </div>

            {message && <div className={`auth-message ${message.includes('successful') ? 'auth-message--success' : 'auth-message--error'}`}>{message}</div>}

            <button type="submit" className="btn btn-primary btn-lg auth-submit">
              <LogIn size={18} /> Login
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
