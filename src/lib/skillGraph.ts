import { SkillGap, LearningModule } from './types';
import { getCourseForSkill } from './courseCatalog';
import { generateReasoningTrace } from './reasoningEngine';

// ===== ORIGINAL PREREQUISITE GRAPH — 50+ skills covering tech AND non-tech roles =====
export const SKILL_PREREQUISITES: Record<string, string[]> = {
  // === WEB DEVELOPMENT ===
  "React": ["JavaScript", "HTML", "CSS"],
  "Angular": ["TypeScript", "JavaScript", "HTML", "CSS"],
  "Vue.js": ["JavaScript", "HTML", "CSS"],
  "Next.js": ["React", "Node.js"],
  "Node.js": ["JavaScript"],
  "TypeScript": ["JavaScript"],
  "GraphQL": ["REST APIs", "JavaScript"],
  "CSS": ["HTML"],

  // === BACKEND ===
  "FastAPI": ["Python", "REST APIs"],
  "Django": ["Python", "Databases"],
  "REST APIs": [],
  "Pydantic": ["Python"],

  // === DEVOPS & CLOUD ===
  "Kubernetes": ["Docker", "Linux", "Networking Basics"],
  "Docker": ["Linux"],
  "Terraform": ["AWS", "Linux"],
  "CI/CD": ["Git", "Docker"],
  "AWS": ["Linux", "Networking Basics"],
  "GCP": ["Linux", "Networking Basics"],
  "Azure": ["Networking Basics"],

  // === DATA & AI ===
  "Machine Learning": ["Python", "Linear Algebra", "Statistics"],
  "Deep Learning": ["Python", "Linear Algebra", "Machine Learning"],
  "NLP": ["Deep Learning", "Python"],
  "Computer Vision": ["Deep Learning", "Python"],
  "MLOps": ["Docker", "Python", "Machine Learning"],
  "TensorFlow": ["Python", "Machine Learning"],
  "PyTorch": ["Python", "Machine Learning"],
  "Data Science": ["Python", "Statistics", "SQL"],
  "Data Analysis": ["Excel", "Statistics"],
  "Spark": ["Python", "SQL"],
  "Kafka": ["Python", "Networking Basics"],
  "Airflow": ["Python", "Docker"],

  // === DATABASES ===
  "PostgreSQL": ["SQL"],
  "MongoDB": ["Databases"],
  "Redis": ["Databases"],

  // === CS FUNDAMENTALS ===
  "System Design": ["Data Structures", "Databases", "Networking Basics"],
  "Algorithms": ["Data Structures"],
  "Data Structures": ["Python"],

  // === DATA VISUALIZATION ===
  "Power BI": ["Excel", "Data Analysis"],
  "Tableau": ["Data Analysis"],

  // === OPERATIONAL / LABOUR ===
  "Warehouse Management": ["Inventory Management", "Safety Compliance"],
  "Logistics": ["Supply Chain Basics"],
  "Lean Manufacturing": ["Quality Control", "Process Optimization"],
  "Forklift Operation": ["Safety Compliance"],
  "Hazardous Materials Handling": ["Safety Compliance", "OSHA Standards"],
  "Equipment Maintenance": ["Safety Compliance"],
  "ERP Systems": ["Inventory Management"],
  "Process Optimization": ["Quality Control"],
  "Quality Control": ["Safety Compliance"],
  "OSHA Standards": ["Safety Compliance"],
  "Inventory Management": ["Excel"],
  "Supply Chain Basics": ["Inventory Management"],

  // === SOFT SKILLS ===
  "Team Management": ["Leadership", "Communication"],
  "Project Management": ["Communication", "Leadership"],
  "Agile": ["Project Management"],

  // === STANDALONE (no prerequisites) ===
  "Python": [],
  "JavaScript": [],
  "Java": [],
  "Go": [],
  "Rust": [],
  "C++": [],
  "HTML": [],
  "Linux": [],
  "Git": [],
  "SQL": [],
  "Excel": [],
  "Statistics": [],
  "Linear Algebra": [],
  "Networking Basics": [],
  "Databases": [],
  "Communication": [],
  "Leadership": [],
  "Problem Solving": [],
  "Safety Compliance": [],
  "First Aid": [],
  "Cybersecurity": [],
};

// Build a directed graph: edge from prereq -> skill means "prereq must come before skill"
interface GraphNode {
  id: string;
  prerequisites: string[];
  dependents: string[];
}

export interface SkillGraphData {
  nodes: Map<string, GraphNode>;
  edges: Array<{ from: string; to: string }>;
}

