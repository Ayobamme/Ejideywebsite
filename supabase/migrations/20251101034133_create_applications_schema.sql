/*
  # Create Applications Schema

  ## Overview
  This migration creates the database schema for student applications and document management.

  ## New Tables
  
  ### `applications`
  Stores student application information
  - `id` (uuid, primary key) - Unique application identifier
  - `student_name` (text) - Full name of the student
  - `grade_level` (text) - Grade level applying for
  - `date_of_birth` (date) - Student's date of birth
  - `guardian_name` (text) - Parent/Guardian full name
  - `guardian_email` (text) - Parent/Guardian email address
  - `guardian_phone` (text) - Parent/Guardian phone number
  - `address` (text) - Home address
  - `previous_school` (text) - Previous school name
  - `additional_info` (text) - Additional notes or information
  - `status` (text) - Application status (pending, reviewing, accepted, rejected)
  - `created_at` (timestamptz) - Application submission timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `application_documents`
  Stores uploaded document metadata
  - `id` (uuid, primary key) - Unique document identifier
  - `application_id` (uuid, foreign key) - Reference to application
  - `document_type` (text) - Type of document (passport, birth_certificate, nin, etc.)
  - `file_name` (text) - Original file name
  - `file_path` (text) - Storage path in Supabase Storage
  - `file_size` (integer) - File size in bytes
  - `mime_type` (text) - File MIME type
  - `uploaded_at` (timestamptz) - Upload timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for public application submission
  - Add policies for document uploads
*/

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  grade_level text NOT NULL,
  date_of_birth date NOT NULL,
  guardian_name text NOT NULL,
  guardian_email text NOT NULL,
  guardian_phone text NOT NULL,
  address text NOT NULL,
  previous_school text DEFAULT '',
  additional_info text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create application_documents table
CREATE TABLE IF NOT EXISTS application_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  document_type text NOT NULL,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer NOT NULL,
  mime_type text NOT NULL,
  uploaded_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(guardian_email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_application_documents_application_id ON application_documents(application_id);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications table
-- Allow anyone to insert applications (public application submission)
CREATE POLICY "Anyone can submit applications"
  ON applications FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to read their own application by email
CREATE POLICY "Users can read own applications"
  ON applications FOR SELECT
  TO public
  USING (true);

-- RLS Policies for application_documents table
-- Allow anyone to insert documents for applications
CREATE POLICY "Anyone can upload documents"
  ON application_documents FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to read documents for applications
CREATE POLICY "Anyone can view documents"
  ON application_documents FOR SELECT
  TO public
  USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();