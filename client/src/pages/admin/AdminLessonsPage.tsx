import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { AccessBadge } from '../../components/ui/AccessBadge';

export function AdminLessonsPage() {
  const [lessons] = useState([
    { id: '1', title: '1.1 Introduction to Limits', subject: 'Mathematics', tier: 'free' as const, status: 'published', amharic: true },
    { id: '2', title: '1.2 Limit Laws and Computing Limits', subject: 'Mathematics', tier: 'free' as const, status: 'published', amharic: true },
    { id: '3', title: '1.3 Continuity and Asymptotes', subject: 'Mathematics', tier: 'premium' as const, status: 'published', amharic: false },
    { id: '4', title: '2.1 Definition of the Derivative', subject: 'Mathematics', tier: 'free' as const, status: 'published', amharic: true },
    { id: '5', title: '2.2 Product and Quotient Rules', subject: 'Mathematics', tier: 'premium' as const, status: 'draft', amharic: false },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-brand-navy">Lesson Editor &amp; CMS</h1>
          <p className="text-body-sm text-text-secondary">
            Draft, edit Markdown/KaTeX formulas, and publish bilingual lessons
          </p>
        </div>
        <Button variant="primary">+ New Lesson</Button>
      </div>

      <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface-muted border-b border-border text-caption text-text-muted uppercase">
            <tr>
              <th className="p-4">Lesson Title</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Tier</th>
              <th className="p-4">Amharic Translation</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {lessons.map((l) => (
              <tr key={l.id} className="hover:bg-brand-bg transition-colors">
                <td className="p-4 font-semibold text-brand-navy">{l.title}</td>
                <td className="p-4 text-text-secondary">{l.subject}</td>
                <td className="p-4"><AccessBadge tier={l.tier} /></td>
                <td className="p-4">
                  {l.amharic ? (
                    <span className="text-status-success font-medium">✓ Complete</span>
                  ) : (
                    <span className="text-status-warning font-medium">⚠ Pending</span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-caption font-bold ${
                    l.status === 'published' ? 'bg-status-success/10 text-status-success' : 'bg-brand-bg text-text-muted'
                  }`}>
                    {l.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-brand-teal hover:underline font-medium">Edit</button>
                  <button className="text-text-muted hover:text-text-primary">Preview</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

