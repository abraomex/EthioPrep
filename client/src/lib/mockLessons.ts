export interface FullLessonData {
  id: string;
  topicId: string;
  subjectSlug: string;
  subjectTitleEn: string;
  subjectTitleAm: string;
  chapterTitleEn: string;
  chapterTitleAm: string;
  lessonNumber: string;
  titleEn: string;
  titleAm: string;
  estimatedMinutes: number;
  accessTier: 'free' | 'premium';
  hasAmharic: boolean;
  bodyEn: string;
  bodyAm: string;
  prevLessonId?: string;
  nextLessonId?: string;
}

export const mockFullLessons: Record<string, FullLessonData> = {
  'les-math-201': {
    id: 'les-math-201',
    topicId: 'math-ch2',
    subjectSlug: 'mathematics',
    subjectTitleEn: 'Mathematics',
    subjectTitleAm: 'ሒሳብ',
    chapterTitleEn: 'Chapter 2: Limits and Continuity',
    chapterTitleAm: 'ምዕራፍ 2፡ ሊሚት እና ቀጣይነት',
    lessonNumber: '2.1',
    titleEn: 'Definition of Limits and Direct Evaluation',
    titleAm: 'የሊሚት ትርጉም እና ቀጥተኛ ስሌት',
    estimatedMinutes: 10,
    accessTier: 'free',
    hasAmharic: true,
    prevLessonId: 'les-math-102',
    nextLessonId: 'les-math-202',
    bodyEn: `
# Definition of Limits and Direct Evaluation

The concept of a limit is the foundational cornerstone of all calculus. When analyzing the behavior of a function $f(x)$ near a specific point $x = a$, we are interested in the value that $f(x)$ approaches, not necessarily what $f(a)$ equals.

---

### Formal Intuition

We write:
$$\\lim_{x \\to a} f(x) = L$$

This statement reads: *"The limit of $f(x)$ as $x$ approaches $a$ is equal to $L$."*

> **Key Principle:** A two-sided limit exists if and only if both one-sided limits exist and are equal:
> $$\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L$$

---

### Fundamental Limit Laws

Let $c$ be a constant, and suppose $\\lim_{x \\to a} f(x) = L$ and $\\lim_{x \\to a} g(x) = M$ both exist:

1. **Sum Law:** $\\lim_{x \\to a} [f(x) + g(x)] = L + M$
2. **Difference Law:** $\\lim_{x \\to a} [f(x) - g(x)] = L - M$
3. **Product Law:** $\\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M$
4. **Quotient Law:** $\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M}$, provided $M \\neq 0$.
5. **Power Law:** $\\lim_{x \\to a} [f(x)]^n = L^n$, where $n$ is any positive integer.

---

### Indeterminate Forms: $\\frac{0}{0}$

When direct substitution of $x = a$ into a rational function yields $\\frac{0}{0}$, this indicates an **indeterminate form**. You must algebraically simplify the expression before re-evaluating:
* **Factorization:** Factor polynomial numerator and denominator to cancel the common $(x - a)$ factor.
* **Rationalization:** Multiply by the conjugate when square roots are present.

---

### Worked Example 1: Factoring Technique

**Problem:** Evaluate the following limit:
$$\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$$

**Solution Steps:**

1. **Test Direct Substitution:**
   $$\\frac{3^2 - 9}{3 - 3} = \\frac{0}{0} \\quad \\text{(Indeterminate!)}$$

2. **Factor the Difference of Squares:**
   $$x^2 - 9 = (x - 3)(x + 3)$$

3. **Cancel Common Non-zero Factors for $x \\neq 3$:**
   $$\\lim_{x \\to 3} \\frac{(x - 3)(x + 3)}{x - 3} = \\lim_{x \\to 3} (x + 3)$$

4. **Re-evaluate:**
   $$\\lim_{x \\to 3} (x + 3) = 3 + 3 = 6$$

---

### Worked Example 2: Conjugate Multiplication

**Problem:** Evaluate the limit:
$$\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$$

**Solution Steps:**

1. Direct substitution gives $\\frac{\\sqrt{4} - 2}{0} = \\frac{0}{0}$.
2. Multiply numerator and denominator by conjugate $(\\sqrt{x + 4} + 2)$:
   $$\\frac{(\\sqrt{x + 4} - 2)(\\sqrt{x + 4} + 2)}{x(\\sqrt{x + 4} + 2)} = \\frac{(x + 4) - 4}{x(\\sqrt{x + 4} + 2)} = \\frac{x}{x(\\sqrt{x + 4} + 2)}$$
3. Cancel $x$:
   $$\\lim_{x \\to 0} \\frac{1}{\\sqrt{x + 4} + 2} = \\frac{1}{\\sqrt{4} + 2} = \\frac{1}{4}$$

---

### National Exam Strategy Tip

> **Tip:** In Ethiopian Grade 12 National Exams, limits involving polynomials almost always test your ability to factor rapidly or apply synthetic division. Always check for $0/0$ before doing long work!
`,
    bodyAm: `
# የሊሚት ትርጉም እና ቀጥተኛ ስሌት

የሊሚት (Limit) ጽንሰ-ሀሳብ የካልኩለስ ሁሉ መሰረት ነው። አንድ ፋንክሽን $f(x)$ ወደ አንድ ነጥብ $x = a$ ሲጠጋ የሚኖረውን ባህሪ ስናጠና፣ የምንፈልገው ፋንክሽኑ የሚጠጋበትን እሴት እንጂ የግድ $f(a)$ ምን ያህል እንደሆነ አይደለም።

---

### መሰረታዊ መግለጫ

እንዲህ እንጽፋለን፡
$$\\lim_{x \\to a} f(x) = L$$

ይህ አገላለጽ ሲነበብ፡ *"የ $f(x)$ ሊሚት $x$ ወደ $a$ ሲጠጋ እሴቱ $L$ ይሆናል"* ማለት ነው።

> **ዋና መርህ:** ባለሁለት አቅጣጫ ሊሚት ሊኖር የሚችለው ሁለቱም የቀኝ እና የግራ ሊሚቶች ሲኖሩና እኩል ሲሆኑ ብቻ ነው፡
> $$\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L$$

---

### መሰረታዊ የሊሚት ህጎች

$c$ ቋሚ ቁጥር ቢሆን፣ እና $\\lim_{x \\to a} f(x) = L$ እንዲሁም $\\lim_{x \\to a} g(x) = M$ ቢሆኑ፡

1. **የድምር ህግ:** $\\lim_{x \\to a} [f(x) + g(x)] = L + M$
2. **የልዩነት ህግ:** $\\lim_{x \\to a} [f(x) - g(x)] = L - M$
3. **የብዜት ህግ:** $\\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M$
4. **የክፍፍል ህግ:** $\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M}$, ($M \\neq 0$ እስከሆነ ድረስ)።

---

### ያልተወሰነ ቅርጽ፡ $\\frac{0}{0}$

$x = a$ በቀጥታ በመተካት $\\frac{0}{0}$ ሲመጣ ይህ **ያልተወሰነ ቅርጽ (Indeterminate Form)** ይባላል። ቀጣዩን እርምጃ ከመውሰድዎ በፊት በአልጀብራ ማቃለል ያስፈልጋል፡
* **ማባዛትና መበተን (Factoring):** የጋራ የሆነውን $(x - a)$ ክፍል በመሰረዝ።
* **ኮንጁጌት ማባዛት (Conjugate):** ስኩዌር ሩት ሲኖር።

---

### የተሰራ ምሳሌ 1

**ጥያቄ:** የሚከተለውን ሊሚት አስሉ፡
$$\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$$

**የአሰራር ደረጃዎች:**

1. **ቀጥታ መተካት መሞከር:**
   $$\\frac{3^2 - 9}{3 - 3} = \\frac{0}{0} \\quad \\text{(ያልተወሰነ ቅርጽ!)}$$

2. **የሁለት ስኩዌሮች ልዩነትን ማበጠር:**
   $$x^2 - 9 = (x - 3)(x + 3)$$

3. **የጋራ ክፍሎችን ማጣፋት ($x \\neq 3$):**
   $$\\lim_{x \\to 3} \\frac{(x - 3)(x + 3)}{x - 3} = \\lim_{x \\to 3} (x + 3)$$

4. **መልስ:**
   $$3 + 3 = 6$$
`,
  },
  'les-math-101': {
    id: 'les-math-101',
    topicId: 'math-ch1',
    subjectSlug: 'mathematics',
    subjectTitleEn: 'Mathematics',
    subjectTitleAm: 'ሒሳብ',
    chapterTitleEn: 'Chapter 1: Sequences and Series',
    chapterTitleAm: 'ምዕራፍ 1፡ ዝርዝሮች እና ድምሮች',
    lessonNumber: '1.1',
    titleEn: 'Arithmetic Progressions and General Terms',
    titleAm: 'የአርቲሜቲክ ዝርዝሮች እና አጠቃላይ ቀመር',
    estimatedMinutes: 10,
    accessTier: 'free',
    hasAmharic: true,
    prevLessonId: undefined,
    nextLessonId: 'les-math-201',
    bodyEn: `
# Arithmetic Progressions (AP) and General Terms

An **Arithmetic Sequence (or Arithmetic Progression)** is a sequence of numbers in which each term after the first is obtained by adding a fixed constant called the **common difference** ($d$).

---

### Formulas for AP

1. **General Term ($n$-th Term):**
   $$a_n = a_1 + (n - 1)d$$
   * $a_1$ = first term
   * $d$ = common difference ($a_{n} - a_{n-1}$)
   * $n$ = position index

2. **Sum of First $n$ Terms ($S_n$):**
   $$S_n = \\frac{n}{2}[2a_1 + (n - 1)d] = \\frac{n}{2}[a_1 + a_n]$$

---

### Worked Example

**Problem:** In an arithmetic sequence, the 3rd term is 14 and the 9th term is 38. Find the 20th term.

**Solution:**
1. $a_3 = a_1 + 2d = 14$
2. $a_9 = a_1 + 8d = 38$
3. Subtracting the two equations: $6d = 24 \\implies d = 4$.
4. Finding $a_1$: $a_1 + 2(4) = 14 \\implies a_1 = 6$.
5. The 20th term:
   $$a_{20} = a_1 + 19d = 6 + 19(4) = 6 + 76 = 82$$
`,
    bodyAm: `
# የአርቲሜቲክ ዝርዝሮች እና አጠቃላይ ቀመር

አንድ **አርቲሜቲክ ዝርዝር (Arithmetic Progression)** ማለት ከሁለተኛው ጀምሮ ያለው እያንዳንዱ ቁጥር ከቀደመው ቁጥር ላይ ቋሚ ቁጥር **የጋራ ልዩነት ($d$)** በመደመር የሚገኝበት የቁጥሮች ዝርዝር ነው።

---

### የአርቲሜቲክ ቀመሮች

1. **የ $n$-ኛ ተርም ቀመር:**
   $$a_n = a_1 + (n - 1)d$$
   * $a_1$ = የመጀመሪያው ተርም
   * $d$ = የጋራ ልዩነት ($a_n - a_{n-1}$)

2. **የመጀመሪያዎቹ $n$ ተርሞች ድምር ($S_n$):**
   $$S_n = \\frac{n}{2}[2a_1 + (n - 1)d] = \\frac{n}{2}[a_1 + a_n]$$
`,
  },
};

