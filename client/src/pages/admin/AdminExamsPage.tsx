import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { AccessBadge } from '../../components/ui/AccessBadge';

export function AdminExamsPage() {
  const [exams] = useState([
    { id: '1', title: 'Grade 12 Mathematics Mock 1', subject: 'Mathematics', duration: '90 min', questions: 40, tier: 'free' as const },
    { id: '2', title: 'Grade 12 Physics Full Mock Test', subject: 'Physics', duration: '120 min', questions: 50, tier: 'premium' as const },
    { id: '3', title: 'Chemistry National Exam Simulation', subject: 'Chemistry', duration: '90 min', questions: 40, tier: 'premium' as const },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-brand-navy">Exam Builder</h1>
          <p className="text-body-sm text-text-secondary">
            Assemble questions into timed mock exams and set access tiers
          </p>
        </div>
        <Button variant="primary">+ Build New Exam</Button>
      </div>

      <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface-muted border-b border-border text-caption text-text-muted uppercase">
            <tr>
              <th className="p-4">Exam Title</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Questions</th>
              <th className="p-4">Access Tier</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {exams.map((e) => (
              <tr key={e.id} className="hover:bg-brand-bg transition-colors">
                <td className="p-4 font-semibold text-brand-navy">{e.title}</td>
                <td className="p-4 text-text-secondary">{e.subject}</td>
                <td className="p-4 text-text-secondary">{e.duration}</td>
                <td className="p-4 text-text-secondary">{e.questions} Qs</td>
                <td className="p-4"><AccessBadge tier={e.tier} /></td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-brand-teal hover:underline font-medium">Configure</button>
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

