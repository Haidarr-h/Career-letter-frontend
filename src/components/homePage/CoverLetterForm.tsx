// @/components/homePage/CoverLetterForm.tsx
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
  company_name_address,
  setCompany_name_address,
  additional_request,
  setadditional_request,
  loading,
  onSubmit
}) => {
  return (
    <div className=" bg-secondaryCustom">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome to Cover Letter Generator</CardTitle>
          <CardDescription>
            First Please Upload Your CV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
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
                <Label>Company Details (Name and Address) <i className="text-xs font-normal">(Optional)</i></Label>
                <Input
                  id="company_name_address"
                  type="text"
                  value={company_name_address || ""}
                  placeholder="Career L Corporation in Banana Street, New York, USA"
                  onChange={(e) => setCompany_name_address(e.target.value || null)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Additional Request <i className="text-xs font-normal">(Optional)</i></Label>
                <Input
                  id="additional_request"
                  type="text"
                  value={additional_request || ""}
                  placeholder="Dont make it too long, max 3 paragraph"
                  onChange={(e) => setadditional_request(e.target.value || null)}
                />
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