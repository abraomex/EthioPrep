import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';

export function ExamInstructionsPage() {
  const { id } = useParams();
  const { t, language } = useLanguage();

  const exam = {
    id: id || 'math-mock-1',
    titleEn: 'Grade 12 Mathematics National Mock Examination 1',
    titleAm: 'የ12ኛ ክፍል ሒሳብ ብሔራዊ ሞዴል ፈተና 1',
    durationMinutes: 90,
    questionCount: 40,
    rulesEn: [
      'The test consists of 40 multiple-choice questions.',
      'You have 90 minutes. A timer will run continuously.',
      'Your answers are saved automatically into your browser session after each click.',
      'You can flag questions to review them before final submission.',
      'The test will automatically submit when the timer reaches 00:00.',
    ],
    rulesAm: [
      'ፈተናው 40 ባለብዙ ምርጫ ጥያቄዎችን ይዟል።',
      'የተሰጠዎት ጊዜ 90 ደቂቃ ነው። ሰዓቱ በተከታታይ ይቆጥራል።',
      'መልሶችዎ በየምርጫዎ በራስ-ሰር ይቀመጣሉ።',
      'ለማስታወስ የሚፈልጓቸውን ጥያቄዎች ምልክት ማድረግ ይችላሉ።',
      'ሰዓቱ 00:00 ሲደርስ ፈተናው በራስ-ሰር ይገባል።',
    ],
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12 space-y-8">
      <div className="bg-surface rounded-card p-6 md:p-8 border border-border shadow-card space-y-6">
        <div>
          <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
            Timed Examination
          </span>
          <h1 className="text-h1 font-bold text-brand-navy mt-1">
            {language === 'am' ? exam.titleAm : exam.titleEn}
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-surface-muted rounded-card border border-border">
          <div>
            <p className="text-caption text-text-muted">{t('exam.duration')}</p>
            <p className="text-xl font-bold text-brand-navy">{exam.durationMinutes} min</p>
          </div>
          <div>
            <p className="text-caption text-text-muted">{t('exam.questionCount')}</p>
            <p className="text-xl font-bold text-brand-navy">{exam.questionCount} Questions</p>
          </div>
          <div>
            <p className="text-caption text-text-muted">Passing Score</p>
            <p className="text-xl font-bold text-brand-teal">50%</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-body text-brand-navy mb-3">
            {language === 'am' ? 'የፈተና መመሪያዎችና ደንቦች' : 'Exam Rules & Instructions'}
          </h3>
          <ul className="space-y-2 text-body-sm text-text-secondary list-disc pl-5">
            {(language === 'am' ? exam.rulesAm : exam.rulesEn).map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/dashboard">
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Link to={`/exams/${exam.id}/attempt`}>
            <Button variant="primary" size="lg" className="shadow-md">
              {t('exam.start')} →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

