import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function TopicPracticePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = {
    prompt: 'What is the limit of (2x^2 - 8)/(x - 2) as x approaches 2?',
    options: [
      { id: 'opt-a', label: 'A', text: '4' },
      { id: 'opt-b', label: 'B', text: '8' },
      { id: 'opt-c', label: 'C', text: '0' },
      { id: 'opt-d', label: 'D', text: 'Does not exist' },
    ],
    correctId: 'opt-b',
    explanation: 'Factoring 2(x^2 - 4)/(x - 2) = 2(x - 2)(x + 2)/(x - 2) = 2(x + 2). As x -> 2, 2(2 + 2) = 8.',
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="text-body-sm text-brand-teal hover:underline">
          ← Back to Dashboard
        </Link>
        <span className="text-caption font-semibold px-2.5 py-1 rounded bg-brand-teal/10 text-brand-teal">
          Practice Mode
        </span>
      </div>

      <div className="bg-surface rounded-card p-6 md:p-8 border border-border shadow-card space-y-6">
        <div>
          <span className="text-caption text-text-muted font-bold uppercase">Question 1 of 5</span>
          <h2 className="text-h3 font-bold text-brand-navy mt-2 leading-relaxed">
            {question.prompt}
          </h2>
        </div>

        <div className="space-y-3">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            let optStyle = 'border-border bg-surface hover:bg-brand-bg';
            if (isSelected) {
              optStyle = 'border-brand-teal bg-brand-teal/10 font-semibold';
            }
            if (showExplanation) {
              if (opt.id === question.correctId) {
                optStyle = 'border-status-success bg-green-50 text-status-success font-bold';
              } else if (isSelected) {
                optStyle = 'border-status-error bg-red-50 text-status-error';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => !showExplanation && setSelectedOption(opt.id)}
                className={`w-full p-4 rounded-button border text-left flex items-center gap-3 transition-colors cursor-pointer ${optStyle}`}
              >
                <span className="w-7 h-7 rounded-full bg-brand-bg border border-border flex items-center justify-center font-bold text-sm shrink-0">
                  {opt.label}
                </span>
                <span className="text-body">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {!showExplanation ? (
          <Button
            variant="primary"
            disabled={!selectedOption}
            onClick={() => setShowExplanation(true)}
          >
            Check Answer
          </Button>
        ) : (
          <div className="p-4 bg-surface-muted rounded-card border border-border space-y-2">
            <h4 className="font-bold text-body text-brand-navy">Explanation:</h4>
            <p className="text-body-sm text-text-secondary">{question.explanation}</p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedOption(null);
                  setShowExplanation(false);
                }}
              >
                Next Question →
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
