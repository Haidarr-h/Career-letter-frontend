import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import React from "react"
import type { CoverLetterFormProps } from "@/types/coverLetter"

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({
  cvFile,
  setCvFile,
  jobDesc,
  setJobDesc,
  tone,
  setTone,
  loading,
  onSubmit
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cvFile) return alert("Upload Your CV")
    onSubmit(e)
  }

  return (
    <div className="px-[4%] py-[6%] bg-secondaryCustom">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Welcome to Cover Letter Generator</CardTitle>
                    <CardDescription>
                        First Please Upload Your CV
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">CV</Label>
                                <Input
                                    id="cv"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Input Job Description</Label>
                                <Textarea
                                    id="job_desc"
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                    placeholder="Software Engineer with 3+ years Experience"
                                    required
                                    className="resize-none"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tone">Tone</Label>
                                <select
                                    id="tone"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                    className="border p-2 rounded"
                                >
                                    <option value="formal">Formal</option>
                                    <option value="friendly">Friendly</option>
                                    <option value="persuasive">Persuasive</option>
                                </select>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading || !cvFile || !jobDesc.trim()}>
                                {loading ? "Generating..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
  )
}

export default CoverLetterForm;