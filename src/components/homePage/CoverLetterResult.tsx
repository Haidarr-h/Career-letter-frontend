// @/component/CoverLetterResult.tsx

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import React, { useState } from "react"
import type { CoverLetterResultProps } from "@/types/coverLetter"
import { useDownloadCoverLetter } from "@/hooks/useCoverLetter"


const CoverLetterResult: React.FC<CoverLetterResultProps> = ({
  result,
  onBack,
  onRegenerate
}) => {
  const [allowEditResult, setAllowEditResult] = useState(false);
  const [editResult, setEditResult] = useState(result);
  const [type, setType] = useState<"word" | "pdf" | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const { downloading, error, download } = useDownloadCoverLetter();

  const handleDownload = () => {
    download({
      generated_letter: editResult,
      type: type
    })
  }

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(editResult);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    } catch (err) {
      console.error('failed to copy: ', err)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Generated Cover Letter</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          style={{ whiteSpace: "pre-wrap" }}
          className="resize-none text-justify"
          readOnly={!allowEditResult}
          value={editResult}
          onChange={(e) => setEditResult(e.target.value)}
        >
          {result}
        </Textarea>
      </CardContent>
      <CardFooter className="flex flex-col gap-10">
        <div className={`flex flex-row gap-3 `}>
          <Button
            onClick={() => setAllowEditResult(!allowEditResult)}
            className={`min-w-[100px] cursor-pointer ${!allowEditResult ? "bg-[#CFAB8D] hover:bg-[#b6977e]" : "bg-[#67C090] hover:bg-[#4f9771]"}`}
          >
            {allowEditResult ? "Save" : "Edit"}
          </Button>

          <Button className="min-w-[100px] cursor-pointer">
            <Dialog>
              <DialogTrigger className="cursor-pointer" onClick={(e) => setType(null)}>Download</DialogTrigger>
              <DialogContent>
                <DialogTitle>Downloading AI Generated Cover Letter</DialogTitle>
                <DialogDescription>
                  Please choose file type to download. PDF or Docx ?
                </DialogDescription>
                <Select onValueChange={(value) => setType(value as "pdf" | "word")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose File" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="word">docx</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  disabled={downloading || !type}
                  onClick={handleDownload}
                  className="cursor-pointer"
                >
                  Download
                </Button>

              </DialogContent>
            </Dialog>
          </Button>
          <Button
            className="min-w-[100px] cursor-pointer"
            onClick={handleCopy}
          >
            Copy Text
          </Button>
        </div>

        <div className="flex flex-row gap-3 justify-start w-full">
          <Button className="cursor-pointer" onClick={onBack}>
            <svg fill="white" className="text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" /></svg>
            Back</Button>
          <Button className="cursor-pointer" onClick={onRegenerate}>
            <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M150.6 105.4C138.1 92.9 117.8 92.9 105.3 105.4L41.3 169.4C32.1 178.6 29.4 192.3 34.4 204.3C39.4 216.3 51.1 224 64 224L96 224L96 448C96 501 139 544 192 544L320 544C337.7 544 352 529.7 352 512C352 494.3 337.7 480 320 480L192 480C174.3 480 160 465.7 160 448L160 224L192 224C204.9 224 216.6 216.2 221.6 204.2C226.6 192.2 223.8 178.5 214.7 169.3L150.7 105.3zM489.4 534.6C501.9 547.1 522.2 547.1 534.7 534.6L598.7 470.6C607.9 461.4 610.6 447.7 605.6 435.7C600.6 423.7 588.9 416 576 416L544 416L544 192C544 139 501 96 448 96L320 96C302.3 96 288 110.3 288 128C288 145.7 302.3 160 320 160L448 160C465.7 160 480 174.3 480 192L480 416L448 416C435.1 416 423.4 423.8 418.4 435.8C413.4 447.8 416.2 461.5 425.3 470.7L489.3 534.7z" /></svg>
            Regenerate</Button>
        </div>
      </CardFooter>

      {showAlert && (
        <div className="fixed bottom-4 right-4 w-[300px]">
          <Alert>
            <AlertTitle>Generated Letter successfully copied</AlertTitle>
            <AlertDescription>Your text has been copied to the clipboard.</AlertDescription>
          </Alert>
        </div>
      )}

    </Card>

  )
}

export default CoverLetterResult