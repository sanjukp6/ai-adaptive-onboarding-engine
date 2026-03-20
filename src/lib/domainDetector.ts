import { ResumeSkill, JDSkill } from './types';

// Domain definitions mapping skills to professional domains
const DOMAIN_MAP: Record<string, string[]> = {
  'Software Engineering': [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C++',
    'React', 'Angular', 'Vue.js', 'Next.js', 'Node.js', 'HTML', 'CSS',
    'GraphQL', 'REST APIs', 'FastAPI', 'Django', 'Pydantic',
    'Git', 'Data Structures', 'Algorithms', 'System Design',
  ],
  'DevOps & Cloud': [
    'Docker', 'Kubernetes', 'Linux', 'AWS', 'GCP', 'Azure',
    'CI/CD', 'Terraform', 'Networking Basics', 'Cybersecurity',
  ],
  'Data & AI': [
    'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps',
    'TensorFlow', 'PyTorch', 'Data Science', 'Data Analysis',
    'SQL', 'Databases', 'MongoDB', 'Redis', 'PostgreSQL',
    'Spark', 'Kafka', 'Airflow', 'Linear Algebra', 'Statistics',
    'Power BI', 'Tableau', 'Excel',
  ],
  'Operations & Manufacturing': [
    'Safety Compliance', 'OSHA Standards', 'Forklift Operation',
    'Inventory Management', 'Quality Control', 'Supply Chain Basics',
    'Warehouse Management', 'Logistics', 'Lean Manufacturing',
    'Equipment Maintenance', 'Process Optimization',
    'ERP Systems', 'Hazardous Materials Handling', 'First Aid',
  ],
  'Business & Management': [
    'Communication', 'Leadership', 'Project Management', 'Agile',
    'Problem Solving', 'Team Management',
  ],
};

export interface DomainProfile {
  domain: string;
  confidence: number;    // 0–1
  matchedSkills: string[];
}

export interface CrossDomainInsight {
  isTransition: boolean;
  resumeDomain: DomainProfile;
  jdDomain: DomainProfile;
  transitionDifficulty: 'low' | 'moderate' | 'high';
  transferableSkills: string[];
  newDomainSkills: string[];
  recommendation: string;
}

function detectDomain(skills: string[]): DomainProfile {
  const scores: Record<string, { count: number; matched: string[] }> = {};

  for (const [domain, domainSkills] of Object.entries(DOMAIN_MAP)) {
    scores[domain] = { count: 0, matched: [] };
    for (const skill of skills) {
      if (domainSkills.some(ds => ds.toLowerCase() === skill.toLowerCase())) {
        scores[domain].count++;
        scores[domain].matched.push(skill);
      }
    }
  }

  let bestDomain = 'General';
  let bestCount = 0;
  let bestMatched: string[] = [];

  for (const [domain, data] of Object.entries(scores)) {
    if (data.count > bestCount) {
      bestDomain = domain;
      bestCount = data.count;
      bestMatched = data.matched;
    }
  }

  const confidence = skills.length > 0 ? bestCount / skills.length : 0;

  return {
    domain: bestDomain,
    confidence: Math.round(confidence * 100) / 100,
    matchedSkills: bestMatched,
  };
}

export function analyzeCrossDomain(
  resumeSkills: ResumeSkill[],
  jdSkills: JDSkill[]
): CrossDomainInsight {
  const resumeNames = resumeSkills.map(s => s.skill);
  const jdNames = jdSkills.map(s => s.skill);

  const resumeDomain = detectDomain(resumeNames);
  const jdDomain = detectDomain(jdNames);

  const isTransition = resumeDomain.domain !== jdDomain.domain;

  // Skills that overlap between resume and JD (transferable)
  const jdSet = new Set(jdNames.map(s => s.toLowerCase()));
  const transferableSkills = resumeNames.filter(s => jdSet.has(s.toLowerCase()));

  // JD skills that don't appear in resume at all (new domain skills)
  const resumeSet = new Set(resumeNames.map(s => s.toLowerCase()));
  const newDomainSkills = jdNames.filter(s => !resumeSet.has(s.toLowerCase()));

  // Difficulty based on overlap ratio
  const overlapRatio = jdNames.length > 0
    ? transferableSkills.length / jdNames.length
    : 1;

  const transitionDifficulty: 'low' | 'moderate' | 'high' =
    overlapRatio >= 0.5 ? 'low' :
    overlapRatio >= 0.25 ? 'moderate' : 'high';

  const recommendation = isTransition
    ? `You are transitioning from ${resumeDomain.domain} to ${jdDomain.domain}. ` +
      (transitionDifficulty === 'high'
        ? `This is a significant pivot — expect a longer ramp-up. Focus on foundational skills in ${jdDomain.domain} first.`
        : transitionDifficulty === 'moderate'
        ? `You have some transferable skills. Leverage your ${resumeDomain.domain} experience while building ${jdDomain.domain} expertise.`
        : `Strong overlap detected — your ${resumeDomain.domain} background gives you a head start in ${jdDomain.domain}.`)
    : `Both your background and target role are within ${resumeDomain.domain}. This is a within-domain upskill — you should ramp up quickly.`;

  return {
    isTransition,
    resumeDomain,
    jdDomain,
    transitionDifficulty,
    transferableSkills,
    newDomainSkills,
    recommendation,
  };
}
