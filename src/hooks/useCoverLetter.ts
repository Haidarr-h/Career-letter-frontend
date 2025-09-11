import { useState } from "react";
import { generateCoverLetter } from "@/api/coverLetter";
import type { GenerateCoverLetterRequest, GenerateCoverLetterResponse } from "@/types/coverLetter";

export function useCoverLetter() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: GenerateCoverLetterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response: GenerateCoverLetterResponse = await generateCoverLetter(payload)
      setResult(response.cover_letter)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {submit, loading, result, error}
}
