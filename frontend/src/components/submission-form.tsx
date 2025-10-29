"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ImageUpload } from "./image-upload"
import { DocumentUpload } from "./document-upload"
import type { Submission } from "@/types/submission"

interface SubmissionFormProps {
  onSubmit: (submission: Submission) => void
}

export function SubmissionForm({ onSubmit }: SubmissionFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    gradeLevel: "",
    gender: "",
    activities: [] as string[],
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleActivityChange = (activity: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newSubmission: Submission = {
      id: Date.now().toString(),
      name: formData.name,
      gradeLevel: formData.gradeLevel,
      gender: formData.gender,
      activities: formData.activities,
      imageFile: imageFile?.name || "",
      documentFile: documentFile?.name || "",
      status: "pending",
      submittedAt: new Date().toISOString(),
      studentName: "",
      gradeApplied: ""
    }

    onSubmit(newSubmission)

    // Reset form
    setFormData({ name: "", gradeLevel: "", gender: "", activities: [] })
    setImageFile(null)
    setDocumentFile(null)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <Card className="p-6 border-2 border-primary">
      {submitted && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✓ Form submitted successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Input */}
        <div>
          <Label htmlFor="name" className="text-base font-semibold">
            Applicant Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-2 border-2"
          />
        </div>

        {/* Dropdown */}
        <div>
          <Label htmlFor="gradeLevel" className="text-base font-semibold">
            Grade Level
          </Label>
          <select
            id="gradeLevel"
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleInputChange}
            required
            className="mt-2 w-full px-3 py-2 border-2 border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a grade level</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
          </select>
        </div>

        {/* Radio Buttons */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Gender</Label>
          <div className="space-y-2">
            {["Male", "Female"].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={option}
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleInputChange}
                  className="w-4 h-4 cursor-pointer"
                  required
                />
                <Label htmlFor={option} className="ml-2 cursor-pointer font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Checkboxes */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Extracurricular Activities</Label>
          <div className="space-y-2">
            {["Sports", "Music", "Debate", "Science Club", "Art"].map((activity) => (
              <div key={activity} className="flex items-center">
                <input
                  type="checkbox"
                  id={activity}
                  checked={formData.activities.includes(activity)}
                  onChange={() => handleActivityChange(activity)}
                  className="w-4 h-4 cursor-pointer"
                />
                <Label htmlFor={activity} className="ml-2 cursor-pointer font-normal">
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <ImageUpload onFileSelect={setImageFile} selectedFile={imageFile} />

        {/* Document Upload */}
        <DocumentUpload onFileSelect={setDocumentFile} selectedFile={documentFile} />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-2 text-base font-semibold"
          disabled={!formData.name || !formData.gradeLevel || !formData.gender || !imageFile || !documentFile}
        >
          Submit Application
        </Button>
      </form>
    </Card>
  )
}
