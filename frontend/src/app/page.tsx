"use client"



import { useState } from "react"

import { SubmissionForm } from "@/components/submission-form"

import { SubmissionsList } from "@/components/submissions-list"

import { StatusOverview } from "@/components/status-overview"

import type { Submission } from "@/types/submission"



export default function Home() {

  const [submissions, setSubmissions] = useState<Submission[]>([])

  const [activeTab, setActiveTab] = useState<"form" | "list">("form")



  const handleSubmit = (newSubmission: Submission) => {

    setSubmissions((prev) => [newSubmission, ...prev])

  }



  const handleDelete = (id: string) => {

    setSubmissions((prev) => prev.filter((sub) => sub.id !== id))

  }



  const handleStatusChange = (id: string, status: Submission["status"]) => {

    setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status } : sub)))

  }



  const handleEdit = (id: string, updatedData: Partial<Submission>) => {

    setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, ...updatedData } : sub)))

  }



  return (

    <main className="min-h-screen bg-background py-8 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-foreground mb-2">Application Management</h1>

          <p className="text-muted-foreground">Manage and track all submitted applications</p>

        </div>



        <div className="flex gap-4 mb-8 border-b border-border">

          <button

            onClick={() => setActiveTab("form")}

            className={`px-4 py-2 font-semibold transition-colors ${

              activeTab === "form"

                ? "text-primary border-b-2 border-primary"

                : "text-muted-foreground hover:text-foreground"

            }`}

          >

            New Application

          </button>

          <button

            onClick={() => setActiveTab("list")}

            className={`px-4 py-2 font-semibold transition-colors ${

              activeTab === "list"

                ? "text-primary border-b-2 border-primary"

                : "text-muted-foreground hover:text-foreground"

            }`}

          >

            View Submissions ({submissions.length})

          </button>

        </div>



        {/* Form Tab */}

        {activeTab === "form" && (

          <div className="max-w-2xl">

            <SubmissionForm onSubmit={handleSubmit} />

          </div>

        )}



        {/* List Tab */}

        {activeTab === "list" && (

          <div className="space-y-6">

            <StatusOverview submissions={submissions} />

            <SubmissionsList

              submissions={submissions}

              onDelete={handleDelete}

              onStatusChange={handleStatusChange}

              onEdit={handleEdit}

            />

          </div>

        )}

      </div>

    </main>

  )

}

