import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, BookOpen, Zap, ShieldCheck } from 'lucide-react';
import { LearningModule } from '../lib/types';

interface LearningTimelineProps {
  modules: LearningModule[];
  onModuleClick: (module: LearningModule) => void;
  selectedSkill: string | null;
}

function getPlatformBadge(platform: string) {
  if (platform.toLowerCase().includes('coursera')) return { bg: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Coursera' };
  if (platform.toLowerCase().includes('udemy')) return { bg: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Udemy' };
  if (platform.toLowerCase().includes('educative')) return { bg: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Educative' };
  return { bg: 'bg-slate-100 text-slate-600 border-slate-200', label: platform };
}

function getLevelIcon(level: string) {
  switch (level) {
    case 'beginner': return <BookOpen className="w-3 h-3" />;
    case 'intermediate': return <Zap className="w-3 h-3" />;
    case 'advanced': return <ShieldCheck className="w-3 h-3" />;
    default: return <BookOpen className="w-3 h-3" />;
  }
}

export default function LearningTimeline({ modules, onModuleClick, selectedSkill }: LearningTimelineProps) {
  let cumulativeHours = 0;
  let currentWeek = 0;
  const HOURS_PER_WEEK = 10;

  return (
    <div className="space-y-3 pr-2 overflow-y-auto max-h-[550px]">
      {modules.map((module, idx) => {
        cumulativeHours += module.course.duration_hours;
        const targetWeek = Math.max(1, Math.ceil(cumulativeHours / HOURS_PER_WEEK));
        const isNewWeek = targetWeek !== currentWeek;
        if (isNewWeek) {
          currentWeek = targetWeek;
        }
        const badge = getPlatformBadge(module.course.platform);
        const isSelected = selectedSkill === module.skill;
        const priorityPct = Math.min(module.gap_data.priority_score * 100 / 0.8, 100);

        return (
          <React.Fragment key={module.skill}>
            {isNewWeek && (
              <div className="pt-2 pb-1 flex items-center justify-between">
                 <div className="flex-1 h-px bg-glass-border"></div>
                 <div className="px-4 text-[10px] sm:text-xs tracking-wider uppercase font-bold text-electric-cyan flex items-center gap-2">
                   Week {targetWeek}
                   <span className="text-text-muted font-normal lowercase">({HOURS_PER_WEEK}h pace)</span>
                 </div>
                 <div className="flex-1 h-px bg-glass-border"></div>
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              onClick={() => onModuleClick(module)}
              className={`relative glass rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                isSelected ? 'border-electric-cyan/50 glow-cyan' : 'hover:border-white/20'
              }`}
            >
            {/* Order number */}
            <div className="absolute -left-0 top-4 w-7 h-7 rounded-full bg-deep-space border border-glass-border flex items-center justify-center text-xs font-bold text-text-muted">
              {module.order}
            </div>

            {/* Connecting line */}
            {idx < modules.length - 1 && (
              <div className="absolute -left-[0px] top-11 w-px h-[calc(100%-20px)] bg-glass-border"></div>
            )}

            <div className="ml-6">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-text-primary font-[Syne]">{module.skill}</h4>
                    {module.is_prerequisite && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        PREREQ
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{module.course.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${badge.bg}`}>
                  {badge.label}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-glass-border text-text-muted flex items-center gap-1">
                  {getLevelIcon(module.course.level)}
                  {module.course.level}
                </span>
                <span className="text-[10px] text-text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {module.course.duration_hours}h
                </span>
              </div>

              {/* Priority bar */}
              <div className="mb-2">
                <div className="flex justify-between text-[10px] text-text-muted mb-1">
                  <span>Priority Score</span>
                  <span>{module.gap_data.priority_score.toFixed(2)}</span>
                </div>
                <div className="h-1.5 bg-deep-space rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${priorityPct}%` }}
                    transition={{ delay: idx * 0.05 + 0.3, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{
                      background: priorityPct > 70
                        ? 'linear-gradient(90deg, #EF4444, #F59E0B)'
                        : priorityPct > 40
                        ? 'linear-gradient(90deg, #F59E0B, #10B981)'
                        : 'linear-gradient(90deg, #10B981, #00D4FF)'
                    }}
                  />
                </div>
              </div>

              <a
                href={module.course.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[11px] text-electric-cyan hover:text-electric-cyan/80 transition-colors"
              >
                Start Learning <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
