import { ResumeSkill, JDSkill, DemoPersona } from './types';

// ===== PRE-COMPUTED DEMO PERSONAS =====
// Each persona contains COMPLETE final output — loads instantly with zero API calls

export const DEMO_PERSONAS: DemoPersona[] = [
  // ===== PERSONA 2 — PRIYA (shown FIRST — the wow moment) =====
  {
    id: 'priya',
    name: 'Priya Sharma',
    icon: '🏥',
    label: 'Healthcare Role',
    tag: 'Staff Nurse → Hospital Administrator',
    accentColor: '#10B981',
    badge: '⭐ Most Surprising',
    resume_summary: '8 years staff nurse, patient care, clinical documentation, basic computer skills, no admin or management experience',
    target_role: 'Hospital Administrator',
    candidate_skills: [
      { skill: 'Patient Care', proficiency: 5, evidence: '8 years clinical nursing' },
      { skill: 'Clinical Documentation', proficiency: 4, evidence: 'EMR systems daily' },
      { skill: 'Medical Terminology', proficiency: 5, evidence: '8 years nursing' },
      { skill: 'Basic Computer Skills', proficiency: 2, evidence: 'EMR and email only' },
    ],
    jd_requirements: [
      { skill: 'Healthcare Administration', required_level: 4, importance: 0.95 },
      { skill: 'HIPAA Compliance', required_level: 4, importance: 0.90 },
      { skill: 'Hospital Budgeting', required_level: 3, importance: 0.85 },
      { skill: 'HR Management', required_level: 3, importance: 0.80 },
      { skill: 'Leadership', required_level: 4, importance: 0.85 },
      { skill: 'Data Analytics', required_level: 2, importance: 0.65 },
    ],
    pre_computed_gaps: [
      { skill: 'Healthcare Administration', status: 'MISSING', gap: 4, priority_score: 3.80, current: 0, required: 4, importance: 0.95 },
      { skill: 'HIPAA Compliance', status: 'MISSING', gap: 4, priority_score: 3.60, current: 0, required: 4, importance: 0.90 },
      { skill: 'Hospital Budgeting', status: 'MISSING', gap: 3, priority_score: 2.55, current: 0, required: 3, importance: 0.85 },
      { skill: 'HR Management', status: 'MISSING', gap: 3, priority_score: 2.40, current: 0, required: 3, importance: 0.80 },
      { skill: 'Leadership', status: 'PARTIAL', gap: 2, priority_score: 1.70, current: 2, required: 4, importance: 0.85 },
      { skill: 'Data Analytics', status: 'MISSING', gap: 2, priority_score: 1.30, current: 0, required: 2, importance: 0.65 },
    ],
    match_percentage: 18,
    time_saved_weeks: 1.8,
    pre_computed_path: [
      'Healthcare Administration Basics', 'HIPAA Compliance Certification',
      'Hospital Budgeting & Finance', 'HR Management Fundamentals',
      'Leadership in Healthcare', 'Data Analytics for Healthcare Managers',
    ],
    reasoning_traces: [
      {
        skill: 'Healthcare Administration Basics',
        why: 'You have deep clinical expertise but zero administrative experience. This is the mandatory foundation — all other modules build on it.',
        priority_rank: 1,
        estimated_hours: 15,
        unlocks: 'HIPAA Compliance, Hospital Budgeting',
      },
      {
        skill: 'HIPAA Compliance Certification',
        why: 'HIPAA is legally mandatory for any healthcare administrator (required 4/5). Your nursing background gives you awareness but not the administrative compliance depth the role demands.',
        priority_rank: 2,
        estimated_hours: 8,
        unlocks: 'HR Management',
      },
      {
        skill: 'Hospital Budgeting & Finance',
        why: 'Budget management is a core administrator responsibility not covered in clinical training. The JD lists financial oversight as a primary duty.',
        priority_rank: 3,
        estimated_hours: 12,
        unlocks: 'Data Analytics for Healthcare Managers',
      },
      {
        skill: 'HR Management Fundamentals',
        why: 'As administrator you will manage nursing staff — a role reversal from your current position. HR compliance, hiring, and performance management are mandatory (3/5 required).',
        priority_rank: 3,
        estimated_hours: 10,
        unlocks: 'Leadership in Healthcare',
      },
      {
        skill: 'Leadership in Healthcare',
        why: 'Your clinical leadership is informal (2/5) but the role requires structured organisational leadership (4/5). This bridges your natural authority into formal management frameworks.',
        priority_rank: 2,
        estimated_hours: 14,
        unlocks: 'Nothing — final leadership module',
      },
      {
        skill: 'Data Analytics for Healthcare Managers',
        why: 'Optional but valuable — hospital administrators use data to track patient outcomes and operational efficiency. Listed last as it builds on your foundational admin knowledge.',
        priority_rank: 4,
        estimated_hours: 10,
        unlocks: 'Nothing — final module',
      },
    ],
  },

  // ===== PERSONA 1 — ARJUN (Tech Role) =====
  {
    id: 'arjun',
    name: 'Arjun Kumar',
    icon: '💻',
    label: 'Tech Role',
    tag: 'Software Engineer → DevOps Engineer',
    accentColor: '#00D4FF',
    resume_summary: '5 years Python, basic Linux, no Docker or Kubernetes, backend development at a startup',
    target_role: 'DevOps Engineer',
    candidate_skills: [
      { skill: 'Python', proficiency: 4, evidence: '5 years backend development' },
      { skill: 'Linux', proficiency: 2, evidence: 'basic command line usage' },
      { skill: 'SQL', proficiency: 4, evidence: 'database work at startup' },
      { skill: 'Git', proficiency: 3, evidence: 'version control daily use' },
    ],
    jd_requirements: [
      { skill: 'Docker', required_level: 4, importance: 0.95 },
      { skill: 'Kubernetes', required_level: 4, importance: 0.95 },
      { skill: 'Linux', required_level: 4, importance: 0.85 },
      { skill: 'CI/CD', required_level: 3, importance: 0.80 },
      { skill: 'Terraform', required_level: 3, importance: 0.70 },
      { skill: 'Python', required_level: 3, importance: 0.60 },
    ],
    pre_computed_gaps: [
      { skill: 'Docker', status: 'MISSING', gap: 4, priority_score: 3.80, current: 0, required: 4, importance: 0.95 },
      { skill: 'Kubernetes', status: 'MISSING', gap: 4, priority_score: 3.80, current: 0, required: 4, importance: 0.95 },
      { skill: 'Linux', status: 'PARTIAL', gap: 2, priority_score: 1.70, current: 2, required: 4, importance: 0.85 },
      { skill: 'CI/CD', status: 'MISSING', gap: 3, priority_score: 2.40, current: 0, required: 3, importance: 0.80 },
      { skill: 'Terraform', status: 'MISSING', gap: 3, priority_score: 2.10, current: 0, required: 3, importance: 0.70 },
      { skill: 'Python', status: 'COVERED', gap: 0, priority_score: 0, current: 4, required: 3, importance: 0.60 },
    ],
    match_percentage: 34,
    time_saved_weeks: 2.4,
    pre_computed_path: [
      'Linux Advanced', 'Docker Fundamentals', 'Docker in Production',
      'CI/CD with GitHub Actions', 'Kubernetes Basics',
      'Kubernetes Advanced', 'Terraform Fundamentals',
    ],
    reasoning_traces: [
      {
        skill: 'Linux Advanced',
        why: 'Your Linux proficiency is basic (2/5) but the role requires advanced system administration (4/5). Linux is a prerequisite for Docker — you must complete this first.',
        priority_rank: 3,
        prerequisite_for: ['Docker Fundamentals'],
        estimated_hours: 10,
        unlocks: 'Docker Fundamentals',
      },
      {
        skill: 'Docker Fundamentals',
        why: 'Docker is completely missing from your resume (0/5) but is mandatory at production level (4/5). This is your highest priority gap and unlocks Kubernetes.',
        priority_rank: 1,
        prerequisite_for: ['Docker in Production', 'Kubernetes Basics'],
        estimated_hours: 8,
        unlocks: 'Docker in Production, Kubernetes Basics',
      },
      {
        skill: 'Docker in Production',
        why: 'After Docker basics you need production-grade container management. The JD specifically mentions containerised microservices deployment.',
        priority_rank: 1,
        prerequisite_for: ['Kubernetes Basics'],
        estimated_hours: 12,
        unlocks: 'Kubernetes Basics',
      },
      {
        skill: 'CI/CD with GitHub Actions',
        why: 'CI/CD is completely missing (0/5) and mandatory for the role (3/5). Can be learned in parallel with Docker — no hard prerequisite.',
        priority_rank: 2,
        prerequisite_for: [],
        estimated_hours: 10,
        unlocks: 'Terraform Fundamentals',
      },
      {
        skill: 'Kubernetes Basics',
        why: 'Kubernetes is your most critical gap alongside Docker. Cannot be started until Docker in Production is complete — your DAG algorithm enforced this order automatically.',
        priority_rank: 1,
        prerequisite_for: ['Kubernetes Advanced'],
        estimated_hours: 16,
        unlocks: 'Kubernetes Advanced',
      },
      {
        skill: 'Kubernetes Advanced',
        why: 'Role requires production-grade Kubernetes (4/5). Advanced topics like Helm, RBAC, and cluster management are explicitly listed in the JD.',
        priority_rank: 1,
        prerequisite_for: ['Terraform Fundamentals'],
        estimated_hours: 20,
        unlocks: 'Terraform Fundamentals',
      },
      {
        skill: 'Terraform Fundamentals',
        why: 'Infrastructure as Code is listed as a preferred skill (not mandatory). Added last because it requires understanding of the infrastructure you\'ll be managing.',
        priority_rank: 3,
        prerequisite_for: [],
        estimated_hours: 12,
        unlocks: 'Nothing — final module',
      },
    ],
  },

  // ===== PERSONA 3 — RAHUL (Business Role) =====
  {
    id: 'rahul',
    name: 'Rahul Mehta',
    icon: '📊',
    label: 'Business Role',
    tag: 'Marketing Executive → Product Manager',
    accentColor: '#7C3AED',
    resume_summary: '4 years marketing executive, campaign management, brand strategy, basic Google Analytics, no technical or product skills',
    target_role: 'Product Manager',
    candidate_skills: [
      { skill: 'Marketing Strategy', proficiency: 4, evidence: '4 years campaigns' },
      { skill: 'Communication', proficiency: 4, evidence: 'client presentations' },
      { skill: 'Google Analytics', proficiency: 2, evidence: 'basic dashboard usage' },
      { skill: 'Project Coordination', proficiency: 3, evidence: 'campaign timelines' },
    ],
    jd_requirements: [
      { skill: 'Product Roadmapping', required_level: 4, importance: 0.95 },
      { skill: 'Agile & Scrum', required_level: 3, importance: 0.90 },
      { skill: 'User Research', required_level: 3, importance: 0.85 },
      { skill: 'SQL for Analytics', required_level: 2, importance: 0.75 },
      { skill: 'Stakeholder Management', required_level: 4, importance: 0.85 },
      { skill: 'Data-Driven Decision Making', required_level: 3, importance: 0.80 },
    ],
    pre_computed_gaps: [
      { skill: 'Product Roadmapping', status: 'MISSING', gap: 4, priority_score: 3.80, current: 0, required: 4, importance: 0.95 },
      { skill: 'Agile & Scrum', status: 'MISSING', gap: 3, priority_score: 2.70, current: 0, required: 3, importance: 0.90 },
      { skill: 'User Research', status: 'MISSING', gap: 3, priority_score: 2.55, current: 0, required: 3, importance: 0.85 },
      { skill: 'Stakeholder Management', status: 'PARTIAL', gap: 1, priority_score: 0.85, current: 3, required: 4, importance: 0.85 },
      { skill: 'Data-Driven Decision Making', status: 'PARTIAL', gap: 1, priority_score: 0.80, current: 2, required: 3, importance: 0.80 },
      { skill: 'SQL for Analytics', status: 'MISSING', gap: 2, priority_score: 1.50, current: 0, required: 2, importance: 0.75 },
    ],
    match_percentage: 28,
    time_saved_weeks: 1.6,
    pre_computed_path: [
      'Product Thinking & Strategy', 'Agile & Scrum Fundamentals',
      'User Research Methods', 'SQL for Product Managers',
      'Stakeholder Communication', 'Data-Driven Product Decisions',
    ],
    reasoning_traces: [
      {
        skill: 'Product Thinking & Strategy',
        why: 'Product roadmapping is completely missing (0/5) and is the core skill of this role. Your marketing strategy background gives you strong business context — this module translates that into product-specific frameworks.',
        priority_rank: 1,
        estimated_hours: 12,
        unlocks: 'Agile & Scrum, User Research Methods',
      },
      {
        skill: 'Agile & Scrum Fundamentals',
        why: 'Agile is the operating system of every product team. Mandatory at 3/5. Your campaign project coordination is adjacent but does not cover sprint planning, backlog grooming, or velocity tracking.',
        priority_rank: 2,
        estimated_hours: 8,
        unlocks: 'Data-Driven Product Decisions',
      },
      {
        skill: 'User Research Methods',
        why: 'PMs live and die by user insights. This is completely missing from your marketing background — you know customers but not structured product research methodologies like Jobs-to-be-Done or usability testing.',
        priority_rank: 2,
        estimated_hours: 10,
        unlocks: 'Stakeholder Communication',
      },
      {
        skill: 'SQL for Product Managers',
        why: 'Listed as preferred (not mandatory) but critical for credibility. PMs who can pull their own data don\'t wait for analysts. Builds on your existing Google Analytics familiarity.',
        priority_rank: 3,
        estimated_hours: 14,
        unlocks: 'Data-Driven Product Decisions',
      },
      {
        skill: 'Stakeholder Communication',
        why: 'You\'re already strong here (3/5 from client presentations) but the PM role requires formal alignment across engineering, design, and executive stakeholders — a different context from marketing pitches.',
        priority_rank: 3,
        estimated_hours: 6,
        unlocks: 'Nothing — final module',
      },
      {
        skill: 'Data-Driven Product Decisions',
        why: 'Combines your improved SQL skills and analytics background into PM-specific frameworks. Placed last because it requires foundational product and data literacy from earlier modules.',
        priority_rank: 2,
        estimated_hours: 8,
        unlocks: 'Nothing — final module',
      },
    ],
  },
];

