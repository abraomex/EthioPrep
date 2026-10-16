import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { AccessBadge } from '../../components/ui/AccessBadge';

export function AdminResourcesPage() {
  const [resources] = useState([
    { id: '1', title: 'Grade 12 Mathematics Formula Sheet', type: 'PDF', tier: 'free' as const, downloads: 1420 },
    { id: '2', title: 'Physics Mechanics & Thermodynamics Quick Guide', type: 'PDF', tier: 'free' as const, downloads: 980 },
    { id: '3', title: 'Organic Reaction Mechanisms Reference', type: 'PDF', tier: 'premium' as const, downloads: 410 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-brand-navy">Resource Manager</h1>
          <p className="text-body-sm text-text-secondary">
            Upload and manage downloadable study guides, formula sheets, and references
          </p>
        </div>
        <Button variant="primary">+ Upload Resource</Button>
      </div>

      <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface-muted border-b border-border text-caption text-text-muted uppercase">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Format</th>
              <th className="p-4">Access Tier</th>
              <th className="p-4">Downloads</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {resources.map((r) => (
              <tr key={r.id} className="hover:bg-brand-bg transition-colors">
                <td className="p-4 font-semibold text-brand-navy">{r.title}</td>
                <td className="p-4 text-text-secondary">{r.type}</td>
                <td className="p-4"><AccessBadge tier={r.tier} /></td>
                <td className="p-4 text-text-secondary">{r.downloads}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-brand-teal hover:underline font-medium">Edit</button>
                  <button className="text-status-error hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

