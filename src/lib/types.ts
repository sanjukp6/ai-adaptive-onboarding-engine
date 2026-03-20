export interface ResumeSkill {
  skill: string;
  proficiency: number;
  evidence: string;
}

export interface JDSkill {
  skill: string;
  required_level: number;
  importance: number;
}

export interface SkillGap {
  skill: string;
  current_level: number;
  required_level: number;
  gap: number;
  importance: number;
  priority_score: number;
  rank?: number;
}

export interface CourseInfo {
  title: string;
  platform: string;
  url: string;
  duration_hours: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface ReasoningTrace {
  skill: string;
  why_needed: string;
  priority_reason: string;
  prerequisites_added: string[] | string;
  estimated_time: string;
  unlock_note: string;
  course: CourseInfo;
}

export interface LearningModule {
  skill: string;
  course: CourseInfo;
  gap_data: SkillGap;
  reasoning: ReasoningTrace;
  is_prerequisite: boolean;
  order: number;
}

export interface AnalysisResult {
  resume_skills: ResumeSkill[];
  jd_skills: JDSkill[];
  skill_gaps: SkillGap[];
  learning_path: LearningModule[];
  match_percentage: number;
  total_learning_hours: number;
  skills_matched: number;
  gaps_found: number;
  time_saved_weeks?: number;
}

// Pre-computed demo persona — loads instantly with zero API calls
export interface DemoPersonaGap {
  skill: string;
  status: 'MISSING' | 'PARTIAL' | 'COVERED';
  gap: number;
  priority_score: number;
  current: number;
  required: number;
  importance: number;
}

export interface DemoReasoningTrace {
  skill: string;
  why: string;
  priority_rank: number;
  prerequisite_for?: string[];
  estimated_hours: number;
  unlocks: string;
}

export interface DemoPersona {
  id: string;
  name: string;
  icon: string;
  label: string;
  tag: string;
  accentColor: string;
  badge?: string;
  resume_summary: string;
  target_role: string;
  candidate_skills: ResumeSkill[];
  jd_requirements: JDSkill[];
  pre_computed_gaps: DemoPersonaGap[];
  match_percentage: number;
  time_saved_weeks: number;
  pre_computed_path: string[];
  reasoning_traces: DemoReasoningTrace[];
}
