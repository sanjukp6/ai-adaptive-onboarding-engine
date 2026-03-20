/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { AnalysisResult } from '../lib/types';

interface RadarChartProps {
  result: AnalysisResult;
}

export default function SkillRadarChart({ result }: RadarChartProps) {
  // Pick top 8 JD skills for the radar (readable)
  const topJdSkills = result.jd_skills
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 8);

  const resumeMap: Record<string, number> = {};
  result.resume_skills.forEach(s => {
    resumeMap[s.skill] = s.proficiency;
  });

  const data = topJdSkills.map(jd => ({
    skill: jd.skill.length > 14 ? jd.skill.slice(0, 12) + '…' : jd.skill,
    fullSkill: jd.skill,
    required: Math.round(jd.required_level * 100),
    current: Math.round((resumeMap[jd.skill] || 0) * 100),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#E2E8F0" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'DM Sans' }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: '#64748B', fontSize: 9 }}
          axisLine={false}
        />
        <Radar
          name="Required Level"
          dataKey="required"
          stroke="#80CAEE"
          fill="#80CAEE"
          fillOpacity={0.15}
          strokeWidth={2}
        />
        <Radar
          name="Your Level"
          dataKey="current"
          stroke="#3C50E0"
          fill="#3C50E0"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Legend
          wrapperStyle={{ fontSize: '12px', fontFamily: 'DM Sans', color: '#64748B' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            fontSize: '12px',
            fontFamily: 'DM Sans',
            color: '#1C2434',
            boxShadow: '0 8px 13px -3px rgba(0, 0, 0, 0.07)'
          }}
          formatter={(value: any, name: any) => [`${value}%`, name]}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
