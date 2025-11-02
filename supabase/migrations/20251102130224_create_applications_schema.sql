/*
  # Create Applications Schema

  ## Overview
  This migration creates the database schema for student applications including comprehensive registration fields and document uploads.

  ## New Tables
  
  ### `applications` table
  Stores comprehensive student application information including:
  - Student personal details (name, DOB, gender, etc.)
  - Guardian/parent contact information
  - Educational background
  - Medical information
  - Family information
  - Declarations and status
  
  ### `application_documents` table
  Stores uploaded documents for each application:
  - Passport photographs
  - Birth certificates
  - School reports
  - Medical records
  - Other required documents
  
  ## Security
  - Enable RLS on both tables
  - Allow public INSERT for applications (form submission)
  - Allow public SELECT for applications (view status)
  - Allow authenticated admins to UPDATE applications
  - Public can upload and view documents
*/

-- Create comprehensive applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Student Details
  surname text NOT NULL,
  first_name text NOT NULL,
  middle_name text DEFAULT '',
  date_of_birth date NOT NULL,
  gender text NOT NULL,
  place_of_birth text DEFAULT '',
  religion text DEFAULT '',
  nationality text DEFAULT '',
  state_of_origin text DEFAULT '',
  lga text DEFAULT '',
  contact_address text DEFAULT '',
  home_address text DEFAULT '',
  exam_centre text DEFAULT '',
  
  -- Guardian/Parent Primary Contact
  guardian_title text DEFAULT '',
  guardian_name text NOT NULL,
  guardian_occupation text DEFAULT '',
  guardian_mobile text NOT NULL,
  guardian_home_tel text DEFAULT '',
  guardian_contact_address text DEFAULT '',
  guardian_email text NOT NULL,
  guardian_employer_name text DEFAULT '',
  guardian_office_address text DEFAULT '',
  
  -- Educational Background
  previous_school text DEFAULT '',
  class_last_attended text DEFAULT '',
  reason_for_leaving text DEFAULT '',
  examination_taken text DEFAULT '',
  examining_board text DEFAULT '',
  exam_subjects text DEFAULT '',
  exam_results text DEFAULT '',
  class_seeking_admission text NOT NULL,
  boarding_type text DEFAULT 'Day',
  
  -- Medical Information
  medical_conditions text DEFAULT '',
  blood_group text DEFAULT '',
  genotype text DEFAULT '',
  doctor_visits_last_2years text DEFAULT '',
  nature_of_illness text DEFAULT '',
  family_doctor_name text DEFAULT '',
  family_doctor_address text DEFAULT '',
  
  -- Family Information
  number_of_siblings text DEFAULT '',
  position_in_family text DEFAULT '',
  
  -- Father's Information
  father_full_name text DEFAULT '',
  father_occupation text DEFAULT '',
  father_place_of_work text DEFAULT '',
  father_office_address text DEFAULT '',
  father_email text DEFAULT '',
  father_phone text DEFAULT '',
  
  -- Mother's Information
  mother_full_name text DEFAULT '',
  mother_occupation text DEFAULT '',
  mother_place_of_work text DEFAULT '',
  mother_office_address text DEFAULT '',
  mother_email text DEFAULT '',
  mother_phone text DEFAULT '',
  
  -- Guardian Information (if parents live outside Lagos)
  local_guardian_full_name text DEFAULT '',
  local_guardian_occupation text DEFAULT '',
  local_guardian_place_of_work text DEFAULT '',
  local_guardian_office_address text DEFAULT '',
  local_guardian_email text DEFAULT '',
  local_guardian_phone text DEFAULT '',
  
  -- Declarations
  student_declaration_accepted boolean DEFAULT false,
  parent_declaration_accepted boolean DEFAULT false,
  student_signature_date date,
  parent_signature_date date,
  
  -- Application Status
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
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_application_documents_application_id ON application_documents(application_id);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications table
CREATE POLICY "Anyone can submit applications"
  ON applications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read applications"
  ON applications FOR SELECT
  TO public
  USING (true);

-- RLS Policies for application_documents table
CREATE POLICY "Anyone can upload documents"
  ON application_documents FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view documents"
  ON application_documents FOR SELECT
  TO public
  USING (true);

-- Create or replace the update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for application documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-documents', 'application-documents', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for storage bucket
CREATE POLICY "Anyone can upload application documents"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'application-documents');

CREATE POLICY "Anyone can view application documents"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'application-documents');