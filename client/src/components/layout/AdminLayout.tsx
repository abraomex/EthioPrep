import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Header, Footer, DashboardSidebar } from '../navigation';
import { useAuth } from '../../lib/auth/AuthContext';

export function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-text-primary">
      <Header variant="admin" />
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto">
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isAdminArea={true}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <Footer minimal />
    </div>
  );
}

