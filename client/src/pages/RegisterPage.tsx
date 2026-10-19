import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { useAuth } from '../lib/auth/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import type { Stream } from '../../../shared/types';

export function RegisterPage() {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stream, setStream] = useState<Stream>('natural_science');
  const [error, setError] = useState('');

  const streamOptions = [
    { value: 'natural_science', labelEn: 'Natural Science (የተፈጥሮ ሳይንስ)', labelAm: 'የተፈጥሮ ሳይንስ' },
    { value: 'social_science', labelEn: 'Social Science (ማህበራዊ ሳይንስ)', labelAm: 'ማህበራዊ ሳይንስ' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    try {
      setError('');
      await register({
        displayName,
        email,
        password,
        stream,
        preferredLanguage: 'en',
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface p-8 rounded-card border border-border shadow-modal">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-badge bg-brand-teal text-white flex items-center justify-center font-bold text-lg">
              E
            </span>
            <span className="font-extrabold text-xl text-brand-navy">EthioPrep</span>
          </Link>
          <h1 className="text-h2 font-bold text-brand-navy">{t('auth.register')}</h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Create your account to start preparing for Grade 12
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="register-name"
            label={t('auth.displayName')}
            placeholder="Abebe Kebede"
            value={displayName}
            onChange={setDisplayName}
            required
          />

          <Input
            id="register-email"
            type="email"
            label={t('auth.email')}
            placeholder="abebe@example.com"
            value={email}
            onChange={setEmail}
            required
          />

          <Input
            id="register-password"
            type="password"
            label={t('auth.password')}
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            required
          />

          <Select
            id="register-stream"
            label={t('auth.stream')}
            value={stream}
            onChange={(val) => setStream(val as Stream)}
            options={streamOptions}
            required
          />

          {error && <p className="text-caption text-status-error">{error}</p>}

          <Button type="submit" variant="primary" fullWidth size="lg">
            {t('auth.register')}
          </Button>
        </form>

        <p className="text-body-sm text-text-secondary text-center mt-6">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-brand-teal font-semibold hover:underline">
            {t('auth.loginLink')}
          </Link>
        </p>
      </div>
    </div>
  );
}