// ===== HELPER: Convert DemoPersona to AnalysisResult for instant loading =====
import { AnalysisResult, LearningModule, SkillGap } from './types';

export function personaToAnalysisResult(persona: DemoPersona): AnalysisResult {
  // Build skill gaps from pre-computed data (exclude COVERED)
  const skill_gaps: SkillGap[] = persona.pre_computed_gaps
    .filter(g => g.status !== 'COVERED')
    .map((g, i) => ({
      skill: g.skill,
      current_level: g.current / 5,
      required_level: g.required / 5,
      gap: g.gap / 5,
      importance: g.importance,
      priority_score: g.priority_score,
      rank: i + 1,
    }));

  // Build learning path from pre-computed path + reasoning traces
  const learning_path: LearningModule[] = persona.pre_computed_path.map((pathName, idx) => {
    const trace = persona.reasoning_traces.find(t => t.skill === pathName);
    const gapInfo = persona.pre_computed_gaps.find(g => g.skill === pathName);

    return {
      skill: pathName,
      course: {
        title: pathName,
        platform: 'SkillBridge Recommended',
        url: `https://www.linkedin.com/learning/search?keywords=${encodeURIComponent(pathName)}`,
        duration_hours: trace?.estimated_hours || 10,
        level: 'intermediate' as const,
      },
      gap_data: {
        skill: pathName,
        current_level: (gapInfo?.current || 0) / 5,
        required_level: (gapInfo?.required || 4) / 5,
        gap: (gapInfo?.gap || 3) / 5,
        importance: gapInfo?.importance || 0.8,
        priority_score: gapInfo?.priority_score || 2.0,
        rank: idx + 1,
      },
      reasoning: {
        skill: pathName,
        why_needed: trace?.why || 'Required for target role.',
        priority_reason: `Priority rank #${trace?.priority_rank || idx + 1} — ${trace?.why?.split('.')[0] || 'Key skill for role transition'}.`,
        prerequisites_added: trace?.prerequisite_for || [],
        estimated_time: `${trace?.estimated_hours || 10} hours`,
        unlock_note: trace?.unlocks || 'No further dependencies',
        course: {
          title: pathName,
          platform: 'SkillBridge Recommended',
          url: `https://www.linkedin.com/learning/search?keywords=${encodeURIComponent(pathName)}`,
          duration_hours: trace?.estimated_hours || 10,
          level: 'intermediate' as const,
        },
      },
      is_prerequisite: false,
      order: idx + 1,
    };
  });

  const totalHours = learning_path.reduce((sum, m) => sum + m.course.duration_hours, 0);

  return {
    resume_skills: persona.candidate_skills,
    jd_skills: persona.jd_requirements,
    skill_gaps,
    learning_path,
    match_percentage: persona.match_percentage,
    total_learning_hours: totalHours,
    skills_matched: persona.jd_requirements.length - skill_gaps.length,
    gaps_found: skill_gaps.length,
    time_saved_weeks: persona.time_saved_weeks,
  };
}

