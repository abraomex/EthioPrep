import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { AccessBadge } from '../../components/ui/AccessBadge';
import type { AccessTier } from '../../../../shared/types';

interface ResourceItem {
  id: string;
  title: string;
  url: string;
  type: string;
  tier: AccessTier;
  downloads: number;
}

export function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([
    { id: '1', title: 'Grade 12 Mathematics Formula Sheet', url: 'https://example.com/math.pdf', type: 'PDF', tier: 'free', downloads: 1420 },
    { id: '2', title: 'Physics Mechanics & Thermodynamics Quick Guide', url: 'https://example.com/physics.pdf', type: 'PDF', tier: 'free', downloads: 980 },
    { id: '3', title: 'Organic Reaction Mechanisms Reference', url: 'https://example.com/chemistry.pdf', type: 'PDF', tier: 'premium', downloads: 410 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('PDF');
  const [tier, setTier] = useState<AccessTier>('free');

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    setResources((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        title: title.trim(),
        url: url.trim(),
        type,
        tier,
        downloads: 0,
      },
    ]);
    setTitle('');
    setUrl('');
    setIsModalOpen(false);
  };

  const handleRemove = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-brand-navy">Resource Manager</h1>
          <p className="text-body-sm text-text-secondary">
            Upload and manage downloadable study guides, formula sheets, and references
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Upload Resource
        </Button>
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
                <td className="p-4 font-semibold text-brand-navy">
                  <div>{r.title}</div>
                  <div className="text-caption text-text-muted truncate max-w-xs">{r.url}</div>
                </td>
                <td className="p-4 text-text-secondary">{r.type}</td>
                <td className="p-4"><AccessBadge tier={r.tier} /></td>
                <td className="p-4 text-text-secondary">{r.downloads}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleRemove(r.id)}
                    className="text-status-error hover:underline text-caption font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-card shadow-modal max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-h3 font-bold text-brand-navy">Upload Learning Resource</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary text-xl">
                ×
              </button>
            </div>

            <form onSubmit={handleAddResource} className="space-y-4">
              <Input
                id="res-title"
                label="Resource Title"
                value={title}
                onChange={setTitle}
                placeholder="e.g. Physics Formula Sheet"
                required
              />
              <Input
                id="res-url"
                label="Resource URL / File Link"
                value={url}
                onChange={setUrl}
                placeholder="https://..."
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  id="res-type"
                  label="Format"
                  value={type}
                  onChange={setType}
                  options={[
                    { value: 'PDF', labelEn: 'PDF Document', labelAm: 'ፒዲኤፍ' },
                    { value: 'LINK', labelEn: 'External Link', labelAm: 'ሊንክ' },
                  ]}
                />
                <Select
                  id="res-tier"
                  label="Access Tier"
                  value={tier}
                  onChange={(val) => setTier(val as AccessTier)}
                  options={[
                    { value: 'free', labelEn: 'Free', labelAm: 'ነጻ' },
                    { value: 'premium', labelEn: 'Premium', labelAm: 'ፕሪሚየም' },
                  ]}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Add Resource
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
