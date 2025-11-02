import { useState } from 'react';
import { ArrowLeft, Send, Upload, X, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ApplicationFormProps {
  setActiveSection: (section: string) => void;
}

interface FormState {
  surname: string;
  firstName: string;
  middleName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  stateOfOrigin: string;
  lga: string;
  contactAddress: string;
  homeAddress: string;
  examCentre: string;

  previousSchool: string;
  classLastAttended: string;
  reasonForLeaving: string;
  classApplyingFor: string;

  medicalConditions: string[];
  otherMedicalCondition: string;
  bloodGroup: string;
  genotype: string;

  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianOccupation: string;
  guardianOfficeAddress: string;

  studentDeclarationAccepted: boolean;
  parentDeclarationAccepted: boolean;
}

interface UploadedFile {
  file: File;
  preview?: string;
}

interface DocumentUploads {
  passport: UploadedFile | null;
  birthCertificate: UploadedFile | null;
}

const initialFormState: FormState = {
  surname: '',
  firstName: '',
  middleName: '',
  dateOfBirth: '',
  gender: '',
  nationality: '',
  stateOfOrigin: '',
  lga: '',
  contactAddress: '',
  homeAddress: '',
  examCentre: '',

  previousSchool: '',
  classLastAttended: '',
  reasonForLeaving: '',
  classApplyingFor: '',

  medicalConditions: [],
  otherMedicalCondition: '',
  bloodGroup: '',
  genotype: '',

  guardianName: '',
  guardianEmail: '',
  guardianPhone: '',
  guardianOccupation: '',
  guardianOfficeAddress: '',

  studentDeclarationAccepted: false,
  parentDeclarationAccepted: false
};

const initialDocumentState: DocumentUploads = {
  passport: null,
  birthCertificate: null
};

export default function ApplicationForm({ setActiveSection }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [documents, setDocuments] = useState<DocumentUploads>(initialDocumentState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const checked = (event.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMedicalConditionChange = (condition: string) => {
    setFormData((prev) => {
      const conditions = prev.medicalConditions.includes(condition)
        ? prev.medicalConditions.filter((c) => c !== condition)
        : [...prev.medicalConditions, condition];
      return { ...prev, medicalConditions: conditions };
    });
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

    if (!formData.studentDeclarationAccepted) {
      alert('Please accept the student declaration');
      return;
    }

    if (!formData.parentDeclarationAccepted) {
      alert('Please accept the parent/guardian declaration');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress('Creating application...');

    try {
      const medicalConditionsStr = formData.medicalConditions.includes('Others')
        ? [...formData.medicalConditions.filter(c => c !== 'Others'), formData.otherMedicalCondition].join(', ')
        : formData.medicalConditions.join(', ');

      const { data: applicationData, error: applicationError } = await supabase
        .from('applications')
        .insert({
          surname: formData.surname,
          first_name: formData.firstName,
          middle_name: formData.middleName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          nationality: formData.nationality,
          state_of_origin: formData.stateOfOrigin,
          lga: formData.lga,
          contact_address: formData.contactAddress,
          home_address: formData.homeAddress,
          exam_centre: formData.examCentre,

          previous_school: formData.previousSchool,
          class_last_attended: formData.classLastAttended,
          reason_for_leaving: formData.reasonForLeaving,
          class_seeking_admission: formData.classApplyingFor,

          medical_conditions: medicalConditionsStr,
          blood_group: formData.bloodGroup,
          genotype: formData.genotype,

          guardian_name: formData.guardianName,
          guardian_email: formData.guardianEmail,
          guardian_mobile: formData.guardianPhone,
          guardian_occupation: formData.guardianOccupation,
          guardian_office_address: formData.guardianOfficeAddress,

          student_declaration_accepted: formData.studentDeclarationAccepted,
          parent_declaration_accepted: formData.parentDeclarationAccepted,
          student_signature_date: new Date().toISOString().split('T')[0],
          parent_signature_date: new Date().toISOString().split('T')[0],

          status: 'pending'
        })
        .select()
        .single();

      if (applicationError) {
        console.error('Application error:', applicationError);
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

      setUploadProgress('Sending confirmation emails...');

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      try {
        const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-application-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            applicationData: {
              surname: formData.surname,
              first_name: formData.firstName,
              middle_name: formData.middleName,
              guardian_email: formData.guardianEmail,
              guardian_name: formData.guardianName,
              guardian_mobile: formData.guardianPhone,
              guardian_occupation: formData.guardianOccupation,
              class_seeking_admission: formData.classApplyingFor,
              date_of_birth: formData.dateOfBirth,
              gender: formData.gender,
              nationality: formData.nationality,
              state_of_origin: formData.stateOfOrigin,
              lga: formData.lga,
              exam_centre: formData.examCentre,
              blood_group: formData.bloodGroup,
              genotype: formData.genotype,
              created_at: applicationData.created_at
            }
          })
        });

        if (!emailResponse.ok) {
          console.error('Email sending failed, but application was saved');
        }
      } catch (emailError) {
        console.error('Email error:', emailError);
      }

      setUploadProgress('Application submitted successfully!');

      setTimeout(() => {
        alert(
          'Your application has been submitted successfully! Confirmation emails have been sent. Our admissions team will contact you shortly.'
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
    { key: 'birthCertificate', label: 'Birth Certificate', required: true }
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
            <h1 className="text-3xl font-bold text-gray-900">Student Application Form</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Information</h2>
                <p className="text-gray-600">Please provide accurate information about the student</p>
              </div>

              <div className="grid gap-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="surname" className="block text-sm font-semibold text-gray-700 mb-2">
                      Surname *
                    </label>
                    <input
                      id="surname"
                      name="surname"
                      type="text"
                      value={formData.surname}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="middleName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Middle Name
                    </label>
                    <input
                      id="middleName"
                      name="middleName"
                      type="text"
                      value={formData.middleName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                    <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="nationality" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nationality *
                    </label>
                    <input
                      id="nationality"
                      name="nationality"
                      type="text"
                      value={formData.nationality}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Nigerian"
                    />
                  </div>
                  <div>
                    <label htmlFor="stateOfOrigin" className="block text-sm font-semibold text-gray-700 mb-2">
                      State of Origin *
                    </label>
                    <input
                      id="stateOfOrigin"
                      name="stateOfOrigin"
                      type="text"
                      value={formData.stateOfOrigin}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="lga" className="block text-sm font-semibold text-gray-700 mb-2">
                      Local Government Area *
                    </label>
                    <input
                      id="lga"
                      name="lga"
                      type="text"
                      value={formData.lga}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Address *
                    </label>
                    <textarea
                      id="contactAddress"
                      name="contactAddress"
                      rows={3}
                      value={formData.contactAddress}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="homeAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                      Home Address *
                    </label>
                    <textarea
                      id="homeAddress"
                      name="homeAddress"
                      rows={3}
                      value={formData.homeAddress}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="examCentre" className="block text-sm font-semibold text-gray-700 mb-2">
                    Exam Centre *
                  </label>
                  <select
                    id="examCentre"
                    name="examCentre"
                    value={formData.examCentre}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Select exam centre</option>
                    <option value="Ejidey Primary School Shangisha">Ejidey Primary School Shangisha</option>
                    <option value="Ejidey Secondary School Magodo Katu">Ejidey Secondary School Magodo Katu</option>
                  </select>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Educational Background</h2>
              </div>

              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="previousSchool" className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous School Attended
                    </label>
                    <input
                      id="previousSchool"
                      name="previousSchool"
                      type="text"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="classLastAttended" className="block text-sm font-semibold text-gray-700 mb-2">
                      Class Last Attended
                    </label>
                    <input
                      id="classLastAttended"
                      name="classLastAttended"
                      type="text"
                      value={formData.classLastAttended}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reasonForLeaving" className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason for Leaving the School
                  </label>
                  <textarea
                    id="reasonForLeaving"
                    name="reasonForLeaving"
                    rows={3}
                    value={formData.reasonForLeaving}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="classApplyingFor" className="block text-sm font-semibold text-gray-700 mb-2">
                    Class Applying For *
                  </label>
                  <select
                    id="classApplyingFor"
                    name="classApplyingFor"
                    value={formData.classApplyingFor}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Select class</option>
                    <option value="Based Crèche">Based Crèche</option>
                    <option value="Early Years Foundation (EYF)">Early Years Foundation (EYF)</option>
                    <option value="Nursery">Nursery</option>
                    <option value="Primary 1">Primary 1</option>
                    <option value="Primary 2">Primary 2</option>
                    <option value="Primary 3">Primary 3</option>
                    <option value="Primary 4">Primary 4</option>
                    <option value="Primary 5">Primary 5</option>
                    <option value="Primary 6">Primary 6</option>
                    <option value="JSS 1">JSS 1</option>
                    <option value="JSS 2">JSS 2</option>
                    <option value="JSS 3">JSS 3</option>
                    <option value="SS 1">SS 1</option>
                    <option value="SS 2">SS 2</option>
                    <option value="SS 3">SS 3</option>
                  </select>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Information</h2>
              </div>

              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Are you vulnerable to the carrier of any of the following diseases? *
                  </label>
                  <div className="space-y-2">
                    {['Tuberculosis', 'Sickle Cell Anaemia', 'Asthma', 'None', 'Others'].map((condition) => (
                      <label key={condition} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.medicalConditions.includes(condition)}
                          onChange={() => handleMedicalConditionChange(condition)}
                          disabled={isSubmitting}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-gray-700">{condition}</span>
                      </label>
                    ))}
                  </div>
                  {formData.medicalConditions.includes('Others') && (
                    <input
                      type="text"
                      name="otherMedicalCondition"
                      value={formData.otherMedicalCondition}
                      onChange={handleChange}
                      placeholder="Please specify"
                      disabled={isSubmitting}
                      className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="bloodGroup" className="block text-sm font-semibold text-gray-700 mb-2">
                      Blood Group *
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select blood group</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                      <option value="O">O</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="genotype" className="block text-sm font-semibold text-gray-700 mb-2">
                      Genotype *
                    </label>
                    <select
                      id="genotype"
                      name="genotype"
                      value={formData.genotype}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select genotype</option>
                      <option value="AA">AA</option>
                      <option value="AS">AS</option>
                      <option value="SS">SS</option>
                      <option value="SC">SC</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Parent/Guardian Information</h2>
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
                    />
                  </div>
                  <div>
                    <label htmlFor="guardianOccupation" className="block text-sm font-semibold text-gray-700 mb-2">
                      Occupation *
                    </label>
                    <input
                      id="guardianOccupation"
                      name="guardianOccupation"
                      type="text"
                      value={formData.guardianOccupation}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="guardianEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
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
                    />
                  </div>
                  <div>
                    <label htmlFor="guardianPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
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
                </div>

                <div>
                  <label htmlFor="guardianOfficeAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                    Office Address *
                  </label>
                  <textarea
                    id="guardianOfficeAddress"
                    name="guardianOfficeAddress"
                    rows={3}
                    value={formData.guardianOfficeAddress}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none disabled:bg-gray-100"
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

              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">DECLARATION</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Student Declaration</h3>
                  <p className="text-gray-700 mb-4">
                    I, <strong>{formData.surname} {formData.firstName} {formData.middleName}</strong> solemnly declare that:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                    <li>I will obey all school rules and regulations</li>
                    <li>I will not involve in any examination malpractices</li>
                    <li>I will not join any illegal association or Society</li>
                    <li>I will not engage myself in any activities that will bring disrepute to the image of the school</li>
                  </ol>
                  <label className="flex items-start mt-4">
                    <input
                      type="checkbox"
                      name="studentDeclarationAccepted"
                      checked={formData.studentDeclarationAccepted}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-1"
                    />
                    <span className="ml-3 text-gray-700">
                      I accept and agree to the above declarations *
                    </span>
                  </label>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Parent/Guardian Declaration</h3>
                  <p className="text-gray-700 mb-4">
                    I stand surety that my child/ward will conform to the declarations stated above and other implied rules and regulations of the school.
                  </p>
                  <label className="flex items-start mt-4">
                    <input
                      type="checkbox"
                      name="parentDeclarationAccepted"
                      checked={formData.parentDeclarationAccepted}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-1"
                    />
                    <span className="ml-3 text-gray-700">
                      I accept and agree to stand surety for my child/ward *
                    </span>
                  </label>
                </div>
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
