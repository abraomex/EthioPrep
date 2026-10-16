import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';
import { Timer } from '../components/exam/Timer';
import { QuestionOption } from '../components/exam/QuestionOption';
import { QuestionNavigator } from '../components/exam/QuestionNavigator';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';
import { mockExams } from '../lib/mockExams';

export function ActiveExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const examId = id || 'math-mock-1';
  const exam = mockExams[examId] || mockExams['math-mock-1'];

  const storageAnswersKey = `ethioprep_exam_${exam.id}_answers`;
  const storageFlagsKey = `ethioprep_exam_${exam.id}_flags`;
  const storageTimeKey = `ethioprep_exam_${exam.id}_time`;

  // Offline-resilient answer cache from sessionStorage
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const stored = sessionStorage.getItem(storageAnswersKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Offline-resilient flagged state from sessionStorage
  const [flagged, setFlagged] = useState<Record<string, boolean>>(() => {
    try {
      const stored = sessionStorage.getItem(storageFlagsKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Countdown timer with persisted remaining time
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    try {
      const stored = sessionStorage.getItem(storageTimeKey);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    } catch {
      // Ignore
    }
    return exam.durationSeconds;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Sync state to sessionStorage on every interaction
  useEffect(() => {
    try {
      sessionStorage.setItem(storageAnswersKey, JSON.stringify(answers));
      sessionStorage.setItem(storageFlagsKey, JSON.stringify(flagged));
      sessionStorage.setItem(storageTimeKey, secondsRemaining.toString());
    } catch {
      // Ignore
    }
  }, [answers, flagged, secondsRemaining, storageAnswersKey, storageFlagsKey, storageTimeKey]);

  // Countdown timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = exam.questions[currentIndex];
  const isCurrentFlagged = !!flagged[currentQ.id];

  const answeredIndices = useMemo(() => {
    const set = new Set<number>();
    exam.questions.forEach((q, idx) => {
      if (answers[q.id]) set.add(idx);
    });
    return set;
  }, [answers, exam.questions]);

  const flaggedIndices = useMemo(() => {
    const set = new Set<number>();
    exam.questions.forEach((q, idx) => {
      if (flagged[q.id]) set.add(idx);
    });
    return set;
  }, [flagged, exam.questions]);

  const unansweredCount = exam.questions.length - answeredIndices.size;

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleToggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleSubmitAttempt = useCallback(() => {
    setIsConfirmOpen(false);

    // Calculate score
    let totalScore = 0;
    const reviewDetails = exam.questions.map((q, idx) => {
      const selectedId = answers[q.id];
      const isCorrect = selectedId === q.correctOptionId;
      if (isCorrect) totalScore += q.points;

      const selectedOpt = q.options.find((o) => o.id === selectedId);
      const correctOpt = q.options.find((o) => o.id === q.correctOptionId);

      return {
        questionNumber: idx + 1,
        promptEn: q.promptEn,
        promptAm: q.promptAm,
        topicTitle: q.topicTitle,
        yourAnswer: selectedOpt
          ? `${selectedOpt.label}) ${language === 'am' ? selectedOpt.textAm : selectedOpt.textEn}`
          : 'No answer selected',
        correctAnswer: correctOpt
          ? `${correctOpt.label}) ${language === 'am' ? correctOpt.textAm : correctOpt.textEn}`
          : '',
        isCorrect,
        explanationEn: q.explanationEn,
        explanationAm: q.explanationAm,
      };
    });

    const timeTaken = exam.durationSeconds - secondsRemaining;

    // Cache latest attempt result for the results page
    const resultPayload = {
      examId: exam.id,
      examTitleEn: exam.titleEn,
      examTitleAm: exam.titleAm,
      score: totalScore,
      maxScore: exam.questions.length,
      timeTakenSeconds: timeTaken,
      totalTimeSeconds: exam.durationSeconds,
      reviewDetails,
    };

    try {
      sessionStorage.setItem('ethioprep_latest_result', JSON.stringify(resultPayload));
      // Clean up in-progress answers
      sessionStorage.removeItem(storageAnswersKey);
      sessionStorage.removeItem(storageFlagsKey);
      sessionStorage.removeItem(storageTimeKey);
    } catch {
      // Ignore
    }

    navigate(`/attempts/${exam.id}-attempt-1/results`);
  }, [answers, exam, language, navigate, secondsRemaining, storageAnswersKey, storageFlagsKey, storageTimeKey]);

  // Handle timer expiration
  const handleTimerExpire = useCallback(() => {
    alert(t('exam.timeUp') + ' ' + t('exam.autoSubmitted'));
    handleSubmitAttempt();
  }, [handleSubmitAttempt, t]);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col select-none">
      {/* Immersive Top Exam Bar (No external public links) */}
      <header className="sticky top-0 z-40 bg-brand-navy text-white px-4 py-3 shadow-md border-b border-white/10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-badge bg-brand-teal text-white flex items-center justify-center font-bold text-sm">
              E
            </span>
            <div className="overflow-hidden">
              <h2 className="font-bold text-body-sm sm:text-body text-white truncate max-w-[200px] sm:max-w-md">
                {language === 'am' ? exam.titleAm : exam.titleEn}
              </h2>
              <span className="text-caption text-white/70 block">
                Question {currentIndex + 1} of {exam.questions.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Interactive Timer */}
            <Timer
              remainingSeconds={secondsRemaining}
              totalSeconds={exam.durationSeconds}
              onExpire={handleTimerExpire}
            />

            <Button
              size="sm"
              variant="secondary"
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-bold"
              onClick={() => setIsConfirmOpen(true)}
            >
              {t('exam.submit')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Exam Content Grid */}
      <div className="flex-1 max-w-[1200px] w-full mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Active Question Area (3 Cols) */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-surface rounded-card p-6 sm:p-8 border border-border shadow-card space-y-6">
            <div className="flex items-center justify-between gap-2 border-b border-border pb-4">
              <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
                {currentQ.topicTitle} • Question {currentIndex + 1} of {exam.questions.length}
              </span>

              {/* Flag Toggle Button */}
              <button
                type="button"
                onClick={handleToggleFlag}
                className={`
                  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-badge text-caption font-bold transition-all cursor-pointer border
                  ${isCurrentFlagged
                    ? 'bg-brand-gold text-brand-navy border-brand-gold shadow-sm'
                    : 'bg-surface text-text-muted border-border hover:bg-brand-bg hover:text-text-primary'
                  }
                `.trim()}
              >
                <span>🚩</span>
                <span>{isCurrentFlagged ? t('exam.flagged') : t('exam.flag')}</span>
              </button>
            </div>

            {/* Question Prompt */}
            <h2 className="text-h3 sm:text-h2 font-bold text-brand-navy leading-relaxed">
              {language === 'am' ? currentQ.promptAm : currentQ.promptEn}
            </h2>

            {/* 4 Options (A, B, C, D) */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => (
                <QuestionOption
                  key={opt.id}
                  label={opt.label}
                  text={language === 'am' ? opt.textAm : opt.textEn}
                  isSelected={answers[currentQ.id] === opt.id}
                  onSelect={() => handleSelectOption(opt.id)}
                />
              ))}
            </div>

            {/* Navigation Bottom Controls */}
            <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="md"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              >
                ← {t('exam.previous')}
              </Button>

              <div className="text-caption text-text-muted font-medium">
                {answeredIndices.has(currentIndex) ? '✓ Answered' : 'Unanswered'}
              </div>

              {currentIndex < exam.questions.length - 1 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentIndex((prev) => Math.min(exam.questions.length - 1, prev + 1))}
                >
                  {t('exam.next')} →
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="md"
                  className="bg-brand-gold text-brand-navy font-bold hover:bg-brand-gold-light"
                  onClick={() => setIsConfirmOpen(true)}
                >
                  {t('exam.submit')} →
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigator (1 Col) */}
        <div className="md:col-span-1 space-y-4">
          <QuestionNavigator
            totalQuestions={exam.questions.length}
            currentIndex={currentIndex}
            answeredIndices={answeredIndices}
            flaggedIndices={flaggedIndices}
            onNavigate={(idx) => setCurrentIndex(idx)}
          />

          <div className="bg-brand-bg-alt/70 p-4 rounded-card border border-border text-caption text-text-secondary space-y-1.5">
            <span className="font-bold text-brand-navy block">Offline Resilience Active:</span>
            <p>Answers are saved in your browser session after each click. Network drops will not lose your progress.</p>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog before Final Submission */}
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
        onConfirm={handleSubmitAttempt}
        onCancel={() => setIsConfirmOpen(false)}
        isDestructive={unansweredCount > 0}
      />
    </div>
  );
}
