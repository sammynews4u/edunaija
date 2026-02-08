
import { Subject, DepartmentType, TrackType, ExamType, SubscriptionTier } from './types';

export const EXAM_YEARS = Array.from({ length: 35 }, (_, i) => 2025 - i);

export const PLATFORM_FEATURES = [
  { title: "Live Textbooks", desc: "AI-powered digital textbooks with 5,000+ granular chapters.", icon: "BookOpen" },
  { title: "10 Million Questions", desc: "A massive library covering WAEC, JAMB, and NECO.", icon: "Database" },
  { title: "Digital Notepad", desc: "Auto-saving notes synced to your profile.", icon: "Layers" },
  { title: "AI Tutor", desc: "Instant step-by-step logic for complex problems.", icon: "BrainCircuit" }
];

export const PLATFORM_BENEFITS = [
  { title: "Syllabus Mastery", desc: "100% alignment with official NERDC 2025 curriculum directives.", icon: "Target" },
  { title: "AI Logic Proofs", desc: "Instant step-by-step reasoning for every math and science problem.", icon: "Sparkles" },
  { title: "CBT Speed Engine", desc: "Timed simulation that mirrors the exact JAMB & WAEC hall software.", icon: "Zap" },
  { title: "Offline Study Sync", desc: "Read and practice anywhere. Chapters are cached locally for zero-data use.", icon: "ShieldCheck" },
  { title: "Deep Analytics", desc: "Real-time mastery tracking per subject and topic to find your weak spots.", icon: "BarChart3" },
  { title: "Multi-Board Archive", desc: "JAMB, WAEC, and NECO papers organized in one unified digital library.", icon: "Database" },
  { title: "University Match", desc: "Get real-time score requirements for your dream institution and course.", icon: "GraduationCap" },
  { title: "Digital Notetaking", desc: "Write, edit, and auto-save keys points directly inside your digital textbooks.", icon: "Layers" },
  { title: "Parental Oversight", desc: "Transparent progress reports for parents to monitor academic growth.", icon: "Activity" }
];

export const EDUCATIONAL_FACTS = [
  "The University of Ibadan was founded in 1948 as Nigeria's first degree-awarding institution.",
  "Nigeria has over 170 recognized universities across Federal, State, and Private sectors.",
  "Wole Soyinka was the first Nigerian and African to win the Nobel Prize in Literature.",
  "The Obafemi Awolowo University (OAU) has the most beautiful campus in West Africa.",
  "JAMB was established in 1978 to harmonize admissions into Nigerian universities.",
  "The first secondary school in Nigeria was CMS Grammar School, Lagos, founded in 1859.",
  "WAEC was established in 1952 across 5 West African countries.",
  "Nigeria produces the highest number of PhD holders in Africa annually."
];

export const COMPETITIONS = [
  { name: "Cowbellpedia Math Competition", winner: "Oghenerukevwe Patrick", year: "2023", city: "Ogun" },
  { name: "National Spelling Bee Nigeria", winner: "Favour Oluchi", year: "2024", city: "Anambra" },
  { name: "Interswitch SPAK Science Contest", winner: "Oreofe Daniel", year: "2023", city: "Lagos" },
  { name: "MTN MPULSE Spelling Bee", winner: "Snow George", year: "2024", city: "Rivers" },
  { name: "Shell NNPC Science Quiz", winner: "Musa Abubakar", year: "2023", city: "Kano" },
  { name: "UBA Foundation Essay Competition", winner: "Gift Onuoha", year: "2024", city: "Abia" }
];

export const PRICING_PLANS = [
  {
    tier: SubscriptionTier.MONTHLY,
    price: "₦2,500",
    period: "Per Month",
    trial: "3-Day Free Trial",
    features: ["10M+ Questions", "AI Explanations", "Offline Reading", "Progress Tracking"],
    cta: "Select Monthly",
    highlight: false
  },
  {
    tier: SubscriptionTier.QUARTERLY,
    price: "₦6,500",
    period: "3 Months",
    trial: "3-Day Free Trial",
    features: ["Everything in Monthly", "Priority Support", "Exam Simulations", "PDF Downloads"],
    cta: "Select Quarterly",
    highlight: true
  },
  {
    tier: SubscriptionTier.SEMI_ANNUAL,
    price: "₦12,000",
    period: "6 Months",
    trial: "3-Day Free Trial",
    features: ["Everything in Quarterly", "Parent Dashboard", "Scholar Communities", "Live Webinars"],
    cta: "Select 6-Month",
    highlight: false
  },
  {
    tier: SubscriptionTier.ANNUAL,
    price: "₦20,000",
    period: "12 Months",
    trial: "3-Day Free Trial",
    features: ["Best Value", "Lifetime Archive Access", "Physical Study Guide", "University Entry Bonus"],
    cta: "Select Yearly",
    highlight: false
  }
];

