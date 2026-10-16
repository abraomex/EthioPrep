import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';

interface QuestionItem {
  id: string;
  prompt: string;
  options: { id: string; label: string; text: string }[];
}

export function ActiveExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const totalTimeSeconds = 90 * 60; // 90 min
  const [secondsRemaining, setSecondsRemaining] = useState(totalTimeSeconds);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const stored = sessionStorage.getItem(`exam_${id}_answers`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [flagged, setFlagged] = useState<Record<string, boolean>>(() => {
    try {
      const stored = sessionStorage.getItem(`exam_${id}_flags`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const sampleQuestions: QuestionItem[] = [
    {
      id: 'q-1',
      prompt: 'If f(x) = 3x^2 - 4x + 7, what is f\'(2)?',
      options: [
        { id: 'opt-1', label: 'A', text: '8' },
        { id: 'opt-2', label: 'B', text: '12' },
        { id: 'opt-3', label: 'C', text: '14' },
        { id: 'opt-4', label: 'D', text: '16' },
      ],
    },
    {
      id: 'q-2',
      prompt: 'What is the limit of (sin x)/x as x approaches 0?',
      options: [
        { id: 'opt-5', label: 'A', text: '0' },
        { id: 'opt-6', label: 'B', text: '1' },
        { id: 'opt-7', label: 'C', text: 'Infinity' },
        { id: 'opt-8', label: 'D', text: 'Undefined' },
      ],
    },
    {
      id: 'q-3',
      prompt: 'Which of the following is the derivative of e^(2x)?',
      options: [
        { id: 'opt-9', label: 'A', text: 'e^(2x)' },
        { id: 'opt-10', label: 'B', text: '2e^(2x)' },
        { id: 'opt-11', label: 'C', text: 'e^(2x)/2' },
        { id: 'opt-12', label: 'D', text: '4e^(2x)' },
      ],
    },
    {
      id: 'q-4',
      prompt: 'The area under the curve y = 2x from x = 0 to x = 3 is equal to:',
      options: [
        { id: 'opt-13', label: 'A', text: '6' },
        { id: 'opt-14', label: 'B', text: '9' },
        { id: 'opt-15', label: 'C', text: '12' },
        { id: 'opt-16', label: 'D', text: '18' },
      ],
    },
  ];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitFinal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync to sessionStorage for offline resilience
  useEffect(() => {
    try {
      sessionStorage.setItem(`exam_${id}_answers`, JSON.stringify(answers));
      sessionStorage.setItem(`exam_${id}_flags`, JSON.stringify(flagged));
    } catch {
      // Ignore
    }
  }, [answers, flagged, id]);

  const currentQ = sampleQuestions[currentIndex];
  const isFlagged = !!flagged[currentQ.id];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = sampleQuestions.length - answeredCount;

  const handleSelectOption = (optId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));
  };

  const handleToggleFlag = () => {
    setFlagged((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const handleSubmitFinal = () => {
    setIsConfirmOpen(false);
    navigate(`/attempts/mock-attempt-1/results`);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Top Exam Navigation Bar */}
      <header className="sticky top-0 z-30 bg-brand-navy text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-base md:text-lg">EthioPrep Exam</span>
          <span className="hidden sm:inline-block text-white/60">|</span>
          <span className="hidden sm:inline-block text-caption text-white/80">
            Q {currentIndex + 1} of {sampleQuestions.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer Display */}
          <div
            className={`font-mono text-base md:text-lg font-bold px-3 py-1 rounded-badge flex items-center gap-2 ${
              secondsRemaining < 300
                ? 'bg-status-error text-white animate-pulse'
                : 'bg-white/10 text-white'
            }`}
          >
            <span>⏱</span>
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <Button
            size="sm"
            variant="secondary"
            className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-bold"
            onClick={() => setIsConfirmOpen(true)}
          >
            {t('exam.submit')}
          </Button>
        </div>
      </header>

      {/* Main Exam Area */}
      <div className="flex-1 max-w-[1000px] w-full mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Question Content (Left 3 columns) */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-surface rounded-card p-6 md:p-8 border border-border shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-body-sm font-bold text-text-muted uppercase">
                Question {currentIndex + 1}
              </span>
              <button
                type="button"
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-badge text-caption font-semibold transition-colors cursor-pointer border ${
                  isFlagged
                    ? 'bg-brand-gold/20 text-brand-gold-dark border-brand-gold'
                    : 'bg-surface text-text-muted border-border hover:bg-brand-bg'
                }`}
              >
                <span>🚩</span>
                <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
              </button>
            </div>

            <h2 className="text-h3 font-bold text-brand-navy leading-relaxed">
              {currentQ.prompt}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className={`
                      w-full p-4 rounded-button border text-left flex items-center gap-4 transition-all cursor-pointer
                      ${isSelected
                        ? 'border-brand-teal bg-brand-teal/10 font-bold ring-2 ring-brand-teal/20'
                        : 'border-border bg-surface hover:bg-brand-bg hover:border-brand-teal/40'
                      }
                    `}
                  >
                    <span
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border
                        ${isSelected
                          ? 'bg-brand-teal text-white border-brand-teal'
                          : 'bg-surface-muted text-text-secondary border-border'
                        }
                      `}
                    >
                      {opt.label}
                    </span>
                    <span className="text-body text-text-primary">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Previous / Next buttons */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <Button
                variant="outline"
                size="md"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              >
                ← {t('exam.previous')}
              </Button>
              <Button
                variant="primary"
                size="md"
                disabled={currentIndex === sampleQuestions.length - 1}
                onClick={() => setCurrentIndex((prev) => Math.min(sampleQuestions.length - 1, prev + 1))}
              >
                {t('exam.next')} →
              </Button>
            </div>
          </div>
        </div>

        {/* Question Navigator Grid (Right 1 column) */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-surface rounded-card p-4 border border-border shadow-card space-y-3">
            <h3 className="font-bold text-body-sm text-brand-navy">Question Navigator</h3>
            <div className="grid grid-cols-4 gap-2">
              {sampleQuestions.map((q, idx) => {
                const isAnswered = !!answers[q.id];
                const isItemFlagged = !!flagged[q.id];
                const isCurrent = idx === currentIndex;

                let cellBg = 'bg-surface text-text-primary border-border';
                if (isAnswered) cellBg = 'bg-brand-teal text-white border-brand-teal';
                if (isItemFlagged) cellBg = 'bg-brand-gold text-white border-brand-gold';

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`
                      aspect-square rounded-button border text-xs font-bold flex items-center justify-center transition-all cursor-pointer
                      ${cellBg}
                      ${isCurrent ? 'ring-2 ring-brand-navy ring-offset-2' : ''}
                    `}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-border text-caption space-y-1 text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-teal" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-surface border border-border" />
                <span>Unanswered ({unansweredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-gold" />
                <span>Flagged ({Object.values(flagged).filter(Boolean).length})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        title={t('exam.confirmSubmit.title')}
        message={
          unansweredCount > 0
            ? t('exam.confirmSubmit.message').replace('{count}', String(unansweredCount))
            : t('exam.confirmSubmit.allAnswered')
        }
        confirmLabel={t('exam.confirm')}
        cancelLabel={t('exam.cancel')}
        onConfirm={handleSubmitFinal}
        onCancel={() => setIsConfirmOpen(false)}
        isDestructive={unansweredCount > 0}
      />
    </div>
  );
}

