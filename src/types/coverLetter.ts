export interface GenerateCoverLetterRequest {
  file_cv: File;
  job_description: string;
  tone?: string;
}

export interface GenerateCoverLetterResponse {
  cover_letter: string;
}

export interface CoverLetterFormProps {
  cvFile: File | null;
  setCvFile: (file: File | null) => void;
  jobDesc: string;
  setJobDesc: (jobDesc: string) => void;
  tone: string;
  setTone: (tone: string) => void;
  loading: boolean;
  onSubmit: () => void;
}

export interface CoverLetterResultProps {
  result: string
  onBack: () => void
  onRegenerate: () => void
}