import { SkillGap, CourseInfo, ReasoningTrace } from './types';

interface GapWithMeta extends SkillGap {
  rank: number;
  course: CourseInfo;
}

export function generateReasoningTrace(
  skill: string,
  gapData: GapWithMeta,
  prereqs: string[],
  dependents: string[]
): ReasoningTrace {
  const importancePct = Math.round(gapData.importance * 100);

  const urgency = gapData.importance > 0.85 ? "mandatory" : "preferred";
  const severity = gapData.gap > 0.5 ? "completely missing from your profile" : "below the required level";

  return {
    skill,
    why_needed: `${skill} is ${severity} but is ${urgency} for this role. This course directly bridges that gap and unlocks ${dependents.length > 0 ? dependents.join(' and ') : 'your readiness'}.`,
    priority_reason: `This skill carries ${importancePct}% importance weight in the job description — ranked #${gapData.rank} in overall priority. Priority Score: ${gapData.priority_score.toFixed(2)} (gap × importance).`,
    prerequisites_added: prereqs.length > 0 ? prereqs : "None — you can start this directly",
    estimated_time: `${gapData.course.duration_hours} hours`,
    unlock_note: dependents.length > 0
      ? `Completing this unlocks: ${dependents.join(', ')}`
      : "This is a terminal skill — no further dependencies",
    course: gapData.course
  };
}
