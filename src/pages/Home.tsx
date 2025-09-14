// @/pages/Home.tsx
import { useEffect, useState } from "react"
import { useCoverLetter } from "@/hooks/useCoverLetter"
import CoverLetterForm from "@/components/homePage/CoverLetterForm"
import CoverLetterResult from "@/components/homePage/CoverLetterResult"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const Home = () => {
    const [view, setView] = useState<"form" | "result">("form")
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [jobDesc, setJobDesc] = useState("")
    const [tone, setTone] = useState("formal")
    const [company_name_address, setCompany_name_address] = useState<string | null>(null)
    const [additional_request, setadditional_request] = useState<string | null>(null)
    const [showError, setShowError] = useState<string | null>(null);


    const { submit, result, loading, error } = useCoverLetter()

    useEffect(() => {
        if (!loading && result) {
            setView("result")
        }
    }, [loading, result])

    useEffect(() => {
        if (error) {
            setShowError(error)

            const timer = setTimeout(() => {
                setShowError(null)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [error])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!cvFile) return alert("Upload Your CV")
        submit({ file_cv: cvFile, job_description: jobDesc, tone: tone, company_name_address: company_name_address || undefined, additional_request: additional_request || undefined })
    }

    return (
        <div className="px-[4%] py-[6%] bg-secondaryCustom">
            {view === "form" && (
                <CoverLetterForm
                    cvFile={cvFile}
                    setCvFile={setCvFile}
                    jobDesc={jobDesc}
                    setJobDesc={setJobDesc}
                    tone={tone}
                    setTone={setTone}
                    company_name_address={company_name_address}
                    setCompany_name_address={setCompany_name_address}
                    additional_request={additional_request}
                    setadditional_request={setadditional_request}
                    loading={loading}
                    onSubmit={handleSubmit}
                />
            )}

            {view === "result" && loading === false && !error && (
                <CoverLetterResult
                    result={result}
                    onBack={() => setView("form")}
                    onRegenerate={() => handleSubmit(new Event("submit") as unknown as React.FormEvent)}
                />
            )}

            {showError && (
                <div className="fixed bottom-4 right-4 w-[300px]">
                    <Alert>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Try again later please</AlertDescription>
                    </Alert>
                </div>
            )}


        </div>
    )
}

export default Home;