export function buildSkillGraph(): SkillGraphData {
  const nodes = new Map<string, GraphNode>();
  const edges: Array<{ from: string; to: string }> = [];

  // Initialize all nodes
  for (const [skill, prereqs] of Object.entries(SKILL_PREREQUISITES)) {
    if (!nodes.has(skill)) {
      nodes.set(skill, { id: skill, prerequisites: [], dependents: [] });
    }
    for (const prereq of prereqs) {
      if (!nodes.has(prereq)) {
        nodes.set(prereq, { id: prereq, prerequisites: [], dependents: [] });
      }
      nodes.get(skill)!.prerequisites.push(prereq);
      nodes.get(prereq)!.dependents.push(skill);
      edges.push({ from: prereq, to: skill });
    }
  }

  return { nodes, edges };
}

export function getDependentSkills(skill: string, graph: SkillGraphData): string[] {
  const node = graph.nodes.get(skill);
  return node ? node.dependents : [];
}

export function getPrerequisites(skill: string, graph: SkillGraphData): string[] {
  const node = graph.nodes.get(skill);
  return node ? node.prerequisites : [];
}

// Get ALL transitive prerequisites (recursive)
function getAllPrerequisites(skill: string, graph: SkillGraphData, visited: Set<string> = new Set()): string[] {
  if (visited.has(skill)) return [];
  visited.add(skill);

  const prereqs = getPrerequisites(skill, graph);
  const allPrereqs: string[] = [];

  for (const prereq of prereqs) {
    allPrereqs.push(...getAllPrerequisites(prereq, graph, visited));
    allPrereqs.push(prereq);
  }

  return [...new Set(allPrereqs)];
}

// Topological sort using Kahn's algorithm
function topologicalSort(skills: string[], graph: SkillGraphData): string[] {
  const skillSet = new Set(skills);
  const inDegree = new Map<string, number>();
  const adjacency = new Map<string, string[]>();

  for (const skill of skillSet) {
    inDegree.set(skill, 0);
    adjacency.set(skill, []);
  }

  for (const edge of graph.edges) {
    if (skillSet.has(edge.from) && skillSet.has(edge.to)) {
      adjacency.get(edge.from)!.push(edge.to);
      inDegree.set(edge.to, (inDegree.get(edge.to) || 0) + 1);
    }
  }

  const queue: string[] = [];
  for (const [skill, degree] of inDegree) {
    if (degree === 0) queue.push(skill);
  }

  const sorted: string[] = [];
  while (queue.length > 0) {
    // Sort queue by priority (skills with gaps get higher priority)
    queue.sort();
    const current = queue.shift()!;
    sorted.push(current);

    for (const neighbor of (adjacency.get(current) || [])) {
      const newDegree = (inDegree.get(neighbor) || 1) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) queue.push(neighbor);
    }
  }

  // Add any remaining skills (in case of cycles, though there shouldn't be any)
  for (const skill of skills) {
    if (!sorted.includes(skill)) sorted.push(skill);
  }

  return sorted;
}

// ===== MAIN ADAPTIVE PATHING ALGORITHM =====
export function getOrderedLearningPath(
  gaps: SkillGap[],
  candidateSkills: Record<string, number>,
  graph: SkillGraphData
): LearningModule[] {
  const allSkillsNeeded = new Set<string>();
  const prerequisiteSkills = new Set<string>();

  // For each gap skill, find all prerequisites the candidate doesn't have
  for (const gap of gaps) {
    allSkillsNeeded.add(gap.skill);
    const allPrereqs = getAllPrerequisites(gap.skill, graph);
    for (const prereq of allPrereqs) {
      const candidateLevel = candidateSkills[prereq] || 0;
      if (candidateLevel < 0.3) { // Need at least basic competency in prerequisites
        allSkillsNeeded.add(prereq);
        prerequisiteSkills.add(prereq);
      }
    }
  }

  // Topological sort to respect prerequisite ordering
  const sortedSkills = topologicalSort([...allSkillsNeeded], graph);

  // Build learning modules
  const gapMap = new Map(gaps.map((g, i) => [g.skill, { ...g, rank: i + 1 }]));
  const modules: LearningModule[] = [];

  for (let i = 0; i < sortedSkills.length; i++) {
    const skill = sortedSkills[i];
    const course = getCourseForSkill(skill);
    if (!course) continue;

    const isPrereq = prerequisiteSkills.has(skill) && !gapMap.has(skill);

    const gapData: SkillGap = gapMap.get(skill) || {
      skill,
      current_level: candidateSkills[skill] || 0,
      required_level: 0.5,
      gap: 0.5 - (candidateSkills[skill] || 0),
      importance: 0.5,
      priority_score: 0.25,
      rank: gaps.length + 1
    };

    const prereqsAdded = getPrerequisites(skill, graph).filter(
      p => allSkillsNeeded.has(p)
    );
    const dependents = getDependentSkills(skill, graph).filter(
      d => allSkillsNeeded.has(d)
    );

    const reasoning = generateReasoningTrace(
      skill,
      { ...gapData, rank: gapData.rank || i + 1, course },
      prereqsAdded,
      dependents
    );

    modules.push({
      skill,
      course,
      gap_data: gapData,
      reasoning,
      is_prerequisite: isPrereq,
      order: i + 1
    });
  }

  return modules;
}
