import { useState } from "react";
import {
  generateCoverLetter,
  downloadGeneratedLetter,
} from "@/api/coverLetter";
import type {
  GenerateCoverLetterRequest,
  GenerateCoverLetterResponse,
  DownloadLetterRequest,
} from "@/types/coverLetter";

export function useCoverLetter() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: GenerateCoverLetterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response: GenerateCoverLetterResponse = await generateCoverLetter(
        payload
      );
      setResult(response.cover_letter);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, result, error };
}

export function useDownloadCoverLetter() {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = async (payload: DownloadLetterRequest) => {
    setDownloading(true);
    setError(null);

    try {
      await downloadGeneratedLetter(payload);
    } catch (error) {
      console.error("Download Error", error);
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setDownloading(false);
    }
  };
  return {
    downloading,
    error,
    download,
  };
}
