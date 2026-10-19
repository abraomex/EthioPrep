import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { LoadingState } from '../../components/ui/LoadingState';
import { apiClient } from '../../lib/apiClient';
import type { Stream } from '../../../../shared/types';

interface SubjectItem {
  id: string;
  slug: string;
  stream: Stream;
  titleEn: string;
  titleAm: string;
  descriptionEn: string;
  descriptionAm: string;
  sortOrder: number;
  published: boolean;
  topicCount?: number;
}

export function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectItem | null>(null);

  // Form State
  const [slug, setSlug] = useState('');
  const [stream, setStream] = useState<Stream>('natural_science');
  const [titleEn, setTitleEn] = useState('');
  const [titleAm, setTitleAm] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAm, setDescriptionAm] = useState('');
  const [sortOrder, setSortOrder] = useState('1');
  const [published, setPublished] = useState(true);

  const fetchSubjects = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.subjects.getAll();
      setSubjects(data);
    } catch (err) {
      console.error('Failed to load subjects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const openCreateModal = () => {
    setEditingSubject(null);
    setSlug('');
    setStream('natural_science');
    setTitleEn('');
    setTitleAm('');
    setDescriptionEn('');
    setDescriptionAm('');
    setSortOrder((subjects.length + 1).toString());
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (s: SubjectItem) => {
    setEditingSubject(s);
    setSlug(s.slug);
    setStream(s.stream);
    setTitleEn(s.titleEn);
    setTitleAm(s.titleAm);
    setDescriptionEn(s.descriptionEn);
    setDescriptionAm(s.descriptionAm);
    setSortOrder(s.sortOrder.toString());
    setPublished(s.published);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      slug: slug.toLowerCase().trim(),
      stream,
      titleEn: titleEn.trim(),
      titleAm: titleAm.trim(),
      descriptionEn: descriptionEn.trim(),
      descriptionAm: descriptionAm.trim(),
      sortOrder: parseInt(sortOrder, 10) || 1,
      published,
    };

    try {
      if (editingSubject) {
        await apiClient.admin.updateSubject(editingSubject.id, payload);
      } else {
        await apiClient.admin.createSubject(payload);
      }
      setIsModalOpen(false);
      fetchSubjects();
    } catch (err: any) {
      alert(err.message || 'Failed to save subject');
    }
  };

  const togglePublish = async (s: SubjectItem) => {
    try {
      await apiClient.admin.updateSubject(s.id, { published: !s.published });
      setSubjects((prev) =>
        prev.map((item) => (item.id === s.id ? { ...item, published: !item.published } : item))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to toggle status');
    }
  };

  const filteredSubjects = selectedStream === 'all'
    ? subjects
    : subjects.filter((s) => s.stream === selectedStream);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-brand-navy">Subject & Topic Manager</h1>
          <p className="text-body-sm text-text-secondary">
            Configure Grade 12 academic streams, subjects, and topic hierarchies
          </p>
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          + Create New Subject
        </Button>
      </div>

      {/* Stream Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-3">
        {['all', 'natural_science', 'social_science', 'common'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStream(tab)}
            className={`px-4 py-1.5 text-body-sm font-semibold rounded-badge transition-all ${
              selectedStream === tab
                ? 'bg-brand-navy text-white'
                : 'text-text-secondary hover:bg-brand-bg-alt'
            }`}
          >
            {tab === 'all' ? 'All Streams' : tab.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Subject List Table */}
      {isLoading ? (
        <LoadingState size="md" label="Loading curriculum subjects..." />
      ) : (
        <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-bg-alt/60 text-caption font-bold text-text-secondary uppercase border-b border-border">
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Stream</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Sort Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-body-sm">
              {filteredSubjects.map((s) => (
                <tr key={s.id} className="hover:bg-brand-bg/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-brand-navy">
                    <div>{s.titleEn}</div>
                    <div className="text-caption text-text-muted">{s.titleAm}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-badge text-caption font-medium bg-brand-bg-alt text-brand-navy">
                      {s.stream.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-caption text-text-secondary">{s.slug}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => togglePublish(s)}
                      className={`px-2.5 py-0.5 rounded-pill text-caption font-semibold cursor-pointer ${
                        s.published
                          ? 'bg-status-success/10 text-status-success'
                          : 'bg-status-warning/10 text-status-warning'
                      }`}
                    >
                      {s.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-text-muted">{s.sortOrder}</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(s)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-card shadow-modal max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-h3 font-bold text-brand-navy">
                {editingSubject ? 'Edit Subject' : 'Create New Subject'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-muted hover:text-text-primary text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="slug"
                  label="Subject Slug"
                  value={slug}
                  onChange={setSlug}
                  placeholder="e.g. physics"
                  required
                />
                <Select
                  id="stream"
                  label="Academic Stream"
                  value={stream}
                  onChange={(val) => setStream(val as Stream)}
                  options={[
                    { value: 'natural_science', labelEn: 'Natural Science', labelAm: 'የተፈጥሮ ሳይንስ' },
                    { value: 'social_science', labelEn: 'Social Science', labelAm: 'ማህበራዊ ሳይንስ' },
                    { value: 'common', labelEn: 'Common', labelAm: 'የጋራ' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="titleEn"
                  label="Title (English)"
                  value={titleEn}
                  onChange={setTitleEn}
                  placeholder="e.g. Physics"
                  required
                />
                <Input
                  id="titleAm"
                  label="Title (Amharic)"
                  value={titleAm}
                  onChange={setTitleAm}
                  placeholder="e.g. ፊዚክስ"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-body-sm font-medium text-text-primary">Description (English)</label>
                <textarea
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 text-body bg-surface border border-border rounded-button focus:border-brand-teal focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-body-sm font-medium text-text-primary">Description (Amharic)</label>
                <textarea
                  value={descriptionAm}
                  onChange={(e) => setDescriptionAm(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 text-body bg-surface border border-border rounded-button focus:border-brand-teal focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <Input
                  id="sortOrder"
                  label="Sort Order"
                  type="number"
                  value={sortOrder}
                  onChange={setSortOrder}
                  required
                />
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="h-4 w-4 rounded text-brand-teal focus:ring-brand-teal"
                  />
                  <label htmlFor="published" className="text-body-sm font-medium text-text-primary">
                    Published & Visible to Students
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingSubject ? 'Update Subject' : 'Create Subject'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
