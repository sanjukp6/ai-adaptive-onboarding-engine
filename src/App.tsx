import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, BarChart3, GitBranch, Brain, Clock,
  CheckCircle, AlertTriangle, Target, Layers, ChevronDown,
  Rocket, Timer, Loader2, Cpu, Globe
} from 'lucide-react';
import { analyzeCrossDomain, CrossDomainInsight } from './lib/domainDetector';
import UploadZone from './components/UploadZone';
import SkillGraph from './components/SkillGraph';
import SkillRadarChart from './components/RadarChart';
import LearningTimeline from './components/LearningTimeline';
import ReasoningTrace from './components/ReasoningTrace';
import { runFullAnalysis } from './lib/gapAnalyzer';
import { AnalysisResult, LearningModule, ResumeSkill, JDSkill } from './lib/types';
import {
  extractResumeSkillsWithGemini,
  extractJDSkillsWithGemini,
  extractSkillsFromFile,
  getGeminiApiKey,
  hasGeminiApiKey,
} from './lib/geminiParser';
type Page = 'landing' | 'processing' | 'dashboard';

// Simple text-based skill extraction (simulates what the LLM would do)
function extractSkillsFromText(text: string, allSkills: string[]): ResumeSkill[] {
  const lower = text.toLowerCase();
  const found: ResumeSkill[] = [];
  for (const skill of allSkills) {
    if (lower.includes(skill.toLowerCase())) {
      // Estimate proficiency based on keyword frequency and context
      const count = (lower.match(new RegExp(skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      const hasYears = lower.includes(`${skill.toLowerCase()}`) && /\d+\+?\s*(years?|yrs?)/.test(lower);
      const hasCert = lower.includes('certif') && lower.includes(skill.toLowerCase());
      let proficiency = Math.min(0.3 + count * 0.15 + (hasYears ? 0.25 : 0) + (hasCert ? 0.2 : 0), 0.95);
      proficiency = Math.round(proficiency * 100) / 100;

      found.push({
        skill,
        proficiency,
        evidence: `Found ${count} mention(s) in resume${hasYears ? ' with years of experience noted' : ''}${hasCert ? ' with relevant certification' : ''}`
      });
    }
  }
  return found;
}

function extractJDSkillsFromText(text: string, allSkills: string[]): JDSkill[] {
  const lower = text.toLowerCase();
  const found: JDSkill[] = [];
  const totalSkillsInDoc = allSkills.filter(s => lower.includes(s.toLowerCase())).length;

  for (const skill of allSkills) {
    if (lower.includes(skill.toLowerCase())) {
      const isRequired = lower.includes('required') || lower.includes('must have') || lower.includes('essential');
      const isExpert = lower.includes('expert') || lower.includes('strong') || lower.includes('advanced');
      const isNice = lower.includes('nice to have') || lower.includes('preferred');

      let requiredLevel = 0.6 + Math.random() * 0.3;
      let importance = 0.5 + (1 - found.length / Math.max(totalSkillsInDoc, 1)) * 0.5;

      if (isExpert) requiredLevel = Math.min(requiredLevel + 0.15, 0.95);
      if (isRequired) importance = Math.min(importance + 0.1, 1.0);
      if (isNice) { importance *= 0.7; requiredLevel *= 0.85; }

      found.push({
        skill,
        required_level: Math.round(requiredLevel * 100) / 100,
        importance: Math.round(importance * 100) / 100,
      });
    }
  }
  return found.sort((a, b) => b.importance - a.importance);
}

const ALL_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'Java', 'Go', 'Rust', 'C++',
  'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Next.js', 'Node.js',
  'GraphQL', 'REST APIs', 'FastAPI', 'Django', 'Pydantic',
  'Docker', 'Kubernetes', 'Linux', 'AWS', 'GCP', 'Azure', 'CI/CD', 'Terraform', 'Git',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps',
  'TensorFlow', 'PyTorch', 'Data Science', 'Data Analysis',
  'SQL', 'Databases', 'MongoDB', 'Redis', 'PostgreSQL',
  'Data Structures', 'System Design', 'Algorithms',
  'Linear Algebra', 'Statistics', 'Networking Basics',
  'Spark', 'Kafka', 'Airflow',
  'Communication', 'Leadership', 'Project Management', 'Agile', 'Problem Solving', 'Team Management',
  'Safety Compliance', 'OSHA Standards', 'Forklift Operation', 'Inventory Management',
  'Quality Control', 'Supply Chain Basics', 'Warehouse Management', 'Logistics',
  'Lean Manufacturing', 'Equipment Maintenance', 'Process Optimization',
  'ERP Systems', 'Hazardous Materials Handling', 'First Aid',
  'Excel', 'Power BI', 'Tableau', 'Cybersecurity',
];

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

// Circular progress ring
function ProgressRing({ percentage, size = 160, strokeWidth = 8 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const animatedPct = useAnimatedCounter(percentage);

  const color = percentage >= 70 ? '#10B981' : percentage >= 40 ? '#F59E0B' : '#EF4444';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="transparent" stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="transparent" stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}44)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-[Syne]" style={{ color }}>{animatedPct}%</span>
        <span className="text-xs text-text-muted">Match Score</span>
      </div>
    </div>
  );
}