export const FAQS = [
  { q: "Is EduNaija Prep free to use?", a: "We offer a 3-day free trial on all plans so you can experience the full platform before subscribing." },
  { q: "Do you have offline access?", a: "Yes, once you load a textbook chapter, it is saved to your local storage for offline reading." },
  { q: "Are the questions real past questions?", a: "Yes, we have indexed real past questions from the last 25 years and verified them with educators." },
  { q: "What devices are supported?", a: "EduNaija Prep is fully responsive and works on all modern smartphones, tablets, and computers." }
];

export const SYLLABUS_TOPICS: Record<string, string[]> = {
  eng: [
    "Parts of Speech: Nouns and Pronouns", "Verbs: Tenses and Concord", "Adjectives and Adverbs", "Prepositions and Conjunctions",
    "Sentences: Simple, Compound, Complex", "Clauses and Phrases", "Punctuation Marks", "Spelling Rules and Common Errors",
    "Vocabulary Development: Synonyms", "Antonyms and Homonyms", "Idiomatic Expressions", "Figures of Speech",
    "Reading Comprehension Strategies", "Summary Writing: Main Ideas", "Narrative Essay Writing", "Descriptive Essay Writing",
    "Argumentative Essay Writing", "Expository Essay Writing", "Formal Letter Writing", "Informal Letter Writing",
    "Speech Writing Techniques", "Creative Writing: Elements of Plot", "Oral English: Vowels and Consonants", "Syllables and Stress",
    "Intonation Patterns", "Public Speaking Skills", "Literary Appreciation"
  ],
  math: [
    "Number Bases: Conversion and Arithmetic", "Fractions, Decimals, and Percentages", "Ratios and Proportions", "Indices and Laws of Indices",
    "Logarithms: Common and Natural", "Surds: Simplification and Rationalization", "Sets: Unions and Intersections", "Venn Diagrams",
    "Sequence and Series: AP", "Sequence and Series: GP", "Algebraic Expressions: Factoring", "Linear Equations: One Variable",
    "Simultaneous Equations", "Quadratic Equations: Factoring", "Quadratic Formula and Completing the Square", "Linear Inequalities",
    "Quadratic Inequalities", "Variation: Direct and Inverse", "Joint and Partial Variation", "Trigonometry: SOHCAHTOA",
    "Sine and Cosine Rules", "Circle Geometry: Theorems", "Coordinate Geometry: Lines", "Intro to Calculus: Differentiation",
    "Intro to Calculus: Integration", "Statistics: Mean, Median, Mode", "Probability: Single and Combined Events", "Vectors and Matrices"
  ],
  phy: [
    "Introduction to Physics", "Measurement and Units", "Scalars and Vectors", "Motion: Displacement and Velocity",
    "Acceleration and Equations of Motion", "Projectiles", "Newton's Laws of Motion", "Work, Energy, and Power",
    "Conservation of Energy", "Circular Motion", "Simple Harmonic Motion", "Gravitational Field",
    "Elastic Properties of Solids", "Pressure in Fluids", "Heat and Temperature", "Gas Laws: Boyle and Charles",
    "Thermal Expansion", "Change of State and Latent Heat", "Vibrations and Waves", "Light: Reflection and Mirrors",
    "Refraction and Lenses", "Optical Instruments", "Sound Waves: Speed and Intensity", "Static Electricity",
    "Current Electricity: Ohm's Law", "Electric Power and Energy", "Magnetism and Magnetic Fields", "Atomic Physics",
    "Radioactivity and Half-life", "Energy Quantization"
  ],
  chm: [
    "Introduction to Chemistry", "States of Matter", "Atomic Structure", "Electronic Configuration",
    "Periodic Table Trends", "Chemical Bonding: Ionic/Covalent", "Stoichiometry: The Mole", "Gas Laws and Kinetic Theory",
    "Chemical Reactions: Types", "Energy Changes in Reactions", "Rates of Chemical Reactions", "Chemical Equilibrium",
    "Acids, Bases, and pH", "Salts and Titration", "Redox Reactions", "Electrolysis",
    "Hydrocarbons: Alkanes/Alkenes", "Alkanes and Alkenes Properties", "Alkanols and Alkanoic Acids", "Polymers and Plastics",
    "Environmental Chemistry: Pollution", "Metals and Extraction", "Non-metals: Nitrogen and Sulfur", "Industrial Chemistry"
  ],
  bio: [
    "Characteristics of Living Things", "Cell Structure and Function", "Levels of Organization", "Classification of Organisms",
    "Nutrition: Autotrophic/Heterotrophic", "Human Digestive System", "Transport System in Plants", "Circulatory System in Humans",
    "Respiration: Aerobic/Anaerobic", "Excretory Systems", "Support and Movement: Skeleton", "Nervous Coordination",
    "Endocrine System", "Reproduction: Asexual/Sexual", "Growth and Development", "Genetics: Mendelian Laws",
    "DNA and Protein Synthesis", "Evolution and Adaptation", "Ecology: Habitats and Biomes", "Food Chains and Webs",
    "Conservation of Natural Resources", "Disease and Health"
  ],
  eco: [
    "Basic Economic Problems", "Demand and Supply Theory", "Elasticity of Demand/Supply", "Consumer Behavior",
    "Factors of Production", "Division of Labour", "Business Organizations", "Market Structures",
    "Price Determination", "National Income Accounting", "Money and Banking", "Central Bank of Nigeria",
    "Public Finance: Budgets", "Taxation Principles", "Inflation and Deflation", "International Trade",
    "Balance of Payments", "Economic Development Planning", "Agriculture in Nigeria", "Industrialization",
    "Population and Human Resources"
  ],
  lit: [
    "Introduction to Drama", "Elements of Tragedy", "Comedy and Satire", "African Drama Analysis",
    "Non-African Drama Analysis", "Poetic Devices and Techniques", "African Poetry: Themes", "Non-African Poetry: Themes",
    "The Novel: Plot and Character", "African Prose Analysis", "Non-African Prose Analysis", "Literary Criticism History"
  ]
};

