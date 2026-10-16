import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting EthioPrep database seeding...');

  // 1. Clean existing records (in reverse dependency order)
  await prisma.attemptAnswer.deleteMany();
  await prisma.attempt.deleteMany();
  await prisma.examQuestion.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.questionOption.deleteMany();
  await prisma.question.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing data.');

  // 2. Seed Users
  const studentPassword = await argon2.hash('Student123!');
  const adminPassword = await argon2.hash('Admin123!');

  const student = await prisma.user.create({
    data: {
      email: 'student@ethioprep.edu.et',
      passwordHash: studentPassword,
      displayName: 'Abebe Bikila',
      role: 'student',
      stream: 'natural_science',
      preferredLanguage: 'en',
      accessTier: 'free',
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@ethioprep.edu.et',
      passwordHash: adminPassword,
      displayName: 'EthioPrep Admin',
      role: 'admin',
      stream: 'common',
      preferredLanguage: 'en',
      accessTier: 'premium',
    },
  });

  console.log(`👤 Users seeded: Student (${student.email}), Admin (${admin.email})`);

  // 3. Seed Subjects
  const mathSubject = await prisma.subject.create({
    data: {
      slug: 'mathematics',
      stream: 'natural_science',
      titleEn: 'Mathematics',
      titleAm: 'ሒሳብ',
      descriptionEn: 'Differential and integral calculus, 3D coordinate geometry, vectors, and mathematical induction for Ethiopian Grade 12.',
      descriptionAm: 'የ12ኛ ክፍል ዲፈረንሻልና ኢንቴግራል ካልኩለስ፣ የ3ዲ ኮኦርዲኔት ጂኦሜትሪ፣ ቬክተሮች እና ስታቲስቲክስ።',
      sortOrder: 1,
      published: true,
    },
  });

  const physicsSubject = await prisma.subject.create({
    data: {
      slug: 'physics',
      stream: 'natural_science',
      titleEn: 'Physics',
      titleAm: 'ፊዚክስ',
      descriptionEn: 'Rigid body rotation, mechanics, thermodynamics, oscillations, electromagnetic induction, and modern atomic physics.',
      descriptionAm: 'የ12ኛ ክፍል ቋሚ አካላት ሽክርክሪት፣ ሜካኒክስ፣ ቴርሞዳይናሚክስ፣ ኤሌክትሮማግኔቲክ ኢንዳክሽን እና አቶሚክ ፊዚክስ።',
      sortOrder: 2,
      published: true,
    },
  });

  const econSubject = await prisma.subject.create({
    data: {
      slug: 'economics',
      stream: 'social_science',
      titleEn: 'Economics',
      titleAm: 'ኢኮኖሚክስ',
      descriptionEn: 'National income accounting, aggregate demand and supply, fiscal and monetary policy, inflation, and Ethiopian development plans.',
      descriptionAm: 'የ12ኛ ክፍል የብሔራዊ ገቢ ስሌት፣ የገንዘብና የፊሲካል ፖሊሲ፣ የዋጋ ግሽበት እና የኢትዮጵያ የልማት እቅዶች።',
      sortOrder: 3,
      published: true,
    },
  });

  console.log('📚 Subjects seeded: Mathematics, Physics, Economics');

  // 4. Seed Topics & Chapters for Mathematics
  const mathChapter1 = await prisma.topic.create({
    data: {
      subjectId: mathSubject.id,
      titleEn: 'Chapter 1: Sequences and Series',
      titleAm: 'ምዕራፍ 1፡ ዝርዝሮች እና ድምሮች',
      sortOrder: 1,
      published: true,
    },
  });

  const mathChapter2 = await prisma.topic.create({
    data: {
      subjectId: mathSubject.id,
      titleEn: 'Chapter 2: Limits and Continuity',
      titleAm: 'ምዕራፍ 2፡ ሊሚት እና ቀጣይነት',
      sortOrder: 2,
      published: true,
    },
  });

  // 5. Seed Lessons for Math Chapter 2 (Limits)
  const lesson1 = await prisma.lesson.create({
    data: {
      topicId: mathChapter2.id,
      titleEn: '2.1 Definition of Limits and Direct Evaluation',
      titleAm: '2.1 የሊሚት ትርጉም እና ቀጥተኛ ስሌት',
      bodyEn: '# Definition of Limits\n\nA limit describes the value a function approaches...\n$$\\lim_{x \\to a} f(x) = L$$',
      bodyAm: '# የሊሚት ትርጉም\n\nሊሚት አንድ ፋንክሽን ወደ አንድ ነጥብ ሲጠጋ የሚኖረውን እሴት ያሳያል...\n$$\\lim_{x \\to a} f(x) = L$$',
      status: 'published',
      accessTier: 'free',
      estimatedMinutes: 10,
      sortOrder: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      topicId: mathChapter2.id,
      titleEn: '2.2 Advanced Limit Laws and Asymptotes',
      titleAm: '2.2 የሊሚት ህጎችና አሲምፕቶቶች',
      bodyEn: '# Advanced Limit Laws\n\nEvaluating limits at infinity and rational functions.',
      bodyAm: '# የላቁ የሊሚት ህጎች\n\nሊሚት ወደ ማለቂያ አልባ እና የረቂቅ ፋንክሽኖች ስሌት።',
      status: 'published',
      accessTier: 'premium',
      estimatedMinutes: 14,
      sortOrder: 2,
    },
  });

  console.log('📄 Lessons seeded for Math Chapter 2');

  // 6. Seed Questions and Options
  const question1 = await prisma.question.create({
    data: {
      topicId: mathChapter2.id,
      promptEn: 'What is the value of $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$?',
      promptAm: 'የ $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$ እሴት ስንት ነው?',
      explanationEn: 'Factoring gives $(x - 3)(x + 3)/(x - 3) = x + 3$. Evaluating at $x = 3$ gives $3 + 3 = 6$.',
      explanationAm: 'የሁለት ስኩዌሮች ልዩነትን ማበጠር፡ $(x - 3)(x + 3)/(x - 3) = x + 3$። በ $x = 3$ ሲተካ 6 ይመጣል።',
      difficulty: 'easy',
      status: 'published',
      options: {
        create: [
          { label: 'A', textEn: '0', textAm: '0', sortOrder: 1, isCorrect: false },
          { label: 'B', textEn: '3', textAm: '3', sortOrder: 2, isCorrect: false },
          { label: 'C', textEn: '6', textAm: '6', sortOrder: 3, isCorrect: true },
          { label: 'D', textEn: 'Does not exist', textAm: 'አይኖርም', sortOrder: 4, isCorrect: false },
        ],
      },
    },
  });

  const question2 = await prisma.question.create({
    data: {
      topicId: mathChapter2.id,
      promptEn: 'What is the value of $\\lim_{x \\to 0} \\frac{\\sin x}{x}$?',
      promptAm: 'የ $\\lim_{x \\to 0} \\frac{\\sin x}{x}$ እሴት ስንት ነው?',
      explanationEn: 'Fundamental trigonometric limit theorem states $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.',
      explanationAm: 'መሰረታዊ የትሪጎኖሜትሪ ሊሚት ቴዎረም $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ ነው።',
      difficulty: 'medium',
      status: 'published',
      options: {
        create: [
          { label: 'A', textEn: '0', textAm: '0', sortOrder: 1, isCorrect: false },
          { label: 'B', textEn: '1', textAm: '1', sortOrder: 2, isCorrect: true },
          { label: 'C', textEn: 'Infinity', textAm: 'ማለቂያ የሌለው', sortOrder: 3, isCorrect: false },
          { label: 'D', textEn: 'Undefined', textAm: 'ያልተተረጎመ', sortOrder: 4, isCorrect: false },
        ],
      },
    },
  });

  console.log('❓ Questions seeded with options and bilingual explanations');

  // 7. Seed Mock Exam
  const exam = await prisma.exam.create({
    data: {
      subjectId: mathSubject.id,
      titleEn: 'Grade 12 Mathematics National Mock Examination 1',
      titleAm: 'የ12ኛ ክፍል ሒሳብ ብሔራዊ ሞዴል ፈተና 1',
      descriptionEn: 'Standard timed examination simulating the Ethiopian Grade 12 National Assessment.',
      descriptionAm: 'የኢትዮጵያ የ12ኛ ክፍል ብሔራዊ ፈተናን የሚመስል የጊዜ ሞዴል ፈተና።',
      durationSeconds: 5400, // 90 min
      accessTier: 'free',
      status: 'published',
      examQuestions: {
        create: [
          { questionId: question1.id, sortOrder: 1, points: 1 },
          { questionId: question2.id, sortOrder: 2, points: 1 },
        ],
      },
    },
  });

  console.log(`📝 Exam seeded: ${exam.titleEn}`);

  // 8. Seed Downloadable Resource
  await prisma.resource.create({
    data: {
      subjectId: mathSubject.id,
      titleEn: 'Grade 12 Mathematics Complete Formula Sheet & Summary',
      titleAm: 'የ12ኛ ክፍል የሒሳብ ቀመሮችና ፈጣን ማጠቃለያዎች',
      resourceType: 'pdf',
      url: '/downloads/math-grade-12-formulas.pdf',
      licenseNote: 'EthioPrep Open Educational Resource — Free for all Ethiopian students',
      accessTier: 'free',
      published: true,
    },
  });

  console.log('📁 Resources seeded.');
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

