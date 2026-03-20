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
  const currentPct = Math.round(gapData.current_level * 100);
  const requiredPct = Math.round(gapData.required_level * 100);
  const importancePct = Math.round(gapData.importance * 100);

  return {
    skill,
    why_needed: `Your current proficiency (${currentPct}%) is below the required level (${requiredPct}%) for this role. The gap of ${requiredPct - currentPct}% needs to be bridged through structured learning.`,
    priority_reason: `This skill carries ${importancePct}% importance weight in the job description — ranked #${gapData.rank} in overall priority. Priority Score: ${gapData.priority_score.toFixed(2)} (gap × importance).`,
    prerequisites_added: prereqs.length > 0 ? prereqs : "None — you can start this directly",
    estimated_time: `${gapData.course.duration_hours} hours`,
    unlock_note: dependents.length > 0
      ? `Completing this unlocks: ${dependents.join(', ')}`
      : "This is a terminal skill — no further dependencies",
    course: gapData.course
  };
}
