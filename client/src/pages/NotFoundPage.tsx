import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-7xl mb-4 font-black text-brand-navy">404</span>
      <h1 className="text-h2 font-bold text-brand-navy mb-2">Page Not Found / ገጹ አልተገኘም</h1>
      <p className="text-body text-text-secondary max-w-md mb-6">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to="/">
        <Button variant="primary">Return to Home</Button>
      </Link>
    </div>
  );
}

