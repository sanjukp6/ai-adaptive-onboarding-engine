import { ResumeSkill, JDSkill, SkillGap, AnalysisResult } from './types';
import { buildSkillGraph, getOrderedLearningPath } from './skillGraph';

// ===== YOUR ORIGINAL GAP SCORING ALGORITHM =====
export function calculateSkillGap(resumeSkills: ResumeSkill[], jdSkills: JDSkill[]): SkillGap[] {
  // Build a lookup map from resume skills (case-insensitive)
  const resumeMap: Record<string, number> = {};
  for (const rs of resumeSkills) {
    resumeMap[rs.skill.toLowerCase()] = rs.proficiency;
    resumeMap[rs.skill] = rs.proficiency;
  }

  const gaps: SkillGap[] = [];

  for (const jdSkill of jdSkills) {
    // Try exact match first, then case-insensitive
    const candidateLevel = resumeMap[jdSkill.skill] ?? resumeMap[jdSkill.skill.toLowerCase()] ?? 0.0;
    const gap = jdSkill.required_level - candidateLevel;

    if (gap > 0.05) { // Threshold: only flag meaningful gaps
      const priorityScore = gap * jdSkill.importance; // ORIGINAL scoring formula
      gaps.push({
        skill: jdSkill.skill,
        current_level: candidateLevel,
        required_level: jdSkill.required_level,
        gap: Math.round(gap * 100) / 100,
        importance: jdSkill.importance,
        priority_score: Math.round(priorityScore * 100) / 100
      });
    }
  }

  // Sort by priority score descending
  return gaps
    .sort((a, b) => b.priority_score - a.priority_score)
    .map((g, i) => ({ ...g, rank: i + 1 }));
}

// Calculate overall match percentage
export function calculateMatchPercentage(resumeSkills: ResumeSkill[], jdSkills: JDSkill[]): number {
  if (jdSkills.length === 0) return 100;

  const resumeMap: Record<string, number> = {};
  for (const rs of resumeSkills) {
    resumeMap[rs.skill.toLowerCase()] = rs.proficiency;
    resumeMap[rs.skill] = rs.proficiency;
  }

  let totalWeightedMatch = 0;
  let totalWeight = 0;

  for (const jdSkill of jdSkills) {
    const candidateLevel = resumeMap[jdSkill.skill] ?? resumeMap[jdSkill.skill.toLowerCase()] ?? 0;
    const matchRatio = Math.min(candidateLevel / jdSkill.required_level, 1.0);
    totalWeightedMatch += matchRatio * jdSkill.importance;
    totalWeight += jdSkill.importance;
  }

  return totalWeight > 0 ? Math.round((totalWeightedMatch / totalWeight) * 100) : 0;
}

// Calculate estimated time saved vs standard onboarding
export function calculateTimeSaved(resumeSkills: ResumeSkill[], jdSkills: JDSkill[]): number {
  const resumeMap: Record<string, number> = {};
  for (const rs of resumeSkills) {
    resumeMap[rs.skill.toLowerCase()] = rs.proficiency;
    resumeMap[rs.skill] = rs.proficiency;
  }

  // Skills where candidate already meets or exceeds requirements
  let coveredCount = 0;
  for (const jdSkill of jdSkills) {
    const candidateLevel = resumeMap[jdSkill.skill] ?? resumeMap[jdSkill.skill.toLowerCase()] ?? 0;
    if (candidateLevel >= jdSkill.required_level - 0.05) {
      coveredCount++;
    }
  }

  const hoursSaved = coveredCount * 8; // avg 8 hours per module
  return parseFloat((hoursSaved / 40).toFixed(1));
}

// Full analysis pipeline
export function runFullAnalysis(resumeSkills: ResumeSkill[], jdSkills: JDSkill[]): AnalysisResult {
  const gaps = calculateSkillGap(resumeSkills, jdSkills);
  const matchPct = calculateMatchPercentage(resumeSkills, jdSkills);
  const timeSaved = calculateTimeSaved(resumeSkills, jdSkills);

  // Build candidate skills map
  const candidateSkillsMap: Record<string, number> = {};
  for (const rs of resumeSkills) {
    candidateSkillsMap[rs.skill] = rs.proficiency;
  }

  // Build skill graph and get ordered learning path
  const graph = buildSkillGraph();
  const learningPath = getOrderedLearningPath(gaps, candidateSkillsMap, graph);

  const totalHours = learningPath.reduce((sum, m) => sum + m.course.duration_hours, 0);
  const skillsMatched = jdSkills.length - gaps.length;

  return {
    resume_skills: resumeSkills,
    jd_skills: jdSkills,
    skill_gaps: gaps,
    learning_path: learningPath,
    match_percentage: matchPct,
    total_learning_hours: totalHours,
    skills_matched: Math.max(0, skillsMatched),
    gaps_found: gaps.length,
    time_saved_weeks: timeSaved,
  };
}

