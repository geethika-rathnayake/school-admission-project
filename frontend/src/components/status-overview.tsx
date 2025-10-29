import React from 'react';
import type { Submission } from "@/types/submission"; // Assuming this path is correct

// Assuming Submission type has status: "pending" | "accepted" | "rejected" | "withdrawn"
interface StatusOverviewProps {
  submissions: Submission[];
}

// Define the colors and labels for each status
const statusConfigs = {
  Pending: { 
    bg: "bg-blue-50", 
    text: "text-blue-700", 
    border: "border-blue-200", 
    count: (subs: Submission[]) => subs.filter(s => s.status === "pending").length 
  },
  Accepted: { 
    bg: "bg-green-50", 
    text: "text-green-700", 
    border: "border-green-200", 
    count: (subs: Submission[]) => subs.filter(s => s.status === "accepted").length 
  },
  Rejected: { 
    bg: "bg-red-50", 
    text: "text-red-700", 
    border: "border-red-200", 
    count: (subs: Submission[]) => subs.filter(s => s.status === "rejected").length 
  },
};

export function StatusOverview({ submissions }: StatusOverviewProps) {

  const statusCounts = {
    // FIX: Changed "Processing" to "Pending" to match the Submission type status
    Pending: statusConfigs.Pending.count(submissions),
    Accepted: statusConfigs.Accepted.count(submissions),
    Rejected: statusConfigs.Rejected.count(submissions),
  };

  const statusMap = [
    { label: "Pending", count: statusCounts.Pending, config: statusConfigs.Pending },
    { label: "Accepted", count: statusCounts.Accepted, config: statusConfigs.Accepted },
    { label: "Rejected", count: statusCounts.Rejected, config: statusConfigs.Rejected },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statusMap.map(({ label, count, config }) => (
        <div 
          key={label}
          className={`p-5 rounded-xl shadow-md border ${config.border} ${config.bg} transition duration-300 hover:shadow-lg`}
        >
          <div className="text-4xl font-extrabold mb-1">{count}</div>
          <div className={`text-sm font-semibold ${config.text}`}>{label}</div>
        </div>
      ))}
    </div>
  );
}
