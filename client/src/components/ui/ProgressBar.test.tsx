import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar Component', () => {
  it('should render progress bar with correct ARIA attributes', () => {
    render(<ProgressBar value={45} aria-label="Lesson Progress" />);

    const bar = screen.getByRole('progressbar', { name: /lesson progress/i });
    expect(bar).toBeDefined();
    expect(bar.getAttribute('aria-valuenow')).toBe('45');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should clamp values below 0 and above 100', () => {
    const { rerender } = render(<ProgressBar value={-20} aria-label="Progress Low" />);
    let bar = screen.getByRole('progressbar', { name: /progress low/i });
    expect(bar.getAttribute('aria-valuenow')).toBe('0');

    rerender(<ProgressBar value={150} aria-label="Progress High" />);
    bar = screen.getByRole('progressbar', { name: /progress high/i });
    expect(bar.getAttribute('aria-valuenow')).toBe('100');
  });

  it('should adapt colors dynamically in auto mode based on mastery percentage', () => {
    // Under 60% -> gold
    const { rerender, container } = render(<ProgressBar value={40} aria-label="Test" />);
    expect(container.innerHTML).toContain('bg-brand-gold');

    // 60% to 89% -> teal
    rerender(<ProgressBar value={75} aria-label="Test" />);
    expect(container.innerHTML).toContain('bg-brand-teal');

    // 90% and above -> success
    rerender(<ProgressBar value={95} aria-label="Test" />);
    expect(container.innerHTML).toContain('bg-status-success');
  });

  it('should display textual percentage label when showLabel is enabled', () => {
    render(<ProgressBar value={68} showLabel aria-label="Test Label" />);
    expect(screen.getByText('68%')).toBeDefined();
  });
});

