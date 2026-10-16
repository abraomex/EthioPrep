import { useState } from 'react';
import { Button } from '../../components/ui/Button';

export function AdminQuestionsPage() {
  const [questions] = useState([
    { id: '1', prompt: 'If f(x) = 3x^2 - 4x + 7, what is f\'(2)?', topic: 'Derivatives', difficulty: 'Medium', correct: 'A' },
    { id: '2', prompt: 'What is the limit of (sin x)/x as x -> 0?', topic: 'Limits', difficulty: 'Easy', correct: 'B' },
    { id: '3', prompt: 'Which law of thermodynamics defines entropy?', topic: 'Thermodynamics', difficulty: 'Medium', correct: 'C' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-brand-navy">Question Bank Editor</h1>
          <p className="text-body-sm text-text-secondary">
            Manage multiple-choice questions, options, difficulty, and bilingual explanations
          </p>
        </div>
        <Button variant="primary">+ Add Question</Button>
      </div>

      <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface-muted border-b border-border text-caption text-text-muted uppercase">
            <tr>
              <th className="p-4">Prompt</th>
              <th className="p-4">Topic</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4">Correct</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {questions.map((q) => (
              <tr key={q.id} className="hover:bg-brand-bg transition-colors">
                <td className="p-4 font-semibold text-brand-navy max-w-xs truncate">{q.prompt}</td>
                <td className="p-4 text-text-secondary">{q.topic}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-caption font-bold bg-brand-bg text-brand-teal">
                    {q.difficulty}
                  </span>
                </td>
                <td className="p-4 font-bold text-status-success">{q.correct}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-brand-teal hover:underline font-medium">Edit</button>
                  <button className="text-status-error hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

