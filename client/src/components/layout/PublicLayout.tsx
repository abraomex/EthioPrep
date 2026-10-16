import { Outlet } from 'react-router-dom';
import { Header, Footer, MobileNav } from '../navigation';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-text-primary">
      <Header variant="public" />
      <main className="flex-1 w-full pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav variant="public" />
    </div>
  );
}

