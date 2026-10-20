import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { LoadingState } from '../../components/ui/LoadingState';
import { AccessBadge } from '../../components/ui/AccessBadge';
import { LessonContent } from '../../components/learning/LessonContent';
import { apiClient } from '../../lib/apiClient';
import type { AccessTier, ContentStatus } from '../../../../shared/types';

interface LessonAdminItem {
  id: string;
  topicId: string;
  titleEn: string;
  titleAm: string;
  bodyEn: string;
  bodyAm: string;
  status: ContentStatus;
  accessTier: AccessTier;
  estimatedMinutes: number;
  sortOrder: number;
}

export function AdminLessonsPage() {
  const [lessons, setLessons] = useState<LessonAdminItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Editor Form Fields
  const [titleEn, setTitleEn] = useState('');
  const [titleAm, setTitleAm] = useState('');
  const [bodyEn, setBodyEn] = useState('');
  const [bodyAm, setBodyAm] = useState('');
  const [accessTier, setAccessTier] = useState<AccessTier>('free');
  const [status, setStatus] = useState<ContentStatus>('published');
  const [estimatedMinutes, setEstimatedMinutes] = useState('15');
  const [sortOrder, setSortOrder] = useState('1');
  const [previewTab, setPreviewTab] = useState<'editor' | 'previewEn' | 'previewAm'>('editor');

  const fetchLessons = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.admin.getLessons();
      setLessons(data as LessonAdminItem[]);
    } catch (err) {
      console.error('Failed to load lessons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const openNewLesson = () => {
    setEditingId(null);
    setTitleEn('');
    setTitleAm('');
    setBodyEn('# Lesson Title\n\nIntroduction to concepts...\n\n$$\\omega = \\frac{d\\theta}{dt}$$\n');
    setBodyAm('# የትምህርቱ ርዕስ\n\nየፅንሰ ሀሳብ መግቢያ...\n\n$$\\omega = \\frac{d\\theta}{dt}$$\n');
    setAccessTier('free');
    setStatus('published');
    setEstimatedMinutes('15');
    setSortOrder((lessons.length + 1).toString());
    setPreviewTab('editor');
    setIsEditing(true);
  };

  const openEditLesson = (lesson: LessonAdminItem) => {
    setEditingId(lesson.id);
    setTitleEn(lesson.titleEn);
    setTitleAm(lesson.titleAm);
    setBodyEn(lesson.bodyEn);
    setBodyAm(lesson.bodyAm);
    setAccessTier(lesson.accessTier);
    setStatus(lesson.status);
    setEstimatedMinutes(lesson.estimatedMinutes.toString());
    setSortOrder(lesson.sortOrder.toString());
    setPreviewTab('editor');
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      topicId: 'topic-rotational-motion',
      titleEn: titleEn.trim(),
      titleAm: titleAm.trim(),
      bodyEn,
      bodyAm,
      accessTier,
      status,
      estimatedMinutes: parseInt(estimatedMinutes, 10) || 10,
      sortOrder: parseInt(sortOrder, 10) || 1,
    };

    try {
      if (editingId) {
        await apiClient.admin.updateLesson(editingId, payload);
      } else {
        await apiClient.admin.createLesson(payload);
      }
      setIsEditing(false);
      fetchLessons();
    } catch (err: any) {
      alert(err.message || 'Failed to save lesson');
    }
  };

  const toggleStatus = async (l: LessonAdminItem) => {
    const newStatus: ContentStatus = l.status === 'published' ? 'draft' : 'published';
    try {
      await apiClient.admin.updateLesson(l.id, { status: newStatus });
      setLessons((prev) =>
        prev.map((item) => (item.id === l.id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const filteredLessons = lessons.filter((l) =>
    l.titleEn.toLowerCase().includes(search.toLowerCase()) ||
    l.titleAm.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-brand-navy">Bilingual Lesson Editor</h1>
          <p className="text-body-sm text-text-secondary">
            Author and preview Markdown lessons with KaTeX mathematical formulas
          </p>
        </div>
        {!isEditing && (
          <Button variant="primary" onClick={openNewLesson}>
            + Create New Lesson
          </Button>
        )}
      </div>

      {isEditing ? (
        /* Full Bilingual Editor View */
        <div className="bg-surface rounded-card border border-border shadow-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-h2 font-bold text-brand-navy">
                {editingId ? 'Edit Lesson' : 'Create New Bilingual Lesson'}
              </h2>
              <AccessBadge tier={accessTier} />
            </div>
            {/* View Tabs */}
            <div className="flex items-center gap-1 bg-brand-bg-alt p-1 rounded-badge">
              <button
                type="button"
                onClick={() => setPreviewTab('editor')}
                className={`px-3 py-1 rounded text-caption font-semibold transition-all ${
                  previewTab === 'editor' ? 'bg-surface shadow-xs text-brand-navy' : 'text-text-secondary'
                }`}
              >
                Side-by-Side Editor
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab('previewEn')}
                className={`px-3 py-1 rounded text-caption font-semibold transition-all ${
                  previewTab === 'previewEn' ? 'bg-surface shadow-xs text-brand-navy' : 'text-text-secondary'
                }`}
              >
                Preview (EN)
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab('previewAm')}
                className={`px-3 py-1 rounded text-caption font-semibold transition-all ${
                  previewTab === 'previewAm' ? 'bg-surface shadow-xs text-brand-navy' : 'text-text-secondary'
                }`}
              >
                Preview (AM)
              </button>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Metadata Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <Input
                  id="titleEn"
                  label="Title (English)"
                  value={titleEn}
                  onChange={setTitleEn}
                  placeholder="e.g. Angular Kinematics"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  id="titleAm"
                  label="Title (Amharic)"
                  value={titleAm}
                  onChange={setTitleAm}
                  placeholder="e.g. የአንግል እንቅስቃሴ"
                  required
                />
              </div>
              <Select
                id="accessTier"
                label="Access Tier"
                value={accessTier}
                onChange={(val) => setAccessTier(val as AccessTier)}
                options={[
                  { value: 'free', labelEn: 'Free (All Students)', labelAm: 'ነጻ' },
                  { value: 'premium', labelEn: 'Premium Only', labelAm: 'ፕሪሚየም' },
                ]}
              />
              <Select
                id="status"
                label="Publication Status"
                value={status}
                onChange={(val) => setStatus(val as ContentStatus)}
                options={[
                  { value: 'published', labelEn: 'Published', labelAm: 'የታተመ' },
                  { value: 'draft', labelEn: 'Draft (Hidden)', labelAm: 'ረቂቅ' },
                ]}
              />
              <Input
                id="estimatedMinutes"
                label="Estimated Minutes"
                type="number"
                value={estimatedMinutes}
                onChange={setEstimatedMinutes}
                required
              />
              <Input
                id="sortOrder"
                label="Sort Order"
                type="number"
                value={sortOrder}
                onChange={setSortOrder}
                required
              />
            </div>

            {/* Editor Workspace */}
            {previewTab === 'editor' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* English Markdown Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-body-sm font-bold text-brand-navy">
                      English Content (Markdown + KaTeX)
                    </label>
                    <span className="text-caption text-text-muted">Use $$...$$ for block math</span>
                  </div>
                  <textarea
                    value={bodyEn}
                    onChange={(e) => setBodyEn(e.target.value)}
                    rows={16}
                    className="w-full font-mono text-body-sm p-4 bg-surface border border-border rounded-button focus:border-brand-teal focus:outline-none leading-relaxed"
                    required
                  />
                </div>

                {/* Amharic Markdown Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-body-sm font-bold text-brand-navy">
                      Amharic Content (የአማርኛ ይዘት)
                    </label>
                    <span className="text-caption text-text-muted">Noto Sans Ethiopic</span>
                  </div>
                  <textarea
                    value={bodyAm}
                    onChange={(e) => setBodyAm(e.target.value)}
                    rows={16}
                    className="w-full font-ethiopic text-body-sm p-4 bg-surface border border-border rounded-button focus:border-brand-teal focus:outline-none leading-loose"
                    required
                  />
                </div>
              </div>
            )}

            {/* Live English Preview */}
            {previewTab === 'previewEn' && (
              <div className="p-6 bg-brand-bg rounded-card border border-border min-h-[400px]">
                <span className="text-caption font-bold text-brand-teal uppercase tracking-wider block mb-4">
                  Live English Preview
                </span>
                <LessonContent content={bodyEn} language="en" />
              </div>
            )}

            {/* Live Amharic Preview */}
            {previewTab === 'previewAm' && (
              <div className="p-6 bg-brand-bg rounded-card border border-border min-h-[400px]">
                <span className="text-caption font-bold text-brand-gold-dark uppercase tracking-wider block mb-4">
                  የቀጥታ የአማርኛ ቅድመ እይታ
                </span>
                <LessonContent content={bodyAm} language="am" />
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button variant="ghost" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <div className="flex items-center gap-3">
                <Button variant="primary" type="submit">
                  {editingId ? 'Save & Update Lesson' : 'Publish Lesson'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        /* Lessons Table */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lessons by title..."
              className="px-4 py-2 text-body-sm bg-surface border border-border rounded-button w-72 focus:outline-none focus:border-brand-teal"
            />
            <span className="text-caption text-text-muted">{filteredLessons.length} lessons found</span>
          </div>

          {isLoading ? (
            <LoadingState size="md" label="Loading lessons..." />
          ) : (
            <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-bg-alt/60 text-caption font-bold text-text-secondary uppercase border-b border-border">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Tier</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Read Time</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-body-sm">
                  {filteredLessons.map((l) => (
                    <tr key={l.id} className="hover:bg-brand-bg/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-brand-navy">
                        <div>{l.titleEn}</div>
                        <div className="text-caption text-text-muted">{l.titleAm}</div>
                      </td>
                      <td className="py-3 px-4">
                        <AccessBadge tier={l.accessTier} />
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleStatus(l)}
                          className={`px-2.5 py-0.5 rounded-pill text-caption font-semibold cursor-pointer ${
                            l.status === 'published'
                              ? 'bg-status-success/10 text-status-success'
                              : 'bg-status-warning/10 text-status-warning'
                          }`}
                        >
                          {l.status === 'published' ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-text-muted">{l.estimatedMinutes} mins</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditLesson(l)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
