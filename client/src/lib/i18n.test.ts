import { describe, it, expect } from 'vitest';
import { translations } from './i18n/translations';

describe('Bilingual Internationalization (i18n) Engine', () => {
  it('should have parity for all top-level keys between English and Amharic', () => {
    const enKeys = Object.keys(translations.en).sort();
    const amKeys = Object.keys(translations.am).sort();

    expect(amKeys).toEqual(enKeys);
  });

  it('should return valid translations for core navigation items in both languages', () => {
    expect(translations.en['nav.home']).toBe('Home');
    expect(translations.am['nav.home']).toBe('መነሻ');

    expect(translations.en['nav.subjects']).toBe('Subjects');
    expect(translations.am['nav.subjects']).toBe('ትምህርቶች');

    expect(translations.en['nav.exams']).toBe('Exams');
    expect(translations.am['nav.exams']).toBe('ፈተናዎች');
  });

  it('should translate critical exam engine strings with Ethiopic typography support', () => {
    expect(translations.en['exam.start']).toBe('Start Timed Attempt');
    expect(translations.am['exam.start']).toBe('የጊዜ ፈተና ይጀምሩ');

    expect(translations.en['exam.submit']).toBe('Submit Exam');
    expect(translations.am['exam.submit']).toBe('ፈተና ያስገቡ');

    expect(translations.en['exam.flag']).toBe('Flag for Review');
    expect(translations.am['exam.flag']).toBe('ለግምገማ ምልክት ያድርጉ');
  });

  it('should translate freemium tier labels and results feedback', () => {
    expect(translations.en['common.free']).toBe('Free');
    expect(translations.am['common.free']).toBe('ነጻ');

    expect(translations.en['common.premium']).toBe('Premium');
    expect(translations.am['common.premium']).toBe('ፕሪሚየም');

    expect(translations.en['results.excellent']).toContain('Excellent');
    expect(translations.am['results.excellent']).toContain('እጅግ በጣም ጥሩ');
  });
});

