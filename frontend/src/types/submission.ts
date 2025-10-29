export interface Submission {
  id: string;
  studentName: string;
  dateOfBirth?: string;       // ISO date string
  gradeApplied: string;
  guardianName?: string;
  guardianContact?: string;
  email?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  [key: string]: any;
}
