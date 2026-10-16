import { useState } from 'react';
import { Button } from '../../components/ui/Button';

export function AdminSubjectsPage() {
  const [subjects] = useState([
    { id: '1', titleEn: 'Mathematics', titleAm: 'ሒሳብ', stream: 'Natural Science', published: true, topics: 12 },
    { id: '2', titleEn: 'Physics', titleAm: 'ፊዚክስ', stream: 'Natural Science', published: true, topics: 10 },
    { id: '3', titleEn: 'Chemistry', titleAm: 'ኬሚስትሪ', stream: 'Natural Science', published: true, topics: 11 },
    { id: '4', titleEn: 'Economics', titleAm: 'ኢኮኖሚክስ', stream: 'Social Science', published: true, topics: 9 },
    { id: '5', titleEn: 'History', titleAm: 'ታሪክ', stream: 'Social Science', published: true, topics: 8 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-brand-navy">Subject &amp; Topic Manager</h1>
          <p className="text-body-sm text-text-secondary">
            Organize subjects and hierarchical topic trees
          </p>
        </div>
        <Button variant="primary">+ Add Subject</Button>
      </div>

      <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface-muted border-b border-border text-caption text-text-muted uppercase">
            <tr>
              <th className="p-4">Subject (En / Am)</th>
              <th className="p-4">Stream</th>
              <th className="p-4">Topics</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {subjects.map((s) => (
              <tr key={s.id} className="hover:bg-brand-bg transition-colors">
                <td className="p-4 font-semibold text-brand-navy">
                  {s.titleEn} / {s.titleAm}
                </td>
                <td className="p-4 text-text-secondary">{s.stream}</td>
                <td className="p-4 text-text-secondary">{s.topics} chapters</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-caption font-bold bg-status-success/10 text-status-success">
                    Published
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-brand-teal hover:underline font-medium">Edit</button>
                  <button className="text-text-muted hover:text-text-primary">Topics</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

