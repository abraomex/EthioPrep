import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export function AdminOverviewPage() {
  const cards = [
    { title: 'Subjects & Topics', count: '7 Subjects / 68 Topics', link: '/admin/subjects', icon: '🗂️' },
    { title: 'Lesson Management', count: '142 Lessons (110 Published)', link: '/admin/lessons', icon: '✏️' },
    { title: 'Question Bank', count: '1,280 Questions', link: '/admin/questions', icon: '❓' },
    { title: 'Exam Builder', count: '16 Mock Exams', link: '/admin/exams', icon: '📝' },
    { title: 'Resource Manager', count: '24 Study Guides', link: '/admin/resources', icon: '📁' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-caption font-bold text-brand-gold-dark uppercase tracking-wider">
            Curriculum Administration
          </span>
          <h1 className="text-h1 font-bold text-brand-navy mt-1">Admin Content Portal</h1>
          <p className="text-body-sm text-text-secondary">
            Manage Grade 12 bilingual curriculum, lessons, question banks, and exams
          </p>
        </div>
        <Link to="/admin/lessons">
          <Button variant="primary">+ Create New Lesson</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link
            key={c.link}
            to={c.link}
            className="p-6 rounded-card bg-surface border border-border shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-3xl mb-3 block">{c.icon}</span>
              <h3 className="text-h3 font-bold text-brand-navy group-hover:text-brand-teal transition-colors">
                {c.title}
              </h3>
              <p className="text-body-sm text-text-secondary mt-1">{c.count}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-caption text-brand-teal font-semibold">
              <span>Manage Items</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

