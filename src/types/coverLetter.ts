
// generate letter process
export interface GenerateCoverLetterRequest {
  file_cv: File;
  job_description: string;
  tone?: string;
  company_name_address?: string;
  additional_request?: string;
}

export interface GenerateCoverLetterResponse {
  cover_letter: string;
}

// download the letter
export interface DownloadLetterRequest {
  generated_letter: string,
  type: "pdf" | "word" | null;
}

// props
export interface CoverLetterFormProps {
  cvFile: File | null;
  setCvFile: (file: File | null) => void;
  jobDesc: string;
  setJobDesc: (jobDesc: string) => void;
  tone: string;
  setTone: (tone: string) => void;
  company_name_address: string | null;
  setCompany_name_address: (company_name_address: string | null) => void;
  additional_request: string | null;
  setadditional_request: (additional_request: string | null) => void;
  loading: boolean;
  onSubmit: () => void;
}

export interface CoverLetterResultProps {
  result: string
  onBack: () => void
  onRegenerate: () => void
}