export const SUBJECTS: Subject[] = [
  { id: 'eng', name: 'English Language', departments: [DepartmentType.SCIENCE, DepartmentType.ART, DepartmentType.COMMERCIAL], isCompulsory: true },
  { id: 'math', name: 'Mathematics', departments: [DepartmentType.SCIENCE, DepartmentType.ART, DepartmentType.COMMERCIAL], isCompulsory: true },
  { id: 'phy', name: 'Physics', departments: [DepartmentType.SCIENCE], isCompulsory: false },
  { id: 'chm', name: 'Chemistry', departments: [DepartmentType.SCIENCE], isCompulsory: false },
  { id: 'bio', name: 'Biology', departments: [DepartmentType.SCIENCE, DepartmentType.ART], isCompulsory: false },
  { id: 'eco', name: 'Economics', departments: [DepartmentType.COMMERCIAL, DepartmentType.ART, DepartmentType.SCIENCE], isCompulsory: false },
  { id: 'lit', name: 'Literature', departments: [DepartmentType.ART], isCompulsory: false }
];

export const DEPARTMENT_DEFAULTS: Record<DepartmentType, string[]> = {
  [DepartmentType.SCIENCE]: ['eng', 'math', 'phy', 'chm', 'bio'],
  [DepartmentType.ART]: ['eng', 'math', 'lit', 'eco'],
  [DepartmentType.COMMERCIAL]: ['eng', 'math', 'eco'],
};

export const TOPIC_METADATA: Record<string, { keyConcepts: string[], relatedAreas: string[] }> = {
  "Number Bases": { keyConcepts: ["Binary", "Denary", "Conversion"], relatedAreas: ["Computer Science"] }
};
