import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { useAuth } from '../lib/auth/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function LoginPage() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    try {
      setError('');
      const loggedInUser = await login(email, password);
      if (loggedInUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleDemoStudent = async () => {
    try {
      await login('student@ethioprep.edu.et', 'Password123!');
      navigate('/dashboard');
    } catch {
      navigate('/dashboard');
    }
  };

  const handleDemoAdmin = async () => {
    try {
      await login('admin@ethioprep.edu.et', 'Admin123!');
      navigate('/admin');
    } catch {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface p-8 rounded-card border border-border shadow-modal">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-badge bg-brand-teal text-white flex items-center justify-center font-bold text-lg">
              E
            </span>
            <span className="font-extrabold text-xl text-brand-navy">EthioPrep</span>
          </Link>
          <h1 className="text-h2 font-bold text-brand-navy">{t('auth.login')}</h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Sign in to continue your Grade 12 preparation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="login-email"
            type="email"
            label={t('auth.email')}
            placeholder="student@example.com"
            value={email}
            onChange={setEmail}
            required
          />

          <Input
            id="login-password"
            type="password"
            label={t('auth.password')}
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            required
          />

          {error && <p className="text-caption text-status-error">{error}</p>}

          <Button type="submit" variant="primary" fullWidth size="lg">
            {t('auth.login')}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border space-y-3">
          <p className="text-caption text-text-muted text-center uppercase tracking-wider font-semibold">
            Quick Demo Accounts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDemoStudent}
              className="text-caption"
            >
              👤 Student Demo
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleDemoAdmin}
              className="text-caption"
            >
              🛡️ Admin Demo
            </Button>
          </div>
        </div>

        <p className="text-body-sm text-text-secondary text-center mt-6">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="text-brand-teal font-semibold hover:underline">
            {t('auth.registerLink')}
          </Link>
        </p>
      </div>
    </div>
  );
}

