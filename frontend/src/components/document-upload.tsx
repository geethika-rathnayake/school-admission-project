"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface DocumentUploadProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
}

export function DocumentUpload({ onFileSelect, selectedFile }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (validTypes.includes(file.type)) {
      onFileSelect(file)
    } else {
      alert("Please select a PDF or DOC/DOCX file")
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  return (
    <div>
      <Label className="text-base font-semibold mb-3 block">Document Upload</Label>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-input"
        }`}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
          className="hidden"
          id="document-input"
        />
        <label htmlFor="document-input" className="cursor-pointer block">
          <p className="text-sm font-medium text-foreground">Drag and drop your document here, or click to select</p>
          <p className="text-xs text-muted-foreground mt-1">Accepted formats: PDF, DOC, DOCX</p>
        </label>
      </div>

      {selectedFile && (
        <Card className="mt-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">✓ Document uploaded</p>
              <p className="text-xs text-muted-foreground mt-1">{selectedFile.name}</p>
            </div>
            <span className="text-2xl">📄</span>
          </div>
        </Card>
      )}
    </div>
  )
}
