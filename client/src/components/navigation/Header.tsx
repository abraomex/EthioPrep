import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../lib/i18n';
import { useAuth } from '../../lib/auth/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '../ui/Button';

interface HeaderProps {
  variant?: 'public' | 'student' | 'admin';
}

export function Header({ variant = 'public' }: HeaderProps) {
  const { t, language } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/subjects', label: t('nav.subjects') },
    { to: '/resources', label: t('nav.resources') },
    { to: '/about', label: t('nav.about') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-navy text-white shadow-nav">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white hover:text-white/90 transition-opacity"
        >
          <span className="w-8 h-8 rounded-badge bg-brand-teal flex items-center justify-center font-black text-white text-lg shadow-sm">
            E
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-extrabold text-white">EthioPrep</span>
            <span className="text-[10px] font-normal text-white/70 tracking-wider uppercase">
              {language === 'am' ? 'የ12ኛ ክፍል ዝግጅት' : 'Grade 12 Prep'}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`
                px-3 py-1.5 rounded-button text-body-sm font-medium transition-colors
                ${isActive(link.to)
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }
              `.trim()}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`
                px-3 py-1.5 rounded-button text-body-sm font-medium transition-colors
                ${isActive('/dashboard')
                  ? 'bg-brand-teal text-white font-semibold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }
              `.trim()}
            >
              {t('nav.dashboard')}
            </Link>
          )}
          {variant === 'admin' && (
            <Link
              to="/admin"
              className="px-3 py-1.5 rounded-button text-body-sm font-semibold bg-brand-gold text-brand-navy hover:bg-brand-gold-light"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-button bg-white/10 hover:bg-white/15 text-body-sm text-white"
                title="Profile"
              >
                <span className="w-6 h-6 rounded-full bg-brand-teal text-white flex items-center justify-center text-xs font-bold">
                  {user?.displayName.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className="max-w-[120px] truncate">{user?.displayName}</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="px-3 py-1.5 rounded-button text-body-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" className="bg-brand-teal hover:bg-brand-teal-light text-white">
                  {t('nav.register')}
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher compact />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-button text-white/80 hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-brand-teal"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-brand-navy px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  px-3 py-2.5 rounded-button text-body font-medium transition-colors
                  ${isActive(link.to) ? 'bg-white/15 text-white font-semibold' : 'text-white/80'}
                `}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    px-3 py-2.5 rounded-button text-body font-medium transition-colors
                    ${isActive('/dashboard') ? 'bg-brand-teal text-white font-semibold' : 'text-white/80'}
                  `}
                >
                  {t('nav.dashboard')}
                </Link>
                <Link
                  to="/bookmarks"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-button text-body font-medium text-white/80"
                >
                  {t('nav.bookmarks')}
                </Link>
                <Link
                  to="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-button text-body font-medium text-white/80"
                >
                  {t('nav.history')}
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-button text-body font-medium text-white/80"
                >
                  {t('nav.profile')}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2.5 text-body text-red-300 hover:text-red-200"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth className="border-white/30 text-white hover:bg-white/10">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth className="bg-brand-teal text-white">
                    {t('nav.register')}
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