// ===== LEGACY EXPORTS — keep existing demo flow working =====
export const DEMO_RESUME_TECH: ResumeSkill[] = [
  { skill: "Python", proficiency: 0.85, evidence: "5+ years building data pipelines, multiple projects listed" },
  { skill: "SQL", proficiency: 0.80, evidence: "Extensive database query experience across 3 roles" },
  { skill: "JavaScript", proficiency: 0.45, evidence: "Basic frontend work mentioned in one project" },
  { skill: "Git", proficiency: 0.70, evidence: "Used across all listed projects" },
  { skill: "Linux", proficiency: 0.65, evidence: "Server administration experience mentioned" },
  { skill: "Docker", proficiency: 0.40, evidence: "Listed as a technology used, limited context" },
  { skill: "AWS", proficiency: 0.50, evidence: "S3, EC2 mentioned in two projects" },
  { skill: "Databases", proficiency: 0.75, evidence: "PostgreSQL, MySQL experience in multiple roles" },
  { skill: "Statistics", proficiency: 0.60, evidence: "Statistics coursework and data analysis projects" },
  { skill: "Data Analysis", proficiency: 0.70, evidence: "Core responsibility in current role" },
  { skill: "Communication", proficiency: 0.65, evidence: "Presented to stakeholders mentioned in resume" },
  { skill: "Excel", proficiency: 0.75, evidence: "Advanced Excel mentioned, pivot tables, macros" },
];

