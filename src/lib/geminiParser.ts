import { ResumeSkill, JDSkill } from './types';

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Get the Gemini API key from the environment variable.
 * This is set in the .env file as VITE_GEMINI_API_KEY.
 */
export function getGeminiApiKey(): string {
  return import.meta.env.VITE_GEMINI_API_KEY || '';
}

export function hasGeminiApiKey(): boolean {
  return getGeminiApiKey().length > 0;
}

// ===== PROMPT TEMPLATES =====

const RESUME_EXTRACTION_PROMPT = `You are a skilled HR analyst. Analyze the following resume text and extract all technical and professional skills.

For each skill found, provide:
- "skill": The skill name (use standard naming, e.g., "Python", "React", "Docker", "Machine Learning", "Project Management")
- "proficiency": A number between 0.0 and 1.0 estimating the candidate's proficiency based on context clues (years of experience, depth of usage, certifications, etc.)
  - 0.0-0.3: Mentioned/basic awareness
  - 0.3-0.6: Working knowledge / some experience
  - 0.6-0.8: Proficient / multiple years
  - 0.8-1.0: Expert level / deep expertise
- "evidence": A brief explanation (WITHOUT ANY LINE BREAKS, QUOTES, OR SPECIAL CHARACTERS) of why you estimated this proficiency level

IMPORTANT: You MUST return a valid JSON array of objects. Do not include any markdown, code fences, trailing commas, or explanatory text.
Example output:
[{"skill":"Python","proficiency":0.85,"evidence":"5 years experience"},{"skill":"Docker","proficiency":0.6,"evidence":"Used in CI/CD pipelines"}]

Resume text:
`;

const JD_EXTRACTION_PROMPT = `You are a skilled HR analyst. Analyze the following job description and extract all required skills.

For each skill found, provide:
- "skill": The skill name (use standard naming, e.g., "Python", "React", "Docker", "Machine Learning", "Project Management")
- "required_level": A number between 0.0 and 1.0 indicating the required proficiency level
  - 0.3-0.5: Nice to have / basic familiarity
  - 0.5-0.7: Required / working proficiency
  - 0.7-0.9: Strong requirement / advanced
  - 0.9-1.0: Expert level / must-have
- "importance": A number between 0.0 and 1.0 indicating how important this skill is for the role
  - 0.3-0.5: Nice to have
  - 0.5-0.7: Important
  - 0.7-0.9: Very important
  - 0.9-1.0: Critical / deal-breaker

IMPORTANT: You MUST return a valid JSON array of objects. Do not include any markdown, code fences, trailing commas, or explanatory text.
Example output:
[{"skill":"Python","required_level":0.8,"importance":0.9},{"skill":"Docker","required_level":0.6,"importance":0.7}]

Job description text:
`;

const RESUME_TEXT_EXTRACTION_PROMPT = `Extract all the text content from this document. This is a resume/CV document. Return ONLY the plain text content, preserving the structure as much as possible. Do not add any commentary or explanation.`;

const JD_TEXT_EXTRACTION_PROMPT = `Extract all the text content from this document. This is a job description document. Return ONLY the plain text content, preserving the structure as much as possible. Do not add any commentary or explanation.`;

// ===== JSON SCHEMAS =====

const RESUME_SCHEMA = {
  type: "ARRAY",
  items: {
    type: "OBJECT",
    properties: {
      skill: { type: "STRING" },
      proficiency: { type: "NUMBER" },
      evidence: { type: "STRING" }
    },
    required: ["skill", "proficiency", "evidence"]
  }
};

const JD_SCHEMA = {
  type: "ARRAY",
  items: {
    type: "OBJECT",
    properties: {
      skill: { type: "STRING" },
      required_level: { type: "NUMBER" },
      importance: { type: "NUMBER" }
    },
    required: ["skill", "required_level", "importance"]
  }
};

// ===== API CALL HELPERS =====

