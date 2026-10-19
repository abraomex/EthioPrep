export interface ExamQuestionDetail {
  id: string;
  topicId: string;
  topicTitle: string;
  promptEn: string;
  promptAm: string;
  options: {
    id: string;
    label: string;
    textEn: string;
    textAm: string;
  }[];
  correctOptionId: string;
  explanationEn: string;
  explanationAm: string;
  points: number;
}

export interface MockExamFull {
  id: string;
  subjectSlug: string;
  subjectTitleEn: string;
  subjectTitleAm: string;
  titleEn: string;
  titleAm: string;
  durationSeconds: number;
  accessTier: 'free' | 'premium';
  questions: ExamQuestionDetail[];
}

export const mockExams: Record<string, MockExamFull> = {
  // ==========================================
  // MATHEMATICS MOCK EXAM
  // ==========================================
  'math-mock-1': {
    id: 'math-mock-1',
    subjectSlug: 'mathematics',
    subjectTitleEn: 'Mathematics',
    subjectTitleAm: 'Mathematics',
    titleEn: 'Grade 12 Mathematics National Practice Examination',
    titleAm: 'Grade 12 Mathematics National Practice Examination',
    durationSeconds: 150 * 60, // 150 min
    accessTier: 'free',
    questions: [
      {
        id: 'qm-1',
        topicId: 'math-ch1',
        topicTitle: 'Sequence and Series',
        promptEn: 'In an arithmetic sequence, if the 3rd term is 13 and the 8th term is 33, what is the 20th term?',
        promptAm: '',
        options: [
          { id: 'opt-qm1-a', label: 'A', textEn: '77', textAm: '77' },
          { id: 'opt-qm1-b', label: 'B', textEn: '81', textAm: '81' },
          { id: 'opt-qm1-c', label: 'C', textEn: '85', textAm: '85' },
          { id: 'opt-qm1-d', label: 'D', textEn: '89', textAm: '89' },
        ],
        correctOptionId: 'opt-qm1-b',
        explanationEn: 'The terms satisfy a_3 = a_1 + 2d = 13 and a_8 = a_1 + 7d = 33. Subtracting gives 5d = 20 => d = 4. Then a_1 = 13 - 2(4) = 5. The 20th term is a_20 = a_1 + 19d = 5 + 19(4) = 5 + 76 = 81.',
        explanationAm: 'The terms satisfy a_3 = a_1 + 2d = 13 and a_8 = a_1 + 7d = 33. Subtracting gives 5d = 20 => d = 4. Then a_1 = 13 - 2(4) = 5. The 20th term is a_20 = a_1 + 19d = 5 + 19(4) = 5 + 76 = 81.',
        points: 1,
      },
      {
        id: 'qm-2',
        topicId: 'math-ch1',
        topicTitle: 'Sequence and Series',
        promptEn: 'What is the sum to infinity of the geometric series: $12 + 4 + \\frac{4}{3} + \\frac{4}{9} + \\dots$?',
        promptAm: '',
        options: [
          { id: 'opt-qm2-a', label: 'A', textEn: '16', textAm: '16' },
          { id: 'opt-qm2-b', label: 'B', textEn: '18', textAm: '18' },
          { id: 'opt-qm2-c', label: 'C', textEn: '24', textAm: '24' },
          { id: 'opt-qm2-d', label: 'D', textEn: 'The series diverges', textAm: 'The series diverges' },
        ],
        correctOptionId: 'opt-qm2-b',
        explanationEn: 'The first term is a_1 = 12 and common ratio r = 4/12 = 1/3. Since |r| = 1/3 < 1, the series converges. Sum S_infinity = a_1 / (1 - r) = 12 / (1 - 1/3) = 12 / (2/3) = 12 * (3/2) = 18.',
        explanationAm: 'The first term is a_1 = 12 and common ratio r = 4/12 = 1/3. Since |r| = 1/3 < 1, the series converges. Sum S_infinity = a_1 / (1 - r) = 12 / (1 - 1/3) = 12 / (2/3) = 12 * (3/2) = 18.',
        points: 1,
      },
      {
        id: 'qm-3',
        topicId: 'math-ch2',
        topicTitle: 'Introduction to Calculus',
        promptEn: 'Evaluate the limit: $\\lim_{x \\to 4} \\frac{x^2 - 16}{x - 4}$.',
        promptAm: '',
        options: [
          { id: 'opt-qm3-a', label: 'A', textEn: '0', textAm: '0' },
          { id: 'opt-qm3-b', label: 'B', textEn: '4', textAm: '4' },
          { id: 'opt-qm3-c', label: 'C', textEn: '8', textAm: '8' },
          { id: 'opt-qm3-d', label: 'D', textEn: 'Undefined', textAm: 'Undefined' },
        ],
        correctOptionId: 'opt-qm3-c',
        explanationEn: 'Factoring difference of two squares: (x^2 - 16)/(x - 4) = (x - 4)(x + 4)/(x - 4) = x + 4 for x != 4. Evaluating as x -> 4 yields 4 + 4 = 8.',
        explanationAm: 'Factoring difference of two squares: (x^2 - 16)/(x - 4) = (x - 4)(x + 4)/(x - 4) = x + 4 for x != 4. Evaluating as x -> 4 yields 4 + 4 = 8.',
        points: 1,
      },
      {
        id: 'qm-4',
        topicId: 'math-ch2',
        topicTitle: 'Introduction to Calculus',
        promptEn: 'If $f(x) = 2x^3 - 3x^2 + 5x - 7$, what is the derivative $f\'(2)$?',
        promptAm: '',
        options: [
          { id: 'opt-qm4-a', label: 'A', textEn: '17', textAm: '17' },
          { id: 'opt-qm4-b', label: 'B', textEn: '19', textAm: '19' },
          { id: 'opt-qm4-c', label: 'C', textEn: '23', textAm: '23' },
          { id: 'opt-qm4-d', label: 'D', textEn: '25', textAm: '25' },
        ],
        correctOptionId: 'opt-qm4-a',
        explanationEn: 'Using the power rule: f\'(x) = 6x^2 - 6x + 5. Substituting x = 2: f\'(2) = 6(2^2) - 6(2) + 5 = 6(4) - 12 + 5 = 24 - 12 + 5 = 17.',
        explanationAm: 'Using the power rule: f\'(x) = 6x^2 - 6x + 5. Substituting x = 2: f\'(2) = 6(2^2) - 6(2) + 5 = 6(4) - 12 + 5 = 24 - 12 + 5 = 17.',
        points: 1,
      },
      {
        id: 'qm-5',
        topicId: 'math-ch3',
        topicTitle: 'Statistics',
        promptEn: 'For the sample dataset: $\\{4, 7, 7, 8, 9\\}$, what is the sample variance $s^2$?',
        promptAm: '',
        options: [
          { id: 'opt-qm5-a', label: 'A', textEn: '2.8', textAm: '2.8' },
          { id: 'opt-qm5-b', label: 'B', textEn: '3.5', textAm: '3.5' },
          { id: 'opt-qm5-c', label: 'C', textEn: '4.2', textAm: '4.2' },
          { id: 'opt-qm5-d', label: 'D', textEn: '5.0', textAm: '5.0' },
        ],
        correctOptionId: 'opt-qm5-b',
        explanationEn: 'Sample mean x_bar = (4 + 7 + 7 + 8 + 9) / 5 = 35 / 5 = 7. Deviations squared: (4-7)^2 = 9, (7-7)^2 = 0, (7-7)^2 = 0, (8-7)^2 = 1, (9-7)^2 = 4. Sum of squared deviations = 9 + 0 + 0 + 1 + 4 = 14. Sample variance s^2 = Sum / (n - 1) = 14 / (5 - 1) = 14 / 4 = 3.5.',
        explanationAm: 'Sample mean x_bar = (4 + 7 + 7 + 8 + 9) / 5 = 35 / 5 = 7. Deviations squared: (4-7)^2 = 9, (7-7)^2 = 0, (7-7)^2 = 0, (8-7)^2 = 1, (9-7)^2 = 4. Sum of squared deviations = 9 + 0 + 0 + 1 + 4 = 14. Sample variance s^2 = Sum / (n - 1) = 14 / (5 - 1) = 14 / 4 = 3.5.',
        points: 1,
      },
    ],
  },

  // ==========================================
  // PHYSICS MOCK EXAM
  // ==========================================
  'phys-mock-1': {
    id: 'phys-mock-1',
    subjectSlug: 'physics',
    subjectTitleEn: 'Physics',
    subjectTitleAm: 'Physics',
    titleEn: 'Grade 12 Physics National Practice Examination',
    titleAm: 'Grade 12 Physics National Practice Examination',
    durationSeconds: 120 * 60, // 120 min
    accessTier: 'free',
    questions: [
      {
        id: 'qp-1',
        topicId: 'phys-ch2',
        topicTitle: 'Two-Dimensional Motion',
        promptEn: 'A projectile is launched from ground level with initial speed $v_0 = 40\\text{ m/s}$ at an angle $\\theta = 30^\\circ$ above the horizontal. Taking $g = 10\\text{ m/s}^2$, what is its maximum height $H_{\\text{max}}$?',
        promptAm: '',
        options: [
          { id: 'opt-qp1-a', label: 'A', textEn: '15 m', textAm: '15 m' },
          { id: 'opt-qp1-b', label: 'B', textEn: '20 m', textAm: '20 m' },
          { id: 'opt-qp1-c', label: 'C', textEn: '40 m', textAm: '40 m' },
          { id: 'opt-qp1-d', label: 'D', textEn: '80 m', textAm: '80 m' },
        ],
        correctOptionId: 'opt-qp1-b',
        explanationEn: 'Initial vertical velocity v_0y = v_0 * sin(30) = 40 * 0.5 = 20 m/s. Maximum height H_max = (v_0y)^2 / (2g) = (20)^2 / (2 * 10) = 400 / 20 = 20 m.',
        explanationAm: 'Initial vertical velocity v_0y = v_0 * sin(30) = 40 * 0.5 = 20 m/s. Maximum height H_max = (v_0y)^2 / (2g) = (20)^2 / (2 * 10) = 400 / 20 = 20 m.',
        points: 1,
      },
      {
        id: 'qp-2',
        topicId: 'phys-ch3',
        topicTitle: 'Fluid Mechanics',
        promptEn: 'In a hydraulic lift, the small piston has an area of $0.02\\text{ m}^2$ and the large piston has an area of $0.80\\text{ m}^2$. What force must be applied to the small piston to lift a car of mass $1,600\\text{ kg}$? ($g = 10\\text{ m/s}^2$)',
        promptAm: '',
        options: [
          { id: 'opt-qp2-a', label: 'A', textEn: '200 N', textAm: '200 N' },
          { id: 'opt-qp2-b', label: 'B', textEn: '400 N', textAm: '400 N' },
          { id: 'opt-qp2-c', label: 'C', textEn: '800 N', textAm: '800 N' },
          { id: 'opt-qp2-d', label: 'D', textEn: '1600 N', textAm: '1600 N' },
        ],
        correctOptionId: 'opt-qp2-b',
        explanationEn: 'Force required on large piston F_2 = m * g = 1600 kg * 10 m/s^2 = 16,000 N. By Pascal\'s Principle: F_1 / A_1 = F_2 / A_2 => F_1 = F_2 * (A_1 / A_2) = 16000 * (0.02 / 0.80) = 16000 * (1/40) = 400 N.',
        explanationAm: 'Force required on large piston F_2 = m * g = 1600 kg * 10 m/s^2 = 16,000 N. By Pascal\'s Principle: F_1 / A_1 = F_2 / A_2 => F_1 = F_2 * (A_1 / A_2) = 16000 * (0.02 / 0.80) = 16000 * (1/40) = 400 N.',
        points: 1,
      },
      {
        id: 'qp-3',
        topicId: 'phys-ch4',
        topicTitle: 'Electromagnetism',
        promptEn: 'An ideal transformer has $200$ turns on its primary coil and $1,000$ turns on its secondary coil. If an input alternating voltage of $120\\text{ V}$ is supplied to the primary, what is the output secondary voltage?',
        promptAm: '',
        options: [
          { id: 'opt-qp3-a', label: 'A', textEn: '24 V', textAm: '24 V' },
          { id: 'opt-qp3-b', label: 'B', textEn: '240 V', textAm: '240 V' },
          { id: 'opt-qp3-c', label: 'C', textEn: '600 V', textAm: '600 V' },
          { id: 'opt-qp3-d', label: 'D', textEn: '1200 V', textAm: '1200 V' },
        ],
        correctOptionId: 'opt-qp3-c',
        explanationEn: 'By the transformer turns ratio: V_s / V_p = N_s / N_p => V_s = V_p * (N_s / N_p) = 120 V * (1000 / 200) = 120 * 5 = 600 V. This is a step-up transformer.',
        explanationAm: 'By the transformer turns ratio: V_s / V_p = N_s / N_p => V_s = V_p * (N_s / N_p) = 120 V * (1000 / 200) = 120 * 5 = 600 V. This is a step-up transformer.',
        points: 1,
      },
      {
        id: 'qp-4',
        topicId: 'phys-ch5',
        topicTitle: 'Basics of Electronics',
        promptEn: 'Which logic gate produces a HIGH output (1) ONLY when both of its inputs are LOW (0)?',
        promptAm: '',
        options: [
          { id: 'opt-qp4-a', label: 'A', textEn: 'AND gate', textAm: 'AND gate' },
          { id: 'opt-qp4-b', label: 'B', textEn: 'OR gate', textAm: 'OR gate' },
          { id: 'opt-qp4-c', label: 'C', textEn: 'NAND gate', textAm: 'NAND gate' },
          { id: 'opt-qp4-d', label: 'D', textEn: 'NOR gate', textAm: 'NOR gate' },
        ],
        correctOptionId: 'opt-qp4-d',
        explanationEn: 'A NOR gate is an inverted OR gate: Output = NOT (A OR B). When A = 0 and B = 0, A OR B = 0, so NOT 0 = 1. For any other input combination containing a 1, output is 0.',
        explanationAm: 'A NOR gate is an inverted OR gate: Output = NOT (A OR B). When A = 0 and B = 0, A OR B = 0, so NOT 0 = 1. For any other input combination containing a 1, output is 0.',
        points: 1,
      },
    ],
  },

  // ==========================================
  // CHEMISTRY MOCK EXAM (Retained Full Depth)
  // ==========================================
  'chem-mock-1': {
    id: 'chem-mock-1',
    subjectSlug: 'chemistry',
    subjectTitleEn: 'Chemistry',
    subjectTitleAm: 'Chemistry',
    titleEn: 'Grade 12 Chemistry National Practice Examination',
    titleAm: 'Grade 12 Chemistry National Practice Examination',
    durationSeconds: 120 * 60, // 120 min
    accessTier: 'free',
    questions: [
      {
        id: 'qc-1',
        topicId: 'chem-ch1',
        topicTitle: 'Acid-Base Equilibria',
        promptEn: 'Which of the following acts as a Lewis acid in the reaction: $\\text{AlCl}_3 + \\text{Cl}^- \\rightarrow \\text{AlCl}_4^-$?',
        promptAm: '',
        options: [
          { id: 'opt-qc1-a', label: 'A', textEn: 'AlCl3 because it accepts an electron pair', textAm: 'AlCl3 because it accepts an electron pair' },
          { id: 'opt-qc1-b', label: 'B', textEn: 'Cl- because it donates an electron pair', textAm: 'Cl- because it donates an electron pair' },
          { id: 'opt-qc1-c', label: 'C', textEn: 'AlCl4- because it is the adduct product', textAm: 'AlCl4- because it is the adduct product' },
          { id: 'opt-qc1-d', label: 'D', textEn: 'Neither, it is a redox reaction', textAm: 'Neither, it is a redox reaction' },
        ],
        correctOptionId: 'opt-qc1-a',
        explanationEn: 'By the Lewis definition, an acid is an electron-pair acceptor. Aluminum in AlCl3 has an incomplete octet (6 valence electrons) and accepts a lone pair from the chloride ion (Cl-) to form AlCl4-.',
        explanationAm: 'By the Lewis definition, an acid is an electron-pair acceptor. Aluminum in AlCl3 has an incomplete octet (6 valence electrons) and accepts a lone pair from the chloride ion (Cl-) to form AlCl4-.',
        points: 1,
      },
      {
        id: 'qc-2',
        topicId: 'chem-ch1',
        topicTitle: 'Acid-Base Equilibria',
        promptEn: 'What is the pH of a buffer solution prepared by mixing $0.20\\text{ M HF}$ and $0.10\\text{ M NaF}$? (Given: $K_a(\\text{HF}) = 6.8 \\times 10^{-4}$, $\\text{pK}_a = 3.17$, $\\log(0.5) \\approx -0.30$)',
        promptAm: '',
        options: [
          { id: 'opt-qc2-a', label: 'A', textEn: '3.17', textAm: '3.17' },
          { id: 'opt-qc2-b', label: 'B', textEn: '2.87', textAm: '2.87' },
          { id: 'opt-qc2-c', label: 'C', textEn: '3.47', textAm: '3.47' },
          { id: 'opt-qc2-d', label: 'D', textEn: '4.15', textAm: '4.15' },
        ],
        correctOptionId: 'opt-qc2-b',
        explanationEn: 'Using the Henderson-Hasselbalch equation: pH = pKa + log([F-]/[HF]) = 3.17 + log(0.10 / 0.20) = 3.17 + log(0.5) = 3.17 - 0.30 = 2.87.',
        explanationAm: 'Using the Henderson-Hasselbalch equation: pH = pKa + log([F-]/[HF]) = 3.17 + log(0.10 / 0.20) = 3.17 + log(0.5) = 3.17 - 0.30 = 2.87.',
        points: 1,
      },
      {
        id: 'qc-3',
        topicId: 'chem-ch2',
        topicTitle: 'Electrochemistry',
        promptEn: 'A steady electric current of $5.0\\text{ A}$ is passed through an aqueous $\\text{CuSO}_4$ solution for $1,930\\text{ seconds}$. What mass of copper (molar mass $= 63.5\\text{ g/mol}$) is deposited at the cathode? (Faraday constant $F \\approx 96,500\\text{ C/mol}$)',
        promptAm: '',
        options: [
          { id: 'opt-qc3-a', label: 'A', textEn: '1.59 g', textAm: '1.59 g' },
          { id: 'opt-qc3-b', label: 'B', textEn: '3.18 g', textAm: '3.18 g' },
          { id: 'opt-qc3-c', label: 'C', textEn: '6.35 g', textAm: '6.35 g' },
          { id: 'opt-qc3-d', label: 'D', textEn: '12.70 g', textAm: '12.70 g' },
        ],
        correctOptionId: 'opt-qc3-b',
        explanationEn: 'The reduction half-reaction is Cu2+(aq) + 2e- -> Cu(s), so z = 2. Total charge Q = I * t = 5.0 A * 1930 s = 9,650 C. Moles of electrons = 9650 / 96500 = 0.10 mol. Moles of Cu = 0.10 / 2 = 0.05 mol. Mass = 0.05 mol * 63.5 g/mol = 3.175 g ~= 3.18 g.',
        explanationAm: 'The reduction half-reaction is Cu2+(aq) + 2e- -> Cu(s), so z = 2. Total charge Q = I * t = 5.0 A * 1930 s = 9,650 C. Moles of electrons = 9650 / 96500 = 0.10 mol. Moles of Cu = 0.10 / 2 = 0.05 mol. Mass = 0.05 mol * 63.5 g/mol = 3.175 g ~= 3.18 g.',
        points: 1,
      },
    ],
  },

  // ==========================================
  // BIOLOGY MOCK EXAM
  // ==========================================
  'bio-mock-1': {
    id: 'bio-mock-1',
    subjectSlug: 'biology',
    subjectTitleEn: 'Biology',
    subjectTitleAm: 'Biology',
    titleEn: 'Grade 12 Biology National Practice Examination',
    titleAm: 'Grade 12 Biology National Practice Examination',
    durationSeconds: 120 * 60, // 120 min
    accessTier: 'free',
    questions: [
      {
        id: 'qb-1',
        topicId: 'bio-ch1',
        topicTitle: 'Application of Biology',
        promptEn: 'Which enzyme is responsible for covalently joining the sugar-phosphate backbones of DNA fragments during recombinant DNA construction?',
        promptAm: '',
        options: [
          { id: 'opt-qb1-a', label: 'A', textEn: 'DNA Polymerase', textAm: 'DNA Polymerase' },
          { id: 'opt-qb1-b', label: 'B', textEn: 'DNA Helicase', textAm: 'DNA Helicase' },
          { id: 'opt-qb1-c', label: 'C', textEn: 'DNA Ligase', textAm: 'DNA Ligase' },
          { id: 'opt-qb1-d', label: 'D', textEn: 'Reverse Transcriptase', textAm: 'Reverse Transcriptase' },
        ],
        correctOptionId: 'opt-qb1-c',
        explanationEn: 'DNA Ligase catalyzes the formation of phosphodiester bonds between adjacent 3\'-hydroxyl and 5\'-phosphate ends of cut DNA fragments, effectively sealing foreign DNA into cloning vectors.',
        explanationAm: 'DNA Ligase catalyzes the formation of phosphodiester bonds between adjacent 3\'-hydroxyl and 5\'-phosphate ends of cut DNA fragments, effectively sealing foreign DNA into cloning vectors.',
        points: 1,
      },
      {
        id: 'qb-2',
        topicId: 'bio-ch3',
        topicTitle: 'Energy Transformation',
        promptEn: 'During aerobic cellular respiration, which stage generates the majority of ATP through chemiosmosis?',
        promptAm: '',
        options: [
          { id: 'opt-qb2-a', label: 'A', textEn: 'Glycolysis', textAm: 'Glycolysis' },
          { id: 'opt-qb2-b', label: 'B', textEn: 'The Link Reaction', textAm: 'The Link Reaction' },
          { id: 'opt-qb2-c', label: 'C', textEn: 'The Krebs Cycle', textAm: 'The Krebs Cycle' },
          { id: 'opt-qb2-d', label: 'D', textEn: 'Oxidative Phosphorylation', textAm: 'Oxidative Phosphorylation' },
        ],
        correctOptionId: 'opt-qb2-d',
        explanationEn: 'Oxidative phosphorylation on the mitochondrial inner membrane accounts for approximately 26 to 28 ATP per glucose molecule, driven by the proton gradient created by the electron transport chain.',
        explanationAm: 'Oxidative phosphorylation on the mitochondrial inner membrane accounts for approximately 26 to 28 ATP per glucose molecule, driven by the proton gradient created by the electron transport chain.',
        points: 1,
      },
      {
        id: 'qb-3',
        topicId: 'bio-ch4',
        topicTitle: 'Evolution',
        promptEn: 'The famous fossil specimen "Lucy" (Dinkenesh), discovered in the Afar depression of Ethiopia in 1974, belongs to which hominid species?',
        promptAm: '',
        options: [
          { id: 'opt-qb3-a', label: 'A', textEn: 'Homo habilis', textAm: 'Homo habilis' },
          { id: 'opt-qb3-b', label: 'B', textEn: 'Australopithecus afarensis', textAm: 'Australopithecus afarensis' },
          { id: 'opt-qb3-c', label: 'C', textEn: 'Ardipithecus ramidus', textAm: 'Ardipithecus ramidus' },
          { id: 'opt-qb3-d', label: 'D', textEn: 'Homo erectus', textAm: 'Homo erectus' },
        ],
        correctOptionId: 'opt-qb3-b',
        explanationEn: 'Lucy (cataloged as AL 288-1) is a 3.2-million-year-old skeleton of Australopithecus afarensis discovered by Donald Johanson in Hadar, Ethiopia, providing critical evidence of early obligate bipedalism.',
        explanationAm: 'Lucy (cataloged as AL 288-1) is a 3.2-million-year-old skeleton of Australopithecus afarensis discovered by Donald Johanson in Hadar, Ethiopia, providing critical evidence of early obligate bipedalism.',
        points: 1,
      },
    ],
  },

  // ==========================================
  // ENGLISH MOCK EXAM
  // ==========================================
  'eng-mock-1': {
    id: 'eng-mock-1',
    subjectSlug: 'english',
    subjectTitleEn: 'English',
    subjectTitleAm: 'English',
    titleEn: 'Grade 12 English National Practice Examination',
    titleAm: 'Grade 12 English National Practice Examination',
    durationSeconds: 120 * 60, // 120 min
    accessTier: 'free',
    questions: [
      {
        id: 'qe-1',
        topicId: 'eng-ch3',
        topicTitle: 'The Passive Voice',
        promptEn: 'Choose the correct passive transformation: "The engineers are inspecting the new solar mini-grid today."',
        promptAm: '',
        options: [
          { id: 'opt-qe1-a', label: 'A', textEn: 'The new solar mini-grid is inspected today by the engineers.', textAm: 'The new solar mini-grid is inspected today by the engineers.' },
          { id: 'opt-qe1-b', label: 'B', textEn: 'The new solar mini-grid has been inspected today by the engineers.', textAm: 'The new solar mini-grid has been inspected today by the engineers.' },
          { id: 'opt-qe1-c', label: 'C', textEn: 'The new solar mini-grid is being inspected today by the engineers.', textAm: 'The new solar mini-grid is being inspected today by the engineers.' },
          { id: 'opt-qe1-d', label: 'D', textEn: 'The new solar mini-grid was being inspected today by the engineers.', textAm: 'The new solar mini-grid was being inspected today by the engineers.' },
        ],
        correctOptionId: 'opt-qe1-c',
        explanationEn: 'The active sentence is in the Present Continuous tense (are inspecting). The corresponding passive voice structure is: [Subject + am/is/are + being + past participle (inspected)]. Therefore: "is being inspected".',
        explanationAm: 'The active sentence is in the Present Continuous tense (are inspecting). The corresponding passive voice structure is: [Subject + am/is/are + being + past participle (inspected)]. Therefore: "is being inspected".',
        points: 1,
      },
      {
        id: 'qe-2',
        topicId: 'eng-ch5',
        topicTitle: 'Conditionals',
        promptEn: 'Select the grammatically correct conditional sentence: "If she _______ harder last semester, she would have passed the scholarship interview."',
        promptAm: '',
        options: [
          { id: 'opt-qe2-a', label: 'A', textEn: 'studied', textAm: 'studied' },
          { id: 'opt-qe2-b', label: 'B', textEn: 'had studied', textAm: 'had studied' },
          { id: 'opt-qe2-c', label: 'C', textEn: 'has studied', textAm: 'has studied' },
          { id: 'opt-qe2-d', label: 'D', textEn: 'would study', textAm: 'would study' },
        ],
        correctOptionId: 'opt-qe2-b',
        explanationEn: 'The main clause contains "would have + past participle" (would have passed), which indicates a Third Conditional sentence referring to an impossible past condition. The if-clause requires the Past Perfect tense (had studied).',
        explanationAm: 'The main clause contains "would have + past participle" (would have passed), which indicates a Third Conditional sentence referring to an impossible past condition. The if-clause requires the Past Perfect tense (had studied).',
        points: 1,
      },
    ],
  },

  // ==========================================
  // HISTORY MOCK EXAM
  // ==========================================
  'hist-mock-1': {
    id: 'hist-mock-1',
    subjectSlug: 'history',
    subjectTitleEn: 'History',
    subjectTitleAm: 'History',
    titleEn: 'Grade 12 History National Practice Examination',
    titleAm: 'Grade 12 History National Practice Examination',
    durationSeconds: 120 * 60, // 120 min
    accessTier: 'free',
    questions: [
      {
        id: 'qh-1',
        topicId: 'hist-ch3',
        topicTitle: 'Ethiopia to 1941',
        promptEn: 'Which diplomatic dispute was the direct pretext that triggered the outbreak of the 1895-1896 Ethio-Italian war culminating at the Battle of Adwa?',
        promptAm: '',
        options: [
          { id: 'opt-qh1-a', label: 'A', textEn: 'Disagreement over the boundary of the Hewett Treaty', textAm: 'Disagreement over the boundary of the Hewett Treaty' },
          { id: 'opt-qh1-b', label: 'B', textEn: 'Discrepancy in Article XVII of the Treaty of Wuchale', textAm: 'Discrepancy in Article XVII of the Treaty of Wuchale' },
          { id: 'opt-qh1-c', label: 'C', textEn: 'The partition terms of the Berlin Conference', textAm: 'The partition terms of the Berlin Conference' },
          { id: 'opt-qh1-d', label: 'D', textEn: 'The Italian occupation of the port of Zeila', textAm: 'The Italian occupation of the port of Zeila' },
        ],
        correctOptionId: 'opt-qh1-b',
        explanationEn: 'Article XVII of the 1889 Treaty of Wuchale had differing texts: the Italian version made Italian representation mandatory (a protectorate), whereas the Amharic version made it optional. When Italy attempted to enforce a protectorate, Emperor Menelik II abrogate the treaty and mobilized national forces.',
        explanationAm: 'Article XVII of the 1889 Treaty of Wuchale had differing texts: the Italian version made Italian representation mandatory (a protectorate), whereas the Amharic version made it optional. When Italy attempted to enforce a protectorate, Emperor Menelik II abrogate the treaty and mobilized national forces.',
        points: 1,
      },
      {
        id: 'qh-2',
        topicId: 'hist-ch2',
        topicTitle: 'Colonial Africa',
        promptEn: 'The 1884–1885 Berlin Conference, convened by German Chancellor Otto von Bismarck, established which principle for recognizing European colonial land claims in Africa?',
        promptAm: '',
        options: [
          { id: 'opt-qh2-a', label: 'A', textEn: 'Principle of Self-Determination', textAm: 'Principle of Self-Determination' },
          { id: 'opt-qh2-b', label: 'B', textEn: 'Principle of Effective Occupation', textAm: 'Principle of Effective Occupation' },
          { id: 'opt-qh2-c', label: 'C', textEn: 'Principle of Non-Intervention', textAm: 'Principle of Non-Intervention' },
          { id: 'opt-qh2-d', label: 'D', textEn: 'Principle of Commercial Monopoly', textAm: 'Principle of Commercial Monopoly' },
        ],
        correctOptionId: 'opt-qh2-b',
        explanationEn: 'The Berlin Act stipulated that European powers could only claim rights over African territory if they demonstrated "effective occupation"—meaning having actual administrative presence, treaties, and military police on the ground.',
        explanationAm: 'The Berlin Act stipulated that European powers could only claim rights over African territory if they demonstrated "effective occupation"—meaning having actual administrative presence, treaties, and military police on the ground.',
        points: 1,
      },
    ],
  },

  // ==========================================
  // GEOGRAPHY MOCK EXAM
  // ==========================================
  'geo-mock-1': {
    id: 'geo-mock-1',
    subjectSlug: 'geography',
    subjectTitleEn: 'Geography',
    subjectTitleAm: 'Geography',
    titleEn: 'Grade 12 Geography National Practice Examination',
    titleAm: 'Grade 12 Geography National Practice Examination',
    durationSeconds: 120 * 60, // 120 min
    accessTier: 'free',
    questions: [
      {
        id: 'qg-1',
        topicId: 'geo-ch1',
        topicTitle: 'Plate Tectonics',
        promptEn: 'Which geological feature in northeastern Ethiopia represents a rare geological "triple junction" where three divergent tectonic plates meet?',
        promptAm: '',
        options: [
          { id: 'opt-qg1-a', label: 'A', textEn: 'Simien Mountains Massif', textAm: 'Simien Mountains Massif' },
          { id: 'opt-qg1-b', label: 'B', textEn: 'The Afar Depression (Afar Triangle)', textAm: 'The Afar Depression (Afar Triangle)' },
          { id: 'opt-qg1-c', label: 'C', textEn: 'Bale Mountain Highlands', textAm: 'Bale Mountain Highlands' },
          { id: 'opt-qg1-d', label: 'D', textEn: 'The Baro-Akobo Lowlands', textAm: 'The Baro-Akobo Lowlands' },
        ],
        correctOptionId: 'opt-qg1-b',
        explanationEn: 'The Afar Depression (Afar Triangle) is the world-renowned tectonic triple junction where the Nubian (African), Somali, and Arabian plates diverge, giving rise to active rifting, the Red Sea, the Gulf of Aden, and the Main Ethiopian Rift.',
        explanationAm: 'The Afar Depression (Afar Triangle) is the world-renowned tectonic triple junction where the Nubian (African), Somali, and Arabian plates diverge, giving rise to active rifting, the Red Sea, the Gulf of Aden, and the Main Ethiopian Rift.',
        points: 1,
      },
      {
        id: 'qg-2',
        topicId: 'geo-ch2',
        topicTitle: 'Climate Change & CRGE',
        promptEn: 'Which of the following is NOT one of the four core strategic pillars of Ethiopia’s Climate Resilient Green Economy (CRGE) strategy?',
        promptAm: '',
        options: [
          { id: 'opt-qg2-a', label: 'A', textEn: 'Improving crop and livestock production practices', textAm: 'Improving crop and livestock production practices' },
          { id: 'opt-qg2-b', label: 'B', textEn: 'Protecting and re-establishing forests for their economic and carbon storage value', textAm: 'Protecting and re-establishing forests for their economic and carbon storage value' },
          { id: 'opt-qg2-c', label: 'C', textEn: 'Expanding coal-fired thermal electric power generating plants', textAm: 'Expanding coal-fired thermal electric power generating plants' },
          { id: 'opt-qg2-d', label: 'D', textEn: 'Expanding electricity generation from renewable energy sources for domestic and regional markets', textAm: 'Expanding electricity generation from renewable energy sources for domestic and regional markets' },
        ],
        correctOptionId: 'opt-qg2-c',
        explanationEn: 'The four pillars of Ethiopia\'s CRGE are: 1) Agriculture (livestock and crops), 2) Forestry protection and reforestation, 3) Renewable energy power generation (hydro, wind, solar, geothermal), and 4) Leapfrogging to modern, energy-efficient transport and industrial technologies. Expanding coal power contradicts green economy principles.',
        explanationAm: 'The four pillars of Ethiopia\'s CRGE are: 1) Agriculture (livestock and crops), 2) Forestry protection and reforestation, 3) Renewable energy power generation (hydro, wind, solar, geothermal), and 4) Leapfrogging to modern, energy-efficient transport and industrial technologies. Expanding coal power contradicts green economy principles.',
        points: 1,
      },
    ],
  },

  // ==========================================
  // ECONOMICS MOCK EXAM
  // ==========================================
  'econ-mock-1': {
    id: 'econ-mock-1',
    subjectSlug: 'economics',
    subjectTitleEn: 'Economics',
    subjectTitleAm: 'Economics',
    titleEn: 'Grade 12 Economics National Practice Examination',
    titleAm: 'Grade 12 Economics National Practice Examination',
    durationSeconds: 120 * 60, // 120 min
    accessTier: 'free',
    questions: [
      {
        id: 'qec-1',
        topicId: 'econ-ch1',
        topicTitle: 'Macroeconomic Concepts',
        promptEn: 'Given the following national income data for an open economy: Consumption $C = 400$, Investment $I = 150$, Government Spending $G = 200$, Exports $X = 80$, and Imports $M = 110$. What is the Gross Domestic Product (GDP)?',
        promptAm: '',
        options: [
          { id: 'opt-qec1-a', label: 'A', textEn: '720', textAm: '720' },
          { id: 'opt-qec1-b', label: 'B', textEn: '750', textAm: '750' },
          { id: 'opt-qec1-c', label: 'C', textEn: '780', textAm: '780' },
          { id: 'opt-qec1-d', label: 'D', textEn: '940', textAm: '940' },
        ],
        correctOptionId: 'opt-qec1-a',
        explanationEn: 'Using the expenditure approach: GDP = C + I + G + (X - M) = 400 + 150 + 200 + (80 - 110) = 750 + (-30) = 720.',
        explanationAm: 'Using the expenditure approach: GDP = C + I + G + (X - M) = 400 + 150 + 200 + (80 - 110) = 750 + (-30) = 720.',
        points: 1,
      },
      {
        id: 'qec-2',
        topicId: 'econ-ch4',
        topicTitle: 'Macroeconomic Policy',
        promptEn: 'If the Marginal Propensity to Consume (MPC) in an economy is $0.75$, what will be the total change in equilibrium output resulting from an autonomous increase in government expenditure of $20\\text{ billion Birr}$?',
        promptAm: '',
        options: [
          { id: 'opt-qec2-a', label: 'A', textEn: '40 billion Birr', textAm: '40 billion Birr' },
          { id: 'opt-qec2-b', label: 'B', textEn: '60 billion Birr', textAm: '60 billion Birr' },
          { id: 'opt-qec2-c', label: 'C', textEn: '80 billion Birr', textAm: '80 billion Birr' },
          { id: 'opt-qec2-d', label: 'D', textEn: '100 billion Birr', textAm: '100 billion Birr' },
        ],
        correctOptionId: 'opt-qec2-c',
        explanationEn: 'The government spending multiplier is k_G = 1 / (1 - MPC) = 1 / (1 - 0.75) = 1 / 0.25 = 4. Total change in output Delta Y = k_G * Delta G = 4 * 20 billion = 80 billion Birr.',
        explanationAm: 'The government spending multiplier is k_G = 1 / (1 - MPC) = 1 / (1 - 0.75) = 1 / 0.25 = 4. Total change in output Delta Y = k_G * Delta G = 4 * 20 billion = 80 billion Birr.',
        points: 1,
      },
    ],
  },

  // ==========================================
  // IT MOCK EXAM
  // ==========================================
  'it-mock-1': {
    id: 'it-mock-1',
    subjectSlug: 'information-technology',
    subjectTitleEn: 'Information Technology',
    subjectTitleAm: 'Information Technology',
    titleEn: 'Grade 12 Information Technology National Practice Examination',
    titleAm: 'Grade 12 Information Technology National Practice Examination',
    durationSeconds: 90 * 60, // 90 min
    accessTier: 'free',
    questions: [
      {
        id: 'qit-1',
        topicId: 'it-ch3',
        topicTitle: 'Database Management Systems',
        promptEn: 'Which SQL command is used to remove an existing table and all of its structure permanently from the database schema?',
        promptAm: '',
        options: [
          { id: 'opt-qit1-a', label: 'A', textEn: 'DELETE TABLE Students;', textAm: 'DELETE TABLE Students;' },
          { id: 'opt-qit1-b', label: 'B', textEn: 'REMOVE TABLE Students;', textAm: 'REMOVE TABLE Students;' },
          { id: 'opt-qit1-c', label: 'C', textEn: 'DROP TABLE Students;', textAm: 'DROP TABLE Students;' },
          { id: 'opt-qit1-d', label: 'D', textEn: 'CLEAR TABLE Students;', textAm: 'CLEAR TABLE Students;' },
        ],
        correctOptionId: 'opt-qit1-c',
        explanationEn: 'DROP TABLE is a Data Definition Language (DDL) command that deletes both table records and its definition schema permanently from the database catalog. DELETE is a DML command that only removes records.',
        explanationAm: 'DROP TABLE is a Data Definition Language (DDL) command that deletes both table records and its definition schema permanently from the database catalog. DELETE is a DML command that only removes records.',
        points: 1,
      },
      {
        id: 'qit-2',
        topicId: 'it-ch6',
        topicTitle: 'Fundamentals of Programming',
        promptEn: 'What is the output of the following Python snippet?\n\n```python\ntotal = 0\nfor i in range(1, 6):\n    if i % 2 == 0:\n        total += i\nprint(total)\n```',
        promptAm: '',
        options: [
          { id: 'opt-qit2-a', label: 'A', textEn: '4', textAm: '4' },
          { id: 'opt-qit2-b', label: 'B', textEn: '6', textAm: '6' },
          { id: 'opt-qit2-c', label: 'C', textEn: '9', textAm: '9' },
          { id: 'opt-qit2-d', label: 'D', textEn: '15', textAm: '15' },
        ],
        correctOptionId: 'opt-qit2-b',
        explanationEn: 'The range(1, 6) generates numbers 1, 2, 3, 4, 5. The condition `i % 2 == 0` filters for even numbers: 2 and 4. Total = 2 + 4 = 6.',
        explanationAm: 'The range(1, 6) generates numbers 1, 2, 3, 4, 5. The condition `i % 2 == 0` filters for even numbers: 2 and 4. Total = 2 + 4 = 6.',
        points: 1,
      },
    ],
  },

  // ==========================================
  // AGRICULTURE MOCK EXAM
  // ==========================================
  'agri-mock-1': {
    id: 'agri-mock-1',
    subjectSlug: 'agriculture',
    subjectTitleEn: 'Agriculture',
    subjectTitleAm: 'Agriculture',
    titleEn: 'Grade 12 Agriculture National Practice Examination',
    titleAm: 'Grade 12 Agriculture National Practice Examination',
    durationSeconds: 90 * 60, // 90 min
    accessTier: 'free',
    questions: [
      {
        id: 'qa-1',
        topicId: 'agri-ch1',
        topicTitle: 'Horticultural Crops',
        promptEn: 'In commercial fruit tree propagation, the practice of joining an upper shoot part (scion) onto a rooted plant base (rootstock) is called:',
        promptAm: '',
        options: [
          { id: 'opt-qa1-a', label: 'A', textEn: 'Scarification', textAm: 'Scarification' },
          { id: 'opt-qa1-b', label: 'B', textEn: 'Grafting', textAm: 'Grafting' },
          { id: 'opt-qa1-c', label: 'C', textEn: 'Pruning', textAm: 'Pruning' },
          { id: 'opt-qa1-d', label: 'D', textEn: 'Layering', textAm: 'Layering' },
        ],
        correctOptionId: 'opt-qa1-b',
        explanationEn: 'Grafting is the vegetative technique where a scion (selected for superior fruit quality) is united with a rootstock (selected for root vigor, drought or disease resistance) so they grow as a single plant.',
        explanationAm: 'Grafting is the vegetative technique where a scion (selected for superior fruit quality) is united with a rootstock (selected for root vigor, drought or disease resistance) so they grow as a single plant.',
        points: 1,
      },
      {
        id: 'qa-2',
        topicId: 'agri-ch4',
        topicTitle: 'Apiculture',
        promptEn: 'Which modern beehive design features movable frames separated by a precise "bee space" of approximately 6 to 9 mm, enabling honey extraction without destroying brood combs?',
        promptAm: '',
        options: [
          { id: 'opt-qa2-a', label: 'A', textEn: 'Traditional mud hive', textAm: 'Traditional mud hive' },
          { id: 'opt-qa2-b', label: 'B', textEn: 'Traditional bark cylindrical hive', textAm: 'Traditional bark cylindrical hive' },
          { id: 'opt-qa2-c', label: 'C', textEn: 'Langstroth frame hive', textAm: 'Langstroth frame hive' },
          { id: 'opt-qa2-d', label: 'D', textEn: 'Fixed-comb clay pot hive', textAm: 'Fixed-comb clay pot hive' },
        ],
        correctOptionId: 'opt-qa2-c',
        explanationEn: 'The Langstroth hive uses standard removable wooden frames maintaining Lorenzo Langstroth\'s discovered "bee space" (6-9 mm). Bees do not cement the frames with propolis or bridge them with comb, allowing easy inspection and centrifugal honey extraction without destroying combs.',
        explanationAm: 'The Langstroth hive uses standard removable wooden frames maintaining Lorenzo Langstroth\'s discovered "bee space" (6-9 mm). Bees do not cement the frames with propolis or bridge them with comb, allowing easy inspection and centrifugal honey extraction without destroying combs.',
        points: 1,
      },
    ],
  },
};
