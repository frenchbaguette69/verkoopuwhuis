"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { BiEuro, BiUser, BiEnvelope, BiPhone, BiHome, BiCheckCircle } from "react-icons/bi"
import { FiArrowRight } from "react-icons/fi"

export default function BodAanvraagForm() {
  const [step, setStep] = useState(1)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    adres: "",
    voornaam: "",
    achternaam: "",
    email: "",
    telefoon: "",
    bedrag: "",
    omschrijving: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validateField(name, formData[name as keyof typeof formData])
  }

  const validateField = (name: string, value: string) => {
    let error = ""

    if (!value.trim()) {
      error = "Dit veld is verplicht"
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Voer een geldig e-mailadres in"
    } else if (name === "telefoon" && !/^[0-9\s+()-]{10,15}$/.test(value)) {
      error = "Voer een geldig telefoonnummer in"
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
    return !error
  }

  const validateStep = (stepNumber: number) => {
    let isValid = true
    const fieldsToValidate: Record<number, string[]> = {
      1: ["adres", "bedrag"],
      2: ["voornaam", "achternaam", "email", "telefoon", "omschrijving"],
    }

    fieldsToValidate[stepNumber].forEach((field) => {
      const fieldIsValid = validateField(field, formData[field as keyof typeof formData])
      setTouched((prev) => ({ ...prev, [field]: true }))
      if (!fieldIsValid) isValid = false
    })

    return isValid
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(2) || !agreed) return

    setLoading(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({
          adres: "",
          voornaam: "",
          achternaam: "",
          email: "",
          telefoon: "",
          bedrag: "",
          omschrijving: "",
        })
        setAgreed(false)
        setStep(1)

        toast({
          title: "Aanvraag verstuurd!",
          description: "We nemen binnen 24 uur contact met je op.",
        })
      } else {
        toast({
          title: "Er is iets misgegaan",
          description: "Probeer het later opnieuw of neem contact op.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Netwerkfout",
        description: "Controleer je internetverbinding en probeer opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Progress percentage calculation
  const getProgress = () => {
    if (success) return 100
    if (step === 1) return 33
    if (step === 2 && !agreed) return 66
    if (step === 2 && agreed) return 90
    return 0
  }

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl">
      {/* Progress bar */}
      <div className="h-1.5 w-full bg-gray-100">
        <motion.div
          className="h-full bg-[#2baf57]"
          initial={{ width: 0 }}
          animate={{ width: `${getProgress()}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Steps indicator */}
      <div className="flex justify-between px-8 pt-6">
        {[1, 2].map((stepNumber) => (
          <div key={stepNumber} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step >= stepNumber ? "bg-[#2baf57] text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              {stepNumber}
            </div>
            <span className={`text-xs mt-1 font-medium ${step >= stepNumber ? "text-[#2baf57]" : "text-gray-400"}`}>
              {stepNumber === 1 ? "Woning" : "Gegevens"}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <BiCheckCircle className="text-[#2baf57] text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Bedankt voor uw aanvraag!</h3>
              <p className="text-gray-600 max-w-md">
                We hebben uw aanvraag ontvangen en nemen binnen 24 uur contact met u op om een vrijblijvend bod te
                bespreken.
              </p>
              <Button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-8 bg-[#2baf57] hover:bg-green-700 text-white"
              >
                Nieuwe aanvraag
              </Button>
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Woninggegevens</h2>
                <p className="text-gray-500 mt-1">Vertel ons over de woning die u wilt verkopen</p>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <BiHome className="text-xl" />
                </div>
                <Input
                  id="adres"
                  name="adres"
                  value={formData.adres}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 py-6 ${errors.adres && touched.adres ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="Adres van de woning"
                />
                {errors.adres && touched.adres && <p className="text-red-500 text-sm mt-1">{errors.adres}</p>}
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <BiEuro className="text-xl" />
                </div>
                <Input
                  id="bedrag"
                  name="bedrag"
                  value={formData.bedrag}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 py-6 ${errors.bedrag && touched.bedrag ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="Gewenst bedrag (bijv. €325.000)"
                />
                {errors.bedrag && touched.bedrag && <p className="text-red-500 text-sm mt-1">{errors.bedrag}</p>}
              </div>

              <Button
                type="button"
                onClick={nextStep}
                className="w-full bg-[#2baf57] hover:bg-green-700 text-white py-6 text-lg font-semibold flex items-center justify-center gap-2 group"
              >
                Volgende stap
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Uw gegevens</h2>
                <p className="text-gray-500 mt-1">Zodat we contact met u kunnen opnemen</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <BiUser className="text-xl" />
                  </div>
                  <Input
                    id="voornaam"
                    name="voornaam"
                    value={formData.voornaam}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-10 py-6 ${errors.voornaam && touched.voornaam ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    placeholder="Voornaam"
                  />
                  {errors.voornaam && touched.voornaam && (
                    <p className="text-red-500 text-sm mt-1">{errors.voornaam}</p>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <BiUser className="text-xl" />
                  </div>
                  <Input
                    id="achternaam"
                    name="achternaam"
                    value={formData.achternaam}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-10 py-6 ${errors.achternaam && touched.achternaam ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    placeholder="Achternaam"
                  />
                  {errors.achternaam && touched.achternaam && (
                    <p className="text-red-500 text-sm mt-1">{errors.achternaam}</p>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <BiEnvelope className="text-xl" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 py-6 ${errors.email && touched.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="E-mailadres"
                />
                {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <BiPhone className="text-xl" />
                </div>
                <Input
                  id="telefoon"
                  name="telefoon"
                  type="tel"
                  value={formData.telefoon}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 py-6 ${errors.telefoon && touched.telefoon ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="Telefoonnummer"
                />
                {errors.telefoon && touched.telefoon && <p className="text-red-500 text-sm mt-1">{errors.telefoon}</p>}
              </div>

              <div>
                <Textarea
                  id="omschrijving"
                  name="omschrijving"
                  value={formData.omschrijving}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`min-h-[120px] ${errors.omschrijving && touched.omschrijving ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="Vertel kort iets over de woning (bijv. type woning, staat van onderhoud, reden van verkoop...)"
                />
                {errors.omschrijving && touched.omschrijving && (
                  <p className="text-red-500 text-sm mt-1">{errors.omschrijving}</p>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-start space-x-3">
                  <Checkbox id="akkoord" checked={agreed} onCheckedChange={() => setAgreed(!agreed)} className="mt-1" />
                  <Label htmlFor="akkoord" className="text-sm text-gray-600 font-normal">
                    Ik ga akkoord met het{" "}
                    <a href="/privacybeleid" className="text-[#2baf57] hover:underline">
                      privacybeleid
                    </a>{" "}
                    en geef toestemming om contact met mij op te nemen over mijn aanvraag.
                  </Label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" onClick={prevStep} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800">
                  Terug
                </Button>
                <Button
                  type="submit"
                  className="flex-[2] bg-[#2baf57] hover:bg-green-700 text-white py-6 text-lg font-semibold flex items-center justify-center gap-2"
                  disabled={!agreed || loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Versturen...
                    </>
                  ) : (
                    "Verstuur aanvraag"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Trust indicators */}
      <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-[#2baf57]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          Veilig & vertrouwd
        </div>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-[#2baf57]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
          Reactie binnen 24 uur
        </div>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-[#2baf57]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          100% vrijblijvend
        </div>
      </div>
    </div>
  )
}
