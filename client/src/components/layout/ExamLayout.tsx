import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth/AuthContext';

export function ExamLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-bg text-text-primary flex flex-col select-none">
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

