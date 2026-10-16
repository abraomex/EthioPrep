import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Header, Footer, MobileNav, DashboardSidebar } from '../navigation';
import { useAuth } from '../../lib/auth/AuthContext';

export function DashboardLayout() {
  const { isAuthenticated } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If not logged in, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-text-primary">
      <Header variant="student" />
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto">
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>
      <Footer minimal />
      <MobileNav variant="student" />
    </div>
  );
}