// Stats card
function StatCard({ icon: Icon, label, value, color, subtitle }: { icon: any; label: string; value: number | string; color: string; subtitle?: string }) {
  const numericValue = typeof value === 'number' ? value : parseFloat(value);
  const animated = useAnimatedCounter(isNaN(numericValue) ? 0 : Math.round(numericValue));

  // Check if we need decimal display (for weeks)
  const isDecimal = typeof value === 'string' && value.includes('.');
  const displayValue = isDecimal ? value : (typeof value === 'string' && value.includes('h') ? `${animated}h` : animated);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-xl p-4 flex items-center gap-3"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold font-[Syne]" style={{ color }}>
          {displayValue}
        </p>
        <p className="text-xs text-text-muted">{label}</p>
        {subtitle && <p className="text-[10px] text-text-muted mt-0.5">{subtitle}</p>}
      </div>
    </motion.div>
  );
}

// Processing step animation
function ProcessingScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'Extracting Skills from Resume', icon: Sparkles },
    { label: 'Analyzing Job Requirements', icon: Target },
    { label: 'Building Prerequisite Graph', icon: GitBranch },
    { label: 'Computing Skill Gaps', icon: BarChart3 },
    { label: 'Generating Learning Pathway', icon: Rocket },
  ];

  useEffect(() => {
    const timers = steps.map((_, idx) =>
      setTimeout(() => setStep(idx + 1), (idx + 1) * 600)
    );
    const final = setTimeout(onComplete, steps.length * 600 + 500);
    return () => { timers.forEach(clearTimeout); clearTimeout(final); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-deep-space flex items-center justify-center z-50">
      <div className="particles-bg" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 glass-strong rounded-3xl p-10 max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-electric-cyan-dim flex items-center justify-center"
          >
            <Cpu className="w-8 h-8 text-electric-cyan" />
          </motion.div>
          <h2 className="text-xl font-bold font-[Syne] gradient-text">Analyzing Your Profile</h2>
          <p className="text-sm text-text-muted mt-1">Running adaptive pathing algorithm...</p>
        </div>

        <div className="space-y-3">
          {steps.map((s, idx) => {
            const StepIcon = s.icon;
            const isComplete = step > idx;
            const isActive = step === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'glass shimmer' : isComplete ? 'bg-emerald-dim/30' : 'opacity-40'
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isComplete ? 'bg-emerald/20' : isActive ? 'bg-electric-cyan-dim' : 'bg-glass-bg'
                  }`}>
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4 text-emerald" />
                  ) : (
                    <StepIcon className={`w-4 h-4 ${isActive ? 'text-electric-cyan' : 'text-text-muted'}`} />
                  )}
                </div>
                <span className={`text-sm ${isComplete ? 'text-emerald' : isActive ? 'text-electric-cyan' : 'text-text-muted'}`}>
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

const BrandLogo = ({ className = "w-8 h-8", color = "#3C50E0" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 2L2 9.5L16 17L30 9.5L16 2Z" fill={color} />
    <path d="M2 22.5L16 30L30 22.5" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 16L16 23.5L30 16" stroke="#80CAEE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'graph' | 'reasoning'>('graph');
  const [showReasoning, setShowReasoning] = useState(true);
  const [crossDomainEnabled, setCrossDomainEnabled] = useState(true);
  const [crossDomainInsight, setCrossDomainInsight] = useState<CrossDomainInsight | null>(null);

  // Gemini API state (key is read from .env VITE_GEMINI_API_KEY)
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [isLoadingJD, setIsLoadingJD] = useState(false);
  const [geminiError, setGeminiError] = useState<string | null>(null);
  const [resumeSkillsFromGemini, setResumeSkillsFromGemini] = useState<ResumeSkill[] | null>(null);
  const [jdSkillsFromGemini, setJDSkillsFromGemini] = useState<JDSkill[] | null>(null);

  // Handle file upload for resume
  const handleResumeFileUpload = useCallback(async (file: File) => {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      setGeminiError('AI API key not configured. Please set VITE_GEMINI_API_KEY in .env file.');
      return;
    }
    setIsLoadingResume(true);
    setGeminiError(null);
    try {
      const result = await extractSkillsFromFile(apiKey, file, 'resume');
      setResumeText(result.text);
      setResumeSkillsFromGemini(result.skills as ResumeSkill[]);
    } catch (err: any) {
      setGeminiError(`Resume processing failed: ${err.message}`);
    } finally {
      setIsLoadingResume(false);
    }
  }, []);

  // Handle file upload for JD
  const handleJDFileUpload = useCallback(async (file: File) => {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      setGeminiError('AI API key not configured. Please set VITE_GEMINI_API_KEY in .env file.');
      return;
    }
    setIsLoadingJD(true);
    setGeminiError(null);
    try {
      const result = await extractSkillsFromFile(apiKey, file, 'jd');
      setJdText(result.text);
      setJDSkillsFromGemini(result.skills as JDSkill[]);
    } catch (err: any) {
      setGeminiError(`JD processing failed: ${err.message}`);
    } finally {
      setIsLoadingJD(false);
    }
  }, []);

  const handleAnalyze = useCallback(async (resumeSkills?: ResumeSkill[], jdSkills?: JDSkill[]) => {
    setGeminiError(null);
    const apiKey = getGeminiApiKey();

    // If we already have Gemini-extracted skills, use those
    let rs = resumeSkills || resumeSkillsFromGemini;
    let jd = jdSkills || jdSkillsFromGemini;

    // If API key is configured and we don't have pre-extracted skills, use Gemini for text extraction
    if (apiKey && !rs && resumeText.length > 10) {
      try {
        setPage('processing');
        rs = await extractResumeSkillsWithGemini(apiKey, resumeText);
      } catch (err: any) {
        setGeminiError(`AI resume extraction failed: ${err.message}. Falling back to keyword matching.`);
        rs = null;
      }
    }
    if (apiKey && !jd && jdText.length > 10) {
      try {
        jd = await extractJDSkillsWithGemini(apiKey, jdText);
      } catch (err: any) {
        setGeminiError(`AI JD extraction failed: ${err.message}. Falling back to keyword matching.`);
        jd = null;
      }
    }

    // Fallback to keyword matching
    if (!rs) rs = extractSkillsFromText(resumeText, ALL_SKILLS);
    if (!jd) jd = extractJDSkillsFromText(jdText, ALL_SKILLS);

    if (rs.length === 0 || jd.length === 0) {
      setGeminiError('Could not extract enough skills. Please provide more detailed text.');
      setPage('landing');
      return;
    }

    setPage('processing');

    setTimeout(() => {
      const analysisResult = runFullAnalysis(rs!, jd!);
      setResult(analysisResult);

      // Cross-domain analysis
      if (crossDomainEnabled) {
        const insight = analyzeCrossDomain(rs!, jd!);
        setCrossDomainInsight(insight);
      } else {
        setCrossDomainInsight(null);
      }
    }, 200);
  }, [resumeText, jdText, resumeSkillsFromGemini, jdSkillsFromGemini, crossDomainEnabled]);

  const handleProcessingComplete = useCallback(() => {
    setPage('dashboard');
  }, []);



  const canAnalyze = resumeText.length > 10 && jdText.length > 10;

  return (
    <div className="min-h-screen bg-deep-space">
      <AnimatePresence mode="wait">
        {/* ===== LANDING PAGE ===== */}
        {page === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative"
          >
            <div className="particles-bg" />

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between bg-deep-space-light px-6 py-4 border-b border-glass-border">
              <div className="flex items-center gap-2.5">
                <BrandLogo className="w-8 h-8" />
                <div>
                  <h1 className="text-lg font-bold font-[Syne] text-text-primary tracking-tight">SkillBridge</h1>
                  <p className="text-[10px] text-text-muted tracking-wider uppercase font-medium">Adaptive Onboarding Engine</p>
                </div>
              </div>
            </header>

            {/* Dashboard Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-[Syne] text-text-primary mb-2">Create Learning Pathway</h2>
                <p className="text-sm text-text-secondary max-w-2xl">
                  Upload an employee's resume and their target job description to automatically map skill gaps and generate a prioritized curriculum.
                </p>
              </div>

              {/* Gemini AI status + error display */}
              {geminiError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full mb-6"
                >
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-sm text-red-700">
                    <AlertTriangle className="w-4 h-4" />
                    {geminiError}
                  </div>
                </motion.div>
              )}

              {/* Upload zones */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <UploadZone
                  label="Candidate Resume"
                  description="Paste text, drag & drop, or upload PDF/DOCX"
                  icon="resume"
                  accentColor="cyan"
                  onTextChange={(text) => { setResumeText(text); setResumeSkillsFromGemini(null); }}
                  onFileUpload={handleResumeFileUpload}
                  isLoading={isLoadingResume}
                />
                <UploadZone
                  label="Target Job Description"
                  description="Paste text, drag & drop, or upload PDF/DOCX"
                  icon="job"
                  accentColor="purple"
                  onTextChange={(text) => { setJdText(text); setJDSkillsFromGemini(null); }}
                  onFileUpload={handleJDFileUpload}
                  isLoading={isLoadingJD}
                />
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <motion.button
                  onClick={() => handleAnalyze()}
                  disabled={!canAnalyze || isLoadingResume || isLoadingJD}
                  whileHover={canAnalyze ? { scale: 1.02 } : {}}
                  whileTap={canAnalyze ? { scale: 0.98 } : {}}
                  className={`group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${canAnalyze && !isLoadingResume && !isLoadingJD
                    ? 'bg-electric-cyan text-white shadow-md hover:bg-opacity-90'
                    : 'bg-glass-border text-text-muted cursor-not-allowed'
                    }`}
                >
                  {isLoadingResume || isLoadingJD ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing Files...
                    </>
                  ) : (
                    <>
                      {hasGeminiApiKey() ? 'Generate  Pathway' : 'Analyze Pathway'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {/* Cross-Domain Toggle */}
                <div className="flex items-center gap-3 glass rounded-lg px-4 py-2.5">
                  <Globe className="w-4 h-4 text-purple-accent" />
                  <span className="text-sm text-text-secondary font-medium">Cross-Domain Analysis</span>
                  <button
                    onClick={() => setCrossDomainEnabled(!crossDomainEnabled)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${crossDomainEnabled ? 'bg-purple-accent' : 'bg-glass-border'}`}
                  >
                    <motion.div
                      className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md"
                      animate={{ x: crossDomainEnabled ? 20 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              </div>
            </main>
          </motion.div>
        )}

        {/* ===== PROCESSING SCREEN ===== */}
        {page === 'processing' && (
          <ProcessingScreen key="processing" onComplete={handleProcessingComplete} />
        )}

        {/* ===== DASHBOARD ===== */}
        {page === 'dashboard' && result && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen"
          >
            {/* Dashboard Header */}
            <header className="flex items-center justify-between px-6 py-3 border-b border-glass-border bg-deep-space/80 backdrop-blur-xl sticky top-0 z-50">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setPage('landing'); setResult(null); setSelectedModule(null); }}
                  className="flex items-center gap-2.5"
                >
                  <BrandLogo className="w-7 h-7" />
                  <span className="text-sm font-bold font-[Syne] hidden sm:inline" style={{ color: '#1C2434' }}>SkillBridge</span>
                </button>
                <span className="text-text-muted text-xs">|</span>
                <span className="text-xs text-text-secondary">Your SkillBridge Roadmap</span>
              </div>

            </header>

            <div className="px-4 md:px-6 py-6 max-w-[1600px] mx-auto space-y-6">

              {/* ===== CROSS-DOMAIN INSIGHT BANNER ===== */}
              {crossDomainInsight && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl p-5 border ${
                    crossDomainInsight.isTransition
                      ? 'bg-gradient-to-r from-purple-accent/10 to-electric-cyan/10 border-purple-accent/30'
                      : 'bg-emerald/5 border-emerald/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${
                      crossDomainInsight.isTransition ? 'bg-purple-accent/20' : 'bg-emerald/20'
                    }`}>
                      <Globe className={`w-5 h-5 ${crossDomainInsight.isTransition ? 'text-purple-accent' : 'text-emerald'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-base font-bold font-[Syne] text-text-primary">
                          {crossDomainInsight.isTransition ? 'Cross-Domain Transition Detected' : 'Within-Domain Upskill'}
                        </h3>
                        {crossDomainInsight.isTransition && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                            crossDomainInsight.transitionDifficulty === 'high'
                              ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                              : crossDomainInsight.transitionDifficulty === 'moderate'
                              ? 'bg-amber/15 text-amber border border-amber/30'
                              : 'bg-emerald/15 text-emerald border border-emerald/30'
                          }`}>
                            {crossDomainInsight.transitionDifficulty} difficulty
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <span className="font-medium text-electric-cyan">{crossDomainInsight.resumeDomain.domain}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
                        <span className="font-medium text-purple-accent">{crossDomainInsight.jdDomain.domain}</span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{crossDomainInsight.recommendation}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {crossDomainInsight.transferableSkills.length > 0 && (
                          <div className="glass rounded-xl p-3">
                            <p className="text-[11px] text-emerald font-semibold uppercase mb-2">Transferable Skills ({crossDomainInsight.transferableSkills.length})</p>
                            <div className="flex flex-wrap gap-1.5">
                              {crossDomainInsight.transferableSkills.map(s => (
                                <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-emerald/10 text-emerald border border-emerald/20">{s}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {crossDomainInsight.newDomainSkills.length > 0 && (
                          <div className="glass rounded-xl p-3">
                            <p className="text-[11px] text-red-accent font-semibold uppercase mb-2">New Skills Needed ({crossDomainInsight.newDomainSkills.length})</p>
                            <div className="flex flex-wrap gap-1.5">
                              {crossDomainInsight.newDomainSkills.map(s => (
                                <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-red-accent/10 text-red-accent border border-red-accent/20">{s}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ===== SECTION A: Skill Match Overview ===== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Left: Match ring + Stats */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-bold font-[Syne] text-text-primary mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-electric-cyan" />
                    Skill Match Overview
                  </h2>
                  <div className="flex items-center gap-8">
                    <ProgressRing percentage={result.match_percentage} />
                    <div className="flex-1 grid grid-cols-1 gap-3">
                      <StatCard icon={CheckCircle} label="Skills Matched" value={result.skills_matched} color="#10B981" />
                      <StatCard icon={AlertTriangle} label="Gaps Found" value={result.gaps_found} color="#EF4444" />
                      <StatCard icon={Clock} label="Learning Time" value={`${result.total_learning_hours}h`} color="#00D4FF" />
                      {/* ===== TIME SAVED STAT CARD (UPGRADE 3) ===== */}
                      <StatCard
                        icon={Timer}
                        label="Est. Time Saved"
                        value={`${result.time_saved_weeks ?? 0} weeks`}
                        color="#10B981"
                        subtitle="vs standard onboarding"
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Radar Chart */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-bold font-[Syne] text-text-primary mb-2 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-accent" />
                    Skills Radar
                  </h2>
                  <div className="h-72">
                    <SkillRadarChart result={result} />
                  </div>
                </div>
              </motion.div>

              {/* ===== SECTION B & C: Graph + Timeline ===== */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Tab switcher for mobile */}
                <div className="lg:hidden col-span-1 flex glass rounded-xl overflow-hidden">
                  <button
                    onClick={() => setDashboardTab('graph')}
                    className={`flex-1 py-2 text-xs text-center ${dashboardTab === 'graph' ? 'bg-electric-cyan/15 text-electric-cyan' : 'text-text-muted'}`}
                  >
                    Skill Graph
                  </button>
                  <button
                    onClick={() => setDashboardTab('reasoning')}
                    className={`flex-1 py-2 text-xs text-center ${dashboardTab === 'reasoning' ? 'bg-purple-accent/15 text-purple-accent' : 'text-text-muted'}`}
                  >
                    Reasoning
                  </button>
                </div>

                {/* Skill Graph (60%) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`lg:col-span-3 glass rounded-2xl p-4 ${dashboardTab !== 'graph' ? 'hidden lg:block' : ''}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold font-[Syne] text-text-primary flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-electric-cyan" />
                      Skill Dependency Graph
                    </h2>
                    {selectedModule && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-lg px-3 py-1.5 text-xs"
                      >
                        <span className="text-text-muted">Selected: </span>
                        <span className="text-electric-cyan font-semibold">{selectedModule.skill}</span>
                      </motion.div>
                    )}
                  </div>
                  <div className="h-[700px] min-h-[70vh] rounded-xl overflow-hidden">
                    <SkillGraph
                      result={result}
                      onNodeClick={setSelectedModule}
                    />
                  </div>
                </motion.div>

                {/* Learning Timeline (40%) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-2 glass rounded-2xl p-4"
                >
                  <h2 className="text-lg font-bold font-[Syne] text-text-primary mb-3 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-accent" />
                    Learning Pathway
                    <span className="ml-auto text-xs text-text-muted font-normal">
                      {result.learning_path.length} modules
                    </span>
                  </h2>
                  <LearningTimeline
                    modules={result.learning_path}
                    onModuleClick={setSelectedModule}
                    selectedSkill={selectedModule?.skill || null}
                  />
                </motion.div>
              </div>

              {/* ===== SECTION D: Reasoning Trace ===== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`glass rounded-2xl overflow-hidden ${dashboardTab !== 'reasoning' && dashboardTab !== 'graph' ? '' : ''}`}
              >
                <button
                  onClick={() => setShowReasoning(!showReasoning)}
                  className="w-full flex items-center justify-between p-5 hover:bg-glass-hover transition-colors"
                >
                  <h2 className="text-lg font-bold font-[Syne] text-text-primary flex items-center gap-2">
                    <Brain className="w-5 h-5 text-electric-cyan" />
                    Full Reasoning Trace
                    <span className="text-xs font-normal text-text-muted ml-2">
                      — Why each skill was recommended
                    </span>
                  </h2>
                  <motion.div animate={{ rotate: showReasoning ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5 text-text-muted" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showReasoning && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-2">
                        <ReasoningTrace modules={result.learning_path} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Selected module detail panel */}
              <AnimatePresence>
                {selectedModule && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="glass-strong rounded-2xl p-6 glow-cyan"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold font-[Syne] text-text-primary flex items-center gap-2">
                          {selectedModule.skill}
                          {selectedModule.is_prerequisite && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                              PREREQUISITE
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-text-secondary mt-1">{selectedModule.course.title}</p>
                      </div>
                      <button
                        onClick={() => setSelectedModule(null)}
                        className="text-text-muted hover:text-text-primary text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="glass rounded-xl p-4">
                        <p className="text-[11px] text-red-accent font-semibold uppercase mb-1">Gap Analysis</p>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-text-muted mb-1">
                              <span>Current: {Math.round(selectedModule.gap_data.current_level * 100)}%</span>
                              <span>Required: {Math.round(selectedModule.gap_data.required_level * 100)}%</span>
                            </div>
                            <div className="h-2 bg-deep-space rounded-full overflow-hidden flex">
                              <div
                                className="h-full bg-electric-cyan rounded-full"
                                style={{ width: `${selectedModule.gap_data.current_level * 100}%` }}
                              />
                              <div
                                className="h-full bg-red-accent/50 rounded-r-full"
                                style={{ width: `${selectedModule.gap_data.gap * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="glass rounded-xl p-4">
                        <p className="text-[11px] text-amber font-semibold uppercase mb-1">Priority</p>
                        <p className="text-lg font-bold text-text-primary font-[Syne]">
                          #{selectedModule.gap_data.rank || selectedModule.order}
                        </p>
                        <p className="text-xs text-text-muted">
                          Score: {selectedModule.gap_data.priority_score.toFixed(2)}
                        </p>
                      </div>

                      <div className="glass rounded-xl p-4">
                        <p className="text-[11px] text-electric-cyan font-semibold uppercase mb-1">Duration</p>
                        <p className="text-lg font-bold text-text-primary font-[Syne]">
                          {selectedModule.course.duration_hours}h
                        </p>
                        <p className="text-xs text-text-muted">{selectedModule.course.platform}</p>
                      </div>

                      <div className="glass rounded-xl p-4">
                        <p className="text-[11px] text-emerald font-semibold uppercase mb-1">Unlocks</p>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {selectedModule.reasoning.unlock_note}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <a
                        href={selectedModule.course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-cyan to-purple-accent text-white text-sm font-semibold hover:shadow-lg hover:shadow-electric-cyan/20 transition-shadow"
                      >
                        Start Learning <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="text-center py-6 border-t border-glass-border">
                <p className="text-xs text-text-muted">
                  SkillBridge — ARTPARK CodeForge Hackathon •
                  Graph-based Adaptive Pathing • Zero Hallucination Course Grounding •
                  Full Reasoning Transparency
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