async function callGeminiText(apiKey: string, prompt: string, schema?: any): Promise<string> {
  const generationConfig: any = {
    temperature: 0.1,
    maxOutputTokens: 8192,
  };

  if (schema) {
    generationConfig.responseMimeType = "application/json";
    generationConfig.responseSchema = schema;
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Gemini API error (${response.status}): ${errorData?.error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callGeminiWithFile(
  apiKey: string,
  prompt: string,
  fileBase64: string,
  mimeType: string
): Promise<string> {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          {
            inlineData: {
              mimeType,
              data: fileBase64,
            }
          },
          { text: prompt }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 8192,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Gemini API error (${response.status}): ${errorData?.error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  // Clean up the text document response (sometimes it wraps it in markdown)
  if (rawText.startsWith('```')) {
    const lines = rawText.split('\n');
    if (lines.length > 2) {
      return lines.slice(1, -1).join('\n');
    }
  }
  return rawText;
}

// ===== PARSING HELPERS =====

function parseResumeSkills(jsonText: string): ResumeSkill[] {
  let parsed;
  try {
    parsed = JSON.parse(jsonText.trim());
  } catch (err: any) {
    console.error(`[Gemini] Failed to parse Resume JSON. Raw output length: ${jsonText.length}\n`, jsonText);
    throw new Error(`Invalid JSON returned from model: ${err.message}`);
  }

  if (!Array.isArray(parsed)) throw new Error('Expected an array of skills');

  return parsed.map((item: any) => ({
    skill: String(item.skill || ''),
    proficiency: Math.max(0, Math.min(1, Number(item.proficiency) || 0.5)),
    evidence: String(item.evidence || 'Extracted by Gemini AI'),
  })).filter((s: ResumeSkill) => s.skill.length > 0);
}

function parseJDSkills(jsonText: string): JDSkill[] {
  let parsed;
  try {
    parsed = JSON.parse(jsonText.trim());
  } catch (err: any) {
    console.error(`[Gemini] Failed to parse JD JSON. Raw output length: ${jsonText.length}\n`, jsonText);
    throw new Error(`Invalid JSON returned from model: ${err.message}`);
  }

  if (!Array.isArray(parsed)) throw new Error('Expected an array of skills');

  return parsed.map((item: any) => ({
    skill: String(item.skill || ''),
    required_level: Math.max(0, Math.min(1, Number(item.required_level) || 0.6)),
    importance: Math.max(0, Math.min(1, Number(item.importance) || 0.5)),
  })).filter((s: JDSkill) => s.skill.length > 0);
}

// ===== PUBLIC API =====

/**
 * Extract skills from resume text using Gemini AI
 */
export async function extractResumeSkillsWithGemini(
  apiKey: string,
  resumeText: string
): Promise<ResumeSkill[]> {
  const prompt = RESUME_EXTRACTION_PROMPT + resumeText;
  const response = await callGeminiText(apiKey, prompt, RESUME_SCHEMA);
  return parseResumeSkills(response);
}

/**
 * Extract required skills from job description text using Gemini AI
 */
export async function extractJDSkillsWithGemini(
  apiKey: string,
  jdText: string
): Promise<JDSkill[]> {
  const prompt = JD_EXTRACTION_PROMPT + jdText;
  const response = await callGeminiText(apiKey, prompt, JD_SCHEMA);
  return parseJDSkills(response);
}

/**
 * Extract text from a PDF/DOCX file using Gemini's document understanding,
 * then extract skills from the resulting text.
 */
export async function extractSkillsFromFile(
  apiKey: string,
  file: File,
  type: 'resume' | 'jd'
): Promise<{ text: string; skills: ResumeSkill[] | JDSkill[] }> {
  // Read file as base64
  const base64 = await fileToBase64(file);
  const mimeType = file.type || getMimeType(file.name);

  // Step 1: Extract text from the document using Gemini vision
  const textPrompt = type === 'resume'
    ? RESUME_TEXT_EXTRACTION_PROMPT
    : JD_TEXT_EXTRACTION_PROMPT;

  let extractedText = await callGeminiWithFile(apiKey, textPrompt, base64, mimeType);
  
  // Clean intermediate text from markdown code fences
  extractedText = extractedText.replace(/^```[a-z]*\s*/gm, '').replace(/```\s*$/gm, '').trim();
  console.log(`[Gemini] Extracted ${extractedText.length} chars from ${type} PDF/DOCX`);

  // Step 2: Extract skills from the extracted text
  if (type === 'resume') {
    const skills = await extractResumeSkillsWithGemini(apiKey, extractedText);
    console.log(`[Gemini] Extracted ${skills.length} skills from resume`);
    return { text: extractedText, skills };
  } else {
    const skills = await extractJDSkillsWithGemini(apiKey, extractedText);
    console.log(`[Gemini] Extracted ${skills.length} skills from JD`);
    return { text: extractedText, skills };
  }
}

/**
 * Validate that a Gemini API key works
 */
export async function validateGeminiApiKey(apiKey: string): Promise<boolean> {
  try {
    await callGeminiText(apiKey, 'Respond with just the word "ok"');
    return true;
  } catch {
    return false;
  }
}

// ===== UTILITY =====

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data:*;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getMimeType(fileName: string): string {
  const ext = fileName.toLowerCase().split('.').pop();
  switch (ext) {
    case 'pdf': return 'application/pdf';
    case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'doc': return 'application/msword';
    case 'txt': return 'text/plain';
    default: return 'application/octet-stream';
  }
}
