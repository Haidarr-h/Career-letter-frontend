import type {
  GenerateCoverLetterRequest,
  GenerateCoverLetterResponse,
  DownloadLetterRequest,
} from "@/types/coverLetter";

const API_URL = import.meta.env.VITE_BACKEND_API;

export async function generateCoverLetter(
  payload: GenerateCoverLetterRequest
): Promise<GenerateCoverLetterResponse> {
  const formData = new FormData();
  formData.append("file_cv", payload.file_cv);
  formData.append("job_description", payload.job_description);
  formData.append("tone", payload.tone ?? "formal");
  if (payload.company_name_address)
    formData.append("company_name_adress", payload.company_name_address);
  if (payload.additional_request)
    formData.append("additional_request", payload.additional_request);

  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API Fetching is Error. Message: ${response.statusText}`);
  }

  const json = await response.json();
  return { cover_letter: json["Cover Letter"] };
}

export async function downloadGeneratedLetter(payload: DownloadLetterRequest) {
  const data = {
    generated_letter: payload.generated_letter,
    type: payload.type,
  };

  const response = await fetch(`${API_URL}/download`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API download is Error. Message: ${response.statusText}`)
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;

  a.download = payload.type === "pdf" ? "cover_letter.pdf" : "cover_letter.docx";
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
}
