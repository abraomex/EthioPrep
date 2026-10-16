import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../lib/i18n';
import { useAuth } from '../../lib/auth/AuthContext';
import { AccessBadge } from '../ui/AccessBadge';

interface DashboardSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  isAdminArea?: boolean;
}

export function DashboardSidebar({ collapsed = false, onToggle, isAdminArea = false }: DashboardSidebarProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const studentLinks = [
    {
      to: '/dashboard',
      label: t('nav.dashboard'),
      icon: '📊',
    },
    {
      to: '/subjects',
      label: t('nav.subjects'),
      icon: '📚',
    },
    {
      to: '/bookmarks',
      label: t('nav.bookmarks'),
      icon: '🔖',
    },
    {
      to: '/history',
      label: t('nav.history'),
      icon: '📋',
    },
    {
      to: '/profile',
      label: t('nav.profile'),
      icon: '⚙️',
    },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Admin Overview', icon: '📈' },
    { to: '/admin/subjects', label: 'Subjects & Topics', icon: '🗂️' },
    { to: '/admin/lessons', label: 'Lesson Editor', icon: '✏️' },
    { to: '/admin/questions', label: 'Question Bank', icon: '❓' },
    { to: '/admin/exams', label: 'Exam Builder', icon: '📝' },
    { to: '/admin/resources', label: 'Resource Manager', icon: '📁' },
  ];

  const links = isAdminArea ? adminLinks : studentLinks;

  return (
    <aside
      className={`
        hidden md:flex flex-col bg-surface border-r border-border shrink-0 transition-all duration-200
        ${collapsed ? 'w-16' : 'w-64'}
      `.trim()}
      aria-label="Dashboard Sidebar"
    >
      {/* User Info Header */}
      {!collapsed && user && (
        <div className="p-4 border-b border-border bg-surface-muted">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-base shrink-0">
              {user.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-semibold text-body-sm text-text-primary truncate">
                {user.displayName}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-medium text-text-muted capitalize">
                  {user.stream.replace('_', ' ')}
                </span>
                <AccessBadge tier={user.accessTier} size="sm" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const active = isActive(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-button text-body-sm font-medium transition-colors
                ${active
                  ? 'bg-brand-teal text-white shadow-sm'
                  : 'text-text-secondary hover:bg-brand-bg hover:text-text-primary'
                }
                ${collapsed ? 'justify-center px-2' : ''}
              `.trim()}
              title={collapsed ? link.label : undefined}
            >
              <span className="text-lg leading-none" role="img" aria-hidden="true">
                {link.icon}
              </span>
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-border flex items-center justify-between text-caption text-text-muted">
        {!collapsed && <span>EthioPrep v1.1</span>}
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="p-1.5 rounded-badge hover:bg-brand-bg text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '▶' : '◀'}
          </button>
        )}
      </div>
    </aside>
  );
}
