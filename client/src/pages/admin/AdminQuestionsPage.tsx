import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { LoadingState } from '../../components/ui/LoadingState';
import { apiClient } from '../../lib/apiClient';
import type { Difficulty, ContentStatus } from '../../../../shared/types';

interface QuestionOptionForm {
  label: string;
  textEn: string;
  textAm: string;
  isCorrect: boolean;
}

interface QuestionAdminItem {
  id: string;
  promptEn: string;
  promptAm: string;
  explanationEn: string;
  explanationAm: string;
  difficulty: Difficulty;
  status: ContentStatus;
  options: Array<{
    id: string;
    label: string;
    textEn: string;
    textAm: string;
    isCorrect: boolean;
  }>;
}

export function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<QuestionAdminItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [promptEn, setPromptEn] = useState('');
  const [promptAm, setPromptAm] = useState('');
  const [explanationEn, setExplanationEn] = useState('');
  const [explanationAm, setExplanationAm] = useState('');
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  const [options, setOptions] = useState<QuestionOptionForm[]>([
    { label: 'A', textEn: '', textAm: '', isCorrect: true },
    { label: 'B', textEn: '', textAm: '', isCorrect: false },
    { label: 'C', textEn: '', textAm: '', isCorrect: false },
    { label: 'D', textEn: '', textAm: '', isCorrect: false },
  ]);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.admin.getQuestions();
      setQuestions(data as QuestionAdminItem[]);
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setDifficulty('medium');
    setPromptEn('');
    setPromptAm('');
    setExplanationEn('');
    setExplanationAm('');
    setCorrectIndex(0);
    setOptions([
      { label: 'A', textEn: '', textAm: '', isCorrect: true },
      { label: 'B', textEn: '', textAm: '', isCorrect: false },
      { label: 'C', textEn: '', textAm: '', isCorrect: false },
      { label: 'D', textEn: '', textAm: '', isCorrect: false },
    ]);
    setIsModalOpen(true);
  };

  const openEditModal = (q: QuestionAdminItem) => {
    setEditingId(q.id);
    setDifficulty(q.difficulty);
    setPromptEn(q.promptEn);
    setPromptAm(q.promptAm);
    setExplanationEn(q.explanationEn);
    setExplanationAm(q.explanationAm);

    const mappedOpts = q.options.map((opt) => ({
      label: opt.label,
      textEn: opt.textEn,
      textAm: opt.textAm,
      isCorrect: opt.isCorrect,
    }));
    setOptions(mappedOpts);
    const correctIdx = mappedOpts.findIndex((o) => o.isCorrect);
    setCorrectIndex(correctIdx !== -1 ? correctIdx : 0);
    setIsModalOpen(true);
  };

  const handleOptionChange = (idx: number, field: 'textEn' | 'textAm', val: string) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === idx ? { ...opt, [field]: val } : opt))
    );
  };

  const handleCorrectRadio = (idx: number) => {
    setCorrectIndex(idx);
    setOptions((prev) =>
      prev.map((opt, i) => ({ ...opt, isCorrect: i === idx }))
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      topicId: 'topic-rotational-motion',
      promptEn: promptEn.trim(),
      promptAm: promptAm.trim(),
      explanationEn: explanationEn.trim(),
      explanationAm: explanationAm.trim(),
      difficulty,
      status: 'published' as ContentStatus,
      options: options.map((opt, idx) => ({
        label: opt.label,
        textEn: opt.textEn.trim(),
        textAm: opt.textAm.trim(),
        sortOrder: idx + 1,
        isCorrect: idx === correctIndex,
      })),
    };

    try {
      if (editingId) {
        await apiClient.admin.updateQuestion(editingId, payload);
      } else {
        await apiClient.admin.createQuestion(payload);
      }
      setIsModalOpen(false);
      fetchQuestions();
    } catch (err: any) {
      alert(err.message || 'Failed to save question');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-brand-navy">Question Bank Editor</h1>
          <p className="text-body-sm text-text-secondary">
            Manage 4-option national exam questions with bilingual explanations and answers
          </p>
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          + Add New Question
        </Button>
      </div>

      {isLoading ? (
        <LoadingState size="md" label="Loading question bank..." />
      ) : (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id || idx}
              className="bg-surface rounded-card border border-border p-5 shadow-xs hover:border-brand-teal transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-badge text-caption font-semibold bg-brand-bg-alt text-brand-navy uppercase">
                  {q.difficulty}
                </span>
                <Button variant="ghost" size="sm" onClick={() => openEditModal(q)}>
                  Edit Question
                </Button>
              </div>

              <div>
                <p className="font-semibold text-brand-navy text-body">{q.promptEn}</p>
                <p className="text-text-secondary text-body-sm font-ethiopic mt-0.5">{q.promptAm}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {q.options?.map((opt) => (
                  <div
                    key={opt.label}
                    className={`p-2.5 rounded-button text-body-sm flex items-center gap-2 border ${
                      opt.isCorrect
                        ? 'border-status-success bg-status-success/10 font-medium'
                        : 'border-border bg-surface-muted text-text-secondary'
                    }`}
                  >
                    <span className="font-bold">{opt.label}.</span>
                    <span>{opt.textEn}</span>
                    {opt.isCorrect && <span className="ml-auto text-status-success font-bold text-caption">✓ CORRECT</span>}
                  </div>
                ))}
              </div>

              {q.explanationEn && (
                <div className="p-3 bg-brand-bg rounded-badge text-caption text-text-secondary border border-border/60">
                  <span className="font-bold text-brand-teal">Explanation: </span>
                  {q.explanationEn}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Question Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-card shadow-modal max-w-3xl w-full p-6 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-h3 font-bold text-brand-navy">
                {editingId ? 'Edit Question' : 'Add Question to Bank'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary text-xl">
                ×
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <Select
                id="difficulty"
                label="Difficulty Level"
                value={difficulty}
                onChange={(val) => setDifficulty(val as Difficulty)}
                options={[
                  { value: 'easy', labelEn: 'Easy', labelAm: 'ቀላል' },
                  { value: 'medium', labelEn: 'Medium (Standard Exam)', labelAm: 'መካከለኛ' },
                  { value: 'hard', labelEn: 'Hard (Distinction)', labelAm: 'ከባድ' },
                ]}
              />

              {/* Bilingual Prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-body-sm font-bold text-brand-navy">Question Prompt (English)</label>
                  <textarea
                    value={promptEn}
                    onChange={(e) => setPromptEn(e.target.value)}
                    rows={3}
                    className="w-full p-3 text-body-sm bg-surface border border-border rounded-button focus:border-brand-teal focus:outline-none"
                    placeholder="Enter question in English..."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-body-sm font-bold text-brand-navy">የጥያቄው ጽሁፍ (አማርኛ)</label>
                  <textarea
                    value={promptAm}
                    onChange={(e) => setPromptAm(e.target.value)}
                    rows={3}
                    className="w-full p-3 text-body-sm font-ethiopic bg-surface border border-border rounded-button focus:border-brand-teal focus:outline-none"
                    placeholder="ጥያቄውን በአማርኛ ያስገቡ..."
                    required
                  />
                </div>
              </div>

              {/* 4 Options with Radio Button for Correct Option */}
              <div className="space-y-3">
                <label className="text-body-sm font-bold text-brand-navy block">
                  Multiple-Choice Options (Select the correct answer with the radio toggle)
                </label>
                {options.map((opt, idx) => (
                  <div
                    key={opt.label}
                    className={`p-4 rounded-card border transition-all space-y-2 ${
                      idx === correctIndex
                        ? 'border-brand-teal bg-brand-teal/5 ring-1 ring-brand-teal'
                        : 'border-border bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`radio-opt-${idx}`}
                          name="correctOptionRadio"
                          checked={idx === correctIndex}
                          onChange={() => handleCorrectRadio(idx)}
                          className="h-4 w-4 text-brand-teal focus:ring-brand-teal cursor-pointer"
                        />
                        <label htmlFor={`radio-opt-${idx}`} className="font-bold text-brand-navy cursor-pointer">
                          Option {opt.label} {idx === correctIndex && <span className="text-brand-teal text-caption font-semibold ml-2">(Marked as Correct)</span>}
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={opt.textEn}
                        onChange={(e) => handleOptionChange(idx, 'textEn', e.target.value)}
                        placeholder={`Option ${opt.label} (English)`}
                        className="px-3 py-2 text-body-sm bg-surface border border-border rounded-button focus:border-brand-teal focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        value={opt.textAm}
                        onChange={(e) => handleOptionChange(idx, 'textAm', e.target.value)}
                        placeholder={`ምርጫ ${opt.label} (አማርኛ)`}
                        className="px-3 py-2 text-body-sm font-ethiopic bg-surface border border-border rounded-button focus:border-brand-teal focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bilingual Explanations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-body-sm font-bold text-brand-navy">Detailed Explanation (English)</label>
                  <textarea
                    value={explanationEn}
                    onChange={(e) => setExplanationEn(e.target.value)}
                    rows={2}
                    className="w-full p-3 text-body-sm bg-surface border border-border rounded-button focus:border-brand-teal focus:outline-none"
                    placeholder="Why this answer is correct..."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-body-sm font-bold text-brand-navy">ዝርዝር ማብራሪያ (አማርኛ)</label>
                  <textarea
                    value={explanationAm}
                    onChange={(e) => setExplanationAm(e.target.value)}
                    rows={2}
                    className="w-full p-3 text-body-sm font-ethiopic bg-surface border border-border rounded-button focus:border-brand-teal focus:outline-none"
                    placeholder="ይህ መልስ ለምን ትክክል እንደሆነ ማብራሪያ..."
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingId ? 'Update Question' : 'Save to Question Bank'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
