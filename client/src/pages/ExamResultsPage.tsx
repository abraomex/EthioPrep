import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';
import { ResultSummary, type TopicScore } from '../components/exam/ResultSummary';
import { LessonContent } from '../components/learning/LessonContent';

interface QuestionReviewItem {
  questionNumber: number;
  promptEn: string;
  promptAm: string;
  topicTitle: string;
  yourAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanationEn: string;
  explanationAm: string;
}

export function ExamResultsPage() {
  const { t, language } = useLanguage();
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('all');

  // Default fallback results if navigated directly
  const [examResult, setExamResult] = useState<{
    examTitleEn: string;
    examTitleAm: string;
    score: number;
    maxScore: number;
    timeTakenSeconds: number;
    totalTimeSeconds: number;
    reviewDetails: QuestionReviewItem[];
  }>({
    examTitleEn: 'Grade 12 Mathematics National Mock Examination 1',
    examTitleAm: 'የ12ኛ ክፍል ሒሳብ ብሔራዊ ሞዴል ፈተና 1',
    score: 5,
    maxScore: 6,
    timeTakenSeconds: 3120,
    totalTimeSeconds: 5400,
    reviewDetails: [
      {
        questionNumber: 1,
        promptEn: 'What is the value of $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$?',
        promptAm: 'የ $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$ እሴት ስንት ነው?',
        topicTitle: 'Limits and Continuity',
        yourAnswer: 'C) 6',
        correctAnswer: 'C) 6',
        isCorrect: true,
        explanationEn: 'Factor $(x^2 - 9) = (x - 3)(x + 3)$. Cancel $(x - 3)$ and substitute $x = 3$ to get $3 + 3 = 6$.',
        explanationAm: 'የሁለት ስኩዌሮች ልዩነትን ማበጠር፡ $(x^2 - 9) = (x - 3)(x + 3)$። በ $x = 3$ ሲተካ 6 ይመጣል።',
      },
      {
        questionNumber: 2,
        promptEn: 'If $f(x) = 3x^2 - 4x + 7$, what is $f\'(2)$?',
        promptAm: 'ፋንክሽኑ $f(x) = 3x^2 - 4x + 7$ ቢሆን፣ የ $f\'(2)$ እሴት ስንት ነው?',
        topicTitle: 'Derivatives and Applications',
        yourAnswer: 'A) 8',
        correctAnswer: 'A) 8',
        isCorrect: true,
        explanationEn: 'By the power rule: $f\'(x) = 6x - 4$. At $x = 2$, $f\'(2) = 6(2) - 4 = 8$.',
        explanationAm: 'በፓወር ህግ መሰረት $f\'(x) = 6x - 4$ ነው። በ $x = 2$ ሲተካ 8 ይመጣል።',
      },
      {
        questionNumber: 3,
        promptEn: 'In an arithmetic sequence where $a_1 = 5$ and $d = 3$, what is $a_{10}$?',
        promptAm: 'በአንድ አርቲሜቲክ ዝርዝር $a_1 = 5$ እና $d = 3$ ቢሆን፣ $a_{10}$ ስንት ነው?',
        topicTitle: 'Sequences and Series',
        yourAnswer: 'B) 35',
        correctAnswer: 'A) 32',
        isCorrect: false,
        explanationEn: 'Formula: $a_n = a_1 + (n - 1)d$. For $n = 10$: $a_{10} = 5 + (9)(3) = 5 + 27 = 32$. Watch out for using $n$ instead of $n - 1$!',
        explanationAm: 'ቀመር፡ $a_n = a_1 + (n - 1)d$። ለ $n = 10$፡ $a_{10} = 5 + (9)(3) = 32$። $(n - 1)$ን መተካት አይርሱ።',
      },
      {
        questionNumber: 4,
        promptEn: 'Evaluate the definite integral $\\int_{0}^{3} 2x \\, dx$:',
        promptAm: 'የተወሰነውን ኢንቴግራል $\\int_{0}^{3} 2x \\, dx$ እሴት አስሉ፡',
        topicTitle: 'Integrals and Area Calculation',
        yourAnswer: 'B) 9',
        correctAnswer: 'B) 9',
        isCorrect: true,
        explanationEn: 'Antiderivative of $2x$ is $x^2$. $[x^2]_0^3 = 3^2 - 0 = 9$.',
        explanationAm: 'የ $2x$ ፀረ-ዴሪቬቲቭ $x^2$ ነው። $[x^2]_0^3 = 9$ ይሆናል።',
      },
      {
        questionNumber: 5,
        promptEn: 'If $\\mathbf{u} = (2, 3)$ and $\\mathbf{v} = (-1, 4)$, what is $\\mathbf{u} \\cdot \\mathbf{v}$?',
        promptAm: 'ቬክተር $\\mathbf{u} = (2, 3)$ እና $\\mathbf{v} = (-1, 4)$ ቢሆኑ፣ $\\mathbf{u} \\cdot \\mathbf{v}$ ስንት ነው?',
        topicTitle: 'Vectors in Two and Three Dimensions',
        yourAnswer: 'A) 10',
        correctAnswer: 'A) 10',
        isCorrect: true,
        explanationEn: '$\\mathbf{u} \\cdot \\mathbf{v} = (2)(-1) + (3)(4) = -2 + 12 = 10$.',
        explanationAm: 'የዶት ብዜት፡ $(2)(-1) + (3)(4) = -2 + 12 = 10$።',
      },
      {
        questionNumber: 6,
        promptEn: 'What is the value of $\\lim_{x \\to 0} \\frac{\\sin x}{x}$?',
        promptAm: 'የ $\\lim_{x \\to 0} \\frac{\\sin x}{x}$ እሴት ስንት ነው?',
        topicTitle: 'Limits and Continuity',
        yourAnswer: 'B) 1',
        correctAnswer: 'B) 1',
        isCorrect: true,
        explanationEn: 'Standard fundamental limit: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.',
        explanationAm: 'መሰረታዊ የትሪጎኖሜትሪ ሊሚት ቴዎረም፡ $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$።',
      },
    ],
  });

  // Load from sessionStorage if available
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('ethioprep_latest_result');
      if (stored) {
        setExamResult(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Compute topic breakdown
  const topicMap: Record<string, { correct: number; total: number }> = {};
  examResult.reviewDetails.forEach((q) => {
    if (!topicMap[q.topicTitle]) {
      topicMap[q.topicTitle] = { correct: 0, total: 0 };
    }
    topicMap[q.topicTitle].total += 1;
    if (q.isCorrect) topicMap[q.topicTitle].correct += 1;
  });

  const topicBreakdown: TopicScore[] = Object.entries(topicMap).map(
    ([topicTitle, data]) => ({
      topicTitle,
      correct: data.correct,
      total: data.total,
      percentage: Math.round((data.correct / data.total) * 100),
    })
  );

  const filteredQuestions = examResult.reviewDetails.filter((q) => {
    if (filterMode === 'incorrect') return !q.isCorrect;
    if (filterMode === 'correct') return q.isCorrect;
    return true;
  });

  const incorrectCount = examResult.reviewDetails.filter((q) => !q.isCorrect).length;

  return (
    <div className="max-w-[880px] mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Title */}
      <div>
        <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
          Performance Analytics
        </span>
        <h1 className="text-h1 font-black text-brand-navy mt-1">
          {language === 'am' ? examResult.examTitleAm : examResult.examTitleEn}
        </h1>
      </div>

      {/* Result Summary Card */}
      <ResultSummary
        score={examResult.score}
        maxScore={examResult.maxScore}
        timeTakenSeconds={examResult.timeTakenSeconds}
        totalTimeSeconds={examResult.totalTimeSeconds}
        topicBreakdown={topicBreakdown}
      />

      {/* Action CTA Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface rounded-card border border-border shadow-card">
        <Link to="/dashboard">
          <Button variant="outline">← {t('dashboard.continue')}</Button>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/exams/math-mock-1/instructions">
            <Button variant="secondary">Retake Exam</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="primary">Study Weak Topics →</Button>
          </Link>
        </div>
      </div>

      {/* Detailed Question Review Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-h2 font-bold text-brand-navy">
              {t('results.questionReview')}
            </h2>
            <p className="text-body-sm text-text-secondary">
              Review your answers with complete worked solutions
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-surface p-1 rounded-card border border-border">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-button text-caption font-bold transition-colors cursor-pointer ${
                filterMode === 'all' ? 'bg-brand-navy text-white' : 'text-text-secondary'
              }`}
            >
              All ({examResult.reviewDetails.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1.5 rounded-button text-caption font-bold transition-colors cursor-pointer ${
                filterMode === 'incorrect' ? 'bg-status-error text-white' : 'text-text-secondary'
              }`}
            >
              Mistakes ({incorrectCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-button text-caption font-bold transition-colors cursor-pointer ${
                filterMode === 'correct' ? 'bg-status-success text-white' : 'text-text-secondary'
              }`}
            >
              Correct ({examResult.score})
            </button>
          </div>
        </div>

        {/* Question Cards */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div
              key={q.questionNumber}
              className={`p-6 rounded-card bg-surface border shadow-card space-y-4 transition-all ${
                q.isCorrect ? 'border-status-success/30' : 'border-status-error/40 ring-1 ring-status-error/20'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-caption font-bold text-text-muted uppercase">
                  {q.topicTitle} • Question {q.questionNumber}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-badge text-caption font-bold ${
                    q.isCorrect
                      ? 'bg-status-success/10 text-status-success'
                      : 'bg-status-error/10 text-status-error'
                  }`}
                >
                  {q.isCorrect ? '✓ ' + t('results.correct') : '✗ ' + t('results.incorrect')}
                </span>
              </div>

              {/* Prompt with math support */}
              <div className="font-bold text-body sm:text-h3 text-brand-navy">
                <LessonContent content={language === 'am' ? q.promptAm : q.promptEn} />
              </div>

              {/* Comparison Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-body-sm">
                <div className={`p-3 rounded-button border ${q.isCorrect ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'}`}>
                  <span className="text-caption text-text-muted block font-semibold mb-0.5">
                    {t('results.yourAnswer')}:
                  </span>
                  <span className={`font-bold ${q.isCorrect ? 'text-status-success' : 'text-status-error'}`}>
                    {q.yourAnswer}
                  </span>
                </div>

                <div className="p-3 rounded-button border bg-green-50/50 border-green-200">
                  <span className="text-caption text-text-muted block font-semibold mb-0.5">
                    {t('results.correctAnswer')}:
                  </span>
                  <span className="font-bold text-status-success">
                    {q.correctAnswer}
                  </span>
                </div>
              </div>

              {/* Step-by-Step Explanation */}
              <div className="p-4 rounded-card bg-surface-muted border border-border space-y-1.5">
                <span className="text-caption font-bold text-brand-teal uppercase tracking-wider block">
                  {t('results.explanation')}:
                </span>
                <LessonContent
                  content={language === 'am' ? q.explanationAm : q.explanationEn}
                  className="text-body-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