export const DEMO_JD_TECH: JDSkill[] = [
  { skill: "Python", required_level: 0.90, importance: 1.0 },
  { skill: "SQL", required_level: 0.85, importance: 0.95 },
  { skill: "Docker", required_level: 0.75, importance: 0.85 },
  { skill: "Kubernetes", required_level: 0.70, importance: 0.80 },
  { skill: "AWS", required_level: 0.80, importance: 0.90 },
  { skill: "Spark", required_level: 0.70, importance: 0.85 },
  { skill: "Kafka", required_level: 0.65, importance: 0.75 },
  { skill: "Airflow", required_level: 0.70, importance: 0.80 },
  { skill: "Machine Learning", required_level: 0.60, importance: 0.65 },
  { skill: "Terraform", required_level: 0.55, importance: 0.60 },
  { skill: "CI/CD", required_level: 0.65, importance: 0.70 },
  { skill: "System Design", required_level: 0.70, importance: 0.75 },
  { skill: "Data Structures", required_level: 0.60, importance: 0.55 },
  { skill: "Communication", required_level: 0.70, importance: 0.50 },
];

export const DEMO_RESUME_OPS: ResumeSkill[] = [
  { skill: "Safety Compliance", proficiency: 0.70, evidence: "3 years as safety coordinator at distribution center" },
  { skill: "Communication", proficiency: 0.75, evidence: "Team lead managing 15+ warehouse staff" },
  { skill: "Excel", proficiency: 0.60, evidence: "Used for inventory tracking and reporting" },
  { skill: "Leadership", proficiency: 0.65, evidence: "Supervised teams across two shifts" },
  { skill: "Forklift Operation", proficiency: 0.80, evidence: "Certified forklift operator, 4 years experience" },
  { skill: "First Aid", proficiency: 0.70, evidence: "Current first aid/CPR certification" },
  { skill: "Problem Solving", proficiency: 0.60, evidence: "Resolved supply chain bottlenecks mentioned" },
  { skill: "Inventory Management", proficiency: 0.55, evidence: "Basic inventory tracking responsibilities" },
];

