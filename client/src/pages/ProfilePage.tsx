import { useLanguage } from '../lib/i18n';
import { useAuth } from '../lib/auth/AuthContext';
import { Button } from '../components/ui/Button';
import { AccessBadge } from '../components/ui/AccessBadge';
import type { Stream } from '../../../shared/types';

export function ProfilePage() {
  const { t, language, setLanguage } = useLanguage();
  const { user, updateStream, upgradeToPremium } = useAuth();

  return (
    <div className="max-w-[700px] mx-auto space-y-6">
      <div>
        <h1 className="text-h1 font-bold text-brand-navy mb-1">{t('nav.profile')}</h1>
        <p className="text-body-sm text-text-secondary">
          Manage your account preferences, stream, and language
        </p>
      </div>

      <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-6">
        {/* Account Details */}
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <div className="w-16 h-16 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-2xl">
            {user?.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-h2 font-bold text-brand-navy">{user?.displayName}</h2>
            <p className="text-body-sm text-text-secondary">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-caption font-semibold px-2 py-0.5 rounded bg-brand-bg text-brand-teal uppercase">
                {user?.role}
              </span>
              <AccessBadge tier={user?.accessTier || 'free'} />
            </div>
          </div>
        </div>

        {/* Stream Preference */}
        <div className="space-y-3 pb-6 border-b border-border">
          <h3 className="font-bold text-body text-brand-navy">National Exam Stream</h3>
          <p className="text-body-sm text-text-secondary">
            Select your academic stream to filter your default subjects and questions.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'natural_science', label: '🔬 Natural Science' },
              { id: 'social_science', label: '🏛️ Social Science' },
            ].map((stream) => (
              <button
                key={stream.id}
                type="button"
                onClick={() => updateStream(stream.id as Stream)}
                className={`p-3 rounded-button border text-left font-medium text-body-sm transition-all cursor-pointer ${
                  user?.stream === stream.id
                    ? 'border-brand-teal bg-brand-teal/10 font-bold ring-2 ring-brand-teal/20'
                    : 'border-border bg-surface hover:bg-brand-bg'
                }`}
              >
                {stream.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language Preference */}
        <div className="space-y-3 pb-6 border-b border-border">
          <h3 className="font-bold text-body text-brand-navy">Interface Language</h3>
          <p className="text-body-sm text-text-secondary">
            Choose whether to display the interface and explanations in English or Amharic.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'en', label: '🇬🇧 English' },
              { id: 'am', label: '🇪🇹 አማርኛ (Amharic)' },
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => setLanguage(lang.id as 'en' | 'am')}
                className={`p-3 rounded-button border text-left font-medium text-body-sm transition-all cursor-pointer ${
                  language === lang.id
                    ? 'border-brand-teal bg-brand-teal/10 font-bold ring-2 ring-brand-teal/20'
                    : 'border-border bg-surface hover:bg-brand-bg'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Membership Tier */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-card bg-brand-bg border border-border">
          <div>
            <h4 className="font-bold text-body text-brand-navy">Current Plan</h4>
            <p className="text-body-sm text-text-secondary">
              {user?.accessTier === 'premium'
                ? 'Premium Membership — Full Access Unlocked'
                : 'Free Tier — Core Lessons & Practice Sets'}
            </p>
          </div>
          {user?.accessTier === 'free' && (
            <Button size="sm" variant="secondary" onClick={upgradeToPremium}>
              Upgrade to Premium
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

