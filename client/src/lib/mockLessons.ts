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
  // ==========================================
  // MATHEMATICS LESSONS
  // ==========================================
  'les-math-101': {
    id: 'les-math-101',
    topicId: 'math-ch1',
    subjectSlug: 'mathematics',
    subjectTitleEn: 'Mathematics',
    subjectTitleAm: 'Mathematics',
    chapterTitleEn: 'Unit 1: Sequence and Series',
    chapterTitleAm: 'Unit 1: Sequence and Series',
    lessonNumber: '1.1',
    titleEn: 'Arithmetic Progressions and General Terms',
    titleAm: 'Arithmetic Progressions and General Terms',
    estimatedMinutes: 12,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: undefined,
    nextLessonId: 'les-math-102',
    bodyEn: `
# Arithmetic Progressions (AP) and General Terms

An **Arithmetic Sequence (or Arithmetic Progression)** is a sequence of numbers in which each term after the first is obtained by adding a fixed constant called the **common difference** ($d$).

---

### Key Formulas for Arithmetic Progressions

1. **Common Difference ($d$):**
   $$d = a_n - a_{n-1} = a_2 - a_1$$

2. **General Term ($n$-th Term):**
   $$a_n = a_1 + (n - 1)d$$
   * $a_1$ = first term
   * $d$ = common difference
   * $n$ = position index ($n \in \mathbb{Z}^+$)

3. **Sum of the First $n$ Terms ($S_n$):**
   $$S_n = \frac{n}{2}[2a_1 + (n - 1)d] = \frac{n}{2}[a_1 + a_n]$$

4. **Arithmetic Mean:**
   If three numbers $a, b, c$ form an AP, then $b = \frac{a + c}{2}$.

---

### Worked Example

**Problem:** In an arithmetic sequence, the 4th term is 19 and the 10th term is 49. Find the first term $a_1$, the common difference $d$, and the sum of the first 25 terms ($S_{25}$).

**Solution:**
1. Write the system of linear equations:
   $$a_4 = a_1 + 3d = 19$$
   $$a_{10} = a_1 + 9d = 49$$
2. Subtract the first equation from the second:
   $$(a_1 + 9d) - (a_1 + 3d) = 49 - 19 \implies 6d = 30 \implies d = 5$$
3. Substitute $d = 5$ into $a_4$:
   $$a_1 + 3(5) = 19 \implies a_1 + 15 = 19 \implies a_1 = 4$$
4. Compute $S_{25}$:
   $$S_{25} = \frac{25}{2}[2(4) + (25 - 1)(5)] = \frac{25}{2}[8 + 120] = \frac{25}{2}(128) = 25 \times 64 = 1,600$$
`,
    bodyAm: '',
  },

  'les-math-102': {
    id: 'les-math-102',
    topicId: 'math-ch1',
    subjectSlug: 'mathematics',
    subjectTitleEn: 'Mathematics',
    subjectTitleAm: 'Mathematics',
    chapterTitleEn: 'Unit 1: Sequence and Series',
    chapterTitleAm: 'Unit 1: Sequence and Series',
    lessonNumber: '1.2',
    titleEn: 'Geometric Sequences and Infinite Series',
    titleAm: 'Geometric Sequences and Infinite Series',
    estimatedMinutes: 14,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-math-101',
    nextLessonId: 'les-math-201',
    bodyEn: `
# Geometric Sequences and Infinite Series

A **Geometric Sequence (or Geometric Progression)** is a sequence in which each term after the first is obtained by multiplying the preceding term by a non-zero constant called the **common ratio** ($r$).

---

### Fundamental Formulas

1. **Common Ratio ($r$):**
   $$r = \frac{a_n}{a_{n-1}} = \frac{a_2}{a_1} \quad (r \neq 0)$$

2. **$n$-th Term Formula:**
   $$a_n = a_1 \cdot r^{n-1}$$

3. **Sum of First $n$ Terms ($S_n$):**
   $$S_n = \frac{a_1(1 - r^n)}{1 - r} = \frac{a_1(r^n - 1)}{r - 1} \quad (r \neq 1)$$

4. **Sum to Infinity of a Convergent Geometric Series ($S_\infty$):**
   An infinite geometric series converges if and only if $|r| < 1$:
   $$S_\infty = \frac{a_1}{1 - r} \quad \text{for } -1 < r < 1$$
   If $|r| \geq 1$ and $a_1 \neq 0$, the series diverges.

---

### Worked Example

**Problem:** Convert the recurring decimal $0.\overline{45} = 0.454545\dots$ into a rational fraction $\frac{p}{q}$.

**Solution:**
1. Express as an infinite geometric series:
   $$0.\overline{45} = \frac{45}{100} + \frac{45}{10000} + \frac{45}{1000000} + \dots$$
2. Identify $a_1$ and $r$:
   $$a_1 = \frac{45}{100}, \quad r = \frac{1}{100}$$
   Since $|r| = 0.01 < 1$, the series converges:
3. Apply sum to infinity formula:
   $$S_\infty = \frac{\frac{45}{100}}{1 - \frac{1}{100}} = \frac{\frac{45}{100}}{\frac{99}{100}} = \frac{45}{99} = \frac{5}{11}$$
`,
    bodyAm: '',
  },

  'les-math-201': {
    id: 'les-math-201',
    topicId: 'math-ch2',
    subjectSlug: 'mathematics',
    subjectTitleEn: 'Mathematics',
    subjectTitleAm: 'Mathematics',
    chapterTitleEn: 'Unit 2: Introduction to Calculus',
    chapterTitleAm: 'Unit 2: Introduction to Calculus',
    lessonNumber: '2.1',
    titleEn: 'Limits of Functions and Limit Laws',
    titleAm: 'Limits of Functions and Limit Laws',
    estimatedMinutes: 15,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-math-102',
    nextLessonId: 'les-math-203',
    bodyEn: `
# Limits of Functions and Limit Laws

The limit of a function $f(x)$ as $x$ approaches $c$ is the value $L$ that $f(x)$ gets arbitrarily close to as $x$ gets closer to $c$:
$$\lim_{x \to c} f(x) = L$$

---

### Core Limit Laws

Let $\lim_{x \to c} f(x) = L$ and $\lim_{x \to c} g(x) = M$:

1. **Sum & Difference:** $\lim_{x \to c} [f(x) \pm g(x)] = L \pm M$
2. **Product:** $\lim_{x \to c} [f(x) \cdot g(x)] = L \cdot M$
3. **Quotient:** $\lim_{x \to c} \frac{f(x)}{g(x)} = \frac{L}{M} \quad (\text{if } M \neq 0)$
4. **Power Law:** $\lim_{x \to c} [f(x)]^n = L^n$

---

### Indeterminate Form $\frac{0}{0}$ Resolution Strategies

When direct substitution gives $\frac{0}{0}$, use:
1. **Factoring & Cancellation:**
   $$\lim_{x \to 3} \frac{x^2 - 9}{x - 3} = \lim_{x \to 3} \frac{(x - 3)(x + 3)}{x - 3} = \lim_{x \to 3} (x + 3) = 6$$
2. **Rationalization (Conjugate Multiplication):**
   $$\lim_{x \to 0} \frac{\sqrt{x + 4} - 2}{x} = \lim_{x \to 0} \frac{(\sqrt{x + 4} - 2)(\sqrt{x + 4} + 2)}{x(\sqrt{x + 4} + 2)} = \lim_{x \to 0} \frac{x}{x(\sqrt{x + 4} + 2)} = \frac{1}{4}$$
`,
    bodyAm: '',
  },

  'les-math-203': {
    id: 'les-math-203',
    topicId: 'math-ch2',
    subjectSlug: 'mathematics',
    subjectTitleEn: 'Mathematics',
    subjectTitleAm: 'Mathematics',
    chapterTitleEn: 'Unit 2: Introduction to Calculus',
    chapterTitleAm: 'Unit 2: Introduction to Calculus',
    lessonNumber: '2.3',
    titleEn: 'The Derivative and Differentiation Rules',
    titleAm: 'The Derivative and Differentiation Rules',
    estimatedMinutes: 16,
    accessTier: 'premium',
    hasAmharic: false,
    prevLessonId: 'les-math-201',
    nextLessonId: 'les-phys-201',
    bodyEn: `
# The Derivative and Differentiation Rules

The derivative represents the instantaneous rate of change of a function and the slope of the tangent line to the curve $y = f(x)$ at $x = c$.

---

### Definition of Derivative
$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$

---

### Operational Rules of Differentiation

1. **Power Rule:**
   $$\frac{d}{dx}[x^n] = n x^{n-1} \quad (n \in \mathbb{R})$$

2. **Constant Multiple Rule:**
   $$\frac{d}{dx}[k \cdot f(x)] = k \cdot f'(x)$$

3. **Product Rule:**
   $$\frac{d}{dx}[u \cdot v] = u'v + uv'$$

4. **Quotient Rule:**
   $$\frac{d}{dx}\left[\frac{u}{v}\right] = \frac{u'v - uv'}{v^2} \quad (v \neq 0)$$

5. **Chain Rule:**
   If $y = f(g(x))$, then:
   $$\frac{dy}{dx} = f'(g(x)) \cdot g'(x)$$

---

### Worked Example

**Problem:** Find the equation of the tangent line to $f(x) = 2x^3 - 5x + 1$ at $x = 2$.

**Solution:**
1. Evaluate $y_1 = f(2)$:
   $$f(2) = 2(2)^3 - 5(2) + 1 = 16 - 10 + 1 = 7 \implies (2, 7)$$
2. Find the derivative $f'(x)$:
   $$f'(x) = 6x^2 - 5$$
3. Compute slope $m = f'(2)$:
   $$m = 6(2)^2 - 5 = 24 - 5 = 19$$
4. Point-slope equation:
   $$y - 7 = 19(x - 2) \implies y = 19x - 38 + 7 \implies y = 19x - 31$$
`,
    bodyAm: '',
  },

  // ==========================================
  // PHYSICS LESSONS
  // ==========================================
  'les-phys-201': {
    id: 'les-phys-201',
    topicId: 'phys-ch2',
    subjectSlug: 'physics',
    subjectTitleEn: 'Physics',
    subjectTitleAm: 'Physics',
    chapterTitleEn: 'Unit 2: Two-Dimensional Motion',
    chapterTitleAm: 'Unit 2: Two-Dimensional Motion',
    lessonNumber: '2.1',
    titleEn: 'Projectile Motion and Trajectory Analysis',
    titleAm: 'Projectile Motion and Trajectory Analysis',
    estimatedMinutes: 15,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-math-203',
    nextLessonId: 'les-phys-301',
    bodyEn: `
# Projectile Motion and Trajectory Analysis

Projectile motion is the two-dimensional motion of an object launched into the air subject only to the acceleration due to gravity ($g \approx 9.8\text{ m/s}^2$ downward), assuming negligible air resistance.

---

### Kinematic Equations of Projectile Motion

When launched with initial speed $v_0$ at angle $\theta$ to the horizontal:

1. **Initial Velocity Components:**
   $$v_{0x} = v_0 \cos\theta, \quad v_{0y} = v_0 \sin\theta$$

2. **Horizontal Motion (Constant Velocity, $a_x = 0$):**
   $$v_x(t) = v_{0x} = v_0 \cos\theta$$
   $$x(t) = (v_0 \cos\theta) t$$

3. **Vertical Motion (Uniform Acceleration, $a_y = -g$):**
   $$v_y(t) = v_0 \sin\theta - gt$$
   $$y(t) = (v_0 \sin\theta) t - \frac{1}{2}gt^2$$

---

### Key Trajectory Formulas (Ground-to-Ground)

* **Time to Maximum Height ($t_{\text{top}}$):**
  $$t_{\text{top}} = \frac{v_0 \sin\theta}{g}$$
* **Total Time of Flight ($T$):**
  $$T = 2 t_{\text{top}} = \frac{2v_0 \sin\theta}{g}$$
* **Maximum Height ($H_{\text{max}}$):**
  $$H_{\text{max}} = \frac{v_0^2 \sin^2\theta}{2g}$$
* **Horizontal Range ($R$):**
  $$R = \frac{v_0^2 \sin(2\theta)}{g}$$
  *(Maximum range occurs at launching angle $\theta = 45^\circ$)*
`,
    bodyAm: '',
  },

  'les-phys-301': {
    id: 'les-phys-301',
    topicId: 'phys-ch3',
    subjectSlug: 'physics',
    subjectTitleEn: 'Physics',
    subjectTitleAm: 'Physics',
    chapterTitleEn: 'Unit 3: Fluid Mechanics',
    chapterTitleAm: 'Unit 3: Fluid Mechanics',
    lessonNumber: '3.1',
    titleEn: 'Fluid Statics, Hydrostatic Pressure & Pascal’s Principle',
    titleAm: 'Fluid Statics, Hydrostatic Pressure & Pascal’s Principle',
    estimatedMinutes: 14,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-phys-201',
    nextLessonId: 'les-phys-402',
    bodyEn: `
# Fluid Statics, Hydrostatic Pressure & Pascal's Principle

Fluids encompass both liquids and gases that flow under the action of shearing stress.

---

### Hydrostatic Pressure Law

The pressure $P$ at depth $h$ below the open surface of a static liquid of uniform density $\rho$ is given by:
$$P = P_0 + \rho g h$$
* $P_0$ = atmospheric pressure at the liquid surface ($1.013 \times 10^5\text{ Pa}$)
* $\rho$ = mass density of the fluid ($\text{kg/m}^3$)
* $g$ = acceleration due to gravity ($9.8\text{ m/s}^2$)
* $h$ = depth below the surface ($\text{m}$)
* **Gauge Pressure ($P_g$):** $P_g = P - P_0 = \rho gh$.

---

### Pascal's Principle & Hydraulic Lifts

Pascal's Principle states that pressure applied to an enclosed static fluid is transmitted undiminished to every portion of the fluid and the container walls:
$$\frac{F_1}{A_1} = \frac{F_2}{A_2} \implies F_2 = F_1 \left(\frac{A_2}{A_1}\right)$$

---

### Archimedes' Principle & Buoyancy

An object wholly or partially submerged in a fluid is buoyed up by a force equal to the weight of the fluid displaced:
$$F_B = \rho_{\text{fluid}} \cdot V_{\text{submerged}} \cdot g$$
* If $F_B > W_{\text{obj}}$, the object accelerates upward and floats.
* If $F_B = W_{\text{obj}}$, the object remains suspended in neutral equilibrium.
* If $F_B < W_{\text{obj}}$, the object sinks.
`,
    bodyAm: '',
  },

  'les-phys-402': {
    id: 'les-phys-402',
    topicId: 'phys-ch4',
    subjectSlug: 'physics',
    subjectTitleEn: 'Physics',
    subjectTitleAm: 'Physics',
    chapterTitleEn: 'Unit 4: Electromagnetism',
    chapterTitleAm: 'Unit 4: Electromagnetism',
    lessonNumber: '4.2',
    titleEn: 'Electromagnetic Induction, Faraday’s Law and Transformers',
    titleAm: 'Electromagnetic Induction, Faraday’s Law and Transformers',
    estimatedMinutes: 16,
    accessTier: 'premium',
    hasAmharic: false,
    prevLessonId: 'les-phys-301',
    nextLessonId: 'les-chem-101',
    bodyEn: `
# Electromagnetic Induction, Faraday's Law and Transformers

Electromagnetic induction describes how a changing magnetic flux through a conducting circuit induces an electromotive force ($\text{emf}$).

---

### 1. Magnetic Flux ($\Phi$)
$$\Phi = \vec{B} \cdot \vec{A} = B A \cos\theta$$
* Unit: Weber ($\text{Wb} = \text{T} \cdot \text{m}^2$)
* $\theta$ = angle between magnetic field $\vec{B}$ and surface normal vector $\vec{A}$.

---

### 2. Faraday's Law of Induction & Lenz's Law
$$\mathcal{E} = -N \frac{\Delta \Phi}{\Delta t} = -N \frac{d\Phi}{dt}$$
* $N$ = number of tightly wound loops.
* **Lenz's Law (Negative sign):** The induced current flows in such a direction that its own magnetic field opposes the change in magnetic flux that produced it (Conservation of Energy).

---

### 3. Transformers

An ideal transformer consists of primary and secondary coils wound on a laminated iron core:
$$\frac{V_s}{V_p} = \frac{N_s}{N_p} = \frac{I_p}{I_s}$$
* **Step-Up Transformer:** $N_s > N_p \implies V_s > V_p$ and $I_s < I_p$ (increases voltage).
* **Step-Down Transformer:** $N_s < N_p \implies V_s < V_p$ and $I_s > I_p$ (decreases voltage).
* **Efficiency ($\eta$):** $\eta = \frac{P_{\text{out}}}{P_{\text{in}}} \times 100\% = \frac{V_s I_s}{V_p I_p} \times 100\%$.
`,
    bodyAm: '',
  },

  // ==========================================
  // CHEMISTRY LESSONS (Already Extracted)
  // ==========================================
  'les-chem-101': {
    id: 'les-chem-101',
    topicId: 'chem-ch1',
    subjectSlug: 'chemistry',
    subjectTitleEn: 'Chemistry',
    subjectTitleAm: 'Chemistry',
    chapterTitleEn: 'Unit 1: Acid-Base Equilibria',
    chapterTitleAm: 'Unit 1: Acid-Base Equilibria',
    lessonNumber: '1.1',
    titleEn: 'Acid-Base Concepts: Arrhenius, Brønsted-Lowry, and Lewis Theories',
    titleAm: 'Acid-Base Concepts: Arrhenius, Brønsted-Lowry, and Lewis Theories',
    estimatedMinutes: 14,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-phys-402',
    nextLessonId: 'les-chem-102',
    bodyEn: `
# Acid-Base Concepts: Arrhenius, Brønsted-Lowry, and Lewis Theories

In Grade 12 Chemistry, acid-base chemistry is generalized from simple aqueous ions to proton-transfer and electron-pair donation processes. Three historical definitions build upon each other:

---

### 1. Arrhenius Concept of Acids and Bases

* **Arrhenius Acid:** A substance that dissociates in water to yield hydrogen ions (protons, $\\text{H}^+$):
  $$\\text{HCl}(g) \\xrightarrow{\\text{H}_2\\text{O}} \\text{H}^+(aq) + \\text{Cl}^-(aq)$$
* **Arrhenius Base:** A substance that dissociates in water to yield hydroxide ions ($\\text{OH}^-$):
  $$\\text{NaOH}(s) \\xrightarrow{\\text{H}_2\\text{O}} \\text{Na}^+(aq) + \\text{OH}^-(aq)$$
* **Neutralization:** The reaction between $\\text{H}^+$ and $\\text{OH}^-$ to form neutral water:
  $$\\text{H}^+(aq) + \\text{OH}^-(aq) \\rightarrow \\text{H}_2\\text{O}(l)$$

> **Limitations:** The Arrhenius definition is restricted to **aqueous solutions** only and fails to explain basicity in compounds lacking $\\text{OH}^-$ in their chemical formula (such as ammonia, $\\text{NH}_3$, or sodium carbonate, $\\text{Na}_2\\text{CO}_3$).

---

### 2. Brønsted-Lowry Concept (Proton Transfer)

* **Brønsted-Lowry Acid:** A **proton ($\\text{H}^+$) donor**.
* **Brønsted-Lowry Base:** A **proton ($\\text{H}^+$) acceptor**.

Consider the dissolution of ammonia in water:
$$\\text{NH}_3(aq) + \\text{H}_2\\text{O}(l) \\rightleftharpoons \\text{NH}_4^+(aq) + \\text{OH}^-(aq)$$

Here, $\\text{H}_2\\text{O}$ donates $\\text{H}^+$ (acting as an acid), and $\\text{NH}_3$ accepts $\\text{H}^+$ (acting as a base).

#### Conjugate Acid-Base Pairs
When an acid loses a proton, it forms its **conjugate base**. When a base gains a proton, it forms its **conjugate acid**:
$$\\underbrace{\\text{CH}_3\\text{COOH}}_{\\text{Acid}} + \\underbrace{\\text{H}_2\\text{O}}_{\\text{Base}} \\rightleftharpoons \\underbrace{\\text{H}_3\\text{O}^+}_{\\text{Conjugate Acid}} + \\underbrace{\\text{CH}_3\\text{COO}^-}_{\\text{Conjugate Base}}$$

* **Inverse Strength Rule:** The stronger the acid, the weaker its conjugate base, and vice versa!
* **Amphiprotic Species:** Substances that can either donate or accept a proton depending on reaction conditions (e.g., $\\text{H}_2\\text{O}$, $\\text{HCO}_3^-$, $\\text{H}_2\\text{PO}_4^-$).

---

### 3. Lewis Concept (Electron Pair Transfer)

* **Lewis Acid:** An **electron-pair acceptor** (electrophile / electron-deficient).
* **Lewis Base:** An **electron-pair donor** (nucleophile / electron-rich).

The reaction between boron trifluoride and ammonia produces a coordinate covalent adduct:
$$\\text{BF}_3 + :\\text{NH}_3 \\rightarrow \\text{F}_3\\text{B}\\leftarrow\\text{NH}_3$$

* Metal cations (such as $\\text{Cu}^{2+}$, $\\text{Fe}^{3+}$, $\\text{Al}^{3+}$) act as **Lewis acids** when they dissolve in water, which acts as a **Lewis base** donating lone pairs to form hydrated complex ions:
  $$\\text{Al}^{3+} + 6\\text{H}_2\\text{O} \\rightarrow [\\text{Al}(\\text{H}_2\\text{O})_6]^{3+}$$
`,
    bodyAm: '',
  },

  'les-chem-102': {
    id: 'les-chem-102',
    topicId: 'chem-ch1',
    subjectSlug: 'chemistry',
    subjectTitleEn: 'Chemistry',
    subjectTitleAm: 'Chemistry',
    chapterTitleEn: 'Unit 1: Acid-Base Equilibria',
    chapterTitleAm: 'Unit 1: Acid-Base Equilibria',
    lessonNumber: '1.2',
    titleEn: 'Ionic Equilibria of Weak Acids, Bases, and pH Calculations',
    titleAm: 'Ionic Equilibria of Weak Acids, Bases, and pH Calculations',
    estimatedMinutes: 16,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-chem-101',
    nextLessonId: 'les-chem-103',
    bodyEn: `
# Ionic Equilibria of Weak Acids, Bases, and pH Calculations

### 1. Autoionization of Water and $K_w$
Pure water undergoes self-ionization to a tiny extent:
$$2\\text{H}_2\\text{O}(l) \\rightleftharpoons \\text{H}_3\\text{O}^+(aq) + \\text{OH}^-(aq)$$

The equilibrium constant is the **ion-product constant for water ($K_w$)**:
$$K_w = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 1.0 \\times 10^{-14} \\quad (\\text{at } 25^\\circ\\text{C})$$

Taking negative logarithms:
$$\\text{pH} + \\text{pOH} = \\text{pK}_w = 14.00 \\quad (\\text{at } 25^\\circ\\text{C})$$

---

### 2. Weak Acid Ionization Constant ($K_a$)
For a monoprotic weak acid $\\text{HA}$ in aqueous solution:
$$\\text{HA}(aq) + \\text{H}_2\\text{O}(l) \\rightleftharpoons \\text{H}_3\\text{O}^+(aq) + \\text{A}^-(aq)$$
$$K_a = \\frac{[\\text{H}_3\\text{O}^+][\\text{A}^-]}{[\\text{HA}]}$$

* **Acid Strength Indicator:** The higher the $K_a$ value (or the lower the $\\text{pK}_a = -\\log K_a$), the stronger the weak acid.
* For conjugate acid-base pairs:
  $$K_a \\cdot K_b = K_w = 1.0 \\times 10^{-14} \\implies \\text{pK}_a + \\text{pK}_b = 14.00$$
`,
    bodyAm: '',
  },

  'les-chem-103': {
    id: 'les-chem-103',
    topicId: 'chem-ch1',
    subjectSlug: 'chemistry',
    subjectTitleEn: 'Chemistry',
    subjectTitleAm: 'Chemistry',
    chapterTitleEn: 'Unit 1: Acid-Base Equilibria',
    chapterTitleAm: 'Unit 1: Acid-Base Equilibria',
    lessonNumber: '1.3',
    titleEn: 'The Common Ion Effect and Buffer Solutions',
    titleAm: 'The Common Ion Effect and Buffer Solutions',
    estimatedMinutes: 15,
    accessTier: 'premium',
    hasAmharic: false,
    prevLessonId: 'les-chem-102',
    nextLessonId: 'les-bio-102',
    bodyEn: `
# The Common Ion Effect and Buffer Solutions

### 1. The Common Ion Effect
According to **Le Chatelier’s principle**, the shift in equilibrium caused by the addition of a compound having an ion in common with the dissolved substance is called the **common ion effect**.

Adding sodium acetate ($\\text{CH}_3\\text{COONa}$) to acetic acid ($\\text{CH}_3\\text{COOH}$):
$$\\text{CH}_3\\text{COOH}(aq) \\rightleftharpoons \\text{H}^+(aq) + \\text{CH}_3\\text{COO}^-(aq)$$
The added $\\text{CH}_3\\text{COO}^-$ drives the reaction to the **left**, suppressing ionization and increasing the $\\text{pH}$.

---

### 2. Buffer Solutions
A buffer solution resists changes in $\\text{pH}$ upon the addition of small amounts of strong acid or base.

#### Composition:
1. **Acidic Buffer:** Weak acid + its conjugate salt (e.g., $\\text{CH}_3\\text{COOH} / \\text{CH}_3\\text{COONa}$).
2. **Basic Buffer:** Weak base + its conjugate salt (e.g., $\\text{NH}_3 / \\text{NH}_4\\text{Cl}$).

#### The Henderson-Hasselbalch Equation
$$\\text{pH} = \\text{pK}_a + \\log\\left(\\frac{[\\text{Conjugate Base}]}{[\\text{Weak Acid}]}\\right) = \\text{pK}_a + \\log\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right)$$
`,
    bodyAm: '',
  },

  // ==========================================
  // BIOLOGY LESSONS
  // ==========================================
  'les-bio-102': {
    id: 'les-bio-102',
    topicId: 'bio-ch1',
    subjectSlug: 'biology',
    subjectTitleEn: 'Biology',
    subjectTitleAm: 'Biology',
    chapterTitleEn: 'Unit 1: Application of Biology',
    chapterTitleAm: 'Unit 1: Application of Biology',
    lessonNumber: '1.2',
    titleEn: 'Genetic Engineering and Recombinant DNA Technology',
    titleAm: 'Genetic Engineering and Recombinant DNA Technology',
    estimatedMinutes: 15,
    accessTier: 'premium',
    hasAmharic: false,
    prevLessonId: 'les-chem-103',
    nextLessonId: 'les-bio-301',
    bodyEn: `
# Genetic Engineering and Recombinant DNA Technology

Genetic engineering involves the direct manipulation of an organism's genes using biotechnology to modify characteristics or produce biological products.

---

### Core Molecular Tools in Recombinant DNA

1. **Restriction Endonucleases (Molecular Scissors):**
   * Bacterial enzymes that cut double-stranded DNA at specific palindromic recognition sequences (e.g., EcoRI cuts at $5'-\\text{GAATTC}-3'$).
   * Often produce complementary single-stranded overhanging **sticky ends**.

2. **DNA Ligase (Molecular Glue):**
   * Catalyzes the formation of phosphodiester bonds to covalently seal recombinant DNA fragments.

3. **Cloning Vectors (Plasmids and Bacteriophages):**
   * Small, circular extrachromosomal bacterial DNA molecules capable of autonomous replication that carry foreign genes into host bacteria.

4. **Polymerase Chain Reaction (PCR):**
   * In vitro amplification of targeted DNA segments across three cycling steps:
     1. **Denaturation** ($94-96^\circ\text{C}$): Separates double-stranded DNA.
     2. **Annealing** ($50-65^\circ\text{C}$): Primers bind to complementary sequences.
     3. **Extension** ($72^\circ\text{C}$): Taq DNA polymerase synthesizes new strands.

---

### Real-World Applications in Ethiopia

* **Genetically Modified Crops (Bt-Cotton):** Expresses Bacillus thuringiensis endotoxin gene for insect pest resistance.
* **Biopharmaceutical Production:** Recombinant human insulin (humulin) synthesis in *E. coli*.
`,
    bodyAm: '',
  },

  'les-bio-301': {
    id: 'les-bio-301',
    topicId: 'bio-ch3',
    subjectSlug: 'biology',
    subjectTitleEn: 'Biology',
    subjectTitleAm: 'Biology',
    chapterTitleEn: 'Unit 3: Energy Transformation',
    chapterTitleAm: 'Unit 3: Energy Transformation',
    lessonNumber: '3.1',
    titleEn: 'Photosynthesis: Light Reactions and Calvin Cycle',
    titleAm: 'Photosynthesis: Light Reactions and Calvin Cycle',
    estimatedMinutes: 16,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-bio-102',
    nextLessonId: 'les-econ-101',
    bodyEn: `
# Photosynthesis: Light Reactions and Calvin Cycle

Photosynthesis converts solar radiant energy into chemical energy stored in glucose bonds:
$$6\text{CO}_2 + 6\text{H}_2\text{O} \\xrightarrow{\text{light, chlorophyll}} \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{O}_2$$

---

### Phase 1: Light-Dependent Reactions (Thylakoid Membranes)

1. **Photolysis of Water:**
   $$2\text{H}_2\text{O} \rightarrow 4\text{H}^+ + 4e^- + \text{O}_2 \\uparrow$$
2. **Electron Transport & Photophosphorylation:**
   * Light excitation of chlorophyll in Photosystem II (P680) and Photosystem I (P700).
   * Generates a proton gradient across thylakoid lumen driving ATP synthase (Chemiosmosis).
   * Reduces $\text{NADP}^+$ to $\text{NADPH}$.
   * **Products:** $\text{ATP}$, $\text{NADPH}$, and $\text{O}_2$ byproduct.

---

### Phase 2: Light-Independent Reactions / Calvin Cycle (Stroma)

1. **Carbon Fixation:**
   * $\text{CO}_2$ combines with 5-carbon ribulose bisphosphate (RuBP) catalyzed by the enzyme **RuBisCO** to form 3-phosphoglycerate (3-PGA).
2. **Reduction:**
   * ATP and NADPH reduce 3-PGA to glyceraldehyde 3-phosphate (G3P).
3. **Regeneration of RuBP:**
   * For every 6 turns of the cycle, 2 net G3P molecules exit to form 1 molecule of glucose ($\text{C}_6\text{H}_{12}\text{O}_6$).
`,
    bodyAm: '',
  },

  // ==========================================
  // ECONOMICS LESSONS
  // ==========================================
  'les-econ-101': {
    id: 'les-econ-101',
    topicId: 'econ-ch1',
    subjectSlug: 'economics',
    subjectTitleEn: 'Economics',
    subjectTitleAm: 'Economics',
    chapterTitleEn: 'Unit 1: Fundamental Concepts of Macroeconomics',
    chapterTitleAm: 'Unit 1: Fundamental Concepts of Macroeconomics',
    lessonNumber: '1.1',
    titleEn: 'Macroeconomic Goals, Inflation, and Business Cycles',
    titleAm: 'Macroeconomic Goals, Inflation, and Business Cycles',
    estimatedMinutes: 14,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-bio-301',
    nextLessonId: 'les-econ-401',
    bodyEn: `
# Macroeconomic Goals, Inflation, and Business Cycles

Macroeconomics studies the aggregate behavior, structure, and decision-making of an entire national economy.

---

### Primary Macroeconomic Objectives

1. **Rapid and Sustainable Economic Growth:** Measured by percentage increase in Real Gross Domestic Product (Real GDP).
2. **Full Employment:** Reducing cyclical unemployment near natural rate of unemployment.
3. **Price Stability:** Containing high inflation rates.
4. **Balance of Payments Equilibrium:** Stable foreign currency reserves and trade balance.

---

### National Income Accounting: The Expenditure Approach

$$\text{GDP} = C + I + G + (X - M)$$
* $C$ = Household consumption expenditure
* $I$ = Gross private domestic investment
* $G$ = Government purchases of goods and services
* $X - M$ = Net exports (Exports minus Imports)

---

### Measuring Inflation

* **Consumer Price Index (CPI):**
  $$\text{CPI}_t = \frac{\text{Cost of Market Basket in Current Year } t}{\text{Cost of Market Basket in Base Year}} \times 100$$
* **Annual Inflation Rate ($\pi$):**
  $$\pi = \frac{\text{CPI}_t - \text{CPI}_{t-1}}{\text{CPI}_{t-1}} \times 100\%$$
* **Types of Inflation:**
  * **Demand-Pull:** Aggregate demand exceeds aggregate supply ($AD > AS$).
  * **Cost-Push:** Rising supply costs (oil, wages, imported goods) shift AS inward.
`,
    bodyAm: '',
  },

  'les-econ-401': {
    id: 'les-econ-401',
    topicId: 'econ-ch4',
    subjectSlug: 'economics',
    subjectTitleEn: 'Economics',
    subjectTitleAm: 'Economics',
    chapterTitleEn: 'Unit 4: Macroeconomic Policy Instruments',
    chapterTitleAm: 'Unit 4: Macroeconomic Policy Instruments',
    lessonNumber: '4.1',
    titleEn: 'Fiscal and Monetary Policy Transmission Mechanisms',
    titleAm: 'Fiscal and Monetary Policy Transmission Mechanisms',
    estimatedMinutes: 16,
    accessTier: 'premium',
    hasAmharic: false,
    prevLessonId: 'les-econ-101',
    nextLessonId: 'les-hist-301',
    bodyEn: `
# Fiscal and Monetary Policy Transmission Mechanisms

Governments and central banks deploy macroeconomic policy instruments to stabilize business cycle fluctuations.

---

### 1. Fiscal Policy (Conducted by Ministry of Finance)

Utilizes government spending ($G$) and taxation ($T$):
* **Expansionary Fiscal Policy:**
  * To combat recession and high unemployment.
  * Increase government spending ($\Delta G > 0$) or reduce taxes ($\Delta T < 0$).
  * **Government Spending Multiplier:**
    $$k_G = \frac{1}{1 - \text{MPC}} = \frac{1}{\text{MPS}}$$
    *(where $\text{MPC} + \text{MPS} = 1$)*

* **Contractionary Fiscal Policy:**
  * To combat high demand-pull inflation.
  * Reduce $G$ or raise $T$.

---

### 2. Monetary Policy (Conducted by National Bank of Ethiopia)

Regulates money supply ($M_s$) and credit conditions:
* **Tools of Monetary Policy:**
  1. **Legal Reserve Requirement Ratio ($r$):** The minimum fraction of deposits commercial banks must keep in vault/central bank.
     $$\text{Money Multiplier } m = \frac{1}{r}$$
  2. **Open Market Operations (OMO):** Buying or selling government treasury bills. Buying bonds expands money supply.
  3. **Discount / Policy Interest Rate:** The interest rate charged to commercial banks borrowing from the central bank.
`,
    bodyAm: '',
  },

  // ==========================================
  // HISTORY LESSONS
  // ==========================================
  'les-hist-301': {
    id: 'les-hist-301',
    topicId: 'hist-ch3',
    subjectSlug: 'history',
    subjectTitleEn: 'History',
    subjectTitleAm: 'History',
    chapterTitleEn: 'Unit 3: Developments in Ethiopia (Mid-19th C. to 1941)',
    chapterTitleAm: 'Unit 3: Developments in Ethiopia (Mid-19th C. to 1941)',
    lessonNumber: '3.1',
    titleEn: 'State Centralization, the Battle of Adwa, and Anti-Fascist Resistance',
    titleAm: 'State Centralization, the Battle of Adwa, and Anti-Fascist Resistance',
    estimatedMinutes: 16,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-econ-401',
    nextLessonId: 'les-geo-101',
    bodyEn: `
# State Centralization, the Battle of Adwa, and Anti-Fascist Resistance

The mid-nineteenth century inaugurated modern Ethiopian state-building and sovereignty defense against European imperialist incursions.

---

### 1. State Centralization Pioneers

* **Emperor Tewodros II (1855–1868):** Ended the divisive Zemene Mesafint (Era of the Princes), initiated administrative centralization, military modernization, and social reforms.
* **Emperor Yohannes IV (1872–1889):** Defended territorial integrity against Egyptian expansionism (Gundet 1875, Gura 1876), Italian aggression (Dogali 1887), and Mahdist forces (Metemma 1889).
* **Emperor Menelik II (1889–1913):** Consolidated southern and eastern territories, modernized infrastructure (Ethio-Djibouti railway, telegraph, telephone), and commanded national defense at Adwa.

---

### 2. The Battle of Adwa (March 1, 1896)

* **Root Cause: Article XVII of the Treaty of Wuchale (1889)**
  * The Amharic version stated Ethiopia *could* choose to use Italy’s diplomatic good offices in foreign affairs.
  * The Italian version deceitfully stated Ethiopia *must* conduct all external relations through Rome, attempting to impose an Italian protectorate.
* **The Climax:** Menelik II issued a nationwide mobilization proclamation. On March 1, 1896 (Yekatit 23), Ethiopian patriotic forces routed the invading Italian army led by General Oreste Baratieri at Adwa.
* **Significance:** Guaranteed Ethiopian independence, forced Italy to sign the 1896 Treaty of Addis Ababa unconditionally recognizing sovereignty, and inspired Pan-African anti-colonial struggles worldwide.
`,
    bodyAm: '',
  },

  // ==========================================
  // GEOGRAPHY LESSONS
  // ==========================================
  'les-geo-101': {
    id: 'les-geo-101',
    topicId: 'geo-ch1',
    subjectSlug: 'geography',
    subjectTitleEn: 'Geography',
    subjectTitleAm: 'Geography',
    chapterTitleEn: 'Unit 1: Major Geological Processes and Plate Tectonics',
    chapterTitleAm: 'Unit 1: Major Geological Processes and Plate Tectonics',
    lessonNumber: '1.1',
    titleEn: 'Plate Tectonics Theory and Ethiopian Rift Valley Formation',
    titleAm: 'Plate Tectonics Theory and Ethiopian Rift Valley Formation',
    estimatedMinutes: 14,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-hist-301',
    nextLessonId: 'les-it-301',
    bodyEn: `
# Plate Tectonics Theory and Ethiopian Rift Valley Formation

Plate tectonics explains large-scale lithospheric plate motions driven by thermal convection currents in the underlying semi-fluid asthenosphere.

---

### Types of Tectonic Plate Boundaries

1. **Divergent Boundaries (Constructive):** Plates pull apart, magma wells up creating new crust (e.g., Mid-Atlantic Ridge, East African Rift System).
2. **Convergent Boundaries (Destructive):** Plates collide. Subduction produces ocean trenches and volcanic arcs; continental collisions produce fold mountain ranges (e.g., Himalayas).
3. **Transform Boundaries (Conservative):** Plates slide horizontally past one another without creating or destroying crust (e.g., San Andreas Fault).

---

### Evolution of the Ethiopian Rift Valley

* Part of the great **East African Rift System (EARS)**, the world's most dramatic active continental rift.
* **The Afar Triple Junction (Afar Triangle):** Meeting point of three tectonic plates pulling apart:
  1. The African (Nubian) Plate
  2. The Somali Plate
  3. The Arabian Plate
* Forms three divergent rift arms: The Red Sea Rift, the Gulf of Aden Rift, and the Main Ethiopian Rift (MER).
* Responsible for active volcanism (Erta Ale permanent lava lake) and shallow earthquake focal mechanisms.
`,
    bodyAm: '',
  },

  // ==========================================
  // INFORMATION TECHNOLOGY LESSONS
  // ==========================================
  'les-it-301': {
    id: 'les-it-301',
    topicId: 'it-ch3',
    subjectSlug: 'information-technology',
    subjectTitleEn: 'Information Technology',
    subjectTitleAm: 'Information Technology',
    chapterTitleEn: 'Unit 3: Database Management System (DBMS & SQL)',
    chapterTitleAm: 'Unit 3: Database Management System (DBMS & SQL)',
    lessonNumber: '3.1',
    titleEn: 'Relational Databases and SQL Queries (DDL & DML)',
    titleAm: 'Relational Databases and SQL Queries (DDL & DML)',
    estimatedMinutes: 16,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-geo-101',
    nextLessonId: 'les-agri-101',
    bodyEn: `
# Relational Databases and SQL Queries (DDL & DML)

A **Relational Database Management System (RDBMS)** organizes data into structured tables (relations) consisting of rows (tuples/records) and columns (attributes/fields).

---

### 1. Key Database Constraints
* **Primary Key (PK):** An attribute or composite set of attributes that uniquely identifies each tuple; cannot be NULL.
* **Foreign Key (FK):** An attribute in one table that references the primary key of another table, enforcing referential integrity.

---

### 2. SQL Language Subsets

#### Data Definition Language (DDL)
Defines and alters database schema:
\`\`\`sql
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 15),
    Stream VARCHAR(30)
);

ALTER TABLE Students ADD COLUMN Email VARCHAR(120);
DROP TABLE TempData;
\`\`\`

#### Data Manipulation Language (DML)
Manipulates table data instances:
\`\`\`sql
-- Inserting records
INSERT INTO Students (StudentID, FullName, Age, Stream)
VALUES (101, 'Abebe Kebede', 18, 'Natural Science');

-- Updating records
UPDATE Students SET Stream = 'Social Science' WHERE StudentID = 101;

-- Deleting records
DELETE FROM Students WHERE StudentID = 101;
\`\`\`

#### Data Query Language (DQL - SELECT Command)
\`\`\`sql
SELECT FullName, Stream FROM Students
WHERE Age >= 18
ORDER BY FullName ASC;
\`\`\`
`,
    bodyAm: '',
  },

  // ==========================================
  // AGRICULTURE LESSONS
  // ==========================================
  'les-agri-101': {
    id: 'les-agri-101',
    topicId: 'agri-ch1',
    subjectSlug: 'agriculture',
    subjectTitleEn: 'Agriculture',
    subjectTitleAm: 'Agriculture',
    chapterTitleEn: 'Unit 1: Horticultural Crops Production & Management',
    chapterTitleAm: 'Unit 1: Horticultural Crops Production & Management',
    lessonNumber: '1.1',
    titleEn: 'Vegetable and Fruit Crop Propagation and Nursery Operations',
    titleAm: 'Vegetable and Fruit Crop Propagation and Nursery Operations',
    estimatedMinutes: 14,
    accessTier: 'free',
    hasAmharic: false,
    prevLessonId: 'les-it-301',
    nextLessonId: undefined,
    bodyEn: `
# Vegetable and Fruit Crop Propagation and Nursery Operations

Horticultural production plays a central role in Ethiopian food security, household nutrition, and agro-processing exports.

---

### 1. Plant Propagation Methods

1. **Sexual Propagation (Seeds):**
   * Uses seeds resulting from pollination and fertilization.
   * Promotes genetic variability and disease transmission reduction; common in tomato, cabbage, onion, and pepper crops.

2. **Asexual / Vegetative Propagation:**
   * Utilizes vegetative plant organs (stems, roots, leaves, buds).
   * Produces true-to-type clones identical to the mother plant, shortens time to fruiting, and combines desirable root traits:
     * **Grafting (Scion + Rootstock):** Common in avocado and mango production.
     * **Budding (T-budding):** Widely utilized in citrus propagation.
     * **Cuttings & Layering:** Utilized in coffee, tea, and grape vines.
     * **Division of Tubers / Corms:** Used in potato and enset (*Ensete ventricosum*).

---

### 2. Nursery Management Practices

* **Soil Media Mixture:** Standard 2:1:1 volumetric ratio of topsoil, well-decomposed compost/manure, and fine sand.
* **Seedbed Sterilization:** Solarization or light burning to eliminate soil-borne fungal pathogens (*damping-off* caused by *Pythium*) and weed seeds.
* **Hardening Off:** Gradual reduction of watering and shade 1–2 weeks prior to field transplanting to reduce transplanting shock.
`,
    bodyAm: '',
  },
};
