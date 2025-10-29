"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Submission } from "@/types/submission"

interface SubmissionsListProps {
  submissions: Submission[]
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: Submission["status"]) => void
  onEdit: (id: string, data: Partial<Submission>) => void
}

export function SubmissionsList({ submissions, onDelete, onStatusChange, onEdit }: SubmissionsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Submission>>({})

  const handleEditStart = (submission: Submission) => {
    setEditingId(submission.id)
    setEditData(submission)
  }

  const handleEditSave = () => {
    if (editingId) {
      onEdit(editingId, editData)
      setEditingId(null)
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditData({})
  }

  if (submissions.length === 0) {
    return (
      <Card className="p-8 text-center border-2 border-border">
        <p className="text-muted-foreground text-lg">No submissions yet. Create one to get started!</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card key={submission.id} className="p-6 border-2 border-border hover:border-primary transition-colors">
          {editingId === submission.id ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Name</label>
                <input
                  type="text"
                  value={editData.name || ""}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border-2 border-input rounded-md"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleEditSave} className="flex-1">
                  Save
                </Button>
                <Button onClick={handleEditCancel} variant="outline" className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="text-lg font-semibold">{submission.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Grade Level</p>
                  <p className="text-lg font-semibold">Grade {submission.gradeLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="text-lg font-semibold">{submission.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Activities</p>
                  <p className="text-lg font-semibold">{submission.activities.join(", ") || "None"}</p>
                </div>
              </div>

              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-2">Files</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-foreground">📷 {submission.imageFile}</span>
                  <span className="text-foreground">📄 {submission.documentFile}</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                <div className="flex-1">
                  <label className="text-sm font-semibold block mb-2">Status</label>
                  <select
                    value={submission.status}
                    onChange={(e) => onStatusChange(submission.id, e.target.value as Submission["status"])}
                    className="w-full md:w-48 px-3 py-2 border-2 border-input rounded-md bg-background text-foreground"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <Button onClick={() => handleEditStart(submission)} variant="outline" className="flex-1 md:flex-none">
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(submission.id)}
                    variant="outline"
                    className="flex-1 md:flex-none text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      ))}
    </div>
  )
}
