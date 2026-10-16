import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';
import { AccessBadge } from '../components/ui/AccessBadge';
import { mockExams } from '../lib/mockExams';

export function ExamInstructionsPage() {
  const { id } = useParams();
  const { t, language } = useLanguage();

  const exam = mockExams[id || 'math-mock-1'] || mockExams['math-mock-1'];
  const durationMinutes = Math.round(exam.durationSeconds / 60);

  const rulesEn = [
    `The exam contains ${exam.questions.length} multiple-choice questions covering Grade 12 curriculum.`,
    `You have a total of ${durationMinutes} minutes. An automated countdown timer will run continuously.`,
    'Answer persistence: Every selection and flagged question is saved automatically into your browser session storage.',
    'You may navigate freely between questions and change answers prior to final submission.',
    'The exam will automatically submit when the countdown timer reaches 00:00.',
    'Once submitted, your score and detailed step-by-step explanations will be generated immediately.',
  ];

  const rulesAm = [
    `ፈተናው ${exam.questions.length} የ12ኛ ክፍል ባለብዙ ምርጫ ጥያቄዎችን ይዟል።`,
    `የተሰጠዎት ጠቅላላ ጊዜ ${durationMinutes} ደቂቃ ነው። የጊዜ ቆጣሪው በተከታታይ ይቆጥራል።`,
    'የመልስ ጥበቃ፡ የመረጡት እያንዳንዱ መልስና ምልክት ያደረጉበት ጥያቄ በስልክዎ/ብሮውዘርዎ ውስጥ በራስ-ሰር ይቀመጣል።',
    'ፈተናውን ከማስገባትዎ በፊት ወደፈለጉት ጥያቄ በመሄድ መልስዎን መቀየር ይችላሉ።',
    'የፈተናው ሰዓት 00:00 ሲደርስ ፈተናው በራስ-ሰር ይገባል።',
    'ፈተናው እንደገባ ውጤትዎ እና የእያንዳንዱ ጥያቄ ዝርዝር ማብራሪያ ወዲያውኑ ይታያል።',
  ];

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 md:py-14 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-caption text-text-muted">
        <Link to="/subjects" className="hover:text-brand-teal">Subjects</Link>
        <span>/</span>
        <Link to={`/subjects/${exam.subjectSlug}`} className="hover:text-brand-teal capitalize">
          {language === 'am' ? exam.subjectTitleAm : exam.subjectTitleEn}
        </Link>
        <span>/</span>
        <span className="text-brand-navy font-semibold">Instructions</span>
      </div>

      <div className="bg-surface rounded-card p-6 md:p-8 border border-border shadow-card space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-badge text-caption font-bold bg-brand-navy/10 text-brand-navy uppercase">
              Timed Mock Examination
            </span>
            <AccessBadge tier={exam.accessTier} size="sm" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
            {language === 'am' ? exam.titleAm : exam.titleEn}
          </h1>
        </div>

        {/* Quick Parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-surface-muted rounded-card border border-border">
          <div>
            <p className="text-caption text-text-muted">{t('exam.duration')}</p>
            <p className="text-xl font-black text-brand-navy mt-0.5">{durationMinutes} min</p>
          </div>
          <div>
            <p className="text-caption text-text-muted">{t('exam.questionCount')}</p>
            <p className="text-xl font-black text-brand-navy mt-0.5">{exam.questions.length} Qs</p>
          </div>
          <div>
            <p className="text-caption text-text-muted">Pass Threshold</p>
            <p className="text-xl font-black text-brand-teal mt-0.5">50%</p>
          </div>
        </div>

        {/* Instructions List */}
        <div>
          <h3 className="font-bold text-body text-brand-navy mb-3">
            {language === 'am' ? 'የፈተና መመሪያዎችና ደንቦች' : 'Rules and Instructions'}
          </h3>
          <ul className="space-y-2.5 text-body-sm text-text-secondary list-disc pl-5 leading-relaxed">
            {(language === 'am' ? rulesAm : rulesEn).map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to={`/subjects/${exam.subjectSlug}`}>
            <Button variant="ghost">← Back to Subject</Button>
          </Link>
          <Link to={`/exams/${exam.id}/attempt`}>
            <Button variant="primary" size="lg" className="shadow-md font-bold">
              {t('exam.start')} →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
