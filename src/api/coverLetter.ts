import type { GenerateCoverLetterRequest, GenerateCoverLetterResponse } from "@/types/coverLetter";

export async function generateCoverLetter(
  payload: GenerateCoverLetterRequest
): Promise<GenerateCoverLetterResponse> {
  const formData = new FormData();
  formData.append("file_cv", payload.file_cv);
  formData.append("job_description", payload.job_description);
  formData.append("tone", payload.tone ?? "formal");

  const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/generate`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error(`API Fetching is Error. Message: ${response.statusText}`);
  }

  const json = await response.json();
  return { cover_letter: json["Cover Letter"] };
}