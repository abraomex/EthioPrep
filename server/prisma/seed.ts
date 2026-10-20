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

  // 3. Seed 10 Official New Curriculum Subjects (English Medium)
  const subjectsData = [
    {
      slug: 'mathematics',
      stream: 'natural_science' as const,
      titleEn: 'Mathematics',
      titleAm: 'Mathematics',
      descriptionEn: 'Grade 12 Mathematics — Sequence & Series, Introduction to Calculus, Statistics, Linear Programming, and Business Applications.',
      descriptionAm: 'Grade 12 Mathematics — Sequence & Series, Introduction to Calculus, Statistics, Linear Programming, and Business Applications.',
      sortOrder: 1,
      published: true,
    },
    {
      slug: 'physics',
      stream: 'natural_science' as const,
      titleEn: 'Physics',
      titleAm: 'Physics',
      descriptionEn: 'Grade 12 Physics — Application in Other Fields, Two-Dimensional Motion, Fluid Mechanics, Electromagnetism, and Basics of Electronics.',
      descriptionAm: 'Grade 12 Physics — Application in Other Fields, Two-Dimensional Motion, Fluid Mechanics, Electromagnetism, and Basics of Electronics.',
      sortOrder: 2,
      published: true,
    },
    {
      slug: 'chemistry',
      stream: 'natural_science' as const,
      titleEn: 'Chemistry',
      titleAm: 'Chemistry',
      descriptionEn: 'Grade 12 Chemistry — Acid-Base Equilibria, Electrochemistry, Industrial Chemistry in Ethiopia, Polymers, and Environmental Chemistry.',
      descriptionAm: 'Grade 12 Chemistry — Acid-Base Equilibria, Electrochemistry, Industrial Chemistry in Ethiopia, Polymers, and Environmental Chemistry.',
      sortOrder: 3,
      published: true,
    },
    {
      slug: 'biology',
      stream: 'natural_science' as const,
      titleEn: 'Biology',
      titleAm: 'Biology',
      descriptionEn: 'Grade 12 Biology — Application of Biology, Microorganisms, Energy Transformation, Evolution, Human Body Systems, and Climate Change.',
      descriptionAm: 'Grade 12 Biology — Application of Biology, Microorganisms, Energy Transformation, Evolution, Human Body Systems, and Climate Change.',
      sortOrder: 4,
      published: true,
    },
    {
      slug: 'english',
      stream: 'common' as const,
      titleEn: 'English',
      titleAm: 'English',
      descriptionEn: 'Grade 12 English — Academic Reading, Advanced Grammar, Lexical Studies, Essay Writing, and Communication Skills.',
      descriptionAm: 'Grade 12 English — Academic Reading, Advanced Grammar, Lexical Studies, Essay Writing, and Communication Skills.',
      sortOrder: 5,
      published: true,
    },
    {
      slug: 'history',
      stream: 'social_science' as const,
      titleEn: 'History',
      titleAm: 'History',
      descriptionEn: 'Grade 12 History — Capitalism & Nationalism (1815-1914), Colonial Africa, Modern Ethiopia to 1941, World Wars, Cold War, and Derg Era.',
      descriptionAm: 'Grade 12 History — Capitalism & Nationalism (1815-1914), Colonial Africa, Modern Ethiopia to 1941, World Wars, Cold War, and Derg Era.',
      sortOrder: 6,
      published: true,
    },
    {
      slug: 'geography',
      stream: 'social_science' as const,
      titleEn: 'Geography',
      titleAm: 'Geography',
      descriptionEn: 'Grade 12 Geography — Plate Tectonics, Climate Change & CRGE, Sustainable Resource Management, Population Policies, and GIS Map Making.',
      descriptionAm: 'Grade 12 Geography — Plate Tectonics, Climate Change & CRGE, Sustainable Resource Management, Population Policies, and GIS Map Making.',
      sortOrder: 7,
      published: true,
    },
    {
      slug: 'economics',
      stream: 'social_science' as const,
      titleEn: 'Economics',
      titleAm: 'Economics',
      descriptionEn: 'Grade 12 Economics — Macroeconomic Concepts, AD-AS Equilibrium, Market Failure, Fiscal & Monetary Policies, Taxes, and Poverty.',
      descriptionAm: 'Grade 12 Economics — Macroeconomic Concepts, AD-AS Equilibrium, Market Failure, Fiscal & Monetary Policies, Taxes, and Poverty.',
      sortOrder: 8,
      published: true,
    },
    {
      slug: 'information-technology',
      stream: 'natural_science' as const,
      titleEn: 'Information Technology',
      titleAm: 'Information Technology',
      descriptionEn: 'Grade 12 Information Technology — Ethics & Legal Issues, Emerging Tech (Cloud/IoT/Big Data), RDBMS & SQL, XML Web Authoring, and Python.',
      descriptionAm: 'Grade 12 Information Technology — Ethics & Legal Issues, Emerging Tech (Cloud/IoT/Big Data), RDBMS & SQL, XML Web Authoring, and Python.',
      sortOrder: 9,
      published: true,
    },
    {
      slug: 'agriculture',
      stream: 'natural_science' as const,
      titleEn: 'Agriculture',
      titleAm: 'Agriculture',
      descriptionEn: 'Grade 12 Agriculture — Horticultural Crops, Cash Crops, Plant Biotechnology, Livestock Husbandry, Apiculture, Soil Conservation, and Ag-ICT.',
      descriptionAm: 'Grade 12 Agriculture — Horticultural Crops, Cash Crops, Plant Biotechnology, Livestock Husbandry, Apiculture, Soil Conservation, and Ag-ICT.',
      sortOrder: 10,
      published: true,
    },
  ];

  const createdSubjects: Record<string, any> = {};
  for (const s of subjectsData) {
    createdSubjects[s.slug] = await prisma.subject.create({ data: s });
  }

  console.log('📚 All 10 Subjects seeded successfully.');

  // 4. Seed Topics & Chapters for Mathematics
  const mathChapter1 = await prisma.topic.create({
    data: {
      subjectId: createdSubjects['mathematics'].id,
      titleEn: 'Unit 1: Sequence and Series',
      titleAm: 'Unit 1: Sequence and Series',
      sortOrder: 1,
      published: true,
    },
  });

  const mathChapter2 = await prisma.topic.create({
    data: {
      subjectId: createdSubjects['mathematics'].id,
      titleEn: 'Unit 2: Introduction to Calculus',
      titleAm: 'Unit 2: Introduction to Calculus',
      sortOrder: 2,
      published: true,
    },
  });

  // 5. Seed Lessons for Math Chapter 2 (Limits & Calculus)
  const lesson1 = await prisma.lesson.create({
    data: {
      topicId: mathChapter2.id,
      titleEn: '2.1 Definition of Limits and Direct Evaluation',
      titleAm: '2.1 Definition of Limits and Direct Evaluation',
      bodyEn: '# Definition of Limits\n\nA limit describes the value a function approaches...\n$$\\lim_{x \\to a} f(x) = L$$',
      bodyAm: '',
      status: 'published',
      accessTier: 'free',
      estimatedMinutes: 10,
      sortOrder: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      topicId: mathChapter2.id,
      titleEn: '2.2 Advanced Limit Laws and Discontinuities',
      titleAm: '2.2 Advanced Limit Laws and Discontinuities',
      bodyEn: '# Advanced Limit Laws\n\nEvaluating limits at infinity and rational functions.',
      bodyAm: '',
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
      promptAm: '',
      explanationEn: 'Factoring gives $(x - 3)(x + 3)/(x - 3) = x + 3$. Evaluating at $x = 3$ gives $3 + 3 = 6$.',
      explanationAm: 'Factoring gives $(x - 3)(x + 3)/(x - 3) = x + 3$. Evaluating at $x = 3$ gives $3 + 3 = 6$.',
      difficulty: 'easy',
      status: 'published',
      options: {
        create: [
          { label: 'A', textEn: '0', textAm: '0', sortOrder: 1, isCorrect: false },
          { label: 'B', textEn: '3', textAm: '3', sortOrder: 2, isCorrect: false },
          { label: 'C', textEn: '6', textAm: '6', sortOrder: 3, isCorrect: true },
          { label: 'D', textEn: 'Does not exist', textAm: 'Does not exist', sortOrder: 4, isCorrect: false },
        ],
      },
    },
  });

  console.log('❓ Questions seeded with options and explanations');

  // 7. Seed Mock Exam
  const exam = await prisma.exam.create({
    data: {
      subjectId: createdSubjects['mathematics'].id,
      titleEn: 'Grade 12 Mathematics National Mock Examination',
      titleAm: 'Grade 12 Mathematics National Practice Examination',
      descriptionEn: 'Standard timed examination simulating the Ethiopian Grade 12 National Assessment.',
      descriptionAm: 'Standard timed examination simulating the Ethiopian Grade 12 National Assessment.',
      durationSeconds: 9000, // 150 min
      accessTier: 'free',
      status: 'published',
      examQuestions: {
        create: [
          { questionId: question1.id, sortOrder: 1, points: 1 },
        ],
      },
    },
  });

  console.log(`📝 Exam seeded: ${exam.titleEn}`);

  // 8. Seed Downloadable Textbooks Resources
  await prisma.resource.create({
    data: {
      subjectId: createdSubjects['chemistry'].id,
      titleEn: 'Grade 12 Chemistry Student Textbook (New Curriculum - MoE Ethiopia)',
      titleAm: 'Grade 12 Chemistry Student Textbook (New Curriculum - MoE Ethiopia)',
      resourceType: 'pdf',
      url: '/src/resources/grade-12-chemistry-new-curriculum--student-textbook-kehulumcom1759915918b6bd.pdf',
      licenseNote: 'Ministry of Education Ethiopia — Free Student Access',
      accessTier: 'free',
      published: true,
    },
  });

  await prisma.resource.create({
    data: {
      subjectId: createdSubjects['physics'].id,
      titleEn: 'Grade 12 Physics Student Textbook (New Curriculum - MoE Ethiopia)',
      titleAm: 'Grade 12 Physics Student Textbook (New Curriculum - MoE Ethiopia)',
      resourceType: 'pdf',
      url: '/src/resources/grade-12-physics-new-curriculum--student-textbook-kehulumcom1759910068aff6.pdf',
      licenseNote: 'Ministry of Education Ethiopia — Free Student Access',
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
