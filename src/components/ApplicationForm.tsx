import { useState } from 'react';
import { ArrowLeft, Send, Upload, X, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ApplicationFormProps {
  setActiveSection: (section: string) => void;
}

interface FormState {
  studentName: string;
  gradeLevel: string;
  dateOfBirth: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  address: string;
  previousSchool: string;
  additionalInfo: string;
}

interface UploadedFile {
  file: File;
  preview?: string;
}

interface DocumentUploads {
  passport: UploadedFile | null;
  birthCertificate: UploadedFile | null;
  nin: UploadedFile | null;
  previousSchoolReport: UploadedFile | null;
  medicalRecords: UploadedFile | null;
}

const initialFormState: FormState = {
  studentName: '',
  gradeLevel: '',
  dateOfBirth: '',
  guardianName: '',
  guardianEmail: '',
  guardianPhone: '',
  address: '',
  previousSchool: '',
  additionalInfo: ''
};

const initialDocumentState: DocumentUploads = {
  passport: null,
  birthCertificate: null,
  nin: null,
  previousSchoolReport: null,
  medicalRecords: null
};

export default function ApplicationForm({ setActiveSection }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [documents, setDocuments] = useState<DocumentUploads>(initialDocumentState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (documentType: keyof DocumentUploads, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG, and PDF files are allowed');
      return;
    }

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocuments((prev) => ({
          ...prev,
          [documentType]: { file, preview: reader.result as string }
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setDocuments((prev) => ({
        ...prev,
        [documentType]: { file }
      }));
    }
  };

  const removeFile = (documentType: keyof DocumentUploads) => {
    setDocuments((prev) => ({
      ...prev,
      [documentType]: null
    }));
  };

  const uploadFileToSupabase = async (
    file: File,
    applicationId: string,
    documentType: string
  ): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${applicationId}/${documentType}_${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('application-documents')
      .upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      throw new Error(`Failed to upload ${documentType}`);
    }

    return data.path;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!documents.passport) {
      alert('Please upload a passport photograph');
      return;
    }

    if (!documents.birthCertificate) {
      alert('Please upload birth certificate');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress('Creating application...');

    try {
      const { data: applicationData, error: applicationError } = await supabase
        .from('applications')
        .insert({
          student_name: formData.studentName,
          grade_level: formData.gradeLevel,
          date_of_birth: formData.dateOfBirth,
          guardian_name: formData.guardianName,
          guardian_email: formData.guardianEmail,
          guardian_phone: formData.guardianPhone,
          address: formData.address,
          previous_school: formData.previousSchool,
          additional_info: formData.additionalInfo,
          status: 'pending'
        })
        .select()
        .single();

      if (applicationError) {
        throw new Error('Failed to create application');
      }

      const applicationId = applicationData.id;

      const documentEntries = Object.entries(documents).filter(([_, value]) => value !== null);
      const totalDocuments = documentEntries.length;
      let uploadedCount = 0;

      for (const [docType, docData] of documentEntries) {
        if (docData) {
          setUploadProgress(`Uploading ${docType}... (${uploadedCount + 1}/${totalDocuments})`);

          const filePath = await uploadFileToSupabase(
            docData.file,
            applicationId,
            docType
          );

          await supabase.from('application_documents').insert({
            application_id: applicationId,
            document_type: docType,
            file_name: docData.file.name,
            file_path: filePath,
            file_size: docData.file.size,
            mime_type: docData.file.type
          });

          uploadedCount++;
        }
      }

      setUploadProgress('Application submitted successfully!');

      setTimeout(() => {
        alert(
          'Your application has been submitted successfully! Our admissions team will contact you shortly via email or phone.'
        );
        setFormData(initialFormState);
        setDocuments(initialDocumentState);
        setActiveSection('home');
      }, 1500);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit application. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress('');
    }
  };

  const documentFields: Array<{
    key: keyof DocumentUploads;
    label: string;
    required: boolean;
  }> = [
    { key: 'passport', label: 'Passport Photograph', required: true },
    { key: 'birthCertificate', label: 'Birth Certificate', required: true },
    { key: 'nin', label: 'National Identification Number (NIN)', required: false },
    { key: 'previousSchoolReport', label: 'Previous School Report', required: false },
    { key: 'medicalRecords', label: 'Medical Records/Immunization Card', required: false }
  ];

  return (
    <div className="pt-20 bg-white">
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <button
              onClick={() => setActiveSection('admissions')}
              className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Admissions
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Application Form</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Information</h2>
                <p className="text-gray-600">Please provide accurate information about the student</p>
              </div>

              <div className="grid gap-6">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Student Full Name *
                  </label>
                  <input
                    id="studentName"
                    name="studentName"
                    type="text"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="gradeLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                      Grade Level Applying For *
                    </label>
                    <select
                      id="gradeLevel"
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select grade level</option>
                      <option value="Based Crèche">Based Crèche</option>
                      <option value="EYF">Early Years Foundation (EYF)</option>
                      <option value="Nursery">Nursery</option>
                      <option value="Kindergarten">Kindergarten</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="previousSchool" className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous School
                    </label>
                    <input
                      id="previousSchool"
                      name="previousSchool"
                      type="text"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="School name"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Parent/Guardian Information</h2>
                <p className="text-gray-600">Contact details for the parent or guardian</p>
              </div>

              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="guardianName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Parent/Guardian Full Name *
                    </label>
                    <input
                      id="guardianName"
                      name="guardianName"
                      type="text"
                      value={formData.guardianName}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="guardianEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Parent/Guardian Email *
                    </label>
                    <input
                      id="guardianEmail"
                      name="guardianEmail"
                      type="email"
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="guardianPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Parent/Guardian Phone *
                    </label>
                    <input
                      id="guardianPhone"
                      name="guardianPhone"
                      type="tel"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="+234 000 000 0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                      Home Address *
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="123 Example Street, Lagos"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none disabled:bg-gray-100"
                    placeholder="Medical considerations, interests, or other notes"
                  />
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Required Documents</h2>
                <p className="text-gray-600">Upload clear copies of the following documents (Max 5MB per file, JPG/PNG/PDF only)</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {documentFields.map(({ key, label, required }) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      {label} {required && <span className="text-red-600">*</span>}
                    </label>

                    {!documents[key] ? (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(key, file);
                          }}
                          disabled={isSubmitting}
                          className="hidden"
                          id={`file-${key}`}
                        />
                        <label
                          htmlFor={`file-${key}`}
                          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                            isSubmitting
                              ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-emerald-500'
                          }`}
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">Click to upload</span>
                          <span className="text-xs text-gray-500 mt-1">JPG, PNG or PDF (max 5MB)</span>
                        </label>
                      </div>
                    ) : (
                      <div className="relative border-2 border-emerald-500 rounded-lg p-4 bg-emerald-50">
                        {documents[key]?.preview ? (
                          <img
                            src={documents[key]!.preview}
                            alt={label}
                            className="w-full h-32 object-contain rounded"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-32">
                            <FileText className="w-12 h-12 text-emerald-600" />
                          </div>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center text-emerald-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium truncate max-w-[200px]">
                              {documents[key]!.file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(key)}
                            disabled={isSubmitting}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {(documents[key]!.file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {uploadProgress && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Loader2 className="w-5 h-5 text-emerald-600 animate-spin mr-3" />
                    <span className="text-emerald-800 font-medium">{uploadProgress}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
