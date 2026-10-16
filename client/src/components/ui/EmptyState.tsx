import { Button } from './Button';

interface EmptyStateProps {
  icon: 'bookmarks' | 'history' | 'search' | 'subjects' | 'exams';
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons: Record<string, string> = {
  bookmarks: '🔖',
  history: '📋',
  search: '🔍',
  subjects: '📚',
  exams: '📝',
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="text-6xl mb-4" role="img" aria-hidden="true">
        {icons[icon]}
      </span>
      <h3 className="text-h3 font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-body text-text-secondary max-w-md mb-6">{description}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
