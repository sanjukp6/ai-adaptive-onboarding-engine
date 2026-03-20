import React, { useCallback, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';

interface UploadZoneProps {
  label: string;
  description: string;
  icon: 'resume' | 'job';
  onTextChange: (text: string) => void;
  onFileUpload?: (file: File) => void;
  accentColor: string;
  isLoading?: boolean;
}

const ACCEPTED_FILE_TYPES = '.txt,.pdf,.doc,.docx';

export default function UploadZone({ label, description, onTextChange, onFileUpload, icon, accentColor, isLoading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [fileName, setFileName] = useState('');
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    const ext = file.name.toLowerCase().split('.').pop();

    if (ext === 'txt') {
      // Read text files directly
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string;
        setText(content);
        setHasContent(true);
        onTextChange(content);
      };
      reader.readAsText(file);
    } else if (ext === 'pdf' || ext === 'doc' || ext === 'docx') {
      // For PDF/DOCX, delegate to parent for processing
      setHasContent(true);
      setText(`📄 ${file.name} (uploaded — processing document...)`);
      if (onFileUpload) {
        onFileUpload(file);
      }
    }
  }, [onTextChange, onFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input so same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [processFile]);

  const handleTextChange = (value: string) => {
    setText(value);
    setHasContent(value.length > 20);
    onTextChange(value);
  };

  const borderColor = accentColor === 'cyan' ? 'border-electric-cyan/30' : 'border-purple-accent/30';
  const hoverBorder = accentColor === 'cyan' ? 'hover:border-electric-cyan/50' : 'hover:border-purple-accent/50';
  const glowClass = accentColor === 'cyan' ? 'glow-cyan' : 'glow-purple';
  const draggingBorder = accentColor === 'cyan' ? 'border-electric-cyan' : 'border-purple-accent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex-1 min-w-[320px]"
    >
      <div className={`glass rounded-2xl p-6 ${hoverBorder} transition-all duration-300 ${isDragging ? draggingBorder + ' ' + glowClass : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentColor === 'cyan' ? 'bg-electric-cyan-dim' : 'bg-purple-dim'}`}>
            {isLoading ? (
              <Loader2 className={`w-5 h-5 animate-spin ${accentColor === 'cyan' ? 'text-electric-cyan' : 'text-purple-accent'}`} />
            ) : icon === 'resume' ? (
              <FileText className={`w-5 h-5 ${accentColor === 'cyan' ? 'text-electric-cyan' : 'text-purple-accent'}`} />
            ) : (
              <Upload className={`w-5 h-5 ${accentColor === 'cyan' ? 'text-electric-cyan' : 'text-purple-accent'}`} />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-text-primary font-[Syne]">{label}</h3>
            <p className="text-xs text-text-muted">{description}</p>
          </div>
          {hasContent && !isLoading && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto"
            >
              <CheckCircle className="w-5 h-5 text-emerald" />
            </motion.div>
          )}
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative rounded-xl border-2 border-dashed ${isDragging ? draggingBorder : borderColor} transition-all duration-200`}
        >
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={icon === 'resume'
              ? "Paste your resume text here, or drag & drop a file...\n\nSupported formats: TXT, PDF, DOCX\n\nExample:\nJohn Doe — Software Engineer\n5 years Python, 3 years React..."
              : "Paste the job description here, or drag & drop a file...\n\nSupported formats: TXT, PDF, DOCX\n\nExample:\nSenior Data Engineer\nRequirements: Python, Docker, AWS..."}
            className="w-full h-48 bg-transparent text-sm text-text-secondary placeholder:text-text-muted p-4 resize-none focus:outline-none rounded-xl"
            disabled={isLoading}
          />

          {/* File info & Browse button row */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {fileName && (
              <div className="flex items-center gap-1.5 bg-deep-space-lighter rounded-lg px-3 py-1.5 text-xs text-text-muted">
                <FileText className="w-3 h-3" />
                {fileName}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_FILE_TYPES}
              onChange={handleFileSelect}
              className="hidden"
              id={`file-input-${icon}`}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                accentColor === 'cyan'
                  ? 'bg-electric-cyan/10 text-electric-cyan hover:bg-electric-cyan/20 border border-electric-cyan/30'
                  : 'bg-purple-accent/10 text-purple-accent hover:bg-purple-accent/20 border border-purple-accent/30'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Upload className="w-3 h-3" />
              Browse
            </button>
          </div>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 flex items-center gap-2 text-xs"
          >
            <Loader2 className={`w-3.5 h-3.5 animate-spin ${accentColor === 'cyan' ? 'text-electric-cyan' : 'text-purple-accent'}`} />
            <span className="text-text-muted">Processing document...</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
