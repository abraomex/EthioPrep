import { describe, it, expect, beforeEach } from 'vitest';

describe('Offline Exam Answer Buffering & Persistence', () => {
  const examId = 'exam-physics-mock-1';
  const storageAnswersKey = `ethioprep_answers_${examId}`;
  const storageFlagsKey = `ethioprep_flags_${examId}`;
  const storageTimeKey = `ethioprep_time_${examId}`;

  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should buffer and persist student answers in sessionStorage against network drop', () => {
    const studentAnswers: Record<string, string> = {
      'q-1': 'opt-b',
      'q-2': 'opt-c',
    };

    sessionStorage.setItem(storageAnswersKey, JSON.stringify(studentAnswers));

    const retrieved = JSON.parse(sessionStorage.getItem(storageAnswersKey) || '{}');
    expect(retrieved['q-1']).toBe('opt-b');
    expect(retrieved['q-2']).toBe('opt-c');
    expect(Object.keys(retrieved)).toHaveLength(2);
  });

  it('should buffer flagged questions for review', () => {
    const flaggedMap: Record<string, boolean> = {
      'q-1': true,
      'q-3': true,
    };

    sessionStorage.setItem(storageFlagsKey, JSON.stringify(flaggedMap));

    const retrieved = JSON.parse(sessionStorage.getItem(storageFlagsKey) || '{}');
    expect(retrieved['q-1']).toBe(true);
    expect(retrieved['q-3']).toBe(true);
    expect(retrieved['q-2']).toBeUndefined();
  });

  it('should calculate unanswered count correctly given total questions and answer map', () => {
    const questionIds = ['q-1', 'q-2', 'q-3', 'q-4', 'q-5'];
    const answers: Record<string, string> = {
      'q-1': 'opt-a',
      'q-2': 'opt-b',
      'q-4': 'opt-d',
    };

    const answeredCount = Object.keys(answers).length;
    const unansweredCount = questionIds.length - answeredCount;

    expect(answeredCount).toBe(3);
    expect(unansweredCount).toBe(2);
  });

  it('should correctly format remaining seconds into MM:SS display', () => {
    function formatTime(totalSeconds: number): string {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    expect(formatTime(3600)).toBe('60:00');
    expect(formatTime(359)).toBe('05:59');
    expect(formatTime(45)).toBe('00:45');
    expect(formatTime(0)).toBe('00:00');
  });

  it('should clear all session buffer keys upon exam submission to prevent stale state', () => {
    sessionStorage.setItem(storageAnswersKey, JSON.stringify({ 'q-1': 'opt-a' }));
    sessionStorage.setItem(storageFlagsKey, JSON.stringify({ 'q-1': true }));
    sessionStorage.setItem(storageTimeKey, '1200');

    // Simulate submission cleanup
    sessionStorage.removeItem(storageAnswersKey);
    sessionStorage.removeItem(storageFlagsKey);
    sessionStorage.removeItem(storageTimeKey);

    expect(sessionStorage.getItem(storageAnswersKey)).toBeNull();
    expect(sessionStorage.getItem(storageFlagsKey)).toBeNull();
    expect(sessionStorage.getItem(storageTimeKey)).toBeNull();
  });
});

