import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import type { CoverLetterResultProps } from "@/types/coverLetter"


const CoverLetterResult: React.FC<CoverLetterResultProps> = ({ result, onBack, onRegenerate }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Generated Cover Letter</CardTitle>
      </CardHeader>
      <CardContent>
        <p style={{ whiteSpace: "pre-wrap" }}>{result}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onRegenerate}>Regenerate</Button>
      </CardFooter>
    </Card>
  )
}

export default CoverLetterResult