export const DEMO_JD_OPS: JDSkill[] = [
  { skill: "Warehouse Management", required_level: 0.85, importance: 1.0 },
  { skill: "Inventory Management", required_level: 0.80, importance: 0.95 },
  { skill: "Safety Compliance", required_level: 0.90, importance: 0.95 },
  { skill: "OSHA Standards", required_level: 0.80, importance: 0.90 },
  { skill: "Supply Chain Basics", required_level: 0.70, importance: 0.85 },
  { skill: "Quality Control", required_level: 0.75, importance: 0.80 },
  { skill: "Lean Manufacturing", required_level: 0.65, importance: 0.75 },
  { skill: "ERP Systems", required_level: 0.60, importance: 0.70 },
  { skill: "Team Management", required_level: 0.75, importance: 0.85 },
  { skill: "Process Optimization", required_level: 0.65, importance: 0.70 },
  { skill: "Logistics", required_level: 0.70, importance: 0.80 },
  { skill: "Equipment Maintenance", required_level: 0.55, importance: 0.55 },
  { skill: "Hazardous Materials Handling", required_level: 0.60, importance: 0.65 },
  { skill: "Project Management", required_level: 0.60, importance: 0.60 },
];

export const DEMO_RESUME_TEXT_TECH = `ALEX CHEN — Senior Data Analyst

PROFESSIONAL SUMMARY
Results-driven data professional with 5+ years of experience in data analysis, pipeline development, and business intelligence. Proficient in Python, SQL, and cloud technologies. Seeking to transition into a Data Engineering role.

EXPERIENCE
Senior Data Analyst | TechCorp Inc. | 2021 – Present
• Built data analysis pipelines in Python processing 2M+ records daily
• Developed complex SQL queries across PostgreSQL and MySQL databases
• Managed AWS S3 data lakes and EC2 instances for analytics workloads
• Created executive dashboards in Excel and presented insights to C-suite
• Used Docker containers for local development environments
• Maintained code using Git version control across all projects

Data Analyst | DataFlow Solutions | 2019 – 2021
• Performed statistical analysis on customer behavior datasets
• Administered Linux-based analytics servers
• Built basic JavaScript dashboards for internal reporting

EDUCATION
M.S. Data Science, University of California | 2019
B.S. Statistics, State University | 2017

CERTIFICATIONS
• AWS Cloud Practitioner
• Google Data Analytics Certificate

SKILLS
Python, SQL, PostgreSQL, MySQL, AWS (S3, EC2), Docker, Git, Linux, Excel, Statistics, JavaScript, Data Analysis, Communication`;

