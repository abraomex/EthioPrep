import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth/AuthContext';
import { LoadingState } from '../ui/LoadingState';

export function AdminRoute() {
  const { user, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingState size="lg" label="Verifying admin credentials..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <span className="text-5xl mb-4">⛔</span>
        <h2 className="text-h2 font-bold text-brand-navy mb-2">Access Denied</h2>
        <p className="text-body text-text-secondary max-w-md mb-6">
          This portal is restricted to authorized EthioPrep Curriculum Administrators.
        </p>
        <a
          href="/dashboard"
          className="px-5 py-2.5 bg-brand-teal text-white rounded-button font-semibold hover:bg-brand-teal-light"
        >
          Return to Student Dashboard
        </a>
      </div>
    );
  }

  return <Outlet />;
}

