import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { Button } from '../components/ui/Button';

export function AboutPage() {
  const { t, language } = useLanguage();

  const faqs = [
    {
      qEn: 'Is EthioPrep completely free for Ethiopian students?',
      qAm: 'EthioPrep ለኢትዮጵያ ተማሪዎች ሙሉ በሙሉ ነጻ ነው?',
      aEn: 'Yes! All core curriculum lessons, worked examples, chapter quizzes, formula sheets, and standard progress tracking are completely free. An optional premium tier will later offer expanded mock exam pools and deeper analytics.',
      aAm: 'አዎ! ሁሉም ዋና የትምህርት ማስታወሻዎች፣ ምሳሌዎች፣ የርዕስ ጥያቄዎች እና የቀመር ማጠቃለያዎች ሙሉ በሙሉ ነጻ ናቸው። ወደፊት ተጨማሪ የሞዴል ፈተናዎች በፕሪሚየም ይቀርባሉ።',
    },
    {
      qEn: 'How are lessons and practice questions verified?',
      qAm: 'ትምህርቶች እና የፈተና ጥያቄዎች እንዴት ይረጋገጣሉ?',
      aEn: 'All content is aligned strictly with the Ethiopian Grade 12 national curriculum published by the Ministry of Education. Worked examples follow the exact question patterns seen on past national exams.',
      aAm: 'ሁሉም ይዘቶች በትምህርት ሚኒስቴር የወጣውን የ12ኛ ክፍል ስርዓተ-ትምህርት በጥብቅ የተከተሉ ናቸው። ምሳሌዎችና ጥያቄዎች ካለፉት ብሔራዊ ፈተናዎች አወቃቀር ጋር የተጣጣሙ ናቸው።',
    },
    {
      qEn: 'Will my answers be lost if my mobile internet drops during an exam?',
      qAm: 'በፈተና ወቅት የኢንተርኔት ግንኙነት ቢቋረጥ መልሶቼ ይጠፋሉ?',
      aEn: 'No! EthioPrep saves every selected answer and flagged question immediately into your browser session storage. If your connection temporarily disconnects or you refresh, all your selected answers remain intact.',
      aAm: 'በፍጹም አይጠፉም! EthioPrep እያንዳንዱን የመረጡትን መልስ በስልክዎ/ኮምፒውተርዎ ብሮውዘር ውስጥ ወዲያውኑ ያስቀምጣል። ግንኙነት ቢቋረጥ እንኳ መልሶችዎ አይጠፉም።',
    },
    {
      qEn: 'Can I study complex Math and Physics equations on small phone screens?',
      qAm: 'በአነስተኛ ስልክ ስክሪን ላይ ውስብስብ የሒሳብ እና ፊዚክስ ቀመሮችን ማየት ይቻላል?',
      aEn: 'Yes. Our KaTeX rendering engine is optimized with horizontal touch scroll for viewports down to 360px wide, so long equations never break your mobile layout.',
      aAm: 'አዎ። የKaTeX ቀመር አቀራረባችን እስከ 360 ፒክሰል ስክሪን ድረስ የሚመች ሆኖ የተዘጋጀ ሲሆን፣ ረጅም ቀመሮችን በጣት ወደ ጎን በማሸብለል በግልጽ ማንበብ ይቻላል።',
    },
    {
      qEn: 'How do I switch between English and Amharic?',
      qAm: 'በእንግሊዝኛ እና በአማርኛ መካከል እንዴት መቀያየር እችላለሁ?',
      aEn: 'Click or tap the 🌐 globe icon in the navigation bar anytime. Your preferred language is saved and will be remembered across sessions.',
      aAm: 'በማንኛውም ጊዜ በላይኛው ሜኑ ላይ ያለውን የ🌐 ዓለም ምልክት ይጫኑ። የመረጡት ቋንቋ በስልክዎ ላይ ተቀምጦ ይቆያል።',
    },
  ];

  return (
    <div className="max-w-[860px] mx-auto px-4 py-8 md:py-14 space-y-12">
      {/* Page Header */}
      <div>
        <span className="text-caption font-bold text-brand-teal uppercase tracking-wider">
          Mission &amp; Integrity
        </span>
        <h1 className="text-h1 sm:text-3xl font-black text-brand-navy mt-1 mb-4">
          {t('about.title')}
        </h1>
        <p className="text-body sm:text-lg text-text-secondary leading-relaxed">
          {language === 'am'
            ? 'EthioPrep በኢትዮጵያ ውስጥ ላሉ የ12ኛ ክፍል ተማሪዎች የብሔራዊ ፈተና ዝግጅትን ቀላል፣ ጥራት ያለው እና በሁለት ቋንቋ ተደራሽ ለማድረግ የተፈጠረ የትምህርት መድረክ ነው።'
            : 'EthioPrep is a bilingual, mobile-first learning and examination preparation platform engineered specifically for Ethiopian Grade 12 students preparing for university entrance.'}
        </p>
      </div>

      {/* Curriculum Verification & Exam Integrity Banner */}
      <div className="bg-surface rounded-card p-6 md:p-8 border-l-4 border-brand-teal border-y border-r border-border shadow-card space-y-4">
        <div className="flex items-center gap-2 text-brand-teal font-bold text-body">
          <span>🛡️</span>
          <span>Curriculum Integrity &amp; Syllabi Verification</span>
        </div>
        <p className="text-body-sm text-text-secondary leading-relaxed">
          EthioPrep organizes content strictly around official Ethiopian Grade 12 subjects across Natural Science, Social Science, and Common streams. Every lesson includes verified key principles, step-by-step worked examples, and exam-style questions with detailed explanations.
        </p>
        <div className="p-4 rounded-button bg-brand-bg text-caption text-text-muted leading-relaxed">
          <strong>Official Notice:</strong> EthioPrep is an independent educational platform created to assist students. It is not an official branch of the Ministry of Education or the Educational Assessment and Examinations Agency (EAEA). Sample mock exams are designed for preparation purposes.
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div>
        <h2 className="text-h2 font-bold text-brand-navy mb-6">Our Educational Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-card bg-surface border border-border shadow-card space-y-2">
            <span className="text-3xl">📱</span>
            <h3 className="font-bold text-body text-brand-navy">Mobile-First (360px+)</h3>
            <p className="text-caption text-text-secondary leading-relaxed">
              Designed from the ground up for affordable Android devices with low memory usage and high-contrast readability.
            </p>
          </div>
          <div className="p-5 rounded-card bg-surface border border-border shadow-card space-y-2">
            <span className="text-3xl">🌐</span>
            <h3 className="font-bold text-body text-brand-navy">True Bilingual Learning</h3>
            <p className="text-caption text-text-secondary leading-relaxed">
              Seamlessly toggle between English and Amharic with Noto Sans Ethiopic font integration and fallback safety.
            </p>
          </div>
          <div className="p-5 rounded-card bg-surface border border-border shadow-card space-y-2">
            <span className="text-3xl">⚡</span>
            <h3 className="font-bold text-body text-brand-navy">Offline Resilience</h3>
            <p className="text-caption text-text-secondary leading-relaxed">
              Exam answers and progress are buffered in browser storage, preventing lost work during mobile network drops.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div>
        <h2 className="text-h2 font-bold text-brand-navy mb-6">{t('about.faq')}</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 bg-surface rounded-card border border-border shadow-card space-y-2">
              <h4 className="font-bold text-body text-brand-navy">
                {language === 'am' ? faq.qAm : faq.qEn}
              </h4>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                {language === 'am' ? faq.aAm : faq.aEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-surface rounded-card p-6 md:p-8 border border-border shadow-card text-center space-y-4">
        <h3 className="text-h3 font-bold text-brand-navy">{t('about.contact')}</h3>
        <p className="text-body-sm text-text-secondary max-w-md mx-auto">
          Have feedback on a question explanation, or want to suggest study materials? We would love to hear from you.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-body-sm text-brand-teal font-semibold">
          <span>📧 contact@ethioprep.edu.et</span>
          <span>•</span>
          <span>📍 Addis Ababa, Ethiopia</span>
        </div>
        <div className="pt-2">
          <Link to="/register">
            <Button variant="primary">Start Learning Now →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
