import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render children and respond to clicks', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDefined();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply primary variant classes by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button', { name: /primary/i });
    expect(button.className).toContain('bg-brand-teal');
    expect(button.className).toContain('text-white');
  });

  it('should apply secondary and danger variant classes', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    let button = screen.getByRole('button', { name: /secondary/i });
    expect(button.className).toContain('bg-brand-navy');

    rerender(<Button variant="danger">Delete</Button>);
    button = screen.getByRole('button', { name: /delete/i });
    expect(button.className).toContain('bg-status-error');
  });

  it('should disable interactions and show spinner when isLoading is true', () => {
    const handleClick = vi.fn();
    render(<Button isLoading onClick={handleClick}>Saving</Button>);

    const button = screen.getByRole('button', { name: /saving/i });
    expect(button.getAttribute('disabled')).not.toBeNull();
    expect(button.querySelector('svg.animate-spin')).toBeDefined();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should disable interactions when disabled prop is set', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);

    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button.getAttribute('disabled')).not.toBeNull();
    expect(button.className).toContain('opacity-50');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