export const DEMO_JD_TEXT_TECH = `SENIOR DATA ENGINEER — CloudScale Technologies

We're looking for a Senior Data Engineer to design and build scalable data infrastructure.

REQUIREMENTS:
• Expert-level Python programming (5+ years)
• Advanced SQL and database design (PostgreSQL preferred)
• Strong experience with Docker and Kubernetes for container orchestration
• AWS expertise (S3, EMR, Redshift, Lambda, IAM)
• Apache Spark for large-scale data processing
• Apache Kafka for real-time streaming pipelines
• Apache Airflow for workflow orchestration
• Experience with Machine Learning pipelines
• Infrastructure as Code using Terraform
• CI/CD pipeline setup and maintenance
• System Design for distributed data architectures
• Strong data structures and algorithms knowledge
• Excellent communication skills for cross-team collaboration

NICE TO HAVE:
• Experience with Kubernetes at scale
• MLOps practices
• Real-time analytics systems`;

export const DEMO_RESUME_TEXT_OPS = `MARIA GONZALEZ — Warehouse Shift Supervisor

PROFESSIONAL SUMMARY
Dedicated warehouse professional with 5+ years of experience in distribution center operations, safety management, and team leadership. Certified forklift operator with a strong safety record.

EXPERIENCE
Shift Supervisor | MegaDistribution Centers | 2021 – Present
• Supervised 15+ warehouse staff across two shifts
• Maintained safety compliance records with zero incidents for 18 months
• Managed basic inventory tracking using Excel spreadsheets
• Resolved supply chain bottlenecks through creative problem solving
• Communicated daily operations reports to management

Safety Coordinator | FastFreight Logistics | 2019 – 2021
• Conducted safety inspections and compliance audits
• Led team safety training sessions for 50+ employees
• Maintained first aid station and emergency protocols

Warehouse Associate | PackRight Inc. | 2017 – 2019
• Operated forklifts and pallet jacks in high-volume warehouse
• Processed incoming and outgoing shipments

CERTIFICATIONS
• Certified Forklift Operator (OSHA compliant)
• First Aid/CPR Certification (Current)
• Warehouse Safety Certificate

SKILLS
Safety Compliance, Leadership, Forklift Operation, Team Supervision, Inventory Tracking, Excel, First Aid, Communication, Problem Solving`;

