import { useEffect, useState } from "react"
import { useCoverLetter } from "@/hooks/useCoverLetter"
import CoverLetterForm from "@/components/homePage/CoverLetterForm"
import CoverLetterResult from "@/components/homePage/CoverLetterResult"

const Home = () => {
    const [view, setView] = useState<"form" | "result">("form")
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [jobDesc, setJobDesc] = useState("")
    const [tone, setTone] = useState("formal")
    const { submit, result, loading, error } = useCoverLetter()

    useEffect(() => {
        if (!loading && result) {
            setView("result")
        }
    }, [loading, result])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!cvFile) return alert("Upload Your CV")
        submit({ file_cv: cvFile, job_description: jobDesc, tone: tone })
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
                    loading={loading}
                    onSubmit={handleSubmit}
                />
            )}

            {view === "result" && loading === false && (
                <CoverLetterResult
                    result={result}
                    onBack={() => setView("form")}
                    onRegenerate={handleSubmit}
                />
            )}
        </div>
    )
}

export default Home;