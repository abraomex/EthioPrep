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
  'math-mock-1': {
    id: 'math-mock-1',
    subjectSlug: 'mathematics',
    subjectTitleEn: 'Mathematics',
    subjectTitleAm: 'ሒሳብ',
    titleEn: 'Grade 12 Mathematics National Mock Examination 1',
    titleAm: 'የ12ኛ ክፍል ሒሳብ ብሔራዊ ሞዴል ፈተና 1',
    durationSeconds: 90 * 60, // 90 min
    accessTier: 'free',
    questions: [
      {
        id: 'q-math-1',
        topicId: 'math-ch2',
        topicTitle: 'Limits and Continuity',
        promptEn: 'What is the value of $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$?',
        promptAm: 'የ $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$ እሴት ስንት ነው?',
        options: [
          { id: 'opt-1a', label: 'A', textEn: '0', textAm: '0' },
          { id: 'opt-1b', label: 'B', textEn: '3', textAm: '3' },
          { id: 'opt-1c', label: 'C', textEn: '6', textAm: '6' },
          { id: 'opt-1d', label: 'D', textEn: 'Does not exist', textAm: 'አይኖርም' },
        ],
        correctOptionId: 'opt-1c',
        explanationEn: 'Factoring difference of squares: $(x^2 - 9)/(x - 3) = (x - 3)(x + 3)/(x - 3) = x + 3$. Evaluating at $x = 3$: $3 + 3 = 6$.',
        explanationAm: 'የሁለት ስኩዌሮች ልዩነትን ማበጠር፡ $(x^2 - 9)/(x - 3) = (x - 3)(x + 3)/(x - 3) = x + 3$። በ $x = 3$ ሲተካ፡ $3 + 3 = 6$ ይመጣል።',
        points: 1,
      },
      {
        id: 'q-math-2',
        topicId: 'math-ch3',
        topicTitle: 'Derivatives and Applications',
        promptEn: 'If $f(x) = 3x^2 - 4x + 7$, what is $f\'(2)$?',
        promptAm: 'ፋንክሽኑ $f(x) = 3x^2 - 4x + 7$ ቢሆን፣ የ $f\'(2)$ እሴት ስንት ነው?',
        options: [
          { id: 'opt-2a', label: 'A', textEn: '8', textAm: '8' },
          { id: 'opt-2b', label: 'B', textEn: '12', textAm: '12' },
          { id: 'opt-2c', label: 'C', textEn: '14', textAm: '14' },
          { id: 'opt-2d', label: 'D', textEn: '16', textAm: '16' },
        ],
        correctOptionId: 'opt-2a',
        explanationEn: 'By the power rule: $f\'(x) = 6x - 4$. Substituting $x = 2$: $f\'(2) = 6(2) - 4 = 12 - 4 = 8$.',
        explanationAm: 'በፓወር ህግ መሰረት፡ $f\'(x) = 6x - 4$። በ $x = 2$ ሲተካ፡ $f\'(2) = 6(2) - 4 = 12 - 4 = 8$።',
        points: 1,
      },
      {
        id: 'q-math-3',
        topicId: 'math-ch1',
        topicTitle: 'Sequences and Series',
        promptEn: 'In an arithmetic sequence where $a_1 = 5$ and common difference $d = 3$, what is the 10th term $a_{10}$?',
        promptAm: 'በአንድ አርቲሜቲክ ዝርዝር ውስጥ የመጀመሪያው ተርም $a_1 = 5$ እና የጋራ ልዩነቱ $d = 3$ ቢሆን፣ 10ኛው ተርም $a_{10}$ ስንት ነው?',
        options: [
          { id: 'opt-3a', label: 'A', textEn: '32', textAm: '32' },
          { id: 'opt-3b', label: 'B', textEn: '35', textAm: '35' },
          { id: 'opt-3c', label: 'C', textEn: '29', textAm: '29' },
          { id: 'opt-3d', label: 'D', textEn: '38', textAm: '38' },
        ],
        correctOptionId: 'opt-3a',
        explanationEn: 'General term formula: $a_n = a_1 + (n - 1)d$. For $n = 10$: $a_{10} = 5 + (10 - 1)3 = 5 + 27 = 32$.',
        explanationAm: 'የአርቲሜቲክ ቀመር፡ $a_n = a_1 + (n - 1)d$። ለ $n = 10$፡ $a_{10} = 5 + (9)3 = 5 + 27 = 32$።',
        points: 1,
      },
      {
        id: 'q-math-4',
        topicId: 'math-ch4',
        topicTitle: 'Integrals and Area Calculation',
        promptEn: 'Evaluate the definite integral $\\int_{0}^{3} 2x \\, dx$:',
        promptAm: 'የተወሰነውን ኢንቴግራል $\\int_{0}^{3} 2x \\, dx$ እሴት አስሉ፡',
        options: [
          { id: 'opt-4a', label: 'A', textEn: '6', textAm: '6' },
          { id: 'opt-4b', label: 'B', textEn: '9', textAm: '9' },
          { id: 'opt-4c', label: 'C', textEn: '12', textAm: '12' },
          { id: 'opt-4d', label: 'D', textEn: '18', textAm: '18' },
        ],
        correctOptionId: 'opt-4b',
        explanationEn: 'Antiderivative of $2x$ is $x^2$. Applying fundamental theorem of calculus: $[x^2]_0^3 = 3^2 - 0^2 = 9$.',
        explanationAm: 'የ $2x$ ፀረ-ዴሪቬቲቭ $x^2$ ነው። በFTC መሰረት፡ $[x^2]_0^3 = 3^2 - 0 = 9$።',
        points: 1,
      },
      {
        id: 'q-math-5',
        topicId: 'math-ch5',
        topicTitle: 'Vectors in Two and Three Dimensions',
        promptEn: 'If vector $\\mathbf{u} = (2, 3)$ and vector $\\mathbf{v} = (-1, 4)$, what is the dot product $\\mathbf{u} \\cdot \\mathbf{v}$?',
        promptAm: 'ቬክተር $\\mathbf{u} = (2, 3)$ እና ቬክተር $\\mathbf{v} = (-1, 4)$ ቢሆኑ፣ የዶት ብዜቱ $\\mathbf{u} \\cdot \\mathbf{v}$ ስንት ነው?',
        options: [
          { id: 'opt-5a', label: 'A', textEn: '10', textAm: '10' },
          { id: 'opt-5b', label: 'B', textEn: '14', textAm: '14' },
          { id: 'opt-5c', label: 'C', textEn: '-2', textAm: '-2' },
          { id: 'opt-5d', label: 'D', textEn: '12', textAm: '12' },
        ],
        correctOptionId: 'opt-5a',
        explanationEn: 'Dot product formula: $\\mathbf{u} \\cdot \\mathbf{v} = u_x v_x + u_y v_y = (2)(-1) + (3)(4) = -2 + 12 = 10$.',
        explanationAm: 'የዶት ብዜት ቀመር፡ $u_x v_x + u_y v_y = (2)(-1) + (3)(4) = -2 + 12 = 10$።',
        points: 1,
      },
      {
        id: 'q-math-6',
        topicId: 'math-ch2',
        topicTitle: 'Limits and Continuity',
        promptEn: 'What is the value of $\\lim_{x \\to 0} \\frac{\\sin x}{x}$?',
        promptAm: 'የ $\\lim_{x \\to 0} \\frac{\\sin x}{x}$ እሴት ስንት ነው?',
        options: [
          { id: 'opt-6a', label: 'A', textEn: '0', textAm: '0' },
          { id: 'opt-6b', label: 'B', textEn: '1', textAm: '1' },
          { id: 'opt-6c', label: 'C', textEn: '$\\infty$', textAm: '$\\infty$' },
          { id: 'opt-6d', label: 'D', textEn: 'Undefined', textAm: 'ያልተተረጎመ' },
        ],
        correctOptionId: 'opt-6b',
        explanationEn: 'This is a standard fundamental trigonometric limit: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.',
        explanationAm: 'ይህ መሰረታዊ የትሪጎኖሜትሪ ሊሚት ቴዎረም ነው፡ $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$።',
        points: 1,
      },
    ],
  },
};