export const DEMO_JD_TEXT_OPS = `WAREHOUSE OPERATIONS MANAGER — GlobalLogistics Corp

Seeking an experienced Warehouse Operations Manager to oversee all aspects of our 200,000 sq ft distribution center.

REQUIREMENTS:
• Comprehensive warehouse management experience (5+ years)
• Advanced inventory management systems and methodologies
• Expert-level safety compliance and regulatory knowledge
• OSHA Standards certification and enforcement experience
• Supply chain management fundamentals
• Quality control and continuous improvement processes
• Lean Manufacturing / Six Sigma methodology
• ERP system proficiency (SAP/Oracle preferred)
• Team management of 50+ warehouse staff
• Process optimization and efficiency improvement
• Logistics and transportation management
• Equipment maintenance oversight and scheduling
• Hazardous materials handling certification
• Project management for warehouse improvement initiatives`;

export const DEMO_RESUME_HEALTHCARE: ResumeSkill[] = [
  { skill: "Communication", proficiency: 0.85, evidence: "8 years patient-facing nursing" },
  { skill: "Leadership", proficiency: 0.60, evidence: "Senior nurse supervising junior staff" },
  { skill: "First Aid", proficiency: 0.95, evidence: "Current certification, daily practice" },
  { skill: "Excel", proficiency: 0.35, evidence: "Basic spreadsheets for shift scheduling" },
  { skill: "Problem Solving", proficiency: 0.75, evidence: "Critical patient care decisions daily" },
];

export const DEMO_JD_HEALTHCARE: JDSkill[] = [
  { skill: "Leadership", required_level: 0.85, importance: 1.0 },
  { skill: "Project Management", required_level: 0.75, importance: 0.90 },
  { skill: "Communication", required_level: 0.90, importance: 0.85 },
  { skill: "Team Management", required_level: 0.80, importance: 0.95 },
  { skill: "Excel", required_level: 0.70, importance: 0.75 },
  { skill: "Agile", required_level: 0.65, importance: 0.70 },
  { skill: "Problem Solving", required_level: 0.85, importance: 0.80 },
];

export const DEMO_RESUME_TEXT_HEALTHCARE = `PRIYA SHARMA — Senior Staff Nurse
8 years clinical nursing experience in ICU and general wards.
Supervised teams of 5-8 junior nurses across double shifts.
Strong patient communication and critical care decision-making.
Basic Excel for shift scheduling. Current First Aid certification.`;

export const DEMO_JD_TEXT_HEALTHCARE = `Hospital Administrator — Metro General Hospital
Lead and manage clinical and administrative teams across departments.
Drive operational excellence, budget oversight, and staff performance.
Required: Strong leadership, team management, project coordination.
Must have excellent communication and stakeholder management skills.
Agile methodology experience preferred. Advanced Excel required.`;
