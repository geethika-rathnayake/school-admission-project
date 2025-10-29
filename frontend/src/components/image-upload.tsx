"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface ImageUploadProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
}

export function ImageUpload({ onFileSelect, selectedFile }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (file: File) => {
    if (file.type.startsWith("image/")) {
      onFileSelect(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert("Please select an image file (JPG, PNG, etc.)")
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
      <Label className="text-base font-semibold mb-3 block">Image Upload</Label>
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
          accept="image/*"
          onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
          className="hidden"
          id="image-input"
        />
        <label htmlFor="image-input" className="cursor-pointer block">
          <p className="text-sm font-medium text-foreground">Drag and drop your image here, or click to select</p>
          <p className="text-xs text-muted-foreground mt-1">Accepted formats: JPG, PNG, GIF, WebP</p>
        </label>
      </div>

      {preview && (
        <Card className="mt-4 p-4">
          <p className="text-sm font-medium text-foreground mb-2">Preview:</p>
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="max-w-full h-auto max-h-48 rounded-md mx-auto"
          />
          <p className="text-xs text-muted-foreground mt-2">{selectedFile?.name}</p>
        </Card>
      )}
    </div>
  )
}
