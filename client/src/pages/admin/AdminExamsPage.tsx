import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { AccessBadge } from '../../components/ui/AccessBadge';
import { LoadingState } from '../../components/ui/LoadingState';
import { apiClient } from '../../lib/apiClient';
import type { AccessTier, ContentStatus } from '../../../../shared/types';

interface ExamAdminItem {
  id: string;
  subjectId: string;
  titleEn: string;
  titleAm: string;
  descriptionEn: string;
  descriptionAm: string;
  durationSeconds: number;
  accessTier: AccessTier;
  status: ContentStatus;
  questionCount?: number;
}

export function AdminExamsPage() {
  const [exams, setExams] = useState<ExamAdminItem[]>([]);
  const [bankQuestions, setBankQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [subjectId, setSubjectId] = useState('sub-physics');
  const [titleEn, setTitleEn] = useState('');
  const [titleAm, setTitleAm] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAm, setDescriptionAm] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('60');
  const [accessTier, setAccessTier] = useState<AccessTier>('free');
  const [status, setStatus] = useState<ContentStatus>('published');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const fetchExamsAndQuestions = async () => {
    try {
      setIsLoading(true);
      const [examData, qData] = await Promise.all([
        apiClient.exams.getAll(),
        apiClient.admin.getQuestions().catch(() => []),
      ]);
      setExams(examData as ExamAdminItem[]);
      setBankQuestions(qData);
    } catch (err) {
      console.error('Failed to load exams:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExamsAndQuestions();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitleEn('');
    setTitleAm('');
    setDescriptionEn('');
    setDescriptionAm('');
    setDurationMinutes('60');
    setAccessTier('free');
    setStatus('published');
    setSelectedQuestionIds([]);
    setIsModalOpen(true);
  };

  const openEditModal = (exam: ExamAdminItem) => {
    setEditingId(exam.id);
    setTitleEn(exam.titleEn);
    setTitleAm(exam.titleAm);
    setDescriptionEn(exam.descriptionEn);
    setDescriptionAm(exam.descriptionAm);
    setDurationMinutes(Math.round(exam.durationSeconds / 60).toString());
    setAccessTier(exam.accessTier);
    setStatus(exam.status);
    setSelectedQuestionIds([]);
    setIsModalOpen(true);
  };

  const handleToggleQuestion = (qid: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(qid) ? prev.filter((id) => id !== qid) : [...prev, qid]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      subjectId: subjectId || '22222222-2222-2222-2222-222222222222',
      titleEn: titleEn.trim(),
      titleAm: titleAm.trim(),
      descriptionEn: descriptionEn.trim(),
      descriptionAm: descriptionAm.trim(),
      durationSeconds: (parseInt(durationMinutes, 10) || 60) * 60,
      accessTier,
      status,
      questionIds: selectedQuestionIds.length > 0
        ? selectedQuestionIds
        : ['11111111-1111-1111-1111-111111111111'],
    };

    try {
      if (editingId) {
        await apiClient.admin.updateExam(editingId, payload);
      } else {
        await apiClient.admin.createExam(payload);
      }
      setIsModalOpen(false);
      fetchExamsAndQuestions();
    } catch (err: any) {
      alert(err.message || 'Failed to save exam');
    }
  };

  const toggleStatus = async (exam: ExamAdminItem) => {
    const newStatus: ContentStatus = exam.status === 'published' ? 'draft' : 'published';
    try {
      await apiClient.admin.updateExam(exam.id, { status: newStatus });
      setExams((prev) =>
        prev.map((item) => (item.id === exam.id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-brand-navy">Exam Builder & Manager</h1>
          <p className="text-body-sm text-text-secondary">
            Assemble timed national exam simulations, set points, durations, and access tiers
          </p>
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          + Build New Exam
        </Button>
      </div>

      {isLoading ? (
        <LoadingState size="md" label="Loading mock exams..." />
      ) : (
        <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-bg-alt/60 text-caption font-bold text-text-secondary uppercase border-b border-border">
                <th className="py-3 px-4">Exam Title</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Questions</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-body-sm">
              {exams.map((ex) => (
                <tr key={ex.id} className="hover:bg-brand-bg/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-brand-navy">
                    <div>{ex.titleEn}</div>
                    <div className="text-caption text-text-muted">{ex.titleAm}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-caption text-text-secondary">
                    {Math.round(ex.durationSeconds / 60)} mins
                  </td>
                  <td className="py-3 px-4 font-semibold text-brand-navy">
                    {ex.questionCount || 10} questions
                  </td>
                  <td className="py-3 px-4">
                    <AccessBadge tier={ex.accessTier} />
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleStatus(ex)}
                      className={`px-2.5 py-0.5 rounded-pill text-caption font-semibold cursor-pointer ${
                        ex.status === 'published'
                          ? 'bg-status-success/10 text-status-success'
                          : 'bg-status-warning/10 text-status-warning'
                      }`}
                    >
                      {ex.status === 'published' ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(ex)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Build / Edit Exam Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-card shadow-modal max-w-2xl w-full p-6 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-h3 font-bold text-brand-navy">
                {editingId ? 'Edit Exam' : 'Build New Timed Exam'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary text-xl">
                ×
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <Select
                id="examSubject"
                label="Target Subject"
                value={subjectId}
                onChange={setSubjectId}
                options={[
                  { value: 'sub-physics', labelEn: 'Physics', labelAm: 'ፊዚክስ' },
                  { value: 'sub-mathematics', labelEn: 'Mathematics', labelAm: 'ሒሳብ' },
                  { value: 'sub-geography', labelEn: 'Geography', labelAm: 'ጂኦግራፊ' },
                  { value: 'sub-english', labelEn: 'English', labelAm: 'እንግሊዝኛ' },
                ]}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="titleEn"
                  label="Title (English)"
                  value={titleEn}
                  onChange={setTitleEn}
                  placeholder="e.g. Physics National Model Exam"
                  required
                />
                <Input
                  id="titleAm"
                  label="Title (Amharic)"
                  value={titleAm}
                  onChange={setTitleAm}
                  placeholder="e.g. የፊዚክስ ብሔራዊ ሞዴል ፈተና"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  id="durationMinutes"
                  label="Duration (Minutes)"
                  type="number"
                  value={durationMinutes}
                  onChange={setDurationMinutes}
                  required
                />
                <Select
                  id="accessTier"
                  label="Access Tier"
                  value={accessTier}
                  onChange={(val) => setAccessTier(val as AccessTier)}
                  options={[
                    { value: 'free', labelEn: 'Free (Selected questions)', labelAm: 'ነጻ' },
                    { value: 'premium', labelEn: 'Premium (Full mock)', labelAm: 'ፕሪሚየም' },
                  ]}
                />
                <Select
                  id="status"
                  label="Status"
                  value={status}
                  onChange={(val) => setStatus(val as ContentStatus)}
                  options={[
                    { value: 'published', labelEn: 'Published', labelAm: 'የታተመ' },
                    { value: 'draft', labelEn: 'Draft', labelAm: 'ረቂቅ' },
                  ]}
                />
              </div>

              {/* Question Selection Checklist */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <label className="text-body-sm font-bold text-brand-navy">
                    Assign Questions from Question Bank
                  </label>
                  <span className="text-caption text-brand-teal font-semibold">
                    {selectedQuestionIds.length} questions selected
                  </span>
                </div>

                <div className="max-h-48 overflow-y-auto border border-border rounded-button divide-y divide-border bg-surface-muted/50 p-2">
                  {bankQuestions.length === 0 ? (
                    <div className="p-3 text-caption text-text-muted text-center">
                      Using standard curriculum questions pool for this exam simulation.
                    </div>
                  ) : (
                    bankQuestions.map((bq) => (
                      <label
                        key={bq.id}
                        className="flex items-center gap-3 p-2 hover:bg-surface cursor-pointer rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedQuestionIds.includes(bq.id)}
                          onChange={() => handleToggleQuestion(bq.id)}
                          className="h-4 w-4 rounded text-brand-teal focus:ring-brand-teal"
                        />
                        <span className="text-body-sm text-text-primary truncate">{bq.promptEn}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingId ? 'Update Exam' : 'Build & Publish Exam'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
