import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Brain, Target, GitBranch, Clock, Unlock, BookOpen, ExternalLink } from 'lucide-react';
import { LearningModule } from '../lib/types';

interface ReasoningTraceProps {
  modules: LearningModule[];
}

function TraceCard({ module, index }: { module: LearningModule; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const r = module.reasoning;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="glass rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-glass-hover transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            module.is_prerequisite ? 'bg-gray-500/10' : 'bg-electric-cyan-dim'
          }`}>
            <Brain className={`w-4 h-4 ${module.is_prerequisite ? 'text-gray-400' : 'text-electric-cyan'}`} />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-text-primary font-[Syne]">
              #{module.order} {module.skill}
              {module.is_prerequisite && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  PREREQUISITE
                </span>
              )}
            </h4>
            <p className="text-[11px] text-text-muted">{r.course.title}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-glass-border pt-3">
              {/* Why needed */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-dim flex-shrink-0 flex items-center justify-center">
                  <Target className="w-3.5 h-3.5 text-red-accent" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-red-accent uppercase tracking-wider mb-0.5">Why Needed</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{r.why_needed}</p>
                </div>
              </div>

              {/* Priority reason */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-dim flex-shrink-0 flex items-center justify-center">
                  <GitBranch className="w-3.5 h-3.5 text-amber" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-amber uppercase tracking-wider mb-0.5">Priority Ranking</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{r.priority_reason}</p>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-dim flex-shrink-0 flex items-center justify-center">
                  <GitBranch className="w-3.5 h-3.5 text-purple-accent" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-purple-accent uppercase tracking-wider mb-0.5">Prerequisites</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {Array.isArray(r.prerequisites_added)
                      ? r.prerequisites_added.join(', ')
                      : r.prerequisites_added}
                  </p>
                </div>
              </div>

              {/* Time estimate */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-electric-cyan-dim flex-shrink-0 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-electric-cyan" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-electric-cyan uppercase tracking-wider mb-0.5">Estimated Time</p>
                  <p className="text-xs text-text-secondary">{r.estimated_time}</p>
                </div>
              </div>

              {/* Unlocks */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-dim flex-shrink-0 flex items-center justify-center">
                  <Unlock className="w-3.5 h-3.5 text-emerald" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-emerald uppercase tracking-wider mb-0.5">Unlocks</p>
                  <p className="text-xs text-text-secondary">{r.unlock_note}</p>
                </div>
              </div>

              {/* Course link */}
              <a
                href={r.course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass rounded-lg p-3 hover:bg-glass-hover transition-colors group"
              >
                <BookOpen className="w-4 h-4 text-electric-cyan" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">{r.course.title}</p>
                  <p className="text-[10px] text-text-muted">{r.course.platform} • {r.course.level} • {r.course.duration_hours}h</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-electric-cyan transition-colors" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ReasoningTrace({ modules }: ReasoningTraceProps) {
  return (
    <div className="space-y-2">
      {modules.map((module, idx) => (
        <TraceCard key={module.skill} module={module} index={idx} />
      ))}
    </div>
  );
}
