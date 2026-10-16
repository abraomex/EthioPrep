import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../lib/i18n';
import { useAuth } from '../../lib/auth/AuthContext';

interface MobileNavProps {
  variant?: 'public' | 'student' | 'admin';
}

export function MobileNav({ variant: _variant = 'public' }: MobileNavProps) {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const tabs = [
    {
      to: '/',
      label: t('nav.home'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      to: '/subjects',
      label: t('nav.subjects'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      to: isAuthenticated ? '/dashboard' : '/login',
      label: isAuthenticated ? t('nav.dashboard') : t('nav.login'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      to: isAuthenticated ? '/bookmarks' : '/resources',
      label: isAuthenticated ? t('nav.bookmarks') : t('nav.resources'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
    {
      to: isAuthenticated ? '/profile' : '/register',
      label: isAuthenticated ? t('nav.profile') : t('nav.register'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:hidden h-16 px-2 flex items-center justify-around"
      aria-label="Mobile Bottom Navigation"
    >
      {tabs.map((tab) => {
        const active = isActive(tab.to);
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={`
              flex flex-col items-center justify-center flex-1 py-1 px-1 min-w-[56px] text-center
              transition-colors
              ${active ? 'text-brand-teal font-semibold' : 'text-text-muted hover:text-text-primary'}
            `}
          >
            <div className={`p-1 rounded-full ${active ? 'bg-brand-teal/10' : ''}`}>
              {tab.icon}
            </div>
            <span className="text-[11px] leading-tight truncate max-w-full